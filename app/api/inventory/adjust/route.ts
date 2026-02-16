import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

// POST /api/inventory/adjust - Stock adjustment
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { productId, locationId, adjustmentType, quantity, reason } = body;

    if (!productId || !locationId || !adjustmentType || quantity === undefined || !reason) {
      return NextResponse.json(
        { error: 'productId, locationId, adjustmentType, quantity, and reason are required' },
        { status: 400 }
      );
    }

    const parsedProductId = parseInt(productId);
    const parsedLocationId = parseInt(locationId);
    const parsedQuantity = parseInt(quantity);

    if (isNaN(parsedProductId) || isNaN(parsedLocationId) || isNaN(parsedQuantity)) {
      return NextResponse.json(
        { error: 'Invalid numeric values provided' },
        { status: 400 }
      );
    }

    if (parsedQuantity < 0) {
      return NextResponse.json(
        { error: 'Quantity must be a non-negative number' },
        { status: 400 }
      );
    }

    const validTypes = ['ADD', 'SUBTRACT', 'SET'];
    if (!validTypes.includes(adjustmentType)) {
      return NextResponse.json(
        { error: 'adjustmentType must be one of: ADD, SUBTRACT, SET' },
        { status: 400 }
      );
    }

    // Verify product exists
    const product = await prisma.products.findUnique({ where: { id: parsedProductId } });
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Verify location exists
    const location = await prisma.locations.findUnique({ where: { id: parsedLocationId } });
    if (!location) {
      return NextResponse.json({ error: 'Location not found' }, { status: 404 });
    }

    // Get current inventory state
    const existingInventory = await prisma.inventory.findUnique({
      where: { locationId_productId: { locationId: parsedLocationId, productId: parsedProductId } },
    });

    const previousQty = existingInventory?.quantity || 0;
    let newQty: number;

    switch (adjustmentType) {
      case 'ADD':
        newQty = previousQty + parsedQuantity;
        break;
      case 'SUBTRACT':
        newQty = Math.max(0, previousQty - parsedQuantity);
        break;
      case 'SET':
        newQty = parsedQuantity;
        break;
      default:
        newQty = previousQty;
    }

    const movementQuantity = newQty - previousQty;

    // Perform upsert and stock movement in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Upsert inventory record
      const inventory = await tx.inventory.upsert({
        where: { locationId_productId: { locationId: parsedLocationId, productId: parsedProductId } },
        create: {
          locationId: parsedLocationId,
          productId: parsedProductId,
          quantity: newQty,
          reservedQuantity: 0,
          lastStockUpdate: new Date(),
        },
        update: {
          quantity: newQty,
          lastStockUpdate: new Date(),
        },
      });

      // Create stock movement
      const movement = await tx.stock_movements.create({
        data: {
          locationId: parsedLocationId,
          productId: parsedProductId,
          movementType: 'ADJUSTMENT',
          quantity: movementQuantity,
          previousQty,
          newQty,
          referenceType: 'ADJUSTMENT',
          referenceId: null,
          batchNumber: null,
          reason,
          notes: `${adjustmentType}: ${parsedQuantity} units. Previous: ${previousQty}, New: ${newQty}`,
          createdBy: null,
        },
      });

      return { inventory, movement };
    });

    return NextResponse.json({
      message: 'Stock adjusted successfully',
      previousQuantity: previousQty,
      newQuantity: newQty,
      adjustment: movementQuantity,
      inventory: result.inventory,
    }, { status: 200 });
  } catch (error: any) {
    console.error('Error adjusting inventory:', error);
    return NextResponse.json(
      { error: 'Failed to adjust inventory' },
      { status: 500 }
    );
  }
}
