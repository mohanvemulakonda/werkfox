import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { PackageType } from '@prisma/client';

/**
 * GET /api/admin/organizations/settings
 * Fetch current organization settings
 */
export async function GET() {
  try {
    const session = await auth();

    if (!session?.currentOrg) {
      return NextResponse.json(
        { error: 'Unauthorized - No organization selected' },
        { status: 401 }
      );
    }

    const organization = await prisma.organization.findUnique({
      where: { id: session.currentOrg.id },
      select: {
        id: true,
        name: true,
        slug: true,
        packageType: true,
        billingInfo: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!organization) {
      return NextResponse.json(
        { error: 'Organization not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      organization,
      userRole: session.currentOrg.role,
    });
  } catch (e) {
    console.error('Error fetching organization settings:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

/**
 * PATCH /api/admin/organizations/settings
 * Update organization settings (OWNER/ADMIN only)
 */
export async function PATCH(req: Request) {
  try {
    const session = await auth();

    if (!session?.currentOrg) {
      return NextResponse.json(
        { error: 'Unauthorized - No organization selected' },
        { status: 401 }
      );
    }

    // Only OWNER and ADMIN can update settings
    const allowedRoles = ['OWNER', 'ADMIN'];
    if (!allowedRoles.includes(session.currentOrg.role)) {
      return NextResponse.json(
        { error: 'Forbidden - Only owners and admins can update settings' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { packageType, name, billingInfo } = body;

    // Build update data
    const updateData: {
      packageType?: PackageType;
      name?: string;
      billingInfo?: string;
    } = {};

    // Validate and set packageType if provided
    if (packageType !== undefined) {
      const validPackageTypes: PackageType[] = ['CRM_ONLY', 'ERP_ONLY', 'FULL_SUITE'];
      if (!validPackageTypes.includes(packageType)) {
        return NextResponse.json(
          { error: 'Invalid package type' },
          { status: 400 }
        );
      }
      updateData.packageType = packageType;
    }

    // Set name if provided
    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim().length === 0) {
        return NextResponse.json(
          { error: 'Name must be a non-empty string' },
          { status: 400 }
        );
      }
      updateData.name = name.trim();
    }

    // Set billingInfo if provided
    if (billingInfo !== undefined) {
      updateData.billingInfo = billingInfo;
    }

    // Check if there's anything to update
    if (Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { error: 'No valid fields to update' },
        { status: 400 }
      );
    }

    const updatedOrg = await prisma.organization.update({
      where: { id: session.currentOrg.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        slug: true,
        packageType: true,
        billingInfo: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      organization: updatedOrg,
      message: 'Settings updated successfully',
    });
  } catch (e) {
    console.error('Error updating organization settings:', e);
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}
