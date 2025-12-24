import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET /api/customers/[id]/contacts - Fetch all contacts for a customer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);

    if (isNaN(customerId)) {
      return NextResponse.json(
        { error: 'Invalid customer ID' },
        { status: 400 }
      );
    }

    // Get contacts for this customer
    const contacts = await prisma.customerContact.findMany({
      where: {
        customerId,
        isActive: true,
      },
      orderBy: [
        { isPrimary: 'desc' },
        { name: 'asc' },
      ],
    });

    // Also get the default contact from Customer record if no contacts exist
    if (contacts.length === 0) {
      const customer = await prisma.customer.findUnique({
        where: { id: customerId },
        select: {
          contactPerson: true,
          email: true,
          phone: true,
        },
      });

      if (customer?.contactPerson) {
        // Return the default contact as a virtual contact
        return NextResponse.json([
          {
            id: 0, // Virtual ID for default contact
            customerId,
            name: customer.contactPerson,
            email: customer.email,
            phone: customer.phone,
            designation: null,
            department: null,
            isPrimary: true,
            isBilling: true,
            isShipping: true,
            isDefault: true, // Mark as default contact from Customer record
          },
        ]);
      }
    }

    return NextResponse.json(contacts);
  } catch (error) {
    console.error('Error fetching customer contacts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch customer contacts' },
      { status: 500 }
    );
  }
}

// POST /api/customers/[id]/contacts - Add a new contact for a customer
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const customerId = parseInt(id);
    const body = await request.json();

    if (isNaN(customerId)) {
      return NextResponse.json(
        { error: 'Invalid customer ID' },
        { status: 400 }
      );
    }

    if (!body.name) {
      return NextResponse.json(
        { error: 'Contact name is required' },
        { status: 400 }
      );
    }

    // If this is being set as primary, unset other primary contacts
    if (body.isPrimary) {
      await prisma.customerContact.updateMany({
        where: { customerId, isPrimary: true },
        data: { isPrimary: false },
      });
    }

    const contact = await prisma.customerContact.create({
      data: {
        customerId,
        name: body.name,
        email: body.email || null,
        phone: body.phone || null,
        designation: body.designation || null,
        department: body.department || null,
        isPrimary: body.isPrimary || false,
        isBilling: body.isBilling ?? true,
        isShipping: body.isShipping ?? true,
        notes: body.notes || null,
      },
    });

    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    console.error('Error creating customer contact:', error);
    return NextResponse.json(
      { error: 'Failed to create customer contact' },
      { status: 500 }
    );
  }
}
