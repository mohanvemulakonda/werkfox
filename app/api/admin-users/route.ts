import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import bcrypt from 'bcryptjs';

// GET /api/admin-users - List all admin users
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN and ADMIN can view users
    const currentUser = await prisma.adminUser.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser || !['SUPER_ADMIN', 'ADMIN'].includes(currentUser.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const searchParams = request.nextUrl.searchParams;
    const role = searchParams.get('role');
    const isActive = searchParams.get('isActive');
    const search = searchParams.get('search');

    // Build filter conditions
    const where: any = {};

    if (role) {
      where.role = role;
    }

    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { department: { contains: search } },
      ];
    }

    // Get admin users (exclude password from response)
    const users = await prisma.adminUser.findMany({
      where,
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
        monthlySalesTarget: true,
        quarterlySalesTarget: true,
        managerId: true,
        lastLogin: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ users, total: users.length });
  } catch (error) {
    console.error('Error fetching admin users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin users' },
      { status: 500 }
    );
  }
}

// POST /api/admin-users - Create new admin user
export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only SUPER_ADMIN can create users
    const currentUser = await prisma.adminUser.findUnique({
      where: { email: session.user.email },
    });

    if (!currentUser || currentUser.role !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Only Super Admins can create users' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const {
      email,
      password,
      name,
      role,
      department,
      designation,
      phone,
      canApproveInvoices,
      canCreateInvoices,
      canCreateLeads,
      canDeleteLeads,
      canEditLeads,
      canViewAllLeads,
      monthlySalesTarget,
      quarterlySalesTarget,
      managerId,
    } = body;

    // Validate required fields
    if (!email || !password || !name || !role) {
      return NextResponse.json(
        { error: 'Email, password, name, and role are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.adminUser.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.adminUser.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role,
        department: department || null,
        designation: designation || null,
        phone: phone || null,
        canApproveInvoices: canApproveInvoices || false,
        canCreateInvoices: canCreateInvoices || false,
        canCreateLeads: canCreateLeads || false,
        canDeleteLeads: canDeleteLeads || false,
        canEditLeads: canEditLeads || false,
        canViewAllLeads: canViewAllLeads || false,
        monthlySalesTarget: monthlySalesTarget
          ? parseFloat(monthlySalesTarget)
          : null,
        quarterlySalesTarget: quarterlySalesTarget
          ? parseFloat(quarterlySalesTarget)
          : null,
        managerId: managerId ? parseInt(managerId) : null,
        isActive: true,
      },
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
        createdAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error: any) {
    console.error('Error creating admin user:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
