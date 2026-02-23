import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
      include: {
        _count: {
          select: {
            tools: {
              where: { status: "APPROVED" },
            },
          },
        },
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("[API /categories] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
