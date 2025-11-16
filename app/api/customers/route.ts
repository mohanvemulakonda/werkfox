import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        isActive: true
      },
      orderBy: {
        createdAt: 'desc'
      },
      select: {
        id: true,
        companyName: true,
        displayName: true,
        contactPerson: true,
        email: true,
        phone: true,
        gstNumber: true,
        billingAddress: true,
        billingCity: true,
        billingState: true,
        billingPincode: true,
        shippingAddress: true,
        shippingCity: true,
        shippingState: true,
        shippingPincode: true
      }
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

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const customer = await prisma.customer.create({
      data: {
        companyName: body.companyName || null,
        displayName: body.displayName,
        contactPerson: body.contactPerson || null,
        email: body.email || null,
        phone: body.phone || null,
        gstNumber: body.gstNumber || null,
        billingAddress: body.billingAddress || null,
        billingCity: body.billingCity || null,
        billingState: body.billingState || null,
        billingPincode: body.billingPincode || null,
        shippingAddress: body.shippingAddress || body.billingAddress || null,
        shippingCity: body.shippingCity || body.billingCity || null,
        shippingState: body.shippingState || body.billingState || null,
        shippingPincode: body.shippingPincode || body.billingPincode || null,
        isActive: true,
        customerType: 'BUSINESS'
      }
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error('Error creating customer:', error);
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
