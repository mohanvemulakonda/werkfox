import { Metadata } from "next";
import Link from "next/link";
import { Grid } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Categories",
  description:
    "Browse tools by category. Find the best software tools organized by what they do.",
};

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({
    include: {
      _count: { select: { tools: true } },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Categories
        </h1>
        <p className="mx-auto mt-3 max-w-2xl text-lg text-[var(--text-secondary)]">
          Browse tools organized by what they do. Find the perfect category for
          your workflow.
        </p>
      </div>

      {/* Category Grid */}
      {categories.length > 0 ? (
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="card-hover flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 transition-colors"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-900/30">
                <Grid size={24} />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-semibold">{category.name}</h2>
                {category.description && (
                  <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
                    {category.description}
                  </p>
                )}
                <p className="mt-2 text-sm font-medium text-brand-500">
                  {category._count.tools}{" "}
                  {category._count.tools === 1 ? "tool" : "tools"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-lg font-medium text-[var(--text-secondary)]">
            No categories found
          </p>
          <p className="mt-2 text-sm text-[var(--text-tertiary)]">
            Categories will appear here once they are created.
          </p>
        </div>
      )}
    </div>
  );
}
