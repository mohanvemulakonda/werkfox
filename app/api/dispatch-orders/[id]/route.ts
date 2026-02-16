import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

// Valid status transitions
const validTransitions: Record<string, string[]> = {
  PENDING: ['PACKED'],
  PACKED: ['DISPATCHED'],
  DISPATCHED: ['IN_TRANSIT'],
  IN_TRANSIT: ['DELIVERED'],
};

// GET /api/dispatch-orders/[id] - Get single dispatch order with all relations
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const dcId = parseInt(id);

    if (isNaN(dcId)) {
      return NextResponse.json({ error: 'Invalid dispatch order ID' }, { status: 400 });
    }

    const dispatchOrder = await prisma.dispatch_orders.findUnique({
      where: { id: dcId },
      include: {
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
        salesOrder: true,
        customer: true,
        location: true,
      },
    });

    if (!dispatchOrder) {
      return NextResponse.json({ error: 'Dispatch order not found' }, { status: 404 });
    }

    return NextResponse.json(dispatchOrder);
  } catch (error) {
    console.error('Error fetching dispatch order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dispatch order' },
      { status: 500 }
    );
  }
}

// PUT /api/dispatch-orders/[id] - Full update + replace items (only if PENDING)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const dcId = parseInt(id);

    if (isNaN(dcId)) {
      return NextResponse.json({ error: 'Invalid dispatch order ID' }, { status: 400 });
    }

    const existing = await prisma.dispatch_orders.findUnique({
      where: { id: dcId },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Dispatch order not found' }, { status: 404 });
    }

    if (existing.status !== 'PENDING') {
      return NextResponse.json(
        { error: 'Only PENDING dispatch orders can be edited' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      shippingMethod,
      carrierName,
      trackingNumber,
      vehicleNumber,
      driverName,
      driverPhone,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPincode,
      shippingCountry,
      contactName,
      contactPhone,
      estimatedWeight,
      numberOfPackages,
      shippingCost,
      dispatchDate,
      estimatedDelivery,
      locationId,
      notes,
      items,
    } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'At least one item is required' },
        { status: 400 }
      );
    }

    const itemsData = items.map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      orderedQuantity: item.orderedQuantity || 0,
      dispatchedQuantity: item.dispatchedQuantity || 0,
      batchNumber: item.batchNumber || null,
      serialNumbers: item.serialNumbers || null,
    }));

    const updatedDC = await prisma.$transaction(async (tx) => {
      // Delete existing items
      await tx.dispatch_order_items.deleteMany({
        where: { dispatchOrderId: dcId },
      });

      // Update dispatch order and create new items
      return tx.dispatch_orders.update({
        where: { id: dcId },
        data: {
          shippingMethod: shippingMethod || null,
          carrierName: carrierName || null,
          trackingNumber: trackingNumber || null,
          vehicleNumber: vehicleNumber || null,
          driverName: driverName || null,
          driverPhone: driverPhone || null,
          shippingAddress: shippingAddress || null,
          shippingCity: shippingCity || null,
          shippingState: shippingState || null,
          shippingPincode: shippingPincode || null,
          shippingCountry: shippingCountry || 'India',
          contactName: contactName || null,
          contactPhone: contactPhone || null,
          estimatedWeight: estimatedWeight ? parseFloat(estimatedWeight) : null,
          numberOfPackages: numberOfPackages ? parseInt(numberOfPackages) : 1,
          shippingCost: shippingCost ? parseFloat(shippingCost) : 0,
          dispatchDate: dispatchDate ? new Date(dispatchDate) : null,
          estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : null,
          locationId: locationId ? parseInt(locationId) : null,
          notes: notes || null,
          items: {
            create: itemsData,
          },
        },
        include: {
          salesOrder: { select: { soNumber: true } },
          customer: { select: { name: true } },
          items: true,
        },
      });
    });

    return NextResponse.json(updatedDC);
  } catch (error) {
    console.error('Error updating dispatch order:', error);
    return NextResponse.json(
      { error: 'Failed to update dispatch order' },
      { status: 500 }
    );
  }
}

// PATCH /api/dispatch-orders/[id] - Status update with inventory impact
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const dcId = parseInt(id);

    if (isNaN(dcId)) {
      return NextResponse.json({ error: 'Invalid dispatch order ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Fetch current dispatch order
    const existing = await prisma.dispatch_orders.findUnique({
      where: { id: dcId },
      include: { items: true },
    });

    if (!existing) {
      return NextResponse.json({ error: 'Dispatch order not found' }, { status: 404 });
    }

    // Validate status transition
    const allowedStatuses = validTransitions[existing.status];
    if (!allowedStatuses || !allowedStatuses.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid status transition from ${existing.status} to ${status}. Allowed transitions: ${allowedStatuses?.join(', ') || 'none'}`,
        },
        { status: 400 }
      );
    }

    // Use transaction for inventory-impacting status changes
    const updatedDC = await prisma.$transaction(async (tx) => {
      const updateData: any = { status };

      // When status -> DISPATCHED: deduct inventory, create stock movements
      if (status === 'DISPATCHED') {
        if (!existing.dispatchDate) {
          updateData.dispatchDate = new Date();
        }

        // Get locationId - use dispatch order's location or find default
        const locationId = existing.locationId;

        if (locationId) {
          for (const item of existing.items) {
            // Get current inventory
            const inventory = await tx.inventory.findFirst({
              where: {
                locationId,
                productId: item.productId,
              },
            });

            const previousQty = inventory?.quantity || 0;
            const newQty = previousQty - item.dispatchedQuantity;

            // Create stock movement (OUT)
            await tx.stock_movements.create({
              data: {
                locationId,
                productId: item.productId,
                movementType: 'OUT',
                quantity: item.dispatchedQuantity,
                previousQty,
                newQty,
                referenceType: 'DISPATCH',
                referenceId: dcId,
                reason: `Dispatch ${existing.dispatchNumber}`,
              },
            });

            // Update inventory quantity
            if (inventory) {
              await tx.inventory.update({
                where: { id: inventory.id },
                data: {
                  quantity: newQty,
                  lastStockUpdate: new Date(),
                },
              });
            }

            // Also update product stockQuantity
            await tx.products.update({
              where: { id: item.productId },
              data: {
                stockQuantity: { decrement: item.dispatchedQuantity },
              },
            });
          }
        }
      }

      // When status -> DELIVERED: update SO items deliveredQty, set actualDelivery
      if (status === 'DELIVERED') {
        updateData.actualDelivery = new Date();

        // Update sales order items delivered quantity
        for (const item of existing.items) {
          const soItems = await tx.sales_order_items.findMany({
            where: {
              salesOrderId: existing.salesOrderId,
              productId: item.productId,
            },
          });

          for (const soItem of soItems) {
            await tx.sales_order_items.update({
              where: { id: soItem.id },
              data: {
                deliveredQty: soItem.deliveredQty + item.dispatchedQuantity,
              },
            });
          }
        }
      }

      return tx.dispatch_orders.update({
        where: { id: dcId },
        data: updateData,
        include: {
          salesOrder: { select: { soNumber: true } },
          customer: { select: { name: true } },
          items: {
            include: {
              product: { select: { name: true, sku: true } },
            },
          },
        },
      });
    });

    return NextResponse.json(updatedDC);
  } catch (error) {
    console.error('Error updating dispatch order status:', error);
    return NextResponse.json(
      { error: 'Failed to update dispatch order status' },
      { status: 500 }
    );
  }
}
