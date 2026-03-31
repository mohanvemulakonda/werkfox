import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const { id } = await params;
    const plan = await prisma.cutting_plans.findFirst({
      where: { id: parseInt(id), organizationId: session.currentOrg.id },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Cutting plan not found' }, { status: 404 });
    }

    return NextResponse.json(plan);
  } catch (error: any) {
    console.error('Error fetching cutting plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cutting plan' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const { id } = await params;

    const plan = await prisma.cutting_plans.findFirst({
      where: { id: parseInt(id), organizationId: session.currentOrg.id },
    });

    if (!plan) {
      return NextResponse.json({ error: 'Cutting plan not found' }, { status: 404 });
    }

    await prisma.cutting_plans.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Cutting plan deleted' });
  } catch (error: any) {
    console.error('Error deleting cutting plan:', error);
    return NextResponse.json(
      { error: 'Failed to delete cutting plan' },
      { status: 500 }
    );
  }
}
