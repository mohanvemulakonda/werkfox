import { Metadata } from "next";
import Link from "next/link";
import { Search, ChevronUp, SlidersHorizontal } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
import { cn, pricingLabel, pricingColor } from "@/lib/utils";
import { Prisma, ToolStatus, Pricing } from "@prisma/client";

export const metadata: Metadata = {
  title: "Explore Tools",
  description:
    "Discover and explore the best software tools. Filter by category, pricing, and sort by trending, newest, or top rated.",
};

const ITEMS_PER_PAGE = 12;

const SORT_OPTIONS = [
  { value: "trending", label: "Trending" },
  { value: "new", label: "Newest" },
  { value: "top", label: "Most Upvoted" },
] as const;

const PRICING_OPTIONS = [
  { value: "FREE", label: "Free" },
  { value: "FREEMIUM", label: "Freemium" },
  { value: "PAID", label: "Paid" },
  { value: "OPEN_SOURCE", label: "Open Source" },
] as const;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    pricing?: string;
    sort?: string;
    page?: string;
  }>;
}

export default async function ToolsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q ?? "";
  const categorySlug = params.category ?? "";
  const pricingFilter = params.pricing ?? "";
  const sort = params.sort ?? "trending";
  const currentPage = Math.max(1, parseInt(params.page ?? "1", 10));

  // Build where clause
  const where: Prisma.ToolWhereInput = {
    status: ToolStatus.APPROVED,
  };

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { tagline: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ];
  }

  if (categorySlug) {
    where.category = { slug: categorySlug };
  }

  if (pricingFilter && Object.values(Pricing).includes(pricingFilter as Pricing)) {
    where.pricing = pricingFilter as Pricing;
  }

  // Build orderBy
  let orderBy: Prisma.ToolOrderByWithRelationInput;
  switch (sort) {
    case "new":
      orderBy = { launchDate: "desc" };
      break;
    case "top":
      orderBy = { upvotes: { _count: "desc" } };
      break;
    case "trending":
    default:
      orderBy = { upvotes: { _count: "desc" } };
      break;
  }

  // Fetch tools and total count in parallel
  const [tools, totalCount, categories] = await Promise.all([
    prisma.tool.findMany({
      where,
      include: {
        category: true,
        _count: { select: { upvotes: true } },
      },
      orderBy,
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
    prisma.tool.count({ where }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
      select: { name: true, slug: true },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // Helper to build filter URLs
  function buildUrl(overrides: Record<string, string | undefined>) {
    const next: Record<string, string> = {};
    if (query) next.q = query;
    if (categorySlug) next.category = categorySlug;
    if (pricingFilter) next.pricing = pricingFilter;
    if (sort && sort !== "trending") next.sort = sort;

    for (const [key, value] of Object.entries(overrides)) {
      if (value) {
        next[key] = value;
      } else {
        delete next[key];
      }
    }

    // Reset to page 1 when filters change (unless explicitly setting page)
    if (!("page" in overrides)) {
      delete next.page;
    }

    const qs = new URLSearchParams(next).toString();
    return `/tools${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Explore Tools
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-[var(--text-secondary)]">
          Discover the best software tools for your workflow. Filter by category,
          pricing model, or search for something specific.
        </p>
      </div>

      {/* Search */}
      <form
        action="/tools"
        method="get"
        className="mx-auto mt-8 flex max-w-xl items-center gap-2"
      >
        {/* Preserve existing filters when searching */}
        {categorySlug && (
          <input type="hidden" name="category" value={categorySlug} />
        )}
        {pricingFilter && (
          <input type="hidden" name="pricing" value={pricingFilter} />
        )}
        {sort && sort !== "trending" && (
          <input type="hidden" name="sort" value={sort} />
        )}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)]"
          />
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search tools..."
            className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-[var(--text-tertiary)] focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
          />
        </div>
        <button
          type="submit"
          className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          Search
        </button>
      </form>

      {/* Filters */}
      <div className="mt-8 space-y-4">
        {/* Sort pills */}
        <div className="flex flex-wrap items-center gap-2">
          <SlidersHorizontal
            size={16}
            className="text-[var(--text-tertiary)]"
          />
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            Sort:
          </span>
          {SORT_OPTIONS.map((option) => (
            <Link
              key={option.value}
              href={buildUrl({
                sort: option.value === "trending" ? undefined : option.value,
              })}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                sort === option.value
                  ? "bg-brand-500 text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              )}
            >
              {option.label}
            </Link>
          ))}
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            Category:
          </span>
          <Link
            href={buildUrl({ category: undefined })}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              !categorySlug
                ? "bg-brand-500 text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
            )}
          >
            All
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={buildUrl({ category: cat.slug })}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                categorySlug === cat.slug
                  ? "bg-brand-500 text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              )}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Pricing pills */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            Pricing:
          </span>
          <Link
            href={buildUrl({ pricing: undefined })}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              !pricingFilter
                ? "bg-brand-500 text-white"
                : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
            )}
          >
            All
          </Link>
          {PRICING_OPTIONS.map((option) => (
            <Link
              key={option.value}
              href={buildUrl({ pricing: option.value })}
              className={cn(
                "rounded-full px-3 py-1 text-sm font-medium transition-colors",
                pricingFilter === option.value
                  ? "bg-brand-500 text-white"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]"
              )}
            >
              {option.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="mt-6 text-sm text-[var(--text-secondary)]">
        {totalCount} {totalCount === 1 ? "tool" : "tools"} found
        {query && (
          <>
            {" "}
            for &ldquo;<span className="font-medium">{query}</span>&rdquo;
          </>
        )}
      </div>

      {/* Tool Grid */}
      {tools.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="card-hover flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-lg font-bold text-brand-500 dark:bg-brand-900/30">
                {tool.name[0]}
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-semibold">{tool.name}</h3>
                <p className="mt-0.5 text-sm text-[var(--text-secondary)] line-clamp-1">
                  {tool.tagline}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
                    {tool.category.name}
                  </span>
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-xs font-medium",
                      pricingColor(tool.pricing)
                    )}
                  >
                    {pricingLabel(tool.pricing)}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-center rounded-lg border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)]">
                <ChevronUp size={16} />
                <span className="text-xs font-semibold">
                  {tool._count.upvotes}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-[var(--text-secondary)]">
            No tools found
          </p>
          <p className="mt-2 text-sm text-[var(--text-tertiary)]">
            Try adjusting your search or filters
          </p>
          <Link
            href="/tools"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Clear all filters
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <nav className="mt-10 flex items-center justify-center gap-2">
          {currentPage > 1 && (
            <Link
              href={buildUrl({ page: String(currentPage - 1) })}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)]"
            >
              Previous
            </Link>
          )}

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // Show first, last, and pages near current
              return (
                page === 1 ||
                page === totalPages ||
                Math.abs(page - currentPage) <= 2
              );
            })
            .reduce<(number | "ellipsis")[]>((acc, page, idx, arr) => {
              if (idx > 0 && arr[idx - 1] !== undefined && page - arr[idx - 1] > 1) {
                acc.push("ellipsis");
              }
              acc.push(page);
              return acc;
            }, [])
            .map((item, idx) =>
              item === "ellipsis" ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-2 text-[var(--text-tertiary)]"
                >
                  ...
                </span>
              ) : (
                <Link
                  key={item}
                  href={buildUrl({ page: String(item) })}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors",
                    item === currentPage
                      ? "bg-brand-500 text-white"
                      : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                  )}
                >
                  {item}
                </Link>
              )
            )}

          {currentPage < totalPages && (
            <Link
              href={buildUrl({ page: String(currentPage + 1) })}
              className="rounded-lg border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:bg-[var(--bg-secondary)]"
            >
              Next
            </Link>
          )}
        </nav>
      )}
    </div>
  );
}
