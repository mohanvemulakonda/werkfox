import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/vendors/[id] - Get single vendor
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
    const vendorId = parseInt(id);

    if (isNaN(vendorId)) {
      return NextResponse.json({ error: 'Invalid vendor ID' }, { status: 400 });
    }

    const vendor = await prisma.vendors.findFirst({
      where: { id: vendorId, organizationId: session.currentOrg.id },
      include: {
        purchaseOrders: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            poNumber: true,
            status: true,
            total: true,
            orderDate: true,
          },
        },
      },
    });

    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    return NextResponse.json(vendor);
  } catch (error) {
    console.error('Error fetching vendor:', error);
    return NextResponse.json(
      { error: 'Failed to fetch vendor' },
      { status: 500 }
    );
  }
}

// PUT /api/vendors/[id] - Update vendor
export async function PUT(
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
    const vendorId = parseInt(id);

    if (isNaN(vendorId)) {
      return NextResponse.json({ error: 'Invalid vendor ID' }, { status: 400 });
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
      currentBalance,
      notes,
      isActive,
    } = body;

    // Check if vendor exists and belongs to org
    const existingVendor = await prisma.vendors.findFirst({
      where: { id: vendorId, organizationId: session.currentOrg.id },
    });

    if (!existingVendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    // Update vendor
    const vendor = await prisma.vendors.update({
      where: { id: vendorId },
      data: {
        ...(code !== undefined && { code }),
        ...(name !== undefined && { name }),
        ...(displayName !== undefined && { displayName }),
        ...(email !== undefined && { email }),
        ...(phone !== undefined && { phone }),
        ...(website !== undefined && { website }),
        ...(contactPerson !== undefined && { contactPerson }),
        ...(contactPhone !== undefined && { contactPhone }),
        ...(contactEmail !== undefined && { contactEmail }),
        ...(address !== undefined && { address }),
        ...(city !== undefined && { city }),
        ...(state !== undefined && { state }),
        ...(pincode !== undefined && { pincode }),
        ...(country !== undefined && { country }),
        ...(gstNumber !== undefined && { gstNumber }),
        ...(gstType !== undefined && { gstType }),
        ...(panNumber !== undefined && { panNumber }),
        ...(paymentTerms !== undefined && { paymentTerms }),
        ...(creditLimit !== undefined && { creditLimit: creditLimit ? parseFloat(creditLimit) : null }),
        ...(creditDays !== undefined && { creditDays: creditDays ? parseInt(creditDays) : 0 }),
        ...(openingBalance !== undefined && { openingBalance: openingBalance ? parseFloat(openingBalance) : 0 }),
        ...(currentBalance !== undefined && { currentBalance: currentBalance ? parseFloat(currentBalance) : 0 }),
        ...(notes !== undefined && { notes }),
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        purchaseOrders: {
          orderBy: { createdAt: 'desc' },
          take: 5,
          select: {
            id: true,
            poNumber: true,
            status: true,
            total: true,
            orderDate: true,
          },
        },
      },
    });

    return NextResponse.json(vendor);
  } catch (error: any) {
    console.error('Error updating vendor:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A vendor with this code already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to update vendor' },
      { status: 500 }
    );
  }
}

// DELETE /api/vendors/[id] - Soft delete vendor (set isActive=false)
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
    const vendorId = parseInt(id);

    if (isNaN(vendorId)) {
      return NextResponse.json({ error: 'Invalid vendor ID' }, { status: 400 });
    }

    // Check if vendor exists and belongs to org
    const existingVendor = await prisma.vendors.findFirst({
      where: { id: vendorId, organizationId: session.currentOrg.id },
    });

    if (!existingVendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }

    // Check for active purchase orders (not CANCELLED or RECEIVED)
    const activePOs = await prisma.purchase_orders.count({
      where: {
        vendorId,
        status: {
          notIn: ['CANCELLED', 'RECEIVED'],
        },
      },
    });

    if (activePOs > 0) {
      return NextResponse.json(
        { error: `Cannot deactivate vendor with ${activePOs} active purchase order(s). Please cancel or complete them first.` },
        { status: 400 }
      );
    }

    // Soft delete: set isActive to false
    await prisma.vendors.update({
      where: { id: vendorId },
      data: { isActive: false },
    });

    return NextResponse.json({ message: 'Vendor deactivated successfully' });
  } catch (error) {
    console.error('Error deactivating vendor:', error);
    return NextResponse.json(
      { error: 'Failed to deactivate vendor' },
      { status: 500 }
    );
  }
}
