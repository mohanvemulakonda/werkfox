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
        address: true,
        city: true,
        state: true,
        pincode: true,
        phone: true,
        email: true,
        isDefault: true,
        isActive: true,
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

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { code, name, type, address, city, state, pincode, phone, email, isDefault } = body;

    if (!code || !name) {
      return NextResponse.json({ error: 'Code and name are required' }, { status: 400 });
    }

    const existing = await prisma.locations.findUnique({ where: { code } });
    if (existing) {
      return NextResponse.json({ error: 'Location code already exists' }, { status: 409 });
    }

    if (isDefault) {
      await prisma.locations.updateMany({ where: { isDefault: true }, data: { isDefault: false } });
    }

    const location = await prisma.locations.create({
      data: { code, name, type: type || 'WAREHOUSE', address, city, state, pincode, phone, email, isDefault: isDefault || false },
    });

    return NextResponse.json(location, { status: 201 });
  } catch (error: any) {
    console.error('Error creating location:', error);
    return NextResponse.json({ error: 'Failed to create location' }, { status: 500 });
  }
}
