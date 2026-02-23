"use client";

import { useState } from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md";
  interactive?: boolean;
  onChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  interactive = false,
  onChange,
}: StarRatingProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  const iconSize = size === "sm" ? 14 : 18;
  const displayRating = hovered !== null ? hovered : rating;

  return (
    <div
      className={cn("flex items-center", size === "sm" ? "gap-0.5" : "gap-1")}
      onMouseLeave={() => interactive && setHovered(null)}
    >
      {Array.from({ length: maxRating }, (_, i) => {
        const starIndex = i + 1;
        const filled = starIndex <= displayRating;

        return (
          <button
            key={i}
            type="button"
            disabled={!interactive}
            onClick={() => interactive && onChange?.(starIndex)}
            onMouseEnter={() => interactive && setHovered(starIndex)}
            className={cn(
              "transition-colors",
              interactive
                ? "cursor-pointer hover:scale-110 transition-transform"
                : "cursor-default",
              filled
                ? "fill-brand-400 text-brand-400"
                : "text-[var(--border)]"
            )}
            aria-label={`${starIndex} star${starIndex !== 1 ? "s" : ""}`}
          >
            <Star
              size={iconSize}
              fill={filled ? "currentColor" : "none"}
              strokeWidth={filled ? 0 : 1.5}
            />
          </button>
        );
      })}
    </div>
  );
}
