import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const locationId = parseInt(id);
    if (isNaN(locationId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const body = await request.json();
    const { code, name, type, address, city, state, pincode, phone, email, isDefault } = body;

    if (code) {
      const existing = await prisma.locations.findFirst({
        where: { code, id: { not: locationId } },
      });
      if (existing) {
        return NextResponse.json({ error: 'Location code already exists' }, { status: 409 });
      }
    }

    if (isDefault) {
      await prisma.locations.updateMany({ where: { isDefault: true, id: { not: locationId } }, data: { isDefault: false } });
    }

    const location = await prisma.locations.update({
      where: { id: locationId },
      data: {
        ...(code && { code }),
        ...(name && { name }),
        ...(type && { type }),
        address: address ?? undefined,
        city: city ?? undefined,
        state: state ?? undefined,
        pincode: pincode ?? undefined,
        phone: phone ?? undefined,
        email: email ?? undefined,
        ...(typeof isDefault === 'boolean' && { isDefault }),
      },
    });

    return NextResponse.json(location);
  } catch (error: any) {
    console.error('Error updating location:', error);
    return NextResponse.json({ error: 'Failed to update location' }, { status: 500 });
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

    const { id } = await params;
    const locationId = parseInt(id);
    if (isNaN(locationId)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    await prisma.locations.update({
      where: { id: locationId },
      data: { isActive: false },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error deleting location:', error);
    return NextResponse.json({ error: 'Failed to delete location' }, { status: 500 });
  }
}
