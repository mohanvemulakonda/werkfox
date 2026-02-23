import { PrismaClient, Pricing, ToolStatus, Role } from "@prisma/client";

const prisma = new PrismaClient();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Return a random date between two dates */
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

/** Pick N random items from an array */
function pickRandom<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

// ---------------------------------------------------------------------------
// Data definitions
// ---------------------------------------------------------------------------

const USERS = [
  {
    clerkId: "seed_admin",
    email: "admin@toolsfinder.io",
    username: "toolsfinder",
    name: "ToolsFinder Team",
    bio: "The team behind ToolsFinder.io — discover the best tools for builders.",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=TF",
    website: "https://toolsfinder.io",
    twitter: "toolsfinder",
    github: "toolsfinder",
    role: Role.ADMIN,
  },
  {
    clerkId: "seed_user_1",
    email: "alex@example.com",
    username: "alexdev",
    name: "Alex Chen",
    bio: "Full-stack developer and tool enthusiast.",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AC",
    role: Role.USER,
  },
  {
    clerkId: "seed_user_2",
    email: "sarah@example.com",
    username: "sarahbuilds",
    name: "Sarah Johnson",
    bio: "Designer and indie hacker. Building in public.",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SJ",
    role: Role.USER,
  },
  {
    clerkId: "seed_user_3",
    email: "mike@example.com",
    username: "mikeops",
    name: "Mike Rivera",
    bio: "DevOps engineer. Automation is my passion.",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=MR",
    role: Role.USER,
  },
  {
    clerkId: "seed_user_4",
    email: "priya@example.com",
    username: "priyacode",
    name: "Priya Sharma",
    bio: "Frontend developer. React & Next.js enthusiast.",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=PS",
    role: Role.USER,
  },
  {
    clerkId: "seed_user_5",
    email: "emma@example.com",
    username: "emmawrites",
    name: "Emma Wilson",
    bio: "Product manager with a passion for developer experience.",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=EW",
    role: Role.USER,
  },
];

const CATEGORIES = [
  {
    name: "Developer Tools",
    slug: "developer-tools",
    description: "Tools that help developers write, debug, and ship code faster.",
    icon: "Code2",
    color: "#3B82F6",
  },
  {
    name: "Design",
    slug: "design",
    description: "Design tools for creating beautiful interfaces, graphics, and prototypes.",
    icon: "Palette",
    color: "#EC4899",
  },
  {
    name: "Productivity",
    slug: "productivity",
    description: "Tools to help you organize, plan, and get more done.",
    icon: "Zap",
    color: "#F59E0B",
  },
  {
    name: "AI & Machine Learning",
    slug: "ai-machine-learning",
    description: "Artificial intelligence and machine learning tools and platforms.",
    icon: "Brain",
    color: "#8B5CF6",
  },
  {
    name: "Analytics",
    slug: "analytics",
    description: "Tools for tracking, measuring, and analyzing data and user behavior.",
    icon: "BarChart3",
    color: "#06B6D4",
  },
  {
    name: "Communication",
    slug: "communication",
    description: "Tools for team communication, messaging, and collaboration.",
    icon: "MessageSquare",
    color: "#10B981",
  },
  {
    name: "Marketing",
    slug: "marketing",
    description: "Tools for marketing automation, email campaigns, and growth.",
    icon: "Megaphone",
    color: "#F97316",
  },
  {
    name: "Sales",
    slug: "sales",
    description: "Tools for managing sales pipelines, outreach, and revenue.",
    icon: "TrendingUp",
    color: "#EF4444",
  },
  {
    name: "Finance",
    slug: "finance",
    description: "Payment processing, invoicing, and financial management tools.",
    icon: "DollarSign",
    color: "#22C55E",
  },
  {
    name: "HR & Recruiting",
    slug: "hr-recruiting",
    description: "Tools for hiring, onboarding, and managing teams.",
    icon: "Users",
    color: "#A855F7",
  },
  {
    name: "Project Management",
    slug: "project-management",
    description: "Tools for planning, tracking, and managing projects and workflows.",
    icon: "KanbanSquare",
    color: "#6366F1",
  },
  {
    name: "Security",
    slug: "security",
    description: "Tools for application security, authentication, and data protection.",
    icon: "Shield",
    color: "#DC2626",
  },
  {
    name: "Cloud & Hosting",
    slug: "cloud-hosting",
    description: "Cloud platforms, hosting services, and deployment tools.",
    icon: "Cloud",
    color: "#0EA5E9",
  },
  {
    name: "Database",
    slug: "database",
    description: "Database platforms, ORMs, and data management tools.",
    icon: "Database",
    color: "#14B8A6",
  },
  {
    name: "No-Code",
    slug: "no-code",
    description: "Build websites, apps, and automations without writing code.",
    icon: "MousePointerClick",
    color: "#D946EF",
  },
  {
    name: "E-commerce",
    slug: "e-commerce",
    description: "Tools for building and managing online stores and digital commerce.",
    icon: "ShoppingCart",
    color: "#F43F5E",
  },
  {
    name: "Education",
    slug: "education",
    description: "Learning platforms, course tools, and educational resources.",
    icon: "GraduationCap",
    color: "#0D9488",
  },
  {
    name: "Health & Fitness",
    slug: "health-fitness",
    description: "Tools for health tracking, fitness, and wellness.",
    icon: "Heart",
    color: "#E11D48",
  },
  {
    name: "Entertainment",
    slug: "entertainment",
    description: "Media, streaming, gaming, and entertainment platforms.",
    icon: "Film",
    color: "#7C3AED",
  },
  {
    name: "Social Media",
    slug: "social-media",
    description: "Social networking, content scheduling, and community management tools.",
    icon: "Share2",
    color: "#2563EB",
  },
];

const TAGS = [
  { name: "Open Source", slug: "open-source" },
  { name: "AI-Powered", slug: "ai-powered" },
  { name: "Real-time", slug: "real-time" },
  { name: "API-first", slug: "api-first" },
  { name: "Self-hosted", slug: "self-hosted" },
  { name: "Team Collaboration", slug: "team-collaboration" },
  { name: "Free Tier", slug: "free-tier" },
  { name: "Enterprise", slug: "enterprise" },
  { name: "Mobile", slug: "mobile" },
  { name: "Desktop", slug: "desktop" },
  { name: "Browser Extension", slug: "browser-extension" },
  { name: "CLI", slug: "cli" },
  { name: "SaaS", slug: "saas" },
  { name: "Marketplace", slug: "marketplace" },
  { name: "Integration", slug: "integration" },
  { name: "React", slug: "react" },
  { name: "TypeScript", slug: "typescript" },
  { name: "Serverless", slug: "serverless" },
  { name: "Full-Stack", slug: "full-stack" },
  { name: "DevOps", slug: "devops" },
];

