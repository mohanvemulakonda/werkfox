export function cn(...classes: (string | boolean | undefined | null)[]) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const then = new Date(date);
  const seconds = Math.floor((now.getTime() - then.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return formatDate(date);
}

export function trendingScore(upvotes: number, launchDate: Date): number {
  const hours =
    (Date.now() - new Date(launchDate).getTime()) / (1000 * 60 * 60);
  return upvotes / Math.pow(hours + 2, 1.8);
}

export function pricingLabel(pricing: string): string {
  const map: Record<string, string> = {
    FREE: "Free",
    FREEMIUM: "Freemium",
    PAID: "Paid",
    OPEN_SOURCE: "Open Source",
    CONTACT: "Contact for Pricing",
  };
  return map[pricing] ?? pricing;
}

export function pricingColor(pricing: string): string {
  const map: Record<string, string> = {
    FREE: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
    FREEMIUM:
      "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    PAID: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    OPEN_SOURCE:
      "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    CONTACT:
      "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  };
  return map[pricing] ?? "";
}
