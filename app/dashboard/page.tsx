import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { getOrCreateDbUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/utils";
import {
  Rocket,
  ChevronUp,
  Star,
  ExternalLink,
  Package,
  Heart,
  MessageSquare,
} from "lucide-react";
import { DashboardTabs } from "./DashboardTabs";

export const metadata: Metadata = {
  title: "Dashboard",
};

const STATUS_VARIANT: Record<string, "warning" | "success" | "destructive" | "default"> = {
  PENDING: "warning",
  APPROVED: "success",
  REJECTED: "destructive",
  ARCHIVED: "default",
};

const STATUS_LABEL: Record<string, string> = {
  PENDING: "Pending Review",
  APPROVED: "Approved",
  REJECTED: "Rejected",
  ARCHIVED: "Archived",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const user = await getOrCreateDbUser();
  if (!user) redirect("/sign-in");

  const params = await searchParams;
  const tab = params.tab || "submissions";

  const [submissions, upvotedTools, reviews] = await Promise.all([
    prisma.tool.findMany({
      where: { submitterId: user.id },
      include: {
        category: { select: { name: true } },
        _count: { select: { upvotes: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.upvote.findMany({
      where: { userId: user.id },
      include: {
        tool: {
          include: {
            category: { select: { name: true, slug: true } },
            _count: { select: { upvotes: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.findMany({
      where: { userId: user.id },
      include: {
        tool: { select: { name: true, slug: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-1 text-[var(--text-secondary)]">
          Manage your submissions, upvotes, and reviews.
        </p>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-center">
          <Package size={20} className="mx-auto text-brand-500" />
          <div className="mt-2 text-xl font-bold text-[var(--text-primary)]">
            {submissions.length}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Submissions</div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-center">
          <Heart size={20} className="mx-auto text-red-500" />
          <div className="mt-2 text-xl font-bold text-[var(--text-primary)]">
            {upvotedTools.length}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Upvotes</div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-center">
          <MessageSquare size={20} className="mx-auto text-blue-500" />
          <div className="mt-2 text-xl font-bold text-[var(--text-primary)]">
            {reviews.length}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Reviews</div>
        </div>
      </div>

      {/* Tabs */}
      <DashboardTabs activeTab={tab} />

      {/* Tab Content */}
      <div className="mt-6">
        {/* My Submissions */}
        {tab === "submissions" && (
          <div>
            {submissions.length === 0 ? (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-10 text-center">
                <Rocket
                  size={32}
                  className="mx-auto text-[var(--text-tertiary)]"
                />
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  You haven&apos;t submitted any tools yet.
                </p>
                <Link
                  href="/submit"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
                >
                  <Rocket size={14} />
                  Submit Your First Tool
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((tool) => (
                  <div
                    key={tool.id}
                    className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                      {tool.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                          {tool.name}
                        </h3>
                        <Badge variant={STATUS_VARIANT[tool.status] ?? "default"}>
                          {STATUS_LABEL[tool.status] ?? tool.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                        {tool.tagline}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-[var(--text-tertiary)]">
                      <span className="flex items-center gap-1">
                        <ChevronUp size={14} />
                        {tool._count.upvotes}
                      </span>
                      <span className="hidden sm:inline">{formatDate(tool.createdAt)}</span>
                    </div>
                    {tool.status === "APPROVED" && (
                      <Link
                        href={`/tools/${tool.slug}`}
                        className="flex-shrink-0 rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                      >
                        <ExternalLink size={16} />
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Upvotes */}
        {tab === "upvotes" && (
          <div>
            {upvotedTools.length === 0 ? (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-10 text-center">
                <ChevronUp
                  size={32}
                  className="mx-auto text-[var(--text-tertiary)]"
                />
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  You haven&apos;t upvoted any tools yet.
                </p>
                <Link
                  href="/tools"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-500 hover:text-brand-600"
                >
                  Explore Tools
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {upvotedTools.map(({ tool }) => (
                  <Link
                    key={tool.id}
                    href={`/tools/${tool.slug}`}
                    className="card-hover flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
                  >
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                      {tool.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                        {tool.name}
                      </h3>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                        {tool.tagline}
                      </p>
                    </div>
                    <span className="flex-shrink-0 rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
                      {tool.category.name}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-brand-500 font-medium">
                      <ChevronUp size={14} />
                      {tool._count.upvotes}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Reviews */}
        {tab === "reviews" && (
          <div>
            {reviews.length === 0 ? (
              <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-10 text-center">
                <Star
                  size={32}
                  className="mx-auto text-[var(--text-tertiary)]"
                />
                <p className="mt-3 text-sm text-[var(--text-secondary)]">
                  You haven&apos;t written any reviews yet.
                </p>
                <Link
                  href="/tools"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-500 hover:text-brand-600"
                >
                  Explore Tools
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/tools/${review.tool.slug}`}
                        className="text-sm font-semibold text-[var(--text-primary)] hover:text-brand-500 transition-colors"
                      >
                        {review.tool.name}
                      </Link>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={
                              i < review.rating
                                ? "fill-brand-400 text-brand-400"
                                : "text-[var(--border)]"
                            }
                          />
                        ))}
                      </div>
                    </div>
                    {review.title && (
                      <p className="mt-2 text-sm font-medium text-[var(--text-primary)]">
                        {review.title}
                      </p>
                    )}
                    {review.body && (
                      <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
                        {review.body}
                      </p>
                    )}
                    <p className="mt-2 text-xs text-[var(--text-tertiary)]">
                      {formatDate(review.createdAt)}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
