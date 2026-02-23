# ToolsFinder.io — Project Instructions

## What is ToolsFinder?
Product discovery platform (like Product Hunt / SaaSHub). Users discover, upvote, review, and compare software tools. Built by StackNex.io.

## Tech Stack
- **Framework**: Next.js 15 (App Router) + TypeScript
- **React**: 19
- **Auth**: Clerk (`@clerk/nextjs`)
- **Database**: Prisma ORM → PostgreSQL
- **Storage**: Vercel Blob for uploads
- **Icons**: Lucide React
- **CSS**: Tailwind CSS 3.4 + CSS custom properties in `globals.css`
- **Font**: Inter (via next/font)
- **Package Manager**: pnpm

## Project Structure
```
app/
├── page.tsx                      ← Homepage (hero, today's launches, trending)
├── layout.tsx                    ← Root layout (Clerk, fonts, ThemeProvider)
├── globals.css                   ← Design tokens + dark mode
├── tools/
│   ├── page.tsx                  ← Tool directory (filters, search, grid)
│   └── [slug]/page.tsx           ← Tool detail (reviews, alternatives)
├── categories/
│   ├── page.tsx                  ← All categories
│   └── [slug]/page.tsx           ← Category tools listing
├── compare/[slug1]/vs/[slug2]/   ← Tool comparison
├── u/[username]/page.tsx         ← User profile
├── submit/page.tsx               ← Submit a tool (multi-step form)
├── dashboard/page.tsx            ← User dashboard (my stuff)
├── admin/page.tsx                ← Admin panel (pending tools, stats)
├── sign-in/[[...sign-in]]/       ← Clerk sign-in
├── sign-up/[[...sign-up]]/       ← Clerk sign-up
└── api/                          ← API routes
components/
├── ui/                           ← Primitives (Button, Badge, Card, Input, etc.)
├── Header.tsx                    ← Navigation + search + auth
├── Footer.tsx
├── ToolCard.tsx                  ← Tool listing card
├── UpvoteButton.tsx              ← Optimistic upvote toggle
├── SearchBar.tsx                 ← Combobox search (Cmd+K)
├── ThemeProvider.tsx             ← Dark mode context
└── ...
lib/
├── prisma.ts                     ← Prisma singleton
├── auth.ts                       ← Clerk + DB user helpers
├── utils.ts                      ← Formatting, slugify, scoring
└── actions.ts                    ← Server actions
prisma/
├── schema.prisma                 ← Full schema
└── seed.ts                       ← 20 categories, 50+ tools
```

## Design System
- **Primary**: Vibrant orange `#F97316` (brand-500)
- **Dark mode**: Slate tones (0f172a base)
- **Design**: Clean, modern, Product Hunt energy
- **Cards**: Rounded-xl, subtle shadows, hover lift

## Commands
```bash
pnpm dev          # Dev server
pnpm build        # Production build
pnpm lint         # ESLint
pnpm db:push      # Push schema to database
pnpm db:seed      # Seed database
pnpm db:studio    # Prisma Studio
```

## Key Conventions
- Use CSS variables from globals.css for theme colors
- Use `cn()` from lib/utils for conditional classNames
- Server components by default; `'use client'` only when needed
- Server actions in `lib/actions.ts` for mutations
- Optimistic UI for upvotes

## Git Workflow
- Always create feature branches: `feat/short-description`
- Commit format: `type: description`
- Run `pnpm build` before committing
- Never commit directly to main
