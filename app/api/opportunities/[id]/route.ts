import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/opportunities/[id] - Get single opportunity
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 403 });
    }

    const { id } = await params;
    const opportunityId = parseInt(id);

    if (isNaN(opportunityId)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID' },
        { status: 400 }
      );
    }

    const opportunity = await prisma.opportunities.findFirst({
      where: { id: opportunityId, organizationId: session.currentOrg.id },
      include: {
        lead: true,
        products: {
          include: {
            product: true,
          },
        },
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(opportunity);
  } catch (error) {
    console.error('Error fetching opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunity' },
      { status: 500 }
    );
  }
}

// PUT /api/opportunities/[id] - Update opportunity
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 403 });
    }

    const { id } = await params;
    const opportunityId = parseInt(id);

    if (isNaN(opportunityId)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      name,
      description,
      value,
      currency,
      probability,
      expectedCloseDate,
      stage,
      status,
      lostReason,
      assignedTo,
      notes,
      products, // Array of { id?, productId, quantity, unitPrice, discount }
    } = body;

    // Check if opportunity exists and belongs to this org
    const existingOpportunity = await prisma.opportunities.findFirst({
      where: { id: opportunityId, organizationId: session.currentOrg.id },
      include: {
        products: true,
      },
    });

    if (!existingOpportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }

    // Handle products updates if provided
    let productUpdates = {};
    if (products !== undefined) {
      // Delete existing products first
      await prisma.opportunity_products.deleteMany({
        where: { opportunityId },
      });

      // Create new products
      if (products.length > 0) {
        productUpdates = {
          products: {
            create: products.map((p: any) => ({
              productId: parseInt(p.productId),
              quantity: parseFloat(p.quantity),
              unitPrice: parseFloat(p.unitPrice),
              discount: parseFloat(p.discount || 0),
            })),
          },
        };
      }
    }

    // Update opportunity
    const opportunity = await prisma.opportunities.update({
      where: { id: opportunityId },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(value !== undefined && { value: parseFloat(value) }),
        ...(currency !== undefined && { currency }),
        ...(probability !== undefined && { probability }),
        ...(expectedCloseDate !== undefined && {
          expectedCloseDate: expectedCloseDate
            ? new Date(expectedCloseDate)
            : null,
        }),
        ...(stage !== undefined && { stage }),
        ...(status !== undefined && { status }),
        ...(lostReason !== undefined && { lostReason }),
        ...(assignedTo !== undefined && { assignedTo }),
        ...(notes !== undefined && { notes }),
        // Track close date if status changes to WON or LOST
        ...((status === 'WON' || status === 'LOST') &&
          existingOpportunity.status === 'OPEN' && {
          actualCloseDate: new Date(),
        }),
        ...productUpdates,
      },
      include: {
        lead: true,
        products: {
          include: {
            product: true,
          },
        },
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return NextResponse.json(opportunity);
  } catch (error: any) {
    console.error('Error updating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to update opportunity' },
      { status: 500 }
    );
  }
}

// DELETE /api/opportunities/[id] - Delete opportunity
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 403 });
    }

    const { id } = await params;
    const opportunityId = parseInt(id);

    if (isNaN(opportunityId)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID' },
        { status: 400 }
      );
    }

    // Check if opportunity exists and belongs to this org
    const existingOpportunity = await prisma.opportunities.findFirst({
      where: { id: opportunityId, organizationId: session.currentOrg.id },
    });

    if (!existingOpportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }

    // Delete opportunity (cascades to products, activities)
    await prisma.opportunities.delete({
      where: { id: opportunityId },
    });

    return NextResponse.json({
      message: 'Opportunity deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to delete opportunity' },
      { status: 500 }
    );
  }
}
