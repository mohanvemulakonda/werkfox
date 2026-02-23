import { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { PricingBadge } from "@/components/PricingBadge";
import {
  ExternalLink,
  ChevronUp,
  Star,
  Calendar,
  Tag,
  Layers,
  DollarSign,
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug1: string; slug2: string }>;
}

async function getTool(slug: string) {
  return prisma.tool.findUnique({
    where: { slug },
    include: {
      category: { select: { name: true, slug: true } },
      _count: { select: { upvotes: true, reviews: true } },
      reviews: { select: { rating: true } },
    },
  });
}

function avgRating(reviews: { rating: number }[]): number {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug1, slug2 } = await params;
  const [tool1, tool2] = await Promise.all([getTool(slug1), getTool(slug2)]);

  if (!tool1 || !tool2) {
    return { title: "Comparison Not Found" };
  }

  return {
    title: `Compare ${tool1.name} vs ${tool2.name}`,
    description: `Side-by-side comparison of ${tool1.name} and ${tool2.name}. Compare pricing, features, ratings, and more on ToolsFinder.`,
    openGraph: {
      title: `${tool1.name} vs ${tool2.name} | ToolsFinder`,
      description: `Compare ${tool1.name} and ${tool2.name} side by side.`,
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug1, slug2 } = await params;
  const [tool1, tool2] = await Promise.all([getTool(slug1), getTool(slug2)]);

  if (!tool1 || !tool2) notFound();

  const tools = [tool1, tool2];
  const ratings = tools.map((t) => avgRating(t.reviews));

  const rows: {
    label: string;
    icon: React.ReactNode;
    values: [React.ReactNode, React.ReactNode];
  }[] = [
    {
      label: "Tagline",
      icon: <Tag size={16} />,
      values: [tool1.tagline, tool2.tagline],
    },
    {
      label: "Category",
      icon: <Layers size={16} />,
      values: [tool1.category.name, tool2.category.name],
    },
    {
      label: "Pricing",
      icon: <DollarSign size={16} />,
      values: [
        <PricingBadge key="p1" pricing={tool1.pricing} />,
        <PricingBadge key="p2" pricing={tool2.pricing} />,
      ],
    },
    {
      label: "Upvotes",
      icon: <ChevronUp size={16} />,
      values: [
        <span key="u1" className="font-semibold text-brand-500">
          {tool1._count.upvotes}
        </span>,
        <span key="u2" className="font-semibold text-brand-500">
          {tool2._count.upvotes}
        </span>,
      ],
    },
    {
      label: "Avg. Rating",
      icon: <Star size={16} />,
      values: [
        <span key="r1" className="flex items-center gap-1">
          <Star
            size={14}
            className={ratings[0] > 0 ? "fill-brand-400 text-brand-400" : "text-[var(--border)]"}
          />
          {ratings[0] > 0 ? ratings[0].toFixed(1) : "N/A"}
          <span className="text-xs text-[var(--text-tertiary)]">
            ({tool1._count.reviews})
          </span>
        </span>,
        <span key="r2" className="flex items-center gap-1">
          <Star
            size={14}
            className={ratings[1] > 0 ? "fill-brand-400 text-brand-400" : "text-[var(--border)]"}
          />
          {ratings[1] > 0 ? ratings[1].toFixed(1) : "N/A"}
          <span className="text-xs text-[var(--text-tertiary)]">
            ({tool2._count.reviews})
          </span>
        </span>,
      ],
    },
    {
      label: "Launch Date",
      icon: <Calendar size={16} />,
      values: [formatDate(tool1.launchDate), formatDate(tool2.launchDate)],
    },
  ];

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:py-14">
      {/* Header */}
      <div className="mb-10 text-center">
        <h1 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
          {tool1.name}{" "}
          <span className="text-[var(--text-tertiary)]">vs</span>{" "}
          {tool2.name}
        </h1>
        <p className="mt-2 text-[var(--text-secondary)]">
          Side-by-side comparison to help you choose the right tool.
        </p>
      </div>

      {/* Tool Headers */}
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="flex flex-col items-center rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 text-center"
          >
            {tool.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={tool.logo}
                alt={tool.name}
                className="h-16 w-16 rounded-xl object-cover"
              />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-brand-100 text-2xl font-bold text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                {tool.name.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="mt-3 text-lg font-bold text-[var(--text-primary)]">
              {tool.name}
            </h2>
            <p className="mt-1 text-sm text-[var(--text-secondary)] line-clamp-2">
              {tool.tagline}
            </p>
            <a
              href={tool.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
            >
              <ExternalLink size={14} />
              Visit Website
            </a>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <div className="mt-8 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--bg)]">
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`grid grid-cols-[1fr_1fr_1fr] items-center gap-4 px-4 py-4 sm:px-6 ${
              i !== rows.length - 1 ? "border-b border-[var(--border)]" : ""
            } ${i % 2 === 0 ? "bg-[var(--bg)]" : "bg-[var(--bg-secondary)]"}`}
          >
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
              <span className="text-[var(--text-tertiary)]">{row.icon}</span>
              {row.label}
            </div>
            <div className="text-center text-sm text-[var(--text-primary)]">
              {row.values[0]}
            </div>
            <div className="text-center text-sm text-[var(--text-primary)]">
              {row.values[1]}
            </div>
          </div>
        ))}
      </div>

      {/* Descriptions */}
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6"
          >
            <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">
              About {tool.name}
            </h3>
            <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
              {tool.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
