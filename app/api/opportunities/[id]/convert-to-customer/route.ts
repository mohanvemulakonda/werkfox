import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { GstType } from '@prisma/client';

// POST /api/opportunities/[id]/convert-to-customer - Create a customer from an opportunity's lead data
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
    const opportunityId = parseInt(id);

    if (isNaN(opportunityId)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID' },
        { status: 400 }
      );
    }

    // Fetch opportunity and verify it belongs to this organization
    const opportunity = await prisma.opportunities.findFirst({
      where: { id: opportunityId, organizationId: session.currentOrg.id },
    });

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }

    // Validate opportunity status is WON
    if (opportunity.status !== 'WON') {
      return NextResponse.json(
        {
          error: `Only WON opportunities can be converted to customers. Current status: ${opportunity.status}`,
        },
        { status: 400 }
      );
    }

    // Check if a customer is already linked
    if (opportunity.customerId) {
      return NextResponse.json(
        { error: 'This opportunity already has a customer linked' },
        { status: 400 }
      );
    }

    // Fetch the lead associated with this opportunity
    const lead = await prisma.leads.findUnique({
      where: { id: opportunity.leadId },
    });

    if (!lead) {
      return NextResponse.json(
        { error: 'Associated lead not found' },
        { status: 404 }
      );
    }

    // Map lead gstType string to GstType enum (or null)
    const validGstTypes: Record<string, GstType> = {
      REGISTERED: GstType.REGISTERED,
      UNREGISTERED: GstType.UNREGISTERED,
      COMPOSITION: GstType.COMPOSITION,
      SEZ: GstType.SEZ,
      EXPORT: GstType.EXPORT,
    };
    const mappedGstType = lead.gstType ? validGstTypes[lead.gstType] || null : null;

    // Use a transaction to create customer and update opportunity atomically
    const customer = await prisma.$transaction(async (tx) => {
      // Create customer from lead fields
      const newCustomer = await tx.customers.create({
        data: {
          leadId: lead.id,
          name: lead.company || lead.name,
          displayName: lead.company || lead.name,
          email: lead.email,
          phone: lead.phone,
          contactPerson: lead.name,
          billingAddress: lead.billingAddress,
          shippingAddress: lead.shippingAddress,
          city: lead.city,
          state: lead.state,
          country: lead.country || 'India',
          pincode: lead.pincode,
          gstNumber: lead.gstNumber,
          gstType: mappedGstType,
        },
      });

      // Update opportunity with the new customer ID
      await tx.opportunities.update({
        where: { id: opportunityId },
        data: { customerId: newCustomer.id },
      });

      return newCustomer;
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('Error converting opportunity to customer:', error);
    return NextResponse.json(
      { error: 'Failed to convert opportunity to customer' },
      { status: 500 }
    );
  }
}
