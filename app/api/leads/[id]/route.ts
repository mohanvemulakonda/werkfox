import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/leads/[id] - Get single lead
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const leadId = parseInt(params.id);

    if (isNaN(leadId)) {
      return NextResponse.json({ error: 'Invalid lead ID' }, { status: 400 });
    }

    const lead = await prisma.lead.findUnique({
      where: { id: leadId },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
        },
        opportunities: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
        },
        contact: true,
      },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    return NextResponse.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    return NextResponse.json(
      { error: 'Failed to fetch lead' },
      { status: 500 }
    );
  }
}

// PUT /api/leads/[id] - Update lead
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const leadId = parseInt(params.id);

    if (isNaN(leadId)) {
      return NextResponse.json({ error: 'Invalid lead ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      email,
      phone,
      company,
      designation,
      billingAddress,
      shippingAddress,
      city,
      state,
      country,
      pincode,
      gstNumber,
      gstType,
      source,
      industry,
      leadScore,
      stage,
      status,
      assignedTo,
      notes,
      nextFollowUp,
      lastContacted,
    } = body;

    // Check if lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Update lead
    const lead = await prisma.lead.update({
      where: { id: leadId },
      data: {
        ...(name && { name }),
        ...(email && { email }),
        ...(phone !== undefined && { phone }),
        ...(company !== undefined && { company }),
        ...(designation !== undefined && { designation }),
        ...(billingAddress !== undefined && { billingAddress }),
        ...(shippingAddress !== undefined && { shippingAddress }),
        ...(city !== undefined && { city }),
        ...(state !== undefined && { state }),
        ...(country !== undefined && { country }),
        ...(pincode !== undefined && { pincode }),
        ...(gstNumber !== undefined && { gstNumber }),
        ...(gstType !== undefined && { gstType }),
        ...(source !== undefined && { source }),
        ...(industry !== undefined && { industry }),
        ...(leadScore !== undefined && { leadScore }),
        ...(stage !== undefined && { stage }),
        ...(status !== undefined && { status }),
        ...(assignedTo !== undefined && { assignedTo }),
        ...(notes !== undefined && { notes }),
        ...(nextFollowUp !== undefined && {
          nextFollowUp: nextFollowUp ? new Date(nextFollowUp) : null,
        }),
        ...(lastContacted !== undefined && {
          lastContacted: lastContacted ? new Date(lastContacted) : null,
        }),
        // Track conversion date if status changes to CONVERTED
        ...(status === 'CONVERTED' &&
          existingLead.status !== 'CONVERTED' && {
            convertedAt: new Date(),
          }),
      },
      include: {
        activities: {
          orderBy: { createdAt: 'desc' },
        },
        opportunities: {
          orderBy: { createdAt: 'desc' },
        },
        invoices: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    return NextResponse.json(lead);
  } catch (error: any) {
    console.error('Error updating lead:', error);

    // Handle unique constraint violation
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A lead with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}

// DELETE /api/leads/[id] - Delete lead
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const leadId = parseInt(params.id);

    if (isNaN(leadId)) {
      return NextResponse.json({ error: 'Invalid lead ID' }, { status: 400 });
    }

    // Check if lead exists
    const existingLead = await prisma.lead.findUnique({
      where: { id: leadId },
    });

    if (!existingLead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Delete lead (cascades to activities, opportunities, etc.)
    await prisma.lead.delete({
      where: { id: leadId },
    });

    return NextResponse.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    console.error('Error deleting lead:', error);
    return NextResponse.json(
      { error: 'Failed to delete lead' },
      { status: 500 }
    );
  }
}
