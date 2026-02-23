import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireDbUser } from "@/lib/auth";

export async function POST(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: toolId } = await params;
    const user = await requireDbUser();

    // Check that the tool exists
    const tool = await prisma.tool.findUnique({ where: { id: toolId } });
    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    // Toggle upvote
    const existing = await prisma.upvote.findUnique({
      where: { userId_toolId: { userId: user.id, toolId } },
    });

    if (existing) {
      await prisma.upvote.delete({ where: { id: existing.id } });
    } else {
      await prisma.upvote.create({
        data: { userId: user.id, toolId },
      });
    }

    const count = await prisma.upvote.count({ where: { toolId } });

    return NextResponse.json({ upvoted: !existing, count });
  } catch (error) {
    if (error instanceof Error && error.message === "Unauthorized") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    console.error("[API /tools/[id]/upvote] Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
