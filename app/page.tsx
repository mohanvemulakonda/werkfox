import Link from "next/link";
import {
  ArrowRight,
  Rocket,
  TrendingUp,
  Star,
  Search,
  Zap,
  Shield,
  Code,
  Palette,
  BarChart3,
  MessageSquare,
  Globe,
} from "lucide-react";

const FEATURED_CATEGORIES = [
  { name: "Developer Tools", icon: Code, slug: "developer-tools", count: 12 },
  { name: "Design", icon: Palette, slug: "design", count: 8 },
  { name: "Analytics", icon: BarChart3, slug: "analytics", count: 6 },
  { name: "Communication", icon: MessageSquare, slug: "communication", count: 9 },
  { name: "Security", icon: Shield, slug: "security", count: 5 },
  { name: "Hosting", icon: Globe, slug: "hosting", count: 7 },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-orange-50 dark:from-brand-900/20 dark:via-[var(--bg)] dark:to-orange-900/10" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-sm font-medium text-brand-700 dark:border-brand-800 dark:bg-brand-900/30 dark:text-brand-400">
              <Zap size={14} />
              Discover tools that power the best teams
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Find the{" "}
              <span className="gradient-text">perfect tools</span>
              <br />
              for your stack
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)]">
              Explore thousands of tools, upvote your favorites, read honest
              reviews, and discover alternatives. The community-driven product
              directory.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-brand-500/25 hover:bg-brand-600 transition-all hover:shadow-xl hover:shadow-brand-500/30"
              >
                <Search size={18} />
                Explore Tools
              </Link>
              <Link
                href="/submit"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--bg)] px-6 py-3 text-base font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
              >
                <Rocket size={18} />
                Submit Your Tool
              </Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-8">
            {[
              { label: "Tools Listed", value: "500+" },
              { label: "Community Upvotes", value: "10K+" },
              { label: "Reviews", value: "2K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Launches */}
      <section className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-600 dark:bg-brand-900/30 dark:text-brand-400">
                <Rocket size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Today&apos;s Launches</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Fresh tools just submitted
                </p>
              </div>
            </div>
            <Link
              href="/tools?sort=new"
              className="flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder cards — replaced when DB is seeded */}
            {[
              { name: "Vercel", tagline: "Develop. Preview. Ship.", category: "Hosting" },
              { name: "Figma", tagline: "Where teams design together", category: "Design" },
              { name: "Notion", tagline: "Your connected workspace", category: "Productivity" },
              { name: "Linear", tagline: "Streamline issues & projects", category: "Developer Tools" },
              { name: "Raycast", tagline: "Your shortcut to everything", category: "Productivity" },
              { name: "Supabase", tagline: "Open source Firebase alternative", category: "Developer Tools" },
            ].map((tool) => (
              <div
                key={tool.name}
                className="card-hover flex items-start gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--bg-secondary)] text-lg font-bold text-brand-500">
                  {tool.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-[var(--text-primary)]">
                    {tool.name}
                  </h3>
                  <p className="mt-0.5 text-sm text-[var(--text-secondary)] line-clamp-1">
                    {tool.tagline}
                  </p>
                  <span className="mt-2 inline-block rounded-full bg-[var(--bg-secondary)] px-2 py-0.5 text-xs font-medium text-[var(--text-secondary)]">
                    {tool.category}
                  </span>
                </div>
                <button className="flex flex-col items-center rounded-lg border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)] hover:border-brand-300 hover:text-brand-500 transition-colors">
                  <TrendingUp size={16} />
                  <span className="mt-0.5 text-xs font-semibold">
                    {Math.floor(Math.random() * 100 + 20)}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400">
                <TrendingUp size={20} />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Trending This Week</h2>
                <p className="text-sm text-[var(--text-secondary)]">
                  Most upvoted tools this week
                </p>
              </div>
            </div>
            <Link
              href="/tools?sort=trending"
              className="flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>

          <div className="mt-8 space-y-3">
            {[
              { rank: 1, name: "Cursor", tagline: "The AI Code Editor", votes: 284, category: "Developer Tools" },
              { rank: 2, name: "v0 by Vercel", tagline: "Generate UI with AI", votes: 231, category: "AI" },
              { rank: 3, name: "Framer", tagline: "Ship sites, fast", votes: 198, category: "Design" },
              { rank: 4, name: "Resend", tagline: "Email for developers", votes: 167, category: "Developer Tools" },
              { rank: 5, name: "Cal.com", tagline: "Scheduling for everyone", votes: 145, category: "Productivity" },
            ].map((tool) => (
              <div
                key={tool.rank}
                className="card-hover flex items-center gap-4 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-4"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--bg-secondary)] text-sm font-bold text-[var(--text-secondary)]">
                  #{tool.rank}
                </span>
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--bg-secondary)] font-bold text-brand-500">
                  {tool.name[0]}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{tool.name}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    {tool.tagline}
                  </p>
                </div>
                <span className="hidden rounded-full bg-[var(--bg-secondary)] px-2.5 py-0.5 text-xs font-medium text-[var(--text-secondary)] sm:inline">
                  {tool.category}
                </span>
                <button className="flex flex-col items-center rounded-lg border border-[var(--border)] px-3 py-2 text-[var(--text-secondary)] hover:border-brand-300 hover:text-brand-500 transition-colors">
                  <TrendingUp size={16} />
                  <span className="mt-0.5 text-xs font-semibold">
                    {tool.votes}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-[var(--border)] bg-[var(--bg)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Browse by Category</h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Find tools organized by what they do
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {FEATURED_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.slug}
                  href={`/categories/${cat.slug}`}
                  className="card-hover flex flex-col items-center gap-3 rounded-xl border border-[var(--border)] bg-[var(--bg)] p-6 text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-900/30">
                    <Icon size={24} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{cat.name}</div>
                    <div className="mt-0.5 text-xs text-[var(--text-tertiary)]">
                      {cat.count} tools
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/categories"
              className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 hover:text-brand-600"
            >
              View all categories <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-600">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Built something awesome?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">
            Submit your tool and get it in front of thousands of makers,
            developers, and early adopters.
          </p>
          <Link
            href="/submit"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-base font-semibold text-brand-600 shadow-lg hover:bg-brand-50 transition-colors"
          >
            <Rocket size={18} />
            Submit Your Tool
          </Link>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[var(--bg-secondary)]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Recent Reviews</h2>
            <p className="mt-2 text-[var(--text-secondary)]">
              Hear what the community thinks
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { tool: "Vercel", user: "Sarah K.", rating: 5, text: "Best deployment platform ever. Push to git and it just works. The DX is unmatched." },
              { tool: "Figma", user: "Mike L.", rating: 5, text: "Completely changed how our team collaborates on design. No more file versioning nightmares." },
              { tool: "Linear", user: "Alex R.", rating: 4, text: "Finally an issue tracker that's fast and enjoyable to use. The keyboard shortcuts are chef's kiss." },
            ].map((review) => (
              <div
                key={review.tool}
                className="rounded-xl border border-[var(--border)] bg-[var(--bg)] p-5"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < review.rating
                          ? "fill-brand-400 text-brand-400"
                          : "text-[var(--border)]"
                      }
                    />
                  ))}
                </div>
                <p className="mt-3 text-sm text-[var(--text-secondary)] line-clamp-3">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="font-medium">{review.user}</span>
                  <span className="text-[var(--text-tertiary)]">
                    on{" "}
                    <span className="font-medium text-[var(--text-secondary)]">
                      {review.tool}
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
