/* eslint-disable @next/next/no-img-element */
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ExternalLink,
  Calendar,
  User,
  ChevronUp,
  Star,
  MessageSquare,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cn, formatDate } from "@/lib/utils";
import { UpvoteButton } from "@/components/UpvoteButton";
import { CategoryBadge } from "@/components/CategoryBadge";
import { PricingBadge } from "@/components/PricingBadge";
import { ToolStatus } from "@prisma/client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getTool(slug: string) {
  const tool = await prisma.tool.findFirst({
    where: { slug, status: ToolStatus.APPROVED },
    include: {
      category: true,
      submitter: {
        select: { id: true, username: true, name: true, avatar: true },
      },
      reviews: {
        include: {
          user: {
            select: { id: true, username: true, name: true, avatar: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
      comments: {
        include: {
          user: {
            select: { id: true, username: true, name: true, avatar: true },
          },
        },
        where: { parentId: null },
        orderBy: { createdAt: "desc" },
      },
      _count: { select: { upvotes: true, reviews: true, comments: true } },
    },
  });

  return tool;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  return {
    title: tool.name,
    description: tool.tagline,
    openGraph: {
      title: `${tool.name} | ToolsFinder`,
      description: tool.tagline,
      url: `https://toolsfinder.io/tools/${tool.slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: tool.name,
      description: tool.tagline,
    },
  };
}

export default async function ToolDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const tool = await getTool(slug);

  if (!tool) {
    notFound();
  }

  // Calculate average rating
  const avgRating =
    tool.reviews.length > 0
      ? tool.reviews.reduce((sum, r) => sum + r.rating, 0) / tool.reviews.length
      : 0;

  // Fetch related tools from same category
  const relatedTools = await prisma.tool.findMany({
    where: {
      categoryId: tool.categoryId,
      status: ToolStatus.APPROVED,
      id: { not: tool.id },
    },
    include: {
      category: true,
      _count: { select: { upvotes: true } },
    },
    orderBy: { upvotes: { _count: "desc" } },
    take: 3,
  });

  // Split description into paragraphs
  const descriptionParagraphs = tool.description
    .split(/\n\n+/)
    .filter((p) => p.trim().length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Left Column - Main Content */}
        <div className="lg:col-span-2">
          {/* Tool Header */}
          <div className="flex items-start gap-5">
            {/* Logo */}
            {tool.logo ? (
              <img
                src={tool.logo}
                alt={`${tool.name} logo`}
                className="h-20 w-20 flex-shrink-0 rounded-2xl border border-[var(--border)] object-cover"
              />
            ) : (
              <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-3xl font-bold text-brand-500 dark:bg-brand-900/30">
                {tool.name[0]}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
                {tool.name}
              </h1>
              <p className="mt-1 text-lg text-[var(--text-secondary)]">
                {tool.tagline}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <CategoryBadge
                  name={tool.category.name}
                  slug={tool.category.slug}
                />
                <PricingBadge pricing={tool.pricing} />
              </div>
              <div className="mt-4">
                <a
                  href={tool.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                >
                  <ExternalLink size={16} />
                  Visit Website
                </a>
              </div>
            </div>
          </div>

          {/* Description */}
          <section className="mt-10">
            <h2 className="text-xl font-bold">About {tool.name}</h2>
            <div className="mt-4 space-y-4">
              {descriptionParagraphs.map((paragraph, i) => (
                <p
                  key={i}
                  className="text-[var(--text-secondary)] leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </section>

          {/* Screenshots */}
          {tool.screenshots.length > 0 && (
            <section className="mt-10">
              <h2 className="text-xl font-bold">Screenshots</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {tool.screenshots.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`${tool.name} screenshot ${i + 1}`}
                    className="rounded-xl border border-[var(--border)] object-cover"
                  />
                ))}
              </div>
            </section>
          )}

          {/* Reviews */}
          <section className="mt-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">
                Reviews ({tool._count.reviews})
              </h2>
              {avgRating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }, (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={cn(
                          i < Math.round(avgRating)
                            ? "fill-brand-400 text-brand-400"
                            : "text-[var(--border)]"
                        )}
                        fill={i < Math.round(avgRating) ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[var(--text-secondary)]">
                    {avgRating.toFixed(1)} avg
                  </span>
                </div>
              )}
            </div>

            {tool.reviews.length > 0 ? (
              <div className="mt-4 space-y-4">
                {tool.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {review.user.avatar ? (
                          <img
                            src={review.user.avatar}
                            alt={review.user.name ?? review.user.username}
                            className="h-8 w-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-xs font-bold text-[var(--text-secondary)]">
                            {(review.user.name ?? review.user.username)[0]?.toUpperCase()}
                          </div>
                        )}
                        <div>
                          <span className="text-sm font-semibold">
                            {review.user.name ?? review.user.username}
                          </span>
                          <span className="ml-2 text-xs text-[var(--text-tertiary)]">
                            {formatDate(review.createdAt)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={cn(
                              i < review.rating
                                ? "fill-brand-400 text-brand-400"
                                : "text-[var(--border)]"
                            )}
                            fill={i < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <h4 className="mt-3 font-semibold">{review.title}</h4>
                    )}
                    {review.body && (
                      <p className="mt-2 text-sm text-[var(--text-secondary)] leading-relaxed">
                        {review.body}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-[var(--text-tertiary)]">
                No reviews yet. Be the first to share your experience!
              </p>
            )}
          </section>

          {/* Comments */}
          <section className="mt-10">
            <h2 className="flex items-center gap-2 text-xl font-bold">
              <MessageSquare size={20} />
              Comments ({tool._count.comments})
            </h2>

            {tool.comments.length > 0 ? (
              <div className="mt-4 space-y-4">
                {tool.comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
                  >
                    <div className="flex items-center gap-3">
                      {comment.user.avatar ? (
                        <img
                          src={comment.user.avatar}
                          alt={comment.user.name ?? comment.user.username}
                          className="h-8 w-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--bg-secondary)] text-xs font-bold text-[var(--text-secondary)]">
                          {(comment.user.name ?? comment.user.username)[0]?.toUpperCase()}
                        </div>
                      )}
                      <div>
                        <span className="text-sm font-semibold">
                          {comment.user.name ?? comment.user.username}
                        </span>
                        <span className="ml-2 text-xs text-[var(--text-tertiary)]">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-[var(--text-secondary)] leading-relaxed">
                      {comment.body}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-sm text-[var(--text-tertiary)]">
                No comments yet. Start the conversation!
              </p>
            )}
          </section>
        </div>

        {/* Right Sidebar */}
        <aside className="mt-10 lg:mt-0">
          <div className="sticky top-24 space-y-6">
            {/* Upvote Card */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5 text-center">
              <UpvoteButton
                toolId={tool.id}
                initialCount={tool._count.upvotes}
                initialUpvoted={false}
              />
              <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                Upvote if you like this tool
              </p>
            </div>

            {/* Visit Website */}
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
            >
              <ExternalLink size={16} />
              Visit Website
            </a>

            {/* Tool Details */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
              <h3 className="font-semibold">Details</h3>
              <dl className="mt-4 space-y-3">
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-tertiary)]">
                    Category
                  </dt>
                  <dd className="mt-1">
                    <CategoryBadge
                      name={tool.category.name}
                      slug={tool.category.slug}
                    />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-tertiary)]">
                    Pricing
                  </dt>
                  <dd className="mt-1">
                    <PricingBadge pricing={tool.pricing} />
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-tertiary)]">
                    Launched
                  </dt>
                  <dd className="mt-1 flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                    <Calendar size={14} />
                    {formatDate(tool.launchDate)}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-medium uppercase tracking-wide text-[var(--text-tertiary)]">
                    Submitted by
                  </dt>
                  <dd className="mt-1">
                    <Link
                      href={`/profile/${tool.submitter.username}`}
                      className="flex items-center gap-1.5 text-sm font-medium text-[var(--text-secondary)] hover:text-brand-500 transition-colors"
                    >
                      <User size={14} />
                      {tool.submitter.name ?? tool.submitter.username}
                    </Link>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Related Tools */}
            {relatedTools.length > 0 && (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5">
                <h3 className="font-semibold">
                  More in {tool.category.name}
                </h3>
                <div className="mt-4 space-y-3">
                  {relatedTools.map((related) => (
                    <Link
                      key={related.id}
                      href={`/tools/${related.slug}`}
                      className="flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-[var(--bg-secondary)]"
                    >
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-brand-50 text-sm font-bold text-brand-500 dark:bg-brand-900/30">
                        {related.name[0]}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-medium">{related.name}</div>
                        <div className="text-xs text-[var(--text-tertiary)] line-clamp-1">
                          {related.tagline}
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-xs text-[var(--text-tertiary)]">
                        <ChevronUp size={12} />
                        {related._count.upvotes}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
