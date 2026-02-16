import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const isActive = searchParams.get('isActive');

    const where: any = {};

    if (isActive !== null && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { displayName: { contains: search } },
        { customerCode: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
        { gstNumber: { contains: search } },
      ];
    }

    const customers = await prisma.customers.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error('Error fetching customers:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
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

    if (!body.name) {
      return NextResponse.json(
        { error: 'Customer name is required' },
        { status: 400 }
      );
    }

    const customer = await prisma.customers.create({
      data: {
        name: body.name,
        displayName: body.displayName || null,
        email: body.email || null,
        phone: body.phone || null,
        website: body.website || null,
        contactPerson: body.contactPerson || null,
        contactPhone: body.contactPhone || null,
        contactEmail: body.contactEmail || null,
        address: body.address || null,
        city: body.city || null,
        state: body.state || null,
        pincode: body.pincode || null,
        country: body.country || 'India',
        gstNumber: body.gstNumber || null,
        gstType: body.gstType || 'UNREGISTERED',
        panNumber: body.panNumber || null,
        paymentTerms: body.paymentTerms || null,
        creditLimit: body.creditLimit ? parseFloat(body.creditLimit) : null,
        creditDays: body.creditDays ? parseInt(body.creditDays) : 0,
        openingBalance: body.openingBalance ? parseFloat(body.openingBalance) : 0,
        currentBalance: body.openingBalance ? parseFloat(body.openingBalance) : 0,
        notes: body.notes || null,
        isActive: true,
      },
    });

    // Auto-generate customer code
    const code = `CUST-${String(customer.id).padStart(5, '0')}`;
    const updated = await prisma.customers.update({
      where: { id: customer.id },
      data: { customerCode: code },
    });

    return NextResponse.json(updated, { status: 201 });
  } catch (error: any) {
    console.error('Error creating customer:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A customer with this code already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
