import { cn } from "@/lib/utils";
import { pricingLabel, pricingColor } from "@/lib/utils";

interface PricingBadgeProps {
  pricing: string;
  className?: string;
}

export function PricingBadge({ pricing, className }: PricingBadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium",
        pricingColor(pricing),
        className
      )}
    >
      {pricingLabel(pricing)}
    </span>
  );
}
