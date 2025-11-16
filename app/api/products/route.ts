import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const category = searchParams.get('category');

    const where: any = {};
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }
    if (category) {
      where.category = category;
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.sku || !body.name || !body.basePrice || !body.gstRate) {
      return NextResponse.json(
        { error: 'Missing required fields: SKU, name, basePrice, gstRate' },
        { status: 400 }
      );
    }

    // Check if SKU already exists
    const existing = await prisma.product.findUnique({
      where: { sku: body.sku }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A product with this SKU already exists' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
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

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
