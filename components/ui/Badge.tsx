import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  default:
    "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]",
  brand:
    "bg-brand-100 text-brand-700 dark:bg-brand-900/30 dark:text-brand-400",
  success:
    "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
  warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  destructive:
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
} as const;

export interface BadgeProps {
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
}

function Badge({ variant = "default", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium whitespace-nowrap",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

export { Badge };
