import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// POST /api/leads/[id]/convert-to-opportunity - Convert a qualified lead to an opportunity
export async function POST(
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
    const leadId = parseInt(id);

    if (isNaN(leadId)) {
      return NextResponse.json({ error: 'Invalid lead ID' }, { status: 400 });
    }

    // Fetch lead and verify it belongs to this organization
    const lead = await prisma.leads.findFirst({
      where: { id: leadId, organizationId: session.currentOrg.id },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Validate lead stage — must not be LOST
    if (lead.stage === 'LOST') {
      return NextResponse.json(
        { error: 'Lost leads cannot be converted to opportunities.' },
        { status: 400 }
      );
    }

    // Check if lead is already converted
    if (lead.status === 'CONVERTED') {
      return NextResponse.json(
        { error: 'This lead has already been converted' },
        { status: 400 }
      );
    }

    // Use a transaction to create opportunity and update lead atomically
    const opportunity = await prisma.$transaction(async (tx) => {
      // Create opportunity from lead data
      const newOpportunity = await tx.opportunities.create({
        data: {
          organizationId: session.currentOrg!.id,
          name: `Opportunity - ${lead.company || lead.name}`,
          leadId: lead.id,
          value: 0,
          stage: 'QUALIFICATION',
          status: 'OPEN',
        },
        include: {
          lead: {
            select: {
              id: true,
              name: true,
              email: true,
              company: true,
              phone: true,
            },
          },
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      // Update lead to mark as converted
      await tx.leads.update({
        where: { id: leadId },
        data: {
          stage: 'WON',
          status: 'CONVERTED',
          convertedAt: new Date(),
        },
      });

      return newOpportunity;
    });

    return NextResponse.json(opportunity, { status: 201 });
  } catch (error) {
    console.error('Error converting lead to opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to convert lead to opportunity' },
      { status: 500 }
    );
  }
}
