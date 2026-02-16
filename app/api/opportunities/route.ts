import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/opportunities - List all opportunities with filtering
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const stage = searchParams.get('stage');
    const status = searchParams.get('status');
    const assignedTo = searchParams.get('assignedTo');
    const leadId = searchParams.get('leadId');
    const search = searchParams.get('search');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build filter conditions — always scoped to organization
    const where: any = { organizationId: session.currentOrg.id };

    if (stage) {
      where.stage = stage;
    }

    if (status) {
      where.status = status;
    }

    if (assignedTo) {
      where.assignedTo = assignedTo;
    }

    if (leadId) {
      where.leadId = parseInt(leadId);
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { description: { contains: search } },
      ];
    }

    // Get opportunities with pagination
    const [opportunities, total] = await Promise.all([
      prisma.opportunities.findMany({
        where,
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
          activities: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.opportunities.count({ where }),
    ]);

    return NextResponse.json({
      opportunities,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching opportunities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch opportunities' },
      { status: 500 }
    );
  }
}

// POST /api/opportunities - Create new opportunity
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 403 });
    }

    const body = await request.json();
    const {
      name,
      description,
      leadId,
      value,
      currency,
      probability,
      expectedCloseDate,
      stage,
      status,
      assignedTo,
      notes,
      products, // Array of { productId, quantity, unitPrice, discount }
    } = body;

    // Validate required fields
    if (!name || !leadId || !value) {
      return NextResponse.json(
        { error: 'Name, lead ID, and value are required' },
        { status: 400 }
      );
    }

    // Check if lead exists and belongs to this org
    const lead = await prisma.leads.findFirst({
      where: { id: parseInt(leadId), organizationId: session.currentOrg.id },
    });

    if (!lead) {
      return NextResponse.json({ error: 'Lead not found' }, { status: 404 });
    }

    // Create opportunity with products
    const opportunity = await prisma.opportunities.create({
      data: {
        organizationId: session.currentOrg.id,
        name,
        description,
        leadId: parseInt(leadId),
        value: parseFloat(value),
        currency: currency || 'INR',
        probability: probability || 0,
        expectedCloseDate: expectedCloseDate
          ? new Date(expectedCloseDate)
          : null,
        stage: stage || 'QUALIFICATION',
        status: status || 'OPEN',
        assignedTo,
        notes,
        ...(products &&
          products.length > 0 && {
          products: {
            create: products.map((p: any) => ({
              productId: parseInt(p.productId),
              quantity: parseFloat(p.quantity),
              unitPrice: parseFloat(p.unitPrice),
              discount: parseFloat(p.discount || 0),
            })),
          },
        }),
      },
      include: {
        lead: true,
        products: {
          include: {
            product: true,
          },
        },
        activities: true,
      },
    });

    return NextResponse.json(opportunity, { status: 201 });
  } catch (error: any) {
    console.error('Error creating opportunity:', error);
    return NextResponse.json(
      { error: 'Failed to create opportunity' },
      { status: 500 }
    );
  }
}
