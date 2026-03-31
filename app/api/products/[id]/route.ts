import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

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
    const product = await prisma.products.findFirst({
      where: { id: parseInt(id), organizationId: session.currentOrg.id }
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error fetching product:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

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

    const body = await request.json();
    const { id } = await params;
    const productId = parseInt(id);

    const existing = await prisma.products.findFirst({
      where: { id: productId, organizationId: session.currentOrg.id }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // If SKU is being changed, check uniqueness within org
    if (body.sku && body.sku !== existing.sku) {
      const skuExists = await prisma.products.findFirst({
        where: { sku: body.sku, organizationId: session.currentOrg.id }
      });
      if (skuExists) {
        return NextResponse.json(
          { error: 'A product with this SKU already exists' },
          { status: 400 }
        );
      }
    }

    const product = await prisma.products.update({
      where: { id: productId },
      data: {
        sku: body.sku,
        name: body.name,
        description: body.description || null,
        productType: body.productType || null,
        subType: body.subType || null,
        basePrice: parseFloat(body.basePrice),
        costPrice: body.costPrice ? parseFloat(body.costPrice) : null,
        mrp: body.mrp ? parseFloat(body.mrp) : null,
        currency: body.currency || 'INR',
        hsnCode: body.hsnCode || null,
        gstRate: parseFloat(body.gstRate),
        unit: body.unit || 'PCS',
        isActive: body.isActive ?? true,
        isTaxable: body.isTaxable ?? true,
        stockQuantity: parseInt(body.stockQuantity) || 0,
        reorderLevel: body.reorderLevel ? parseInt(body.reorderLevel) : null,
        specifications: body.specifications || null,
        imageUrl: body.imageUrl || null,
      }
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error('Error updating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to update product' },
      { status: 500 }
    );
  }
}

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
    const productId = parseInt(id);

    const existing = await prisma.products.findFirst({
      where: { id: productId, organizationId: session.currentOrg.id }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if product is used in any documents
    const [opportunityCount, invoiceCount] = await Promise.all([
      prisma.opportunity_products.count({ where: { productId } }),
      prisma.invoice_items.count({ where: { productId } })
    ]);

    if (opportunityCount > 0 || invoiceCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete product that is used in opportunities or invoices. Consider marking it as inactive instead.' },
        { status: 400 }
      );
    }

    await prisma.products.delete({
      where: { id: productId }
    });

    return NextResponse.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    console.error('Error deleting product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to delete product' },
      { status: 500 }
    );
  }
}
