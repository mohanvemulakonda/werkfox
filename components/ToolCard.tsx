"use client";

import Link from "next/link";
import { CategoryBadge } from "./CategoryBadge";
import { PricingBadge } from "./PricingBadge";
import { UpvoteButton } from "./UpvoteButton";

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    slug: string;
    tagline: string;
    logo: string | null;
    category: {
      name: string;
      slug: string;
    };
    pricing: string;
    _count: {
      upvotes: number;
    };
    userHasUpvoted?: boolean;
  };
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={`/tools/${tool.slug}`}
      className="card-hover group flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
    >
      {/* Logo */}
      {tool.logo ? (
        <img
          src={tool.logo}
          alt={tool.name}
          className="h-12 w-12 flex-shrink-0 rounded-xl object-cover"
        />
      ) : (
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 text-lg font-bold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
          {tool.name.charAt(0).toUpperCase()}
        </div>
      )}

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <h3 className="text-sm font-semibold text-[var(--text-primary)] group-hover:text-brand-500 transition-colors truncate">
          {tool.name}
        </h3>
        <p className="text-sm text-[var(--text-secondary)] line-clamp-1">
          {tool.tagline}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <CategoryBadge name={tool.category.name} slug={tool.category.slug} />
          <PricingBadge pricing={tool.pricing} />
        </div>
      </div>

      {/* Upvote */}
      <div className="flex-shrink-0">
        <UpvoteButton
          toolId={tool.id}
          initialCount={tool._count.upvotes}
          initialUpvoted={tool.userHasUpvoted ?? false}
          size="sm"
        />
      </div>
    </Link>
  );
}
