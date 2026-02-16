import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const locations = await prisma.locations.findMany({
      where: { isActive: true },
      orderBy: [{ isDefault: 'desc' }, { name: 'asc' }],
      select: {
        id: true,
        code: true,
        name: true,
        type: true,
        city: true,
        state: true,
        isDefault: true,
      },
    });

    return NextResponse.json(locations);
  } catch (error: any) {
    console.error('Error fetching locations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch locations' },
      { status: 500 }
    );
  }
}
