import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const plans = await prisma.cutting_plans.findMany({
      where: { organizationId: session.currentOrg.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(plans);
  } catch (error: any) {
    console.error('Error fetching cutting plans:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cutting plans' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const body = await request.json();
    const { name, material, sheetWidth, sheetHeight, kerf, pieces, result, utilization, sheetsUsed } = body;

    if (!name || !pieces) {
      return NextResponse.json({ error: 'Name and pieces are required' }, { status: 400 });
    }

    const plan = await prisma.cutting_plans.create({
      data: {
        organizationId: session.currentOrg.id,
        name,
        material: material || null,
        sheetWidth: sheetWidth || 2440,
        sheetHeight: sheetHeight || 1220,
        kerf: kerf || 4,
        pieces,
        result: result || null,
        utilization: utilization || null,
        sheetsUsed: sheetsUsed || null,
      },
    });

    return NextResponse.json(plan, { status: 201 });
  } catch (error: any) {
    console.error('Error creating cutting plan:', error);
    return NextResponse.json(
      { error: 'Failed to create cutting plan' },
      { status: 500 }
    );
  }
}
