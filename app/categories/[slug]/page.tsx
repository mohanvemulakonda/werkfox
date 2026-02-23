import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronUp, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { cn, pricingLabel, pricingColor } from "@/lib/utils";
import { ToolStatus } from "@prisma/client";

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      tools: {
        where: { status: ToolStatus.APPROVED },
        include: {
          category: true,
          _count: { select: { upvotes: true } },
        },
        orderBy: { upvotes: { _count: "desc" } },
      },
      _count: { select: { tools: true } },
    },
  });

  return category;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    return { title: "Category Not Found" };
  }

  return {
    title: `${category.name} Tools`,
    description:
      category.description ??
      `Explore the best ${category.name} tools on ToolsFinder.`,
    openGraph: {
      title: `${category.name} Tools | ToolsFinder`,
      description:
        category.description ??
        `Explore the best ${category.name} tools on ToolsFinder.`,
      url: `https://toolsfinder.io/categories/${category.slug}`,
      type: "website",
    },
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategory(slug);

  if (!category) {
    notFound();
  }

  // Filter to only APPROVED tools for the count display
  const approvedTools = category.tools;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <Link
        href="/categories"
        className="inline-flex items-center gap-1 text-sm font-medium text-[var(--text-secondary)] transition-colors hover:text-brand-500"
      >
        <ArrowLeft size={14} />
        All Categories
      </Link>

      {/* Header */}
      <div className="mt-6">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {category.name}
        </h1>
        {category.description && (
          <p className="mt-3 max-w-2xl text-lg text-[var(--text-secondary)]">
            {category.description}
          </p>
        )}
        <p className="mt-2 text-sm text-[var(--text-tertiary)]">
          {approvedTools.length}{" "}
          {approvedTools.length === 1 ? "tool" : "tools"} in this category
        </p>
      </div>

      {/* Tools Grid */}
      {approvedTools.length > 0 ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {approvedTools.map((tool) => (
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
            No tools in this category yet
          </p>
          <p className="mt-2 text-sm text-[var(--text-tertiary)]">
            Be the first to submit a tool in {category.name}!
          </p>
          <Link
            href="/submit"
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Submit a Tool
          </Link>
        </div>
      )}
    </div>
  );
}
