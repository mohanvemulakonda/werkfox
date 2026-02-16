import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/leads - List all leads with filtering
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

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { company: { contains: search } },
        { phone: { contains: search } },
      ];
    }

    // Get leads with pagination
    const [leads, total] = await Promise.all([
      prisma.leads.findMany({
        where,
        include: {
          activities: {
            orderBy: { createdAt: 'desc' },
            take: 5,
          },
          opportunities: {
            orderBy: { createdAt: 'desc' },
          },
        },
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.leads.count({ where }),
    ]);

    return NextResponse.json({
      leads,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leads' },
      { status: 500 }
    );
  }
}

// POST /api/leads - Create new lead
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
    } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Create lead scoped to organization
    const lead = await prisma.leads.create({
      data: {
        organizationId: session.currentOrg.id,
        name,
        email,
        phone,
        company,
        designation,
        billingAddress,
        shippingAddress,
        city,
        state,
        country: country || 'India',
        pincode,
        gstNumber,
        gstType: gstType || 'UNREGISTERED',
        source,
        industry,
        leadScore: leadScore || 0,
        stage: stage || 'NEW',
        status: status || 'ACTIVE',
        assignedTo,
        notes,
        nextFollowUp: nextFollowUp ? new Date(nextFollowUp) : null,
      },
      include: {
        activities: true,
        opportunities: true,
      },
    });

    return NextResponse.json(lead, { status: 201 });
  } catch (error: any) {
    console.error('Error creating lead:', error);

    // Handle unique constraint violation (duplicate email)
    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A lead with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create lead' },
      { status: 500 }
    );
  }
}
