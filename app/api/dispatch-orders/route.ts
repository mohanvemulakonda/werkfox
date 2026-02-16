import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// GET /api/dispatch-orders - List all dispatch orders with optional filters
export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');

    const where: any = {};

    if (status) {
      where.status = status;
    }

    const orders = await prisma.dispatch_orders.findMany({
      where,
      include: {
        salesOrder: { select: { soNumber: true } },
        customer: { select: { name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching dispatch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dispatch orders' },
      { status: 500 }
    );
  }
}

// POST /api/dispatch-orders - Create a new dispatch order
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      salesOrderId,
      customerId,
      items,
      shippingMethod,
      carrierName,
      trackingNumber,
      vehicleNumber,
      driverName,
      driverPhone,
      shippingAddress,
      shippingCity,
      shippingState,
      shippingPincode,
      shippingCountry,
      contactName,
      contactPhone,
      estimatedWeight,
      numberOfPackages,
      shippingCost,
      dispatchDate,
      estimatedDelivery,
      locationId,
      notes,
    } = body;

    // Validate required fields
    if (!salesOrderId || !customerId || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'salesOrderId, customerId, and at least one item are required' },
        { status: 400 }
      );
    }

    // Auto-generate dispatch number
    const dispatchNumber = await generateDocumentNumber('DC');

    // Build items data
    const itemsData = items.map((item: any) => ({
      productId: item.productId,
      productName: item.productName,
      orderedQuantity: item.orderedQuantity || 0,
      dispatchedQuantity: item.dispatchedQuantity || 0,
      batchNumber: item.batchNumber || null,
      serialNumbers: item.serialNumbers || null,
    }));

    const dispatchOrder = await prisma.dispatch_orders.create({
      data: {
        dispatchNumber,
        salesOrderId: parseInt(salesOrderId),
        customerId: parseInt(customerId),
        status: 'PENDING',
        shippingMethod: shippingMethod || null,
        carrierName: carrierName || null,
        trackingNumber: trackingNumber || null,
        vehicleNumber: vehicleNumber || null,
        driverName: driverName || null,
        driverPhone: driverPhone || null,
        shippingAddress: shippingAddress || null,
        shippingCity: shippingCity || null,
        shippingState: shippingState || null,
        shippingPincode: shippingPincode || null,
        shippingCountry: shippingCountry || 'India',
        contactName: contactName || null,
        contactPhone: contactPhone || null,
        estimatedWeight: estimatedWeight ? parseFloat(estimatedWeight) : null,
        numberOfPackages: numberOfPackages ? parseInt(numberOfPackages) : 1,
        shippingCost: shippingCost ? parseFloat(shippingCost) : 0,
        dispatchDate: dispatchDate ? new Date(dispatchDate) : null,
        estimatedDelivery: estimatedDelivery ? new Date(estimatedDelivery) : null,
        locationId: locationId ? parseInt(locationId) : null,
        notes: notes || null,
        items: {
          create: itemsData,
        },
      },
      include: {
        salesOrder: { select: { soNumber: true } },
        customer: { select: { name: true } },
        items: true,
      },
    });

    return NextResponse.json(dispatchOrder, { status: 201 });
  } catch (error: any) {
    console.error('Error creating dispatch order:', error);

    if (error.code === 'P2002') {
      return NextResponse.json(
        { error: 'A dispatch order with this number already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to create dispatch order' },
      { status: 500 }
    );
  }
}
