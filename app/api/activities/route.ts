import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/activities - List all activities with filtering
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type');
    const status = searchParams.get('status');
    const leadId = searchParams.get('leadId');
    const opportunityId = searchParams.get('opportunityId');
    const assignedTo = searchParams.get('assignedTo');
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    // Build filter conditions
    const where: any = {};

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (leadId) {
      where.leadId = parseInt(leadId);
    }

    if (opportunityId) {
      where.opportunityId = parseInt(opportunityId);
    }

    if (assignedTo) {
      where.assignedTo = assignedTo;
    }

    // Get activities with pagination
    const [activities, total] = await Promise.all([
      prisma.activity.findMany({
        where,
        include: {
          lead: {
            select: {
              id: true,
              name: true,
              email: true,
              company: true,
            },
          },
          opportunity: {
            select: {
              id: true,
              name: true,
              value: true,
              stage: true,
            },
          },
        },
        orderBy: { scheduledFor: 'asc' },
        take: limit,
        skip: offset,
      }),
      prisma.activity.count({ where }),
    ]);

    return NextResponse.json({
      activities,
      total,
      limit,
      offset,
    });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activities' },
      { status: 500 }
    );
  }
}

// POST /api/activities - Create new activity
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      type,
      subject,
      description,
      leadId,
      opportunityId,
      status,
      scheduledFor,
      duration,
      location,
      attendees,
      outcome,
      assignedTo,
    } = body;

    // Validate required fields
    if (!type || !subject) {
      return NextResponse.json(
        { error: 'Type and subject are required' },
        { status: 400 }
      );
    }

    // At least leadId or opportunityId must be provided
    if (!leadId && !opportunityId) {
      return NextResponse.json(
        { error: 'Either leadId or opportunityId is required' },
        { status: 400 }
      );
    }

    // Create activity
    const activity = await prisma.activity.create({
      data: {
        type,
        subject,
        description,
        leadId: leadId ? parseInt(leadId) : null,
        opportunityId: opportunityId ? parseInt(opportunityId) : null,
        status: status || 'PENDING',
        scheduledFor: scheduledFor ? new Date(scheduledFor) : new Date(),
        duration,
        location,
        attendees,
        outcome,
        assignedTo,
      },
      include: {
        lead: {
          select: {
            id: true,
            name: true,
            email: true,
            company: true,
          },
        },
        opportunity: {
          select: {
            id: true,
            name: true,
            value: true,
            stage: true,
          },
        },
      },
    });

    return NextResponse.json(activity, { status: 201 });
  } catch (error: any) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Failed to create activity' },
      { status: 500 }
    );
  }
}
