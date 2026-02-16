import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// GET /api/grn - List all GRNs with optional status filter
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const where: any = {};
    if (status) {
      where.status = status;
    }

    const grns = await prisma.goods_receipt_notes.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        purchaseOrder: {
          select: { poNumber: true, vendorName: true },
        },
        location: {
          select: { name: true },
        },
        items: { select: { id: true } },
      },
    });

    return NextResponse.json({ grns });
  } catch (error) {
    console.error('Error fetching GRNs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GRNs' },
      { status: 500 }
    );
  }
}

// POST /api/grn - Create GRN with inventory updates (transactional)
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { purchaseOrderId, locationId, items, notes } = body;

    if (!purchaseOrderId || !locationId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'purchaseOrderId, locationId, and items are required' },
        { status: 400 }
      );
    }

    // Verify PO exists
    const po = await prisma.purchase_orders.findUnique({
      where: { id: parseInt(purchaseOrderId) },
      include: { items: true, vendor: { select: { name: true } } },
    });

    if (!po) {
      return NextResponse.json(
        { error: 'Purchase order not found' },
        { status: 404 }
      );
    }

    // Generate GRN number before the transaction
    const grnNumber = await generateDocumentNumber('GRN');

    const grn = await prisma.$transaction(async (tx) => {
      // 1. Create the GRN record
      const createdGrn = await tx.goods_receipt_notes.create({
        data: {
          grnNumber,
          purchaseOrderId: parseInt(purchaseOrderId),
          locationId: parseInt(locationId),
          vendorName: po.vendorName,
          receivedDate: new Date(),
          status: 'PENDING',
          notes: notes || null,
          receivedBy: null,
        },
      });

      // 2. Create GRN items, update inventory, create stock movements, update PO items
      for (const item of items) {
        const productId = parseInt(item.productId);
        const locId = parseInt(locationId);
        const receivedQty = parseInt(item.receivedQuantity);
        const unitCost = parseFloat(item.unitCost);

        // Create GRN item
        await tx.grn_items.create({
          data: {
            grnId: createdGrn.id,
            productId,
            productName: item.productName,
            productSku: item.productSku,
            orderedQuantity: parseInt(item.orderedQuantity),
            receivedQuantity: receivedQty,
            acceptedQuantity: 0,
            rejectedQuantity: 0,
            batchNumber: item.batchNumber || null,
            expiryDate: item.expiryDate ? new Date(item.expiryDate) : null,
            unitCost,
            notes: item.notes || null,
          },
        });

        // Get current inventory for previousQty tracking
        const existingInventory = await tx.inventory.findUnique({
          where: { locationId_productId: { locationId: locId, productId } },
        });
        const previousQty = existingInventory?.quantity || 0;
        const newQty = previousQty + receivedQty;

        // Upsert inventory
        await tx.inventory.upsert({
          where: { locationId_productId: { locationId: locId, productId } },
          create: {
            locationId: locId,
            productId,
            quantity: receivedQty,
            reservedQuantity: 0,
            lastStockUpdate: new Date(),
          },
          update: {
            quantity: { increment: receivedQty },
            lastStockUpdate: new Date(),
          },
        });

        // Create stock movement
        await tx.stock_movements.create({
          data: {
            locationId: locId,
            productId,
            movementType: 'IN',
            quantity: receivedQty,
            previousQty,
            newQty,
            referenceType: 'GRN',
            referenceId: createdGrn.id,
            batchNumber: item.batchNumber || null,
            reason: `Goods received against GRN ${grnNumber}`,
            notes: null,
            createdBy: null,
          },
        });

        // Update PO item receivedQuantity
        const poItem = po.items.find((pi) => pi.productId === productId);
        if (poItem) {
          await tx.purchase_order_items.update({
            where: { id: poItem.id },
            data: { receivedQuantity: { increment: receivedQty } },
          });
        }
      }

      // 3. Auto-update PO status
      // Re-fetch PO items after updates
      const updatedPoItems = await tx.purchase_order_items.findMany({
        where: { purchaseOrderId: parseInt(purchaseOrderId) },
      });

      const allFullyReceived = updatedPoItems.every(
        (pi) => pi.receivedQuantity >= pi.orderedQuantity
      );
      const someReceived = updatedPoItems.some((pi) => pi.receivedQuantity > 0);

      if (allFullyReceived) {
        await tx.purchase_orders.update({
          where: { id: parseInt(purchaseOrderId) },
          data: { status: 'RECEIVED', receivedDate: new Date() },
        });
      } else if (someReceived) {
        await tx.purchase_orders.update({
          where: { id: parseInt(purchaseOrderId) },
          data: { status: 'PARTIAL_RECEIVED' },
        });
      }

      return createdGrn;
    });

    // Return the created GRN with relations
    const fullGrn = await prisma.goods_receipt_notes.findUnique({
      where: { id: grn.id },
      include: {
        purchaseOrder: { select: { poNumber: true, vendorName: true, status: true } },
        location: { select: { name: true } },
        items: true,
      },
    });

    return NextResponse.json(fullGrn, { status: 201 });
  } catch (error: any) {
    console.error('Error creating GRN:', error);
    return NextResponse.json(
      { error: 'Failed to create GRN' },
      { status: 500 }
    );
  }
}