interface ToolSeed {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  website: string;
  logoDomain: string;
  pricing: Pricing;
  featured: boolean;
  category: string; // slug
  tags: string[]; // slugs
}

const TOOLS: ToolSeed[] = [
  // ---- Cloud & Hosting ----
  {
    name: "Vercel",
    slug: "vercel",
    tagline: "Develop. Preview. Ship.",
    description:
      "Vercel is a cloud platform for frontend developers, providing the speed and reliability innovators need to create at the moment of inspiration. It enables teams to iterate quickly and develop, preview, and ship delightful user experiences.",
    website: "https://vercel.com",
    logoDomain: "vercel.com",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "cloud-hosting",
    tags: ["saas", "cli", "serverless", "integration"],
  },
  {
    name: "Netlify",
    slug: "netlify",
    tagline: "The fastest way to combine your favorite tools and APIs to build the fastest sites.",
    description:
      "Netlify is an all-in-one platform for automating modern web projects. It replaces your hosting infrastructure, continuous integration, and deployment pipeline with a single workflow. Integrate dynamic functionality like serverless functions and identity management.",
    website: "https://netlify.com",
    logoDomain: "netlify.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "cloud-hosting",
    tags: ["saas", "cli", "serverless", "free-tier"],
  },
  {
    name: "Railway",
    slug: "railway",
    tagline: "Infrastructure, instantly.",
    description:
      "Railway is an infrastructure platform where you can provision infrastructure, develop with that infrastructure locally, and then deploy to the cloud. It supports databases, cron jobs, and long-running services out of the box with zero configuration.",
    website: "https://railway.app",
    logoDomain: "railway.app",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "cloud-hosting",
    tags: ["saas", "cli", "serverless"],
  },

  // ---- Design ----
  {
    name: "Figma",
    slug: "figma",
    tagline: "The collaborative interface design tool.",
    description:
      "Figma is a cloud-based design tool that is similar in functionality and features to Sketch, but with added collaboration features. It enables teams to design, prototype, and gather feedback all in one place, making it the industry standard for UI/UX design.",
    website: "https://figma.com",
    logoDomain: "figma.com",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "design",
    tags: ["team-collaboration", "real-time", "browser-extension", "free-tier"],
  },
  {
    name: "Canva",
    slug: "canva",
    tagline: "Design anything. Publish anywhere.",
    description:
      "Canva is a free-to-use online graphic design tool that empowers anyone to create professional-quality visual content. It offers thousands of templates, stock photos, and design elements for social media, presentations, posters, and more.",
    website: "https://canva.com",
    logoDomain: "canva.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "design",
    tags: ["saas", "free-tier", "mobile"],
  },
  {
    name: "Framer",
    slug: "framer",
    tagline: "Design and ship your dream site. Zero code, maximum speed.",
    description:
      "Framer is a no-code website builder that combines a powerful design tool with production-grade hosting. It lets designers and developers create responsive, animated websites with real CMS, localization, and SEO features built in.",
    website: "https://framer.com",
    logoDomain: "framer.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "design",
    tags: ["saas", "real-time"],
  },

  // ---- Productivity ----
  {
    name: "Notion",
    slug: "notion",
    tagline: "The all-in-one workspace for your notes, tasks, wikis, and databases.",
    description:
      "Notion is an all-in-one productivity and collaboration tool that combines notes, docs, project management, and wikis. It features a flexible block-based editor that lets you build custom workflows and knowledge bases for any team.",
    website: "https://notion.so",
    logoDomain: "notion.so",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "productivity",
    tags: ["team-collaboration", "api-first", "free-tier"],
  },
  {
    name: "Cal.com",
    slug: "cal-com",
    tagline: "Scheduling infrastructure for everyone.",
    description:
      "Cal.com is an open-source scheduling platform that makes it easy to schedule meetings without the back-and-forth emails. It integrates with Google Calendar, Outlook, and other tools, with features like round-robin scheduling and team availability.",
    website: "https://cal.com",
    logoDomain: "cal.com",
    pricing: Pricing.OPEN_SOURCE,
    featured: false,
    category: "productivity",
    tags: ["open-source", "self-hosted", "api-first"],
  },
  {
    name: "Raycast",
    slug: "raycast",
    tagline: "Your shortcut to everything.",
    description:
      "Raycast is a blazingly fast, totally extendable launcher that lets you complete tasks, calculate, share common links, and much more. It replaces Spotlight on macOS with a powerful command palette and extensible plugin ecosystem.",
    website: "https://raycast.com",
    logoDomain: "raycast.com",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "productivity",
    tags: ["desktop", "integration", "free-tier"],
  },

  // ---- Project Management ----
  {
    name: "Linear",
    slug: "linear",
    tagline: "The issue tracking tool you'll enjoy using.",
    description:
      "Linear is a modern project management and issue tracking tool built for speed. It features keyboard-first design, automatic workflows, and a beautiful interface that makes project management feel effortless for software teams.",
    website: "https://linear.app",
    logoDomain: "linear.app",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "project-management",
    tags: ["team-collaboration", "integration", "saas"],
  },

  // ---- Communication ----
  {
    name: "Slack",
    slug: "slack",
    tagline: "Where work happens.",
    description:
      "Slack is a messaging platform for teams that brings all your communication and tools together. It organizes conversations into channels, supports direct messaging, and integrates with thousands of apps to streamline your workflow.",
    website: "https://slack.com",
    logoDomain: "slack.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "communication",
    tags: ["team-collaboration", "integration", "enterprise", "mobile"],
  },
  {
    name: "Discord",
    slug: "discord",
    tagline: "Your place to talk and hang out.",
    description:
      "Discord is a free communications app that lets you share voice, video, and text chat with friends, game communities, and developers. It features servers, channels, and bots that make it ideal for community building and team collaboration.",
    website: "https://discord.com",
    logoDomain: "discord.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "communication",
    tags: ["free-tier", "team-collaboration", "mobile", "desktop"],
  },
  {
    name: "Zoom",
    slug: "zoom",
    tagline: "One platform to connect.",
    description:
      "Zoom is a video communications platform that provides video conferencing, online meetings, chat, and mobile collaboration. It offers reliable HD video and audio with tools for webinars, virtual events, and phone systems.",
    website: "https://zoom.us",
    logoDomain: "zoom.us",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "communication",
    tags: ["saas", "enterprise", "mobile", "integration"],
  },
  {
    name: "Postmark",
    slug: "postmark",
    tagline: "Reliable email delivery for your app.",
    description:
      "Postmark is a fast and reliable transactional email service built for developers. It delivers emails in seconds, not minutes, with detailed delivery stats and a simple API that makes integration straightforward.",
    website: "https://postmarkapp.com",
    logoDomain: "postmarkapp.com",
    pricing: Pricing.PAID,
    featured: false,
    category: "communication",
    tags: ["api-first", "saas"],
  },

  // ---- Developer Tools ----
  {
    name: "GitHub",
    slug: "github",
    tagline: "Where the world builds software.",
    description:
      "GitHub is a development platform inspired by the way you work. From open source to business, you can host and review code, manage projects, and build software alongside millions of other developers.",
    website: "https://github.com",
    logoDomain: "github.com",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "developer-tools",
    tags: ["open-source", "team-collaboration", "cli", "marketplace"],
  },
  {
    name: "VS Code",
    slug: "vs-code",
    tagline: "Code editing. Redefined.",
    description:
      "Visual Studio Code is a free, open-source code editor made by Microsoft. It includes support for debugging, embedded Git control, syntax highlighting, intelligent code completion, snippets, and code refactoring with a rich extension ecosystem.",
    website: "https://code.visualstudio.com",
    logoDomain: "code.visualstudio.com",
    pricing: Pricing.OPEN_SOURCE,
    featured: true,
    category: "developer-tools",
    tags: ["open-source", "desktop", "marketplace", "free-tier"],
  },
  {
    name: "Cursor",
    slug: "cursor",
    tagline: "The AI-first code editor.",
    description:
      "Cursor is an AI-powered code editor built on top of VS Code. It features intelligent code completion, natural language editing, and codebase-aware chat that understands your entire project context to help you write code faster.",
    website: "https://cursor.com",
    logoDomain: "cursor.com",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "developer-tools",
    tags: ["ai-powered", "desktop", "free-tier"],
  },
  {
    name: "Resend",
    slug: "resend",
    tagline: "Email for developers.",
    description:
      "Resend is a modern email API built for developers. It provides a simple, elegant API for sending transactional emails with React Email components, making it easy to build beautiful, responsive emails with the tools you already know.",
    website: "https://resend.com",
    logoDomain: "resend.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "developer-tools",
    tags: ["api-first", "free-tier", "react", "integration"],
  },
  {
    name: "Tailwind CSS",
    slug: "tailwind-css",
    tagline: "Rapidly build modern websites without ever leaving your HTML.",
    description:
      "Tailwind CSS is a utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup. It provides low-level utility classes that let you build completely custom designs without leaving your HTML.",
    website: "https://tailwindcss.com",
    logoDomain: "tailwindcss.com",
    pricing: Pricing.OPEN_SOURCE,
    featured: true,
    category: "developer-tools",
    tags: ["open-source", "cli", "free-tier"],
  },
  {
    name: "shadcn/ui",
    slug: "shadcn-ui",
    tagline: "Beautifully designed components that you can copy and paste into your apps.",
    description:
      "shadcn/ui is a collection of re-usable components built using Radix UI and Tailwind CSS. It is not a component library but a collection of components you own and customize, providing accessible and beautiful UI primitives.",
    website: "https://ui.shadcn.com",
    logoDomain: "ui.shadcn.com",
    pricing: Pricing.OPEN_SOURCE,
    featured: false,
    category: "developer-tools",
    tags: ["open-source", "react", "free-tier"],
  },
  {
    name: "Clerk",
    slug: "clerk",
    tagline: "The most comprehensive user management platform.",
    description:
      "Clerk is a complete user management and authentication platform that provides embeddable UIs, flexible APIs, and admin dashboards. It handles sign-up, sign-in, multi-factor authentication, and user profiles out of the box.",
    website: "https://clerk.com",
    logoDomain: "clerk.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "developer-tools",
    tags: ["api-first", "react", "integration", "free-tier"],
  },
  {
    name: "Next.js",
    slug: "nextjs",
    tagline: "The React Framework for the Web.",
    description:
      "Next.js is a React framework that enables server-side rendering, static site generation, and API routes. Built by Vercel, it provides a best-in-class developer experience with features like file-based routing, image optimization, and incremental static regeneration.",
    website: "https://nextjs.org",
    logoDomain: "nextjs.org",
    pricing: Pricing.OPEN_SOURCE,
    featured: true,
    category: "developer-tools",
    tags: ["open-source", "react", "typescript", "full-stack", "cli"],
  },
  {
    name: "Remix",
    slug: "remix",
    tagline: "Build better websites with Remix.",
    description:
      "Remix is a full-stack web framework built on web standards that focuses on user experience and progressive enhancement. It provides nested routing, optimistic UI, error boundaries, and excellent data loading patterns.",
    website: "https://remix.run",
    logoDomain: "remix.run",
    pricing: Pricing.OPEN_SOURCE,
    featured: false,
    category: "developer-tools",
    tags: ["open-source", "react", "full-stack", "cli"],
  },
  {
    name: "Astro",
    slug: "astro",
    tagline: "The web framework for content-driven websites.",
    description:
      "Astro is a modern web framework that lets you build faster websites with less client-side JavaScript. It features an island architecture that allows you to use any UI framework while shipping zero JavaScript by default.",
    website: "https://astro.build",
    logoDomain: "astro.build",
    pricing: Pricing.OPEN_SOURCE,
    featured: false,
    category: "developer-tools",
    tags: ["open-source", "cli", "free-tier"],
  },
  {
    name: "Doppler",
    slug: "doppler",
    tagline: "The #1 SecretOps platform.",
    description:
      "Doppler is a universal secrets manager that helps developers and security teams manage environment variables and secrets across all their applications, environments, and infrastructure in one centralized dashboard.",
    website: "https://doppler.com",
    logoDomain: "doppler.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "developer-tools",
    tags: ["saas", "cli", "devops", "integration"],
  },
  {
    name: "Sentry",
    slug: "sentry",
    tagline: "Application monitoring for every developer.",
    description:
      "Sentry is an application monitoring platform that helps developers identify, triage, and resolve errors and performance issues in real-time. It provides detailed stack traces, breadcrumbs, and contextual data to fix bugs faster.",
    website: "https://sentry.io",
    logoDomain: "sentry.io",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "developer-tools",
    tags: ["open-source", "devops", "integration", "free-tier"],
  },

  // ---- Database ----
  {
    name: "Supabase",
    slug: "supabase",
    tagline: "The open source Firebase alternative.",
    description:
      "Supabase is an open-source Firebase alternative that provides a Postgres database, authentication, instant APIs, edge functions, real-time subscriptions, and storage. It gives you everything you need to build a modern backend.",
    website: "https://supabase.com",
    logoDomain: "supabase.com",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "database",
    tags: ["open-source", "api-first", "real-time", "self-hosted", "serverless"],
  },
  {
    name: "PlanetScale",
    slug: "planetscale",
    tagline: "The world's most advanced serverless MySQL platform.",
    description:
      "PlanetScale is a MySQL-compatible serverless database platform powered by Vitess. It provides branching workflows for database schemas, non-blocking schema changes, and unlimited scalability without the operational burden.",
    website: "https://planetscale.com",
    logoDomain: "planetscale.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "database",
    tags: ["saas", "api-first", "enterprise", "serverless"],
  },
  {
    name: "Neon",
    slug: "neon",
    tagline: "Serverless Postgres built for the cloud.",
    description:
      "Neon is a serverless Postgres platform designed for modern cloud applications. It features autoscaling, branching for development workflows, and a generous free tier that makes it perfect for building and prototyping.",
    website: "https://neon.tech",
    logoDomain: "neon.tech",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "database",
    tags: ["saas", "free-tier", "api-first", "serverless"],
  },
  {
    name: "Prisma",
    slug: "prisma",
    tagline: "Next-generation Node.js and TypeScript ORM.",
    description:
      "Prisma is an open-source ORM for Node.js and TypeScript that makes database access easy with an auto-generated and type-safe query builder. It supports PostgreSQL, MySQL, SQLite, and MongoDB with a declarative schema and migrations.",
    website: "https://prisma.io",
    logoDomain: "prisma.io",
    pricing: Pricing.OPEN_SOURCE,
    featured: false,
    category: "database",
    tags: ["open-source", "cli", "typescript", "api-first"],
  },
  {
    name: "Drizzle",
    slug: "drizzle",
    tagline: "TypeScript ORM that lets you just write SQL.",
    description:
      "Drizzle ORM is a lightweight and performant TypeScript ORM that gives you full type safety while letting you write SQL-like queries. It supports PostgreSQL, MySQL, and SQLite with zero dependencies and a tiny bundle size.",
    website: "https://orm.drizzle.team",
    logoDomain: "orm.drizzle.team",
    pricing: Pricing.OPEN_SOURCE,
    featured: false,
    category: "database",
    tags: ["open-source", "typescript", "cli", "free-tier"],
  },

  // ---- Finance ----
  {
    name: "Stripe",
    slug: "stripe",
    tagline: "Financial infrastructure for the internet.",
    description:
      "Stripe is a technology company that builds economic infrastructure for the internet. Millions of companies use Stripe to accept payments, grow their revenue, and accelerate new business opportunities.",
    website: "https://stripe.com",
    logoDomain: "stripe.com",
    pricing: Pricing.PAID,
    featured: true,
    category: "finance",
    tags: ["api-first", "enterprise", "integration"],
  },
  {
    name: "Lemon Squeezy",
    slug: "lemon-squeezy",
    tagline: "Payments, tax & subscriptions for software companies.",
    description:
      "Lemon Squeezy is an all-in-one platform for running your SaaS business. It handles payments, subscriptions, global tax compliance, fraud prevention, and multi-currency support so you can focus on building your product.",
    website: "https://lemonsqueezy.com",
    logoDomain: "lemonsqueezy.com",
    pricing: Pricing.PAID,
    featured: false,
    category: "finance",
    tags: ["saas", "api-first", "integration"],
  },

  // ---- AI & Machine Learning ----
  {
    name: "ChatGPT",
    slug: "chatgpt",
    tagline: "Get answers. Find inspiration. Be more productive.",
    description:
      "ChatGPT is an AI chatbot developed by OpenAI that uses large language models to generate human-like text. It can help with writing, analysis, coding, math, and creative tasks through natural conversation.",
    website: "https://chat.openai.com",
    logoDomain: "openai.com",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "ai-machine-learning",
    tags: ["ai-powered", "saas", "mobile", "api-first"],
  },
  {
    name: "Claude",
    slug: "claude",
    tagline: "An AI assistant by Anthropic that is helpful, harmless, and honest.",
    description:
      "Claude is an AI assistant created by Anthropic designed to be helpful, harmless, and honest. It excels at thoughtful dialogue, content creation, complex reasoning, coding, and detailed analysis with a focus on safety.",
    website: "https://claude.ai",
    logoDomain: "anthropic.com",
    pricing: Pricing.FREEMIUM,
    featured: true,
    category: "ai-machine-learning",
    tags: ["ai-powered", "saas", "api-first"],
  },
  {
    name: "Midjourney",
    slug: "midjourney",
    tagline: "An independent research lab exploring new mediums of thought.",
    description:
      "Midjourney is a generative AI program that creates images from natural language descriptions called prompts. It has become one of the most popular AI art generators, producing stunning and artistic images for creative projects.",
    website: "https://midjourney.com",
    logoDomain: "midjourney.com",
    pricing: Pricing.PAID,
    featured: false,
    category: "ai-machine-learning",
    tags: ["ai-powered", "saas"],
  },
  {
    name: "v0",
    slug: "v0",
    tagline: "Generate UI with simple text prompts.",
    description:
      "v0 is a generative UI system by Vercel that creates React components from text descriptions. It uses AI to generate production-ready code using shadcn/ui and Tailwind CSS, making it easy to prototype and build interfaces quickly.",
    website: "https://v0.dev",
    logoDomain: "v0.dev",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "ai-machine-learning",
    tags: ["ai-powered", "saas", "react", "free-tier"],
  },
  {
    name: "Vercel AI SDK",
    slug: "vercel-ai-sdk",
    tagline: "The AI toolkit for TypeScript.",
    description:
      "The Vercel AI SDK is an open-source library for building AI-powered user interfaces in JavaScript and TypeScript. It provides React hooks and streaming utilities that make it easy to integrate LLMs into your applications.",
    website: "https://sdk.vercel.ai",
    logoDomain: "sdk.vercel.ai",
    pricing: Pricing.OPEN_SOURCE,
    featured: false,
    category: "ai-machine-learning",
    tags: ["open-source", "typescript", "react", "ai-powered"],
  },
  {
    name: "LangChain",
    slug: "langchain",
    tagline: "Build context-aware reasoning applications.",
    description:
      "LangChain is a framework for developing applications powered by language models. It provides tools for chaining LLM calls, managing prompts, connecting to data sources, and building agents that can use tools and APIs.",
    website: "https://langchain.com",
    logoDomain: "langchain.com",
    pricing: Pricing.OPEN_SOURCE,
    featured: false,
    category: "ai-machine-learning",
    tags: ["open-source", "ai-powered", "api-first"],
  },

  // ---- Analytics ----
  {
    name: "PostHog",
    slug: "posthog",
    tagline: "The open-source product analytics suite.",
    description:
      "PostHog is an open-source product analytics platform that provides event tracking, session recording, feature flags, A/B testing, and surveys. It can be self-hosted or cloud-hosted, giving you full control over your data.",
    website: "https://posthog.com",
    logoDomain: "posthog.com",
    pricing: Pricing.OPEN_SOURCE,
    featured: false,
    category: "analytics",
    tags: ["open-source", "self-hosted", "free-tier"],
  },
  {
    name: "Mixpanel",
    slug: "mixpanel",
    tagline: "Powerful, self-serve product analytics.",
    description:
      "Mixpanel is a product analytics platform that helps companies measure what matters, make decisions fast, and build better products. It provides user analytics, funnels, retention analysis, and real-time data exploration.",
    website: "https://mixpanel.com",
    logoDomain: "mixpanel.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "analytics",
    tags: ["saas", "free-tier", "enterprise"],
  },
  {
    name: "Plausible",
    slug: "plausible",
    tagline: "Simple and privacy-friendly web analytics.",
    description:
      "Plausible is a lightweight and open-source web analytics tool that provides simple, privacy-friendly website statistics. It does not use cookies and is fully compliant with GDPR, CCPA, and PECR, with a script under 1KB.",
    website: "https://plausible.io",
    logoDomain: "plausible.io",
    pricing: Pricing.PAID,
    featured: false,
    category: "analytics",
    tags: ["open-source", "self-hosted"],
  },

  // ---- Security ----
  {
    name: "Auth0",
    slug: "auth0",
    tagline: "Secure access for everyone. But not just anyone.",
    description:
      "Auth0 is a flexible authentication and authorization platform that helps you secure applications with features like single sign-on, multi-factor authentication, and social logins. It supports any technology stack.",
    website: "https://auth0.com",
    logoDomain: "auth0.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "security",
    tags: ["saas", "api-first", "enterprise", "integration"],
  },
  {
    name: "1Password",
    slug: "1password",
    tagline: "The world's most-loved password manager.",
    description:
      "1Password is a password manager that keeps all your passwords and sensitive information in a secure vault. It provides auto-fill, watchtower alerts for breached accounts, and team sharing features for business use.",
    website: "https://1password.com",
    logoDomain: "1password.com",
    pricing: Pricing.PAID,
    featured: false,
    category: "security",
    tags: ["enterprise", "desktop", "mobile", "browser-extension", "cli"],
  },
  {
    name: "Cloudflare",
    slug: "cloudflare",
    tagline: "The Web Performance & Security Company.",
    description:
      "Cloudflare is a web performance and security company that provides content delivery network services, DDoS mitigation, Internet security, and distributed domain name server services. It protects and accelerates any Internet application.",
    website: "https://cloudflare.com",
    logoDomain: "cloudflare.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "security",
    tags: ["enterprise", "free-tier", "cli", "api-first", "serverless"],
  },

  // ---- No-Code ----
  {
    name: "Webflow",
    slug: "webflow",
    tagline: "Build with the power of code — without writing any.",
    description:
      "Webflow is a visual web design platform that empowers designers to build professional, custom websites without writing code. It combines a visual canvas with the power of HTML, CSS, and JavaScript, plus CMS and hosting.",
    website: "https://webflow.com",
    logoDomain: "webflow.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "no-code",
    tags: ["saas", "free-tier"],
  },
  {
    name: "Bubble",
    slug: "bubble",
    tagline: "Build apps without code.",
    description:
      "Bubble is a visual programming platform that lets you build fully functional web applications without writing code. It provides a drag-and-drop editor, database management, user authentication, and API integrations.",
    website: "https://bubble.io",
    logoDomain: "bubble.io",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "no-code",
    tags: ["saas", "free-tier", "marketplace"],
  },

  // ---- E-commerce ----
  {
    name: "Shopify",
    slug: "shopify",
    tagline: "Making commerce better for everyone.",
    description:
      "Shopify is a complete commerce platform that lets you start, grow, and manage a business. It provides everything from online storefront to payment processing, shipping, and inventory management for merchants of all sizes.",
    website: "https://shopify.com",
    logoDomain: "shopify.com",
    pricing: Pricing.PAID,
    featured: false,
    category: "e-commerce",
    tags: ["saas", "enterprise", "marketplace", "api-first"],
  },
  {
    name: "Gumroad",
    slug: "gumroad",
    tagline: "Go from zero to $1. Then from $1 to $1,000,000.",
    description:
      "Gumroad is an e-commerce platform that makes it easy for creators to sell digital products, memberships, and courses directly to their audience. It handles payments, delivery, and analytics with minimal setup.",
    website: "https://gumroad.com",
    logoDomain: "gumroad.com",
    pricing: Pricing.PAID,
    featured: false,
    category: "e-commerce",
    tags: ["saas", "marketplace"],
  },

  // ---- Marketing ----
  {
    name: "HubSpot",
    slug: "hubspot",
    tagline: "Grow better with HubSpot.",
    description:
      "HubSpot is a CRM platform that provides marketing, sales, customer service, and content management tools. It helps businesses attract visitors, convert leads, and close customers with an integrated suite of software.",
    website: "https://hubspot.com",
    logoDomain: "hubspot.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "marketing",
    tags: ["saas", "enterprise", "free-tier", "integration"],
  },
  {
    name: "Mailchimp",
    slug: "mailchimp",
    tagline: "Turn emails into revenue.",
    description:
      "Mailchimp is an all-in-one marketing platform that helps small businesses market smarter so they can grow faster. It provides email marketing, automations, landing pages, and audience management tools.",
    website: "https://mailchimp.com",
    logoDomain: "mailchimp.com",
    pricing: Pricing.FREEMIUM,
    featured: false,
    category: "marketing",
    tags: ["saas", "free-tier", "integration"],
  },
];

