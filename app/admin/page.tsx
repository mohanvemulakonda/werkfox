import { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { requireAdmin } from "@/lib/auth";
import { Badge } from "@/components/ui/Badge";
import { formatDate, pricingLabel, pricingColor } from "@/lib/utils";
import { approveTool, rejectTool } from "@/lib/actions";
import {
  Shield,
  Package,
  Users,
  Star,
  Clock,
  CheckCircle,
  XCircle,
  ExternalLink,
  BarChart3,
  ChevronUp,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
};


/* ------------------------------------------------------------------ */
/*  Admin Page (server component)                                      */
/* ------------------------------------------------------------------ */
export default async function AdminPage() {
  // Guard: only admins can access this page
  await requireAdmin();

  // Fetch all stats + data in parallel
  const [
    totalTools,
    totalUsers,
    totalReviews,
    pendingCount,
    pendingTools,
    recentApproved,
  ] = await Promise.all([
    prisma.tool.count(),
    prisma.user.count(),
    prisma.review.count(),
    prisma.tool.count({ where: { status: "PENDING" } }),
    prisma.tool.findMany({
      where: { status: "PENDING" },
      include: {
        submitter: { select: { id: true, name: true, username: true, email: true, avatar: true } },
        category: { select: { name: true } },
        _count: { select: { upvotes: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
    prisma.tool.findMany({
      where: { status: "APPROVED" },
      include: {
        submitter: { select: { id: true, name: true, username: true } },
        category: { select: { name: true } },
        _count: { select: { upvotes: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 10,
    }),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 dark:bg-brand-900/30">
          <Shield size={20} className="text-brand-600 dark:text-brand-400" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
            Admin Dashboard
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">
            Manage tool submissions, review queue, and platform stats.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mb-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon={<Package size={20} className="text-brand-500" />}
          label="Total Tools"
          value={totalTools}
        />
        <StatCard
          icon={<Users size={20} className="text-blue-500" />}
          label="Total Users"
          value={totalUsers}
        />
        <StatCard
          icon={<Star size={20} className="text-yellow-500" />}
          label="Total Reviews"
          value={totalReviews}
        />
        <StatCard
          icon={<Clock size={20} className="text-orange-500" />}
          label="Pending Tools"
          value={pendingCount}
          highlight={pendingCount > 0}
        />
      </div>

      {/* Pending Review Section */}
      <section className="mb-12">
        <div className="mb-4 flex items-center gap-2">
          <AlertCircle size={18} className="text-yellow-500" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Pending Review
          </h2>
          {pendingCount > 0 && (
            <Badge variant="warning">{pendingCount}</Badge>
          )}
        </div>

        {pendingTools.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-10 text-center">
            <CheckCircle
              size={32}
              className="mx-auto text-green-500"
            />
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              All caught up! No tools pending review.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingTools.map((tool) => (
              <div
                key={tool.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5 transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  {/* Tool Info */}
                  <div className="flex items-start gap-4 min-w-0 flex-1">
                    {/* Avatar / Initial */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-lg font-bold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                      {tool.logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={tool.logo}
                          alt={tool.name}
                          className="h-12 w-12 rounded-xl object-cover"
                        />
                      ) : (
                        tool.name.charAt(0).toUpperCase()
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-[var(--text-primary)]">
                          {tool.name}
                        </h3>
                        <Badge variant="warning">Pending</Badge>
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${pricingColor(
                            tool.pricing
                          )}`}
                        >
                          {pricingLabel(tool.pricing)}
                        </span>
                      </div>

                      <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
                        {tool.tagline}
                      </p>

                      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--text-tertiary)]">
                        <span>
                          Submitted {formatDate(tool.createdAt)}
                        </span>
                        <span>
                          by{" "}
                          <Link
                            href={`/u/${tool.submitter.username}`}
                            className="font-medium text-[var(--text-secondary)] hover:text-brand-500 transition-colors"
                          >
                            {tool.submitter.name || tool.submitter.username}
                          </Link>
                        </span>
                        {tool.category && (
                          <span className="rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-xs">
                            {tool.category.name}
                          </span>
                        )}
                        {tool.website && (
                          <a
                            href={tool.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-brand-500 hover:text-brand-600 transition-colors"
                          >
                            <ExternalLink size={12} />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 sm:ml-4">
                    <form action={async () => {
                      "use server";
                      await approveTool(tool.id);
                    }}>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        <CheckCircle size={16} />
                        Approve
                      </button>
                    </form>
                    <form action={async () => {
                      "use server";
                      await rejectTool(tool.id);
                    }}>
                      <button
                        type="submit"
                        className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-100 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      >
                        <XCircle size={16} />
                        Reject
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Recently Approved Section */}
      <section>
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 size={18} className="text-green-500" />
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Recently Approved
          </h2>
        </div>

        {recentApproved.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-10 text-center">
            <Package
              size={32}
              className="mx-auto text-[var(--text-tertiary)]"
            />
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              No approved tools yet.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentApproved.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 transition-shadow hover:shadow-sm"
              >
                {/* Initial */}
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-green-100 text-sm font-bold text-green-600 dark:bg-green-900/30 dark:text-green-400">
                  {tool.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={tool.logo}
                      alt={tool.name}
                      className="h-10 w-10 rounded-xl object-cover"
                    />
                  ) : (
                    tool.name.charAt(0).toUpperCase()
                  )}
                </div>

                {/* Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                      {tool.name}
                    </h3>
                    <Badge variant="success">Approved</Badge>
                  </div>
                  <p className="mt-0.5 text-xs text-[var(--text-secondary)] truncate">
                    {tool.tagline}
                  </p>
                </div>

                {/* Meta */}
                <div className="hidden items-center gap-3 text-xs text-[var(--text-tertiary)] sm:flex">
                  {tool.category && (
                    <span className="rounded-full bg-[var(--bg-secondary)] px-2 py-0.5">
                      {tool.category.name}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <ChevronUp size={14} />
                    {tool._count.upvotes}
                  </span>
                  <span>{formatDate(tool.updatedAt)}</span>
                </div>

                {/* Link */}
                <Link
                  href={`/tools/${tool.slug}`}
                  className="flex-shrink-0 rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] transition-colors"
                >
                  <ExternalLink size={16} />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  StatCard helper component                                          */
/* ------------------------------------------------------------------ */
function StatCard({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 text-center transition-shadow hover:shadow-sm ${
        highlight
          ? "border-yellow-300 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/10"
          : "border-[var(--border)] bg-[var(--bg)]"
      }`}
    >
      <div className="mx-auto mb-2 flex h-8 w-8 items-center justify-center">
        {icon}
      </div>
      <div className="text-2xl font-bold text-[var(--text-primary)]">
        {value.toLocaleString()}
      </div>
      <div className="mt-0.5 text-xs text-[var(--text-secondary)]">
        {label}
      </div>
    </div>
  );
}
