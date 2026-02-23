import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const query = searchParams.get("q")?.trim();

    if (!query) {
      return NextResponse.json([]);
    }

    const tools = await prisma.tool.findMany({
      where: {
        status: "APPROVED",
        OR: [
          { name: { contains: query, mode: "insensitive" } },
          { tagline: { contains: query, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        tagline: true,
        logo: true,
        category: {
          select: { name: true },
        },
      },
      take: 10,
      orderBy: { launchDate: "desc" },
    });

    return NextResponse.json(tools);
  } catch (error) {
    console.error("[API /search] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
