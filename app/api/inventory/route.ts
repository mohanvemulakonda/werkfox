import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/lib/auth';

export async function GET() {
    const session = await auth();
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const inventory = await prisma.inventory.findMany({
            orderBy: { updatedAt: 'desc' },
            include: {
                product: {
                    select: {
                        name: true,
                        sku: true,
                        reorderLevel: true,
                        costPrice: true,
                        unit: true,
                        categoryRef: { select: { name: true } }
                    }
                },
                location: { select: { name: true } },
            },
        });

        return NextResponse.json({ inventory });
    } catch (error) {
        console.error('Failed to fetch inventory:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
