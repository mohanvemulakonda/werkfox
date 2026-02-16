import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/sales-orders/[id]/create-production-order - Create production order from sales order
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
    const soId = parseInt(id);

    if (isNaN(soId)) {
      return NextResponse.json({ error: 'Invalid sales order ID' }, { status: 400 });
    }

    // Fetch sales order with items
    const salesOrder = await prisma.sales_orders.findUnique({
      where: { id: soId },
      include: {
        items: {
          include: {
            product: { select: { id: true, name: true, sku: true, costPrice: true } },
          },
        },
      },
    });

    if (!salesOrder) {
      return NextResponse.json({ error: 'Sales order not found' }, { status: 404 });
    }

    // Verify status is CONFIRMED or IN_PROGRESS
    if (!['CONFIRMED', 'IN_PROGRESS'].includes(salesOrder.status)) {
      return NextResponse.json(
        { error: `Only CONFIRMED or IN_PROGRESS sales orders can create production orders. Current status: ${salesOrder.status}` },
        { status: 400 }
      );
    }

    const body = await request.json().catch(() => ({}));
    const { productId: specificProductId } = body;

    // If a specific productId is provided, create a single production order for that product
    if (specificProductId) {
      const soItem = salesOrder.items.find((item) => item.productId === parseInt(specificProductId));
      if (!soItem) {
        return NextResponse.json(
          { error: 'Product not found in this sales order' },
          { status: 400 }
        );
      }

      const prodNumber = await generateDocumentNumber('PROD');

      const productionOrder = await prisma.production_orders.create({
        data: {
          prodNumber,
          salesOrderId: soId,
          productId: soItem.productId,
          productName: soItem.productName,
          plannedQuantity: soItem.quantity,
          completedQuantity: 0,
          rejectedQuantity: 0,
          status: 'PLANNED',
          priority: 'MEDIUM',
          notes: `Created from Sales Order ${salesOrder.soNumber}`,
          items: {
            create: [{
              productId: soItem.productId,
              productName: soItem.productName,
              requiredQuantity: soItem.quantity,
              unitCost: Number(soItem.product?.costPrice) || Number(soItem.unitPrice) || 0,
            }],
          },
        },
        include: {
          product: { select: { name: true, sku: true } },
          items: true,
        },
      });

      return NextResponse.json(productionOrder, { status: 201 });
    }

    // Otherwise create production orders for each SO item
    const productionOrders = [];
    for (const item of salesOrder.items) {
      const prodNumber = await generateDocumentNumber('PROD');

      const productionOrder = await prisma.production_orders.create({
        data: {
          prodNumber,
          salesOrderId: soId,
          productId: item.productId,
          productName: item.productName,
          plannedQuantity: item.quantity,
          completedQuantity: 0,
          rejectedQuantity: 0,
          status: 'PLANNED',
          priority: 'MEDIUM',
          notes: `Created from Sales Order ${salesOrder.soNumber}`,
          items: {
            create: [{
              productId: item.productId,
              productName: item.productName,
              requiredQuantity: item.quantity,
              unitCost: Number(item.product?.costPrice) || Number(item.unitPrice) || 0,
            }],
          },
        },
        include: {
          product: { select: { name: true, sku: true } },
          items: true,
        },
      });

      productionOrders.push(productionOrder);
    }

    return NextResponse.json(productionOrders, { status: 201 });
  } catch (error) {
    console.error('Error creating production order from sales order:', error);
    return NextResponse.json(
      { error: 'Failed to create production order from sales order' },
      { status: 500 }
    );
  }
}
