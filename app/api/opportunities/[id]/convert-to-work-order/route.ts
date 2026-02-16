import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/opportunities/[id]/convert-to-work-order - Convert a WON opportunity to a work order
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
    const opportunityId = parseInt(id);

    if (isNaN(opportunityId)) {
      return NextResponse.json({ error: 'Invalid opportunity ID' }, { status: 400 });
    }

    // Fetch opportunity with products
    const opportunity = await prisma.opportunities.findUnique({
      where: { id: opportunityId },
      include: {
        products: {
          include: {
            product: { select: { id: true, name: true, sku: true, basePrice: true } },
          },
        },
        lead: { select: { name: true, company: true } },
      },
    });

    if (!opportunity) {
      return NextResponse.json({ error: 'Opportunity not found' }, { status: 404 });
    }

    // Verify opportunity is WON
    if (opportunity.status !== 'WON') {
      return NextResponse.json(
        { error: `Only WON opportunities can be converted to work orders. Current status: ${opportunity.status}` },
        { status: 400 }
      );
    }

    // Verify opportunity has a customerId
    if (!opportunity.customerId) {
      return NextResponse.json(
        { error: 'Opportunity must have a linked customer to create a work order' },
        { status: 400 }
      );
    }

    // Generate WO number
    const woNumber = await generateDocumentNumber('WO');

    // Build items from opportunity products
    const itemsData = opportunity.products.map((op) => {
      const quantity = Number(op.quantity);
      const unitPrice = Number(op.unitPrice);
      const total = quantity * unitPrice;
      return {
        type: 'MATERIAL',
        productId: op.productId,
        description: op.product.name,
        quantity,
        unitPrice,
        total,
      };
    });

    const materialCost = itemsData.reduce((sum, item) => sum + item.total, 0);
    const totalCost = materialCost;

    // Create work order
    const workOrder = await prisma.work_orders.create({
      data: {
        woNumber,
        type: 'SERVICE',
        customerId: opportunity.customerId,
        title: `WO for ${opportunity.name}`,
        description: opportunity.description || `Work order created from opportunity: ${opportunity.name}`,
        priority: 'MEDIUM',
        status: 'PENDING',
        laborCost: 0,
        materialCost,
        totalCost,
        items: {
          create: itemsData,
        },
      },
      include: {
        customer: { select: { name: true } },
        items: true,
      },
    });

    return NextResponse.json(workOrder, { status: 201 });
  } catch (error) {
    console.error('Error converting opportunity to work order:', error);
    return NextResponse.json(
      { error: 'Failed to convert opportunity to work order' },
      { status: 500 }
    );
  }
}
