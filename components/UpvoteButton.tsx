"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface UpvoteButtonProps {
  toolId: string;
  initialCount: number;
  initialUpvoted: boolean;
  size?: "sm" | "md";
}

export function UpvoteButton({
  toolId,
  initialCount,
  initialUpvoted,
  size = "md",
}: UpvoteButtonProps) {
  const { isSignedIn } = useAuth();
  const router = useRouter();
  const [upvoted, setUpvoted] = useState(initialUpvoted);
  const [count, setCount] = useState(initialCount);
  const [animating, setAnimating] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSignedIn) {
      router.push("/sign-in");
      return;
    }

    // Optimistic update
    const nextUpvoted = !upvoted;
    setUpvoted(nextUpvoted);
    setCount((prev) => (nextUpvoted ? prev + 1 : prev - 1));
    setAnimating(true);
    setTimeout(() => setAnimating(false), 300);

    try {
      const res = await fetch(`/api/tools/${toolId}/upvote`, {
        method: "POST",
      });

      if (!res.ok) {
        // Revert on failure
        setUpvoted(!nextUpvoted);
        setCount((prev) => (nextUpvoted ? prev - 1 : prev + 1));
      }
    } catch {
      // Revert on error
      setUpvoted(!nextUpvoted);
      setCount((prev) => (nextUpvoted ? prev - 1 : prev + 1));
    }
  };

  const iconSize = size === "sm" ? 14 : 18;

  return (
    <button
      onClick={handleClick}
      className={cn(
        "flex flex-col items-center justify-center rounded-lg border font-medium transition-all",
        size === "sm" && "gap-0.5 px-2 py-1.5 text-xs min-w-[40px]",
        size === "md" && "gap-0.5 px-3 py-2 text-sm min-w-[48px]",
        upvoted
          ? "border-brand-500 bg-brand-50 text-brand-500 dark:bg-brand-900/20"
          : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--border-hover)] hover:text-[var(--text-primary)]",
        animating && "upvote-animate"
      )}
      aria-label={upvoted ? "Remove upvote" : "Upvote"}
    >
      <ChevronUp size={iconSize} strokeWidth={2.5} />
      <span>{count}</span>
    </button>
  );
}
