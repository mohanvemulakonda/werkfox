# WerkFox — Project Instructions

## What is WerkFox?
ERP & CRM platform for small manufacturing companies in India. Web app built with Next.js, deployed on Vercel at werkfox.com. Product of StackNex.io.

## Tech Stack
- **Framework**: Next.js 15.2.8 (App Router)
- **React**: 19.0.0
- **Auth**: Clerk (`@clerk/nextjs`)
- **Database**: Prisma ORM → MySQL (via `mysql2`)
- **Storage**: Vercel Blob (`@vercel/blob`)
- **Cache**: Upstash Redis
- **CSS**: Tailwind CSS 3.4 + CSS custom properties in `globals.css`
- **Fonts**: Inter (body), Open Sans (alt), Caveat (brand accent — "Fox" in logo)
- **PDF**: jsPDF + pdfkit + pdf-parse
- **Email**: Nodemailer
- **AI**: Google Generative AI (`@google/generative-ai`)
- **Package Manager**: pnpm (check `pnpm-lock.yaml`)

## Project Structure
```
app/
├── page.tsx                    ← Landing page (marketing)
├── layout.tsx                  ← Root layout (Clerk, fonts, ChatWidget)
├── globals.css                 ← All CSS variables, admin styles, marketing styles
├── components/                 ← Marketing/shared components
│   ├── Header.tsx              ← Marketing site header
│   ├── Footer.tsx              ← Marketing site footer
│   ├── AnnouncementBar.tsx     ← Top bar with app store links
│   ├── AIChat/                 ← Chat widget
│   └── ...
├── admin/                      ← Authenticated admin dashboard
│   ├── layout.tsx              ← Admin layout (Clerk protected)
│   ├── components/             ← Admin UI components
│   │   ├── TopBar.tsx          ← Admin top navigation bar
│   │   ├── SubNav.tsx          ← Module sub-navigation
│   │   ├── FilterBar.tsx       ← Search, filters, view toggle
│   │   ├── KanbanBoard.tsx     ← Kanban view
│   │   ├── KanbanCard.tsx      ← Kanban cards
│   │   ├── Sheet.tsx           ← Slide-over panel
│   │   ├── Chatter.tsx         ← Activity/comment feed
│   │   └── StatusBar.tsx       ← Status indicators
│   ├── crm/                    ← CRM module (leads, opportunities, contacts, activities)
│   └── erp/                    ← ERP module (sales-orders, invoices, inventory, production, etc.)
├── tutorials/                  ← Interactive animated tutorials
│   ├── page.tsx                ← Tutorials page with category filtering
│   ├── TutorialUI.tsx          ← Shared admin replica components for tutorials
│   ├── CRMLeadTutorial.tsx     ← "Add a new lead" tutorial
│   └── PipelineDragTutorial.tsx ← "Move a deal through pipeline" tutorial
├── pricing/                    ← Pricing page
├── about/                      ← About page
├── contact/                    ← Contact page
├── modules/                    ← Module detail pages (CRM, inventory, production, etc.)
├── blog/                       ← Blog
├── faq/                        ← FAQ
├── api/                        ← API routes
└── sign-in/ sign-up/           ← Auth pages (Clerk)
prisma/
├── schema.prisma               ← Database schema
├── seed.ts                     ← Seed data
└── migrations/                 ← Migration history
```

## Design System

### Brand Colors
- **Primary**: `#E03B12` (orange-red) — `var(--werkfox-primary)`
- **Accent**: `#FD9220` (orange) — `var(--werkfox-accent)`
- **Gradient**: `linear-gradient(135deg, #E03B12, #FD9220)`
- **Text primary**: `#1d1d1f` — `var(--text-primary)`
- **Text secondary**: `#86868b` — `var(--text-secondary)`
- **Surface**: `#f5f5f7` — `var(--surface)`
- **Border**: `#d2d2d7` — `var(--border)`

### Typography
- Body: Inter / system font stack
- Brand "Fox": Caveat font — `var(--font-caveat)`
- Brand text pattern: "Werk" (regular) + "Fox" (Caveat, gradient fill)

### Design Language
- Apple-inspired clean design (inspired by apple.com)
- Rounded corners, subtle shadows, whitespace-heavy
- Marketing pages use `card-glass` class for glassmorphism cards
- Admin uses Odoo-style functional UI with Kanban boards, list views, form views

## Commands
```bash
pnpm dev          # Start dev server (port 3000, fallback 3001)
pnpm build        # Production build
pnpm lint         # ESLint
pnpm db:push      # Push Prisma schema to database
pnpm db:studio    # Open Prisma Studio
```

## Coding Conventions

### General
- All page/component files use `'use client'` when they need React hooks or browser APIs
- Prefer inline styles for self-contained components (tutorials, marketing)
- Use Tailwind classes for layout and common patterns
- Use CSS variables from `globals.css` for theme colors — never hardcode colors
- Use `<img>` with eslint-disable for the WerkFox logo in tutorials (not next/image)
- Real logo path: `/logo.png`

### Admin Dashboard
- Admin components live in `app/admin/components/`
- Each module (CRM, ERP) has its own layout and sub-routes
- Kanban boards use `KanbanBoard.tsx` + `KanbanCard.tsx`
- Forms use `Sheet.tsx` for slide-over panels
- Navigation: TopBar (module tabs) → SubNav (section tabs) → FilterBar (actions)

### Tutorials
- Each tutorial is a self-contained React component
- Shared UI replicas live in `TutorialUI.tsx` (scaled-down admin components)
- CSS keyframe animations injected via `<style>` tags
- Use `mountKey` pattern for replayable animations: `const id = \`tut-\${mountKey}\``
- **ALWAYS use React state for typing animations** (character-by-character with setTimeout) — NEVER CSS width animation (causes blank spaces)
- Step durations: 3000-5500ms depending on complexity
- Max 3 steps per tutorial
- No external animation libraries (no framer-motion, no GSAP)

### Marketing Pages
- Include `<AnnouncementBar />` and `<Header />` at top
- Include `<Footer />` at bottom
- Hero sections: `pt-32 pb-8 lg:pt-40 lg:pb-10`
- CTA buttons use gradient background with pill shape (`rounded-full`)
- Sections alternate backgrounds: white / `var(--surface)`

### Git Workflow
- **NEVER commit directly to `main`** — always create a feature branch first
- Branch naming: `feat/short-description` (e.g., `feat/erp-tutorial`, `fix/kanban-drag`)
- Commit format: `type: description` (e.g., `feat:`, `fix:`, `docs:`)
- Always verify `pnpm build` passes before committing
- Push the feature branch to remote — do NOT merge into main
- The owner will review and merge manually

## Environment
- `.env.local` contains secrets (Clerk keys, database URL, API keys) — NEVER commit
- Database: MySQL
- Deploy target: Vercel
- Domain: werkfox.com

## Important Notes
- The `app/admin/` directory is the core product — be careful with changes
- Marketing pages (`page.tsx`, `about/`, `pricing/`, etc.) can be modified more freely
- Tutorials are additive — new tutorials are new files, don't modify existing working tutorials
- When building new tutorials, read the existing ones (`CRMLeadTutorial.tsx`, `PipelineDragTutorial.tsx`) and `TutorialUI.tsx` to follow the exact same pattern
- `TUTORIAL_SYSTEM_PROMPT.md` contains the full guide for replicating the tutorial system on other projects
