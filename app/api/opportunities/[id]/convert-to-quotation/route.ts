import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { generateDocumentNumber } from '@/lib/number-generator';

// POST /api/opportunities/[id]/convert-to-quotation - Create a quotation from an opportunity
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Check authentication
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 403 });
    }

    const { id } = await params;
    const opportunityId = parseInt(id);

    if (isNaN(opportunityId)) {
      return NextResponse.json(
        { error: 'Invalid opportunity ID' },
        { status: 400 }
      );
    }

    // Fetch opportunity with products (including product relation for name, sku, taxRate)
    const opportunity = await prisma.opportunities.findFirst({
      where: { id: opportunityId, organizationId: session.currentOrg.id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!opportunity) {
      return NextResponse.json(
        { error: 'Opportunity not found' },
        { status: 404 }
      );
    }

    // Validate that a customer has been linked to this opportunity
    if (!opportunity.customerId) {
      return NextResponse.json(
        {
          error:
            'This opportunity does not have a customer linked. Please convert to customer first.',
        },
        { status: 400 }
      );
    }

    // Fetch customer details
    const customer = await prisma.customers.findUnique({
      where: { id: opportunity.customerId },
    });

    if (!customer) {
      return NextResponse.json(
        { error: 'Linked customer not found' },
        { status: 404 }
      );
    }

    // Build quotation items from opportunity products
    const quotationItems = opportunity.products.map((op) => {
      const quantity = Number(op.quantity);
      const unitPrice = Number(op.unitPrice);
      const discount = Number(op.discount);
      const taxRate = op.product ? Number(op.product.gstRate) : 0;

      const lineSubtotal = quantity * unitPrice - discount;
      const lineTax = lineSubtotal * (taxRate / 100);
      const lineTotal = lineSubtotal + lineTax;

      return {
        productId: op.productId,
        productName: op.product?.name || 'Unknown Product',
        productSku: op.product?.sku || '',
        quantity,
        unitPrice,
        taxRate,
        discount,
        total: parseFloat(lineTotal.toFixed(2)),
      };
    });

    // Calculate totals
    const subtotal = quotationItems.reduce((sum, item) => {
      const lineSubtotal = item.quantity * item.unitPrice - item.discount;
      return sum + lineSubtotal;
    }, 0);

    const taxAmount = quotationItems.reduce((sum, item) => {
      const lineSubtotal = item.quantity * item.unitPrice - item.discount;
      return sum + lineSubtotal * (item.taxRate / 100);
    }, 0);

    const total = subtotal + taxAmount;

    // Use a transaction to create quotation atomically
    const quotation = await prisma.$transaction(async (tx) => {
      // Generate quote number
      const quoteNumber = await generateDocumentNumber('QT');

      // Create quotation with customer fields and items from opportunity products
      const newQuotation = await tx.quotations.create({
        data: {
          quoteNumber,
          customerId: customer.id,
          opportunityId: opportunity.id,
          customerName: customer.name,
          customerEmail: customer.email,
          customerPhone: customer.phone,
          customerGst: customer.gstNumber,
          customerState: customer.state,
          billingAddress: customer.billingAddress,
          shippingAddress: customer.shippingAddress,
          quoteDate: new Date(),
          subtotal: parseFloat(subtotal.toFixed(2)),
          taxAmount: parseFloat(taxAmount.toFixed(2)),
          discount: 0,
          total: parseFloat(total.toFixed(2)),
          currency: opportunity.currency || 'INR',
          status: 'DRAFT',
          items: {
            create: quotationItems.map((item) => ({
              productId: item.productId,
              productName: item.productName,
              productSku: item.productSku,
              quantity: item.quantity,
              unitPrice: item.unitPrice,
              taxRate: item.taxRate,
              discount: item.discount,
              total: item.total,
            })),
          },
        },
        include: {
          customer: { select: { name: true, customerCode: true } },
          items: true,
        },
      });

      return newQuotation;
    });

    return NextResponse.json(quotation, { status: 201 });
  } catch (error) {
    console.error('Error converting opportunity to quotation:', error);
    return NextResponse.json(
      { error: 'Failed to convert opportunity to quotation' },
      { status: 500 }
    );
  }
}
