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

    const { id } = await params;
    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) }
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

    const body = await request.json();
    const { id } = await params;
    const productId = parseInt(id);

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // If SKU is being changed, check if new SKU already exists
    if (body.sku && body.sku !== existing.sku) {
      const skuExists = await prisma.product.findUnique({
        where: { sku: body.sku }
      });

      if (skuExists) {
        return NextResponse.json(
          { error: 'A product with this SKU already exists' },
          { status: 400 }
        );
      }
    }

    const product = await prisma.product.update({
      where: { id: productId },
      data: {
        sku: body.sku,
        name: body.name,
        description: body.description || null,
        category: body.category || null,
        subCategory: body.subCategory || null,
        basePrice: body.basePrice,
        currency: body.currency || 'INR',
        hsnCode: body.hsnCode || null,
        gstRate: body.gstRate,
        unit: body.unit || 'Nos',
        isActive: body.isActive ?? true,
        stockQuantity: body.stockQuantity || 0,
        // Label-specific fields
        labelMaterial: body.labelMaterial || null,
        labelSize: body.labelSize || null,
        labelShape: body.labelShape || null,
        labelAdhesive: body.labelAdhesive || null,
        labelFinish: body.labelFinish || null,
        printMethod: body.printMethod || null,
        coreSize: body.coreSize || null,
        rollSize: body.rollSize || null,
        // Ribbon-specific fields
        ribbonType: body.ribbonType || null,
        ribbonWidth: body.ribbonWidth || null,
        ribbonLength: body.ribbonLength || null,
        ribbonColor: body.ribbonColor || null,
        // Printer-specific fields
        printerBrand: body.printerBrand || null,
        printerModel: body.printerModel || null,
        printerType: body.printerType || null,
        printTechnology: body.printTechnology || null,
        printResolution: body.printResolution || null,
        printSpeed: body.printSpeed || null,
        maxPrintWidth: body.maxPrintWidth || null,
        connectivity: body.connectivity || null,
        // Software/Service-specific fields
        licenseType: body.licenseType || null,
        licensePeriod: body.licensePeriod || null,
        maxUsers: body.maxUsers ? parseInt(body.maxUsers) : null,
        serviceType: body.serviceType || null,
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
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const productId = parseInt(params.id);

    // Check if product exists
    const existing = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!existing) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Check if product is used in any opportunities or invoices
    const [opportunityCount, invoiceCount] = await Promise.all([
      prisma.opportunityProduct.count({
        where: { productId }
      }),
      prisma.invoiceItem.count({
        where: { productId }
      })
    ]);

    if (opportunityCount > 0 || invoiceCount > 0) {
      return NextResponse.json(
        { error: 'Cannot delete product that is used in opportunities or invoices. Consider marking it as inactive instead.' },
        { status: 400 }
      );
    }

    await prisma.product.delete({
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