// ---------------------------------------------------------------------------
// Review templates
// ---------------------------------------------------------------------------

const REVIEW_TEMPLATES = [
  {
    rating: 5,
    title: "Absolute game changer",
    body: "This tool completely transformed how our team works. The developer experience is top-notch and the documentation is excellent. Highly recommended for any serious project.",
  },
  {
    rating: 5,
    title: "Best in class",
    body: "After trying multiple alternatives, this is the clear winner. The performance, reliability, and feature set are unmatched. Worth every penny.",
  },
  {
    rating: 4,
    title: "Great tool with minor rough edges",
    body: "Overall a fantastic product that solves real problems. There are a few areas that could use polish, but the core experience is stellar and the team ships updates fast.",
  },
  {
    rating: 4,
    title: "Solid choice for teams",
    body: "We adopted this across our entire engineering org and it has improved our workflow significantly. The learning curve is reasonable and support has been responsive.",
  },
  {
    rating: 5,
    title: "Can't imagine working without it",
    body: "This has become an essential part of my daily workflow. The speed and reliability are incredible, and new features keep making it better. The free tier is generous too.",
  },
  {
    rating: 4,
    title: "Impressive DX",
    body: "The developer experience is what sets this apart. Great docs, intuitive API, and a helpful community. A few enterprise features are behind a paywall but fair enough.",
  },
  {
    rating: 3,
    title: "Good but has room to grow",
    body: "The core product is solid and the idea is great. However, I ran into some limitations with advanced use cases. Looking forward to seeing how the product evolves.",
  },
  {
    rating: 5,
    title: "Perfect for our startup",
    body: "We were able to ship our MVP in record time thanks to this tool. The pricing is fair, the onboarding is smooth, and the integrations cover everything we need.",
  },
  {
    rating: 4,
    title: "Reliable and well-maintained",
    body: "Been using this for over a year now with zero regrets. The team behind it is active and transparent about their roadmap. Support has been quick when we needed it.",
  },
  {
    rating: 3,
    title: "Decent but pricing could be better",
    body: "The product itself is good and does what it promises. My main concern is the pricing tiers -- it gets expensive quickly once you scale. Would love to see more flexibility.",
  },
  {
    rating: 5,
    title: "The documentation alone is worth it",
    body: "I have never seen a product with such thorough and well-organized documentation. Makes onboarding new team members a breeze. The product backing it up is equally excellent.",
  },
  {
    rating: 4,
    title: "Fast, clean, and well-designed",
    body: "The UI is beautiful and everything feels snappy. A couple of features I wanted were missing, but the team added one of them within a month of my feedback.",
  },
  {
    rating: 5,
    title: "Open source done right",
    body: "Love that this is open source with a sustainable business model. The community is active, PRs get reviewed quickly, and the maintainers truly care about quality.",
  },
  {
    rating: 4,
    title: "Simplifies a complex problem",
    body: "What used to take hours of boilerplate now takes minutes. The abstractions are well-thought-out and the escape hatches are there when you need more control.",
  },
  {
    rating: 3,
    title: "Promising but still maturing",
    body: "I can see the potential and the team is clearly talented. A few features feel half-baked compared to established competitors, but the trajectory is encouraging.",
  },
  {
    rating: 5,
    title: "Made our team 10x faster",
    body: "Not an exaggeration. The workflow improvements this tool provides have dramatically reduced our cycle time. The integration ecosystem is extensive and keeps growing.",
  },
  {
    rating: 4,
    title: "Strong alternative in the space",
    body: "If you are looking for something different from the incumbents, give this a try. The fresh approach solves real pain points and the product is maturing quickly.",
  },
  {
    rating: 5,
    title: "A joy to use every day",
    body: "It is rare to find a tool that is both powerful and delightful. The attention to detail in the UX shows, and the performance is consistently excellent.",
  },
  {
    rating: 4,
    title: "Well worth the switch",
    body: "We migrated from a competitor and the transition was smoother than expected. The feature parity is there, plus several areas where this tool is clearly superior.",
  },
  {
    rating: 3,
    title: "Good foundation, needs polish",
    body: "The core idea is excellent and the technical foundations are strong. Some rough edges in the UI and occasional bugs, but nothing that stops us from using it daily.",
  },
];

