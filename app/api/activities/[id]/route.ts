import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/activities/[id] - Get single activity
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

    const activityId = parseInt(params.id);

    if (isNaN(activityId)) {
      return NextResponse.json(
        { error: 'Invalid activity ID' },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.findUnique({
      where: { id: activityId },
      include: {
        lead: true,
        opportunity: {
          include: {
            products: {
              include: {
                product: true,
              },
            },
          },
        },
      },
    });

    if (!activity) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(activity);
  } catch (error) {
    console.error('Error fetching activity:', error);
    return NextResponse.json(
      { error: 'Failed to fetch activity' },
      { status: 500 }
    );
  }
}

// PUT /api/activities/[id] - Update activity
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

    const activityId = parseInt(params.id);

    if (isNaN(activityId)) {
      return NextResponse.json(
        { error: 'Invalid activity ID' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const {
      type,
      subject,
      description,
      status,
      scheduledFor,
      duration,
      location,
      attendees,
      outcome,
      assignedTo,
    } = body;

    // Check if activity exists
    const existingActivity = await prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!existingActivity) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    // Update activity
    const activity = await prisma.activity.update({
      where: { id: activityId },
      data: {
        ...(type !== undefined && { type }),
        ...(subject !== undefined && { subject }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
        ...(scheduledFor !== undefined && {
          scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        }),
        ...(duration !== undefined && { duration }),
        ...(location !== undefined && { location }),
        ...(attendees !== undefined && { attendees }),
        ...(outcome !== undefined && { outcome }),
        ...(assignedTo !== undefined && { assignedTo }),
        // Track completion date if status changes to COMPLETED
        ...(status === 'COMPLETED' &&
          existingActivity.status !== 'COMPLETED' && {
            completedAt: new Date(),
          }),
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

    return NextResponse.json(activity);
  } catch (error: any) {
    console.error('Error updating activity:', error);
    return NextResponse.json(
      { error: 'Failed to update activity' },
      { status: 500 }
    );
  }
}

// DELETE /api/activities/[id] - Delete activity
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

    const activityId = parseInt(params.id);

    if (isNaN(activityId)) {
      return NextResponse.json(
        { error: 'Invalid activity ID' },
        { status: 400 }
      );
    }

    // Check if activity exists
    const existingActivity = await prisma.activity.findUnique({
      where: { id: activityId },
    });

    if (!existingActivity) {
      return NextResponse.json(
        { error: 'Activity not found' },
        { status: 404 }
      );
    }

    // Delete activity
    await prisma.activity.delete({
      where: { id: activityId },
    });

    return NextResponse.json({
      message: 'Activity deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting activity:', error);
    return NextResponse.json(
      { error: 'Failed to delete activity' },
      { status: 500 }
    );
  }
}
