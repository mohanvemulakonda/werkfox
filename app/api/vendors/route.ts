import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/vendors - List all vendors with filtering
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

    if (isActive !== null && isActive !== undefined && isActive !== '') {
      where.isActive = isActive === 'true';
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { displayName: { contains: search } },
        { email: { contains: search } },
        { code: { contains: search } },
        { contactPerson: { contains: search } },
        { phone: { contains: search } },
        { city: { contains: search } },
        { gstNumber: { contains: search } },
      ];
    }

    const [vendors, total] = await Promise.all([
      prisma.vendors.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.vendors.count({ where }),
    ]);

    return NextResponse.json({ vendors, total });
  } catch (error) {
    console.error('Error fetching vendors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendors' },
      { status: 500 }
    );
  }
}

// POST /api/vendors - Create new vendor
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      code,
      name,
      displayName,
      email,
      phone,
      website,
      contactPerson,
      contactPhone,
      contactEmail,
      address,
      city,
      state,
      pincode,
      country,
      gstNumber,
      gstType,
      panNumber,
      paymentTerms,
      creditLimit,
      creditDays,
      openingBalance,
      notes,
    } = body;

    // Validate required fields
    if (!name) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    // Create vendor
    const vendor = await prisma.vendors.create({
      data: {
        name,
        displayName: displayName || null,
        email: email || null,
        phone: phone || null,
        website: website || null,
        contactPerson: contactPerson || null,
        contactPhone: contactPhone || null,
        contactEmail: contactEmail || null,
        address: address || null,
        city: city || null,
        state: state || null,
        pincode: pincode || null,
        country: country || 'India',
        gstNumber: gstNumber || null,
        gstType: gstType || 'UNREGISTERED',
        panNumber: panNumber || null,
        paymentTerms: paymentTerms || null,
        creditLimit: creditLimit ? parseFloat(creditLimit) : null,
        creditDays: creditDays ? parseInt(creditDays) : 0,
        openingBalance: openingBalance ? parseFloat(openingBalance) : 0,
        currentBalance: openingBalance ? parseFloat(openingBalance) : 0,
        notes: notes || null,
      },
    });

    // Auto-generate code if not provided
    if (!code) {
      const vendorCode = `VND-${String(vendor.id).padStart(5, '0')}`;
      const updatedVendor = await prisma.vendors.update({
        where: { id: vendor.id },
        data: { code: vendorCode },
      });
      return NextResponse.json(updatedVendor, { status: 201 });
    } else {
      const updatedVendor = await prisma.vendors.update({
        where: { id: vendor.id },
        data: { code },
      });
      return NextResponse.json(updatedVendor, { status: 201 });
    }
  } catch (error: any) {
    console.error('Error creating vendor:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A vendor with this code already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create vendor' },
      { status: 500 }
    );
  }
}
