import Link from "next/link";
import { cn } from "@/lib/utils";

interface CategoryBadgeProps {
  name: string;
  slug?: string;
  className?: string;
}

export function CategoryBadge({ name, slug, className }: CategoryBadgeProps) {
  const baseClasses = cn(
    "inline-block rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)] transition-colors",
    slug && "hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]",
    className
  );

  if (slug) {
    return (
      <Link href={`/categories/${slug}`} className={baseClasses}>
        {name}
      </Link>
    );
  }

  return <span className={baseClasses}>{name}</span>;
}
