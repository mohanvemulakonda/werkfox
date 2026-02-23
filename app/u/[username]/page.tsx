import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { StarRating } from "@/components/StarRating";
import {
  Globe,
  ChevronUp,
  Package,
  Heart,
  MessageSquare,
} from "lucide-react";

interface PageProps {
  params: Promise<{ username: string }>;
}

async function getUser(username: string) {
  return prisma.user.findUnique({
    where: { username },
    include: {
      _count: {
        select: {
          tools: true,
          upvotes: true,
          reviews: true,
        },
      },
    },
  });
}

async function getUserTools(userId: string) {
  return prisma.tool.findMany({
    where: { submitterId: userId, status: "APPROVED" },
    include: {
      category: { select: { name: true, slug: true } },
      _count: { select: { upvotes: true } },
    },
    orderBy: { launchDate: "desc" },
    take: 10,
  });
}

async function getUserReviews(userId: string) {
  return prisma.review.findMany({
    where: { userId },
    include: {
      tool: { select: { name: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 5,
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;
  const user = await getUser(username);

  if (!user) {
    return { title: "User Not Found" };
  }

  const displayName = user.name || user.username;

  return {
    title: `${displayName} (@${user.username})`,
    description: user.bio || `${displayName}'s profile on ToolsFinder. See their tools and reviews.`,
    openGraph: {
      title: `${displayName} (@${user.username}) | ToolsFinder`,
      description: user.bio || `Check out ${displayName}'s tools and reviews on ToolsFinder.`,
    },
  };
}

export default async function UserProfilePage({ params }: PageProps) {
  const { username } = await params;
  const user = await getUser(username);

  if (!user) notFound();

  const [tools, reviews] = await Promise.all([
    getUserTools(user.id),
    getUserReviews(user.id),
  ]);

  const displayName = user.name || user.username;

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      {/* Profile Header */}
      <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
        <Avatar src={user.avatar} name={displayName} size="lg" />
        <div className="flex-1">
          <h1 className="text-xl font-bold text-[var(--text-primary)] sm:text-2xl">
            {displayName}
          </h1>
          <p className="text-sm text-[var(--text-secondary)]">@{user.username}</p>
          {user.bio && (
            <p className="mt-2 text-sm text-[var(--text-secondary)] max-w-lg">
              {user.bio}
            </p>
          )}
          {/* Social Links */}
          <div className="mt-3 flex items-center justify-center gap-3 sm:justify-start">
            {user.website && (
              <a
                href={user.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-brand-500 transition-colors"
              >
                <Globe size={14} />
                Website
              </a>
            )}
            {user.twitter && (
              <a
                href={`https://twitter.com/${user.twitter}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-brand-500 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                @{user.twitter}
              </a>
            )}
            {user.github && (
              <a
                href={`https://github.com/${user.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-[var(--text-secondary)] hover:text-brand-500 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                {user.github}
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-4">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-center">
          <Package size={18} className="mx-auto text-brand-500" />
          <div className="mt-1.5 text-lg font-bold text-[var(--text-primary)]">
            {user._count.tools}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Tools Submitted</div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-center">
          <Heart size={18} className="mx-auto text-red-500" />
          <div className="mt-1.5 text-lg font-bold text-[var(--text-primary)]">
            {user._count.upvotes}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Upvotes Given</div>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4 text-center">
          <MessageSquare size={18} className="mx-auto text-blue-500" />
          <div className="mt-1.5 text-lg font-bold text-[var(--text-primary)]">
            {user._count.reviews}
          </div>
          <div className="text-xs text-[var(--text-secondary)]">Reviews Written</div>
        </div>
      </div>

      {/* Approved Tools */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">
          Tools by {displayName}
        </h2>
        {tools.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-8 text-center text-sm text-[var(--text-secondary)]">
            No tools submitted yet.
          </div>
        ) : (
          <div className="space-y-3">
            {tools.map((tool) => (
              <Link
                key={tool.id}
                href={`/tools/${tool.slug}`}
                className="card-hover flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
              >
                {tool.logo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="h-10 w-10 flex-shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-sm font-bold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                    {tool.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {tool.name}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5 truncate">
                    {tool.tagline}
                  </p>
                </div>
                <span className="hidden rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)] sm:inline">
                  {tool.category.name}
                </span>
                <span className="flex items-center gap-1 text-xs text-[var(--text-secondary)]">
                  <ChevronUp size={14} />
                  {tool._count.upvotes}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Recent Reviews */}
      <section className="mt-10">
        <h2 className="mb-4 text-lg font-bold text-[var(--text-primary)]">
          Recent Reviews
        </h2>
        {reviews.length === 0 ? (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-8 text-center text-sm text-[var(--text-secondary)]">
            No reviews written yet.
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
                  <StarRating rating={review.rating} size="sm" />
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
      </section>
    </div>
  );
}
