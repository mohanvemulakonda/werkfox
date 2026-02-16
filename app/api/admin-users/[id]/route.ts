import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// GET /api/admin-users/[id] - Get single admin user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const user = await prisma.admin_users.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        department: true,
        designation: true,
        phone: true,
        isActive: true,
        canApproveInvoices: true,
        canCreateInvoices: true,
        canCreateLeads: true,
        canDeleteLeads: true,
        canEditLeads: true,
        canViewAllLeads: true,
        monthlyTarget: true,
        quarterlyTarget: true,
        managerId: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error('Error fetching admin user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin user' },
      { status: 500 }
    );
  }
}

// PUT /api/admin-users/[id] - Update admin user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can update users
    const currentUser = await prisma.admin_users.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Only Super Admins can update users' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    const body = await request.json();
    const {
      name,
      role,
      department,
      designation,
      phone,
      isActive,
      canApproveInvoices,
      canCreateInvoices,
      canCreateLeads,
      canDeleteLeads,
      canEditLeads,
      canViewAllLeads,
      monthlyTarget,
      quarterlyTarget,
      managerId,
      password, // Optional password update
    } = body;

    // Check if user exists
    const existingUser = await prisma.admin_users.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Build update data
    const updateData: any = {
      ...(name !== undefined && { name }),
      ...(role !== undefined && { role }),
      ...(department !== undefined && { department }),
      ...(designation !== undefined && { designation }),
      ...(phone !== undefined && { phone }),
      ...(isActive !== undefined && { isActive }),
      ...(canApproveInvoices !== undefined && { canApproveInvoices }),
      ...(canCreateInvoices !== undefined && { canCreateInvoices }),
      ...(canCreateLeads !== undefined && { canCreateLeads }),
      ...(canDeleteLeads !== undefined && { canDeleteLeads }),
      ...(canEditLeads !== undefined && { canEditLeads }),
      ...(canViewAllLeads !== undefined && { canViewAllLeads }),
      ...(monthlyTarget !== undefined && {
        monthlyTarget: monthlyTarget
          ? parseFloat(monthlyTarget)
          : null,
      }),
      ...(quarterlyTarget !== undefined && {
        quarterlyTarget: quarterlyTarget
          ? parseFloat(quarterlyTarget)
          : null,
      }),
      ...(managerId !== undefined && {
        managerId: managerId ? parseInt(managerId) : null,
      }),
    };

    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    // Update user
    const user = await prisma.admin_users.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        department: true,
        designation: true,
        phone: true,
        isActive: true,
        canApproveInvoices: true,
        canCreateInvoices: true,
        canCreateLeads: true,
        canDeleteLeads: true,
        canEditLeads: true,
        canViewAllLeads: true,
        monthlyTarget: true,
        quarterlyTarget: true,
        managerId: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user);
  } catch (error: any) {
    console.error('Error updating admin user:', error);
    return NextResponse.json(
      { error: 'Failed to update admin user' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin-users/[id] - Delete admin user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can delete users
    const currentUser = await prisma.admin_users.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Only Super Admins can delete users' },
        { status: 403 }
      );
    }

    const { id } = await params;
    const userId = parseInt(id);

    if (isNaN(userId)) {
      return NextResponse.json({ error: 'Invalid user ID' }, { status: 400 });
    }

    // Prevent self-deletion
    if (userId === currentUser.id) {
      return NextResponse.json(
        { error: 'You cannot delete your own account' },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await prisma.admin_users.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete user
    await prisma.admin_users.delete({
      where: { id: userId },
    });

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting admin user:', error);
    return NextResponse.json(
      { error: 'Failed to delete admin user' },
      { status: 500 }
    );
  }
}
