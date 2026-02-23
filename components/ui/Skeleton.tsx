import { cn } from "@/lib/utils";

export interface SkeletonProps {
  className?: string;
}

function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded bg-[var(--bg-tertiary)]",
        className
      )}
      aria-hidden="true"
    />
  );
}

export { Skeleton };
