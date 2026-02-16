import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/material-requests/[id]/convert-to-po - Convert approved material request to purchase order
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const mrId = parseInt(id);

    if (isNaN(mrId)) {
      return NextResponse.json({ error: 'Invalid material request ID' }, { status: 400 });
    }

    // Fetch material request with items
    const materialRequest = await prisma.material_requests.findUnique({
      where: { id: mrId },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, sku: true, costPrice: true, gstRate: true } },
          },
        },
      },
    });

    if (!materialRequest) {
      return NextResponse.json({ error: 'Material request not found' }, { status: 404 });
    }

    // Verify status is APPROVED
    if (materialRequest.status !== 'APPROVED') {
      return NextResponse.json(
        { error: `Only APPROVED material requests can be converted to purchase orders. Current status: ${materialRequest.status}` },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { vendorId, locationId } = body;

    if (!vendorId || !locationId) {
      return NextResponse.json(
        { error: 'vendorId and locationId are required' },
        { status: 400 }
      );
    }

    // Fetch vendor details
    const vendor = await prisma.vendors.findUnique({
      where: { id: parseInt(vendorId) },
    });

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    // Use a transaction to create PO and update MR
    const purchaseOrder = await prisma.$transaction(async (tx) => {
      // Generate PO number
      const poNumber = await generateDocumentNumber('PO');

      // Build PO items from MR items (use approved quantities)
      const poItems = materialRequest.items.map((item) => {
        const quantity = Number(item.approvedQuantity) > 0 ? Number(item.approvedQuantity) : Number(item.requestedQuantity);
        const unitCost = Number(item.product?.costPrice) || 0;
        const taxRate = Number(item.product?.gstRate) || 0;
        const totalCost = quantity * unitCost;

        return {
          productId: item.productId,
          productName: item.productName,
          productSku: item.product?.sku || '',
          orderedQuantity: quantity,
          receivedQuantity: 0,
          unitCost,
          taxRate,
          totalCost,
        };
      });

      // Calculate totals
      const subtotal = poItems.reduce((sum, item) => sum + item.totalCost, 0);
      const taxAmount = poItems.reduce(
        (sum, item) => sum + item.totalCost * (item.taxRate / 100),
        0
      );
      const total = subtotal + taxAmount;

      // Create purchase order
      const newPO = await tx.purchase_orders.create({
        data: {
          poNumber,
          vendorId: parseInt(vendorId),
          locationId: parseInt(locationId),
          vendorName: vendor.name,
          vendorEmail: vendor.email || null,
          vendorGst: vendor.gstNumber || null,
          vendorState: vendor.state || null,
          subtotal,
          taxAmount,
          shippingCost: 0,
          discount: 0,
          total,
          currency: 'INR',
          status: 'DRAFT',
          paymentStatus: 'UNPAID',
          notes: `Created from Material Request ${materialRequest.mrNumber}`,
          items: {
            create: poItems,
          },
        },
        include: {
          vendor: { select: { name: true, code: true } },
          items: true,
        },
      });

      // Update material request status to PO_CREATED
      await tx.material_requests.update({
        where: { id: mrId },
        data: {
          status: 'PO_CREATED',
          purchaseOrderId: newPO.id,
        },
      });

      return newPO;
    });

    return NextResponse.json(purchaseOrder, { status: 201 });
  } catch (error) {
    console.error('Error converting material request to purchase order:', error);
    return NextResponse.json(
      { error: 'Failed to convert material request to purchase order' },
      { status: 500 }
    );
  }
}
