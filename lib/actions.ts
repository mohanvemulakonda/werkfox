"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireDbUser, requireAdmin } from "@/lib/auth";
import { slugify } from "@/lib/utils";
import { Pricing } from "@prisma/client";

/* ------------------------------------------------------------------ */
/*  toggleUpvote – add or remove an upvote for the authenticated user */
/* ------------------------------------------------------------------ */
export async function toggleUpvote(toolId: string) {
  const user = await requireDbUser();

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

  revalidatePath("/");
  return { upvoted: !existing, count };
}

/* ------------------------------------------------------------------ */
/*  submitTool – create a new tool submission (PENDING by default)     */
/* ------------------------------------------------------------------ */
export async function submitTool(formData: FormData) {
  const user = await requireDbUser();

  const name = formData.get("name") as string;
  const tagline = formData.get("tagline") as string;
  const description = formData.get("description") as string;
  const website = formData.get("website") as string;
  const logo = (formData.get("logo") as string) || null;
  const categoryId = formData.get("categoryId") as string;
  const pricing = (formData.get("pricing") as Pricing) || "FREE";
  const tagsRaw = formData.get("tags") as string | null;

  if (!name || !tagline || !description || !website || !categoryId) {
    throw new Error("Missing required fields: name, tagline, description, website, categoryId");
  }

  // Generate a unique slug from the tool name
  let slug = slugify(name);
  const existingSlug = await prisma.tool.findUnique({ where: { slug } });
  if (existingSlug) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  // Parse comma-separated tags and find-or-create each one
  const tagNames = tagsRaw
    ? tagsRaw
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean)
    : [];

  const tagConnections: { tagId: string }[] = [];
  for (const tagName of tagNames) {
    const tagSlug = slugify(tagName);
    const tag = await prisma.tag.upsert({
      where: { slug: tagSlug },
      update: {},
      create: { name: tagName, slug: tagSlug },
    });
    tagConnections.push({ tagId: tag.id });
  }

  const tool = await prisma.tool.create({
    data: {
      name,
      slug,
      tagline,
      description,
      website,
      logo,
      categoryId,
      pricing,
      submitterId: user.id,
      tags: {
        create: tagConnections,
      },
    },
  });

  revalidatePath("/");
  return tool;
}

/* ------------------------------------------------------------------ */
/*  createReview – upsert a review (one per user per tool)            */
/* ------------------------------------------------------------------ */
export async function createReview(
  toolId: string,
  data: { rating: number; title?: string; body?: string }
) {
  const user = await requireDbUser();

  if (data.rating < 1 || data.rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const review = await prisma.review.upsert({
    where: { userId_toolId: { userId: user.id, toolId } },
    update: {
      rating: data.rating,
      title: data.title ?? null,
      body: data.body ?? null,
    },
    create: {
      userId: user.id,
      toolId,
      rating: data.rating,
      title: data.title ?? null,
      body: data.body ?? null,
    },
  });

  revalidatePath("/");
  return review;
}

/* ------------------------------------------------------------------ */
/*  createComment – post a comment (optionally nested under a parent) */
/* ------------------------------------------------------------------ */
export async function createComment(
  toolId: string,
  body: string,
  parentId?: string
) {
  const user = await requireDbUser();

  if (!body || body.trim().length === 0) {
    throw new Error("Comment body cannot be empty");
  }

  const comment = await prisma.comment.create({
    data: {
      body: body.trim(),
      userId: user.id,
      toolId,
      parentId: parentId ?? null,
    },
  });

  revalidatePath("/");
  return comment;
}

/* ------------------------------------------------------------------ */
/*  approveTool – admin-only: set tool status to APPROVED             */
/* ------------------------------------------------------------------ */
export async function approveTool(toolId: string) {
  await requireAdmin();

  const tool = await prisma.tool.update({
    where: { id: toolId },
    data: { status: "APPROVED" },
  });

  revalidatePath("/");
  return tool;
}

/* ------------------------------------------------------------------ */
/*  rejectTool – admin-only: set tool status to REJECTED              */
/* ------------------------------------------------------------------ */
export async function rejectTool(toolId: string) {
  await requireAdmin();

  const tool = await prisma.tool.update({
    where: { id: toolId },
    data: { status: "REJECTED" },
  });

  revalidatePath("/");
  return tool;
}
