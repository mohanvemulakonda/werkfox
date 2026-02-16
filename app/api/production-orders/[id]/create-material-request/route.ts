import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/production-orders/[id]/create-material-request - Create MR from production order BOM
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
    const prodId = parseInt(id);

    if (isNaN(prodId)) {
      return NextResponse.json({ error: 'Invalid production order ID' }, { status: 400 });
    }

    // Fetch production order with items
    const productionOrder = await prisma.production_orders.findUnique({
      where: { id: prodId },
      include: {
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
      },
    });

    if (!productionOrder) {
      return NextResponse.json({ error: 'Production order not found' }, { status: 404 });
    }

    // Verify status is PLANNED or IN_PROGRESS
    if (!['PLANNED', 'IN_PROGRESS'].includes(productionOrder.status)) {
      return NextResponse.json(
        { error: `Only PLANNED or IN_PROGRESS production orders can create material requests. Current status: ${productionOrder.status}` },
        { status: 400 }
      );
    }

    if (productionOrder.items.length === 0) {
      return NextResponse.json(
        { error: 'Production order has no BOM items to create a material request from' },
        { status: 400 }
      );
    }

    // Use a transaction to create MR and update production order status
    const materialRequest = await prisma.$transaction(async (tx) => {
      // Generate MR number
      const mrNumber = await generateDocumentNumber('MR');

      // Build MR items from production order BOM items
      const mrItems = productionOrder.items.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        requestedQuantity: item.requiredQuantity,
      }));

      // Create material request
      const newMR = await tx.material_requests.create({
        data: {
          mrNumber,
          type: 'PRODUCTION',
          productionOrderId: prodId,
          status: 'DRAFT',
          priority: productionOrder.priority,
          requestedBy: session.user.name || null,
          notes: `Created from Production Order ${productionOrder.prodNumber}`,
          items: {
            create: mrItems,
          },
        },
        include: {
          productionOrder: { select: { prodNumber: true } },
          items: true,
        },
      });

      // Update production order status to MATERIAL_REQUESTED
      await tx.production_orders.update({
        where: { id: prodId },
        data: { status: 'MATERIAL_REQUESTED' },
      });

      return newMR;
    });

    return NextResponse.json(materialRequest, { status: 201 });
  } catch (error) {
    console.error('Error creating material request from production order:', error);
    return NextResponse.json(
      { error: 'Failed to create material request from production order' },
      { status: 500 }
    );
  }
}
