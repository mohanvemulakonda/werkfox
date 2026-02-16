import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// GET /api/grn/[id] - Get single GRN with all relations
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const grnId = parseInt(id);

    if (isNaN(grnId)) {
      return NextResponse.json({ error: 'Invalid GRN ID' }, { status: 400 });
    }

    const grn = await prisma.goods_receipt_notes.findUnique({
      where: { id: grnId },
      include: {
        purchaseOrder: {
          select: { poNumber: true, vendorName: true, status: true },
        },
        location: true,
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
      },
    });

    if (!grn) {
      return NextResponse.json({ error: 'GRN not found' }, { status: 404 });
    }

    return NextResponse.json(grn);
  } catch (error) {
    console.error('Error fetching GRN:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GRN' },
      { status: 500 }
    );
  }
}

// PATCH /api/grn/[id] - QC status transitions
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const grnId = parseInt(id);

    if (isNaN(grnId)) {
      return NextResponse.json({ error: 'Invalid GRN ID' }, { status: 400 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json(
        { error: 'Status is required' },
        { status: 400 }
      );
    }

    // Fetch current GRN
    const grn = await prisma.goods_receipt_notes.findUnique({
      where: { id: grnId },
      include: { items: true },
    });

    if (!grn) {
      return NextResponse.json({ error: 'GRN not found' }, { status: 404 });
    }

    // Validate status transitions
    const validTransitions: Record<string, string[]> = {
      PENDING: ['QC_PENDING'],
      QC_PENDING: ['QC_PASSED', 'QC_FAILED'],
      QC_PASSED: ['COMPLETED'],
    };

    const allowedNext = validTransitions[grn.status] || [];
    if (!allowedNext.includes(status)) {
      return NextResponse.json(
        {
          error: `Invalid transition: cannot move from ${grn.status} to ${status}. Allowed: ${allowedNext.join(', ') || 'none'}`,
        },
        { status: 400 }
      );
    }

    // Build update data
    const updateData: any = { status };

    // When completing, set acceptedQuantity = receivedQuantity for items that have not been set
    if (status === 'COMPLETED') {
      updateData.verifiedAt = new Date();

      // Update items: set acceptedQuantity to receivedQuantity where it has not been set
      for (const item of grn.items) {
        if (item.acceptedQuantity === 0 && item.receivedQuantity > 0) {
          await prisma.grn_items.update({
            where: { id: item.id },
            data: { acceptedQuantity: item.receivedQuantity },
          });
        }
      }
    }

    const updatedGrn = await prisma.goods_receipt_notes.update({
      where: { id: grnId },
      data: updateData,
      include: {
        purchaseOrder: {
          select: { poNumber: true, vendorName: true, status: true },
        },
        location: true,
        items: {
          include: {
            product: { select: { name: true, sku: true } },
          },
        },
      },
    });

    return NextResponse.json(updatedGrn);
  } catch (error: any) {
    console.error('Error updating GRN:', error);
    return NextResponse.json(
      { error: 'Failed to update GRN' },
      { status: 500 }
    );
  }
}