// ---------------------------------------------------------------------------
// Main seed function
// ---------------------------------------------------------------------------

async function main() {
  console.log("Seeding ToolsFinder.io database...\n");

  // ---- 0. Clear existing data ----
  console.log("Clearing existing data...");
  await prisma.upvote.deleteMany();
  await prisma.review.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.tagOnTool.deleteMany();
  await prisma.collectionTool.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.follow.deleteMany();
  await prisma.tool.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();
  console.log("  Cleared all tables.\n");

  // ---- 1. Users ----
  console.log("Seeding users...");
  const userRecords: Record<string, { id: string }> = {};

  for (const u of USERS) {
    const user = await prisma.user.create({
      data: {
        clerkId: u.clerkId,
        email: u.email,
        username: u.username,
        name: u.name,
        bio: u.bio,
        avatar: (u as Record<string, unknown>).avatar as string | undefined,
        website: (u as Record<string, unknown>).website as string | undefined,
        twitter: (u as Record<string, unknown>).twitter as string | undefined,
        github: (u as Record<string, unknown>).github as string | undefined,
        role: u.role,
      },
    });
    userRecords[u.clerkId] = user;
  }
  console.log(`  Created ${USERS.length} users`);

  const adminUser = userRecords["seed_admin"];
  const seedUserIds = [
    userRecords["seed_user_1"].id,
    userRecords["seed_user_2"].id,
    userRecords["seed_user_3"].id,
    userRecords["seed_user_4"].id,
    userRecords["seed_user_5"].id,
  ];

  // ---- 2. Categories ----
  console.log("Seeding categories...");
  const categoryRecords: Record<string, { id: string }> = {};

  for (const c of CATEGORIES) {
    const category = await prisma.category.create({
      data: {
        name: c.name,
        slug: c.slug,
        description: c.description,
        icon: c.icon,
        color: c.color,
      },
    });
    categoryRecords[c.slug] = category;
  }
  console.log(`  Created ${CATEGORIES.length} categories`);

  // ---- 3. Tags ----
  console.log("Seeding tags...");
  const tagRecords: Record<string, { id: string }> = {};

  for (const t of TAGS) {
    const tag = await prisma.tag.create({
      data: { name: t.name, slug: t.slug },
    });
    tagRecords[t.slug] = tag;
  }
  console.log(`  Created ${TAGS.length} tags`);

  // ---- 4. Tools ----
  console.log("Seeding tools...");
  const toolRecords: Record<string, { id: string; featured: boolean }> = {};
  const launchStart = new Date("2024-01-01");
  const launchEnd = new Date("2025-12-31");

  for (const t of TOOLS) {
    const categoryId = categoryRecords[t.category]?.id;
    if (!categoryId) {
      console.warn(`  WARNING: Category "${t.category}" not found for tool "${t.name}", skipping.`);
      continue;
    }

    const tool = await prisma.tool.create({
      data: {
        name: t.name,
        slug: t.slug,
        tagline: t.tagline,
        description: t.description,
        website: t.website,
        logo: `https://logo.clearbit.com/${t.logoDomain}`,
        screenshots: [],
        pricing: t.pricing,
        status: ToolStatus.APPROVED,
        featured: t.featured,
        launchDate: randomDate(launchStart, launchEnd),
        categoryId,
        submitterId: adminUser.id,
      },
    });
    toolRecords[t.slug] = { id: tool.id, featured: t.featured };
  }
  console.log(`  Created ${Object.keys(toolRecords).length} tools`);

  // ---- 5. TagOnTool associations ----
  console.log("Seeding tag-tool associations...");
  let tagOnToolCount = 0;

  for (const t of TOOLS) {
    const toolRecord = toolRecords[t.slug];
    if (!toolRecord) continue;

    for (const tagSlug of t.tags) {
      const tagRecord = tagRecords[tagSlug];
      if (!tagRecord) {
        console.warn(`  WARNING: Tag "${tagSlug}" not found for tool "${t.name}", skipping.`);
        continue;
      }

      await prisma.tagOnTool.create({
        data: {
          toolId: toolRecord.id,
          tagId: tagRecord.id,
        },
      });
      tagOnToolCount++;
    }
  }
  console.log(`  Created ${tagOnToolCount} tag-tool associations`);

  // ---- 6. Upvotes ----
  console.log("Seeding upvotes...");
  let upvoteCount = 0;
  const allToolSlugs = Object.keys(toolRecords);

  for (const userId of seedUserIds) {
    // Each user upvotes all featured tools
    for (const slug of allToolSlugs) {
      const tool = toolRecords[slug];
      if (!tool.featured) continue;

      await prisma.upvote.create({
        data: { userId, toolId: tool.id },
      });
      upvoteCount++;
    }

    // Each user also upvotes some random non-featured tools
    const nonFeaturedSlugs = allToolSlugs.filter(
      (s) => !toolRecords[s].featured
    );
    const randomPicks = pickRandom(
      nonFeaturedSlugs,
      Math.floor(Math.random() * 10) + 5
    );

    for (const slug of randomPicks) {
      const tool = toolRecords[slug];
      // Avoid duplicate upvotes
      const existing = await prisma.upvote.findUnique({
        where: { userId_toolId: { userId, toolId: tool.id } },
      });
      if (!existing) {
        await prisma.upvote.create({
          data: { userId, toolId: tool.id },
        });
        upvoteCount++;
      }
    }
  }

  // Admin also upvotes some tools
  const adminPicks = pickRandom(allToolSlugs, 15);
  for (const slug of adminPicks) {
    const tool = toolRecords[slug];
    const existing = await prisma.upvote.findUnique({
      where: { userId_toolId: { userId: adminUser.id, toolId: tool.id } },
    });
    if (!existing) {
      await prisma.upvote.create({
        data: { userId: adminUser.id, toolId: tool.id },
      });
      upvoteCount++;
    }
  }
  console.log(`  Created ${upvoteCount} upvotes`);

  // ---- 7. Reviews ----
  console.log("Seeding reviews...");
  let reviewCount = 0;

  // Distribute reviews across tools and users
  const reviewAssignments: { userId: string; toolSlug: string; reviewIdx: number }[] = [
    // Featured tools get more reviews
    { userId: seedUserIds[0], toolSlug: "vercel", reviewIdx: 0 },
    { userId: seedUserIds[1], toolSlug: "vercel", reviewIdx: 1 },
    { userId: seedUserIds[2], toolSlug: "figma", reviewIdx: 2 },
    { userId: seedUserIds[3], toolSlug: "figma", reviewIdx: 4 },
    { userId: seedUserIds[0], toolSlug: "notion", reviewIdx: 3 },
    { userId: seedUserIds[4], toolSlug: "notion", reviewIdx: 5 },
    { userId: seedUserIds[1], toolSlug: "linear", reviewIdx: 8 },
    { userId: seedUserIds[2], toolSlug: "cursor", reviewIdx: 4 },
    { userId: seedUserIds[3], toolSlug: "cursor", reviewIdx: 11 },
    { userId: seedUserIds[3], toolSlug: "supabase", reviewIdx: 12 },
    { userId: seedUserIds[4], toolSlug: "supabase", reviewIdx: 0 },
    { userId: seedUserIds[0], toolSlug: "github", reviewIdx: 7 },
    { userId: seedUserIds[1], toolSlug: "github", reviewIdx: 15 },
    { userId: seedUserIds[1], toolSlug: "chatgpt", reviewIdx: 10 },
    { userId: seedUserIds[2], toolSlug: "chatgpt", reviewIdx: 17 },
    { userId: seedUserIds[0], toolSlug: "claude", reviewIdx: 4 },
    { userId: seedUserIds[4], toolSlug: "claude", reviewIdx: 1 },
    { userId: seedUserIds[0], toolSlug: "nextjs", reviewIdx: 0 },
    { userId: seedUserIds[1], toolSlug: "nextjs", reviewIdx: 17 },
    { userId: seedUserIds[2], toolSlug: "tailwind-css", reviewIdx: 11 },
    { userId: seedUserIds[3], toolSlug: "tailwind-css", reviewIdx: 12 },
    { userId: seedUserIds[4], toolSlug: "stripe", reviewIdx: 1 },
    { userId: seedUserIds[0], toolSlug: "stripe", reviewIdx: 10 },
    { userId: seedUserIds[1], toolSlug: "raycast", reviewIdx: 17 },
    { userId: seedUserIds[2], toolSlug: "vs-code", reviewIdx: 12 },
    { userId: seedUserIds[3], toolSlug: "vs-code", reviewIdx: 4 },
    // Non-featured tools
    { userId: seedUserIds[3], toolSlug: "prisma", reviewIdx: 13 },
    { userId: seedUserIds[0], toolSlug: "posthog", reviewIdx: 12 },
    { userId: seedUserIds[2], toolSlug: "cloudflare", reviewIdx: 15 },
    { userId: seedUserIds[3], toolSlug: "slack", reviewIdx: 6 },
    { userId: seedUserIds[4], toolSlug: "slack", reviewIdx: 3 },
    { userId: seedUserIds[2], toolSlug: "neon", reviewIdx: 5 },
    { userId: seedUserIds[4], toolSlug: "cal-com", reviewIdx: 12 },
    { userId: seedUserIds[0], toolSlug: "resend", reviewIdx: 7 },
    { userId: seedUserIds[1], toolSlug: "sentry", reviewIdx: 8 },
    { userId: seedUserIds[2], toolSlug: "v0", reviewIdx: 16 },
    { userId: seedUserIds[3], toolSlug: "framer", reviewIdx: 11 },
    { userId: seedUserIds[4], toolSlug: "astro", reviewIdx: 12 },
    { userId: seedUserIds[0], toolSlug: "railway", reviewIdx: 2 },
    { userId: seedUserIds[1], toolSlug: "netlify", reviewIdx: 3 },
    { userId: seedUserIds[2], toolSlug: "auth0", reviewIdx: 5 },
    { userId: seedUserIds[3], toolSlug: "shopify", reviewIdx: 15 },
    { userId: seedUserIds[4], toolSlug: "discord", reviewIdx: 4 },
    { userId: seedUserIds[0], toolSlug: "hubspot", reviewIdx: 9 },
    { userId: seedUserIds[1], toolSlug: "canva", reviewIdx: 7 },
    { userId: seedUserIds[2], toolSlug: "remix", reviewIdx: 13 },
    { userId: seedUserIds[3], toolSlug: "drizzle", reviewIdx: 12 },
    { userId: seedUserIds[4], toolSlug: "midjourney", reviewIdx: 17 },
    { userId: seedUserIds[0], toolSlug: "langchain", reviewIdx: 14 },
    { userId: seedUserIds[1], toolSlug: "webflow", reviewIdx: 16 },
    { userId: seedUserIds[2], toolSlug: "bubble", reviewIdx: 6 },
    { userId: seedUserIds[3], toolSlug: "zoom", reviewIdx: 3 },
    { userId: seedUserIds[4], toolSlug: "mailchimp", reviewIdx: 9 },
    { userId: seedUserIds[0], toolSlug: "1password", reviewIdx: 1 },
    { userId: seedUserIds[1], toolSlug: "clerk", reviewIdx: 5 },
    { userId: seedUserIds[2], toolSlug: "shadcn-ui", reviewIdx: 12 },
    { userId: seedUserIds[3], toolSlug: "doppler", reviewIdx: 8 },
    { userId: seedUserIds[4], toolSlug: "gumroad", reviewIdx: 7 },
    { userId: seedUserIds[0], toolSlug: "planetscale", reviewIdx: 2 },
    { userId: seedUserIds[1], toolSlug: "lemon-squeezy", reviewIdx: 7 },
    { userId: seedUserIds[2], toolSlug: "plausible", reviewIdx: 12 },
    { userId: seedUserIds[3], toolSlug: "mixpanel", reviewIdx: 3 },
    { userId: seedUserIds[4], toolSlug: "postmark", reviewIdx: 5 },
    { userId: seedUserIds[0], toolSlug: "vercel-ai-sdk", reviewIdx: 12 },
  ];

  for (const assignment of reviewAssignments) {
    const tool = toolRecords[assignment.toolSlug];
    if (!tool) continue;

    const template = REVIEW_TEMPLATES[assignment.reviewIdx % REVIEW_TEMPLATES.length];

    await prisma.review.create({
      data: {
        rating: template.rating,
        title: template.title,
        body: template.body,
        userId: assignment.userId,
        toolId: tool.id,
      },
    });
    reviewCount++;
  }
  console.log(`  Created ${reviewCount} reviews`);

  // ---- 8. Collections ----
  console.log("Seeding collections...");

  const collection1 = await prisma.collection.create({
    data: {
      name: "Essential Developer Stack",
      description: "The must-have tools for every modern web developer.",
      isPublic: true,
      userId: adminUser.id,
    },
  });
  const col1Slugs = ["vs-code", "github", "nextjs", "tailwind-css", "supabase", "vercel", "prisma", "stripe", "clerk", "sentry"];
  for (const slug of col1Slugs) {
    const tool = toolRecords[slug];
    if (tool) {
      await prisma.collectionTool.create({
        data: { collectionId: collection1.id, toolId: tool.id },
      });
    }
  }

  const collection2 = await prisma.collection.create({
    data: {
      name: "AI-Powered Tools",
      description: "The best AI tools for supercharging your workflow.",
      isPublic: true,
      userId: seedUserIds[0],
    },
  });
  const col2Slugs = ["chatgpt", "claude", "midjourney", "v0", "cursor", "vercel-ai-sdk", "langchain"];
  for (const slug of col2Slugs) {
    const tool = toolRecords[slug];
    if (tool) {
      await prisma.collectionTool.create({
        data: { collectionId: collection2.id, toolId: tool.id },
      });
    }
  }

  const collection3 = await prisma.collection.create({
    data: {
      name: "Best Open Source Alternatives",
      description: "Open-source tools that rival commercial products. Free and transparent.",
      isPublic: true,
      userId: seedUserIds[1],
    },
  });
  const col3Slugs = ["supabase", "cal-com", "posthog", "plausible", "nextjs", "prisma", "drizzle", "tailwind-css", "shadcn-ui", "astro"];
  for (const slug of col3Slugs) {
    const tool = toolRecords[slug];
    if (tool) {
      await prisma.collectionTool.create({
        data: { collectionId: collection3.id, toolId: tool.id },
      });
    }
  }
  console.log("  Created 3 collections");

  // ---- 9. Follows ----
  console.log("Seeding follows...");
  await prisma.follow.create({ data: { followerId: seedUserIds[0], followingId: adminUser.id } });
  await prisma.follow.create({ data: { followerId: seedUserIds[1], followingId: adminUser.id } });
  await prisma.follow.create({ data: { followerId: seedUserIds[2], followingId: adminUser.id } });
  await prisma.follow.create({ data: { followerId: seedUserIds[3], followingId: adminUser.id } });
  await prisma.follow.create({ data: { followerId: seedUserIds[4], followingId: adminUser.id } });
  await prisma.follow.create({ data: { followerId: seedUserIds[0], followingId: seedUserIds[1] } });
  await prisma.follow.create({ data: { followerId: seedUserIds[1], followingId: seedUserIds[2] } });
  await prisma.follow.create({ data: { followerId: seedUserIds[2], followingId: seedUserIds[3] } });
  await prisma.follow.create({ data: { followerId: seedUserIds[3], followingId: seedUserIds[4] } });
  await prisma.follow.create({ data: { followerId: seedUserIds[4], followingId: seedUserIds[0] } });
  console.log("  Created 10 follows");

  // ---- Summary ----
  const counts = await Promise.all([
    prisma.user.count(),
    prisma.category.count(),
    prisma.tag.count(),
    prisma.tool.count(),
    prisma.tagOnTool.count(),
    prisma.upvote.count(),
    prisma.review.count(),
    prisma.collection.count(),
    prisma.follow.count(),
  ]);

  console.log("\n--- Seed complete! ---");
  console.log(`  Users:        ${counts[0]}`);
  console.log(`  Categories:   ${counts[1]}`);
  console.log(`  Tags:         ${counts[2]}`);
  console.log(`  Tools:        ${counts[3]}`);
  console.log(`  TagOnTool:    ${counts[4]}`);
  console.log(`  Upvotes:      ${counts[5]}`);
  console.log(`  Reviews:      ${counts[6]}`);
  console.log(`  Collections:  ${counts[7]}`);
  console.log(`  Follows:      ${counts[8]}`);
  console.log("");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
