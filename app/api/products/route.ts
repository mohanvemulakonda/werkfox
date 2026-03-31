import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const { searchParams } = new URL(request.url);
    const isActive = searchParams.get('isActive');
    const productType = searchParams.get('productType');
    const search = searchParams.get('search');

    const where: any = { organizationId: session.currentOrg.id };
    if (isActive !== null) {
      where.isActive = isActive === 'true';
    }
    if (productType) {
      where.productType = productType;
    }
    if (search) {
      where.OR = [
        { name: { contains: search } },
        { sku: { contains: search } },
        { description: { contains: search } },
      ];
    }

    const products = await prisma.products.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        categoryRef: { select: { name: true } },
      },
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
    if (!session.currentOrg) {
      return NextResponse.json({ error: 'No organization selected' }, { status: 400 });
    }

    const body = await request.json();

    // Validate required fields
    if (!body.sku || !body.name || !body.basePrice || !body.gstRate) {
      return NextResponse.json(
        { error: 'Missing required fields: SKU, name, basePrice, gstRate' },
        { status: 400 }
      );
    }

    // Check if SKU already exists within this org
    const existing = await prisma.products.findFirst({
      where: { sku: body.sku, organizationId: session.currentOrg.id }
    });

    if (existing) {
      return NextResponse.json(
        { error: 'A product with this SKU already exists' },
        { status: 400 }
      );
    }

    const product = await prisma.products.create({
      data: {
        organizationId: session.currentOrg.id,
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

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create product' },
      { status: 500 }
    );
  }
}
