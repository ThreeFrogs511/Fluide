# Fluide

A personal blog and interactive wellness platform exploring stuttering, breathing techniques, and fluency — built with Next.js, PostgreSQL, and TypeScript.

**Live:** https://fluide-mu.vercel.app/

---

## Overview

Fluide is a space to write about stuttering and fluency from lived experience — documenting techniques that work, research findings, and building interactive tools for mindfulness and breathing practice.

The project ships with a full content management system, allowing new articles and exercises to be published directly from the admin dashboard without touching code.

---

## Features

### Public (Phase 1 ✅ Complete)
- **Article list** with live client-side search and filtering
- **Individual article pages** with full content, published server-side
- **Interactive breathing exercise** — Cyclic Sighing with animated visual guide and timer
- **Exercise index** — registry of all breathing/wellness exercises
- **About page**
- Deployed on Vercel

### Admin CMS (Phase 2 ✅ Complete)
- **Secure authentication** — NextAuth.js v5 (Credentials provider, admin-only)
- **Article management** — create, edit, publish/unpublish, delete articles
- **Admin dashboard** — view all articles with status badges (published/draft)
- **Database-backed** — PostgreSQL via Vercel Postgres + Prisma 7 ORM
- **Route protection** — all `/admin/*` routes protected by middleware

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict mode, no `any`) |
| Styling | Tailwind CSS |
| ORM | Prisma 7 (`PrismaPg` adapter) |
| Database | PostgreSQL (Vercel Postgres / Neon) |
| Authentication | Auth.js v5 (NextAuth.js) |
| Route Protection | Next.js 16 `proxy.ts` |
| Deployment | Vercel |

---

## How to run locally

### Prerequisites
- Node.js 20.9+
- npm or yarn

### Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/ThreeFrogs511/Fluide.git
   cd Fluide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in:
   - `DATABASE_URL` — Vercel Postgres connection string
   - `AUTH_SECRET` — generate with `npx auth secret`
   - `ADMIN_EMAIL` and `ADMIN_PASSWORD` — your admin credentials

4. **Run Prisma migrations** (if needed)
   ```bash
   npx prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   - Public site: http://localhost:3000
   - Admin login: http://localhost:3000/admin/login

---

## Project structure

```
fluide/
├── app/                           # Next.js App Router — every folder = a route
│   ├── layout.tsx                 # Global shell: navbar + footer
│   ├── page.tsx                   # Homepage: article list + search
│   ├── not-found.tsx              # Custom 404 page
│   ├── about/page.tsx             # /about
│   ├── articles/[slug]/page.tsx   # /articles/:slug — server-rendered from DB
│   ├── exercises/
│   │   ├── page.tsx               # /exercises — exercise index
│   │   └── [slug]/page.tsx        # /exercises/:slug — individual exercise
│   ├── (admin)/                   # Protected admin routes
│   │   ├── layout.tsx             # Admin shell
│   │   ├── page.tsx               # /admin — dashboard (article list)
│   │   ├── login/page.tsx         # /admin/login — Auth.js login form
│   │   └── articles/
│   │       ├── new/page.tsx       # /admin/articles/new — create article
│   │       └── [slug]/edit/page.tsx # /admin/articles/[slug]/edit — edit/delete
│   └── api/
│       └── auth/[...nextauth]/route.ts # Auth.js route handler
│
├── components/
│   ├── Navbar.tsx                 # Site navigation
│   ├── ArticleCard.tsx            # Card displayed on article list
│   ├── FilterableArticleList.tsx  # Client-side search/filter (homepage)
│   └── exercises/
│       ├── CyclicSighingWidget.tsx   # Cyclic Sighing exercise
│       └── ScrollToWidget.tsx       # Scroll-to exercise component
│
├── lib/
│   ├── articles.ts                # All Prisma operations (read + write)
│   ├── exercises.ts               # Exercise registry, getExercise(slug)
│   ├── prisma.ts                  # Prisma client singleton
│   ├── actions.ts                 # Server Actions (article mutations)
│   └── types.ts                   # Shared TypeScript types
│
├── prisma/
│   ├── schema.prisma              # Article model definition
│   └── migrations/                # Migration history
│
├── auth.ts                        # Auth.js configuration
├── proxy.ts                       # Route protection middleware (Next.js 16)
├── prisma.config.ts               # Prisma 7 configuration
│
└── public/
    ├── favicon.ico
    └── images/                    # Article covers, OG images
```

---

## How it works

### Articles (database-backed)

1. **Data source** → PostgreSQL (via Vercel Postgres)
2. **Access layer** → `lib/articles.ts` exposes read queries (`getArticles()`, `getArticle()`) and write operations (`createArticle()`, `updateArticle()`, `deleteArticle()`)
3. **Server Actions** → `lib/actions.ts` wraps mutations with error handling and redirects
4. **Pages**:
   - Public: `app/page.tsx` calls `getArticles()` for the homepage list
   - Public: `app/articles/[slug]/page.tsx` calls `getArticle(slug)` — server-rendered
   - Admin: `app/(admin)/page.tsx` calls `getAllArticles()` to show drafts + published
   - Admin: Forms in `/new` and `/edit` call Server Actions to save changes

### Exercises (registry-based, not database-backed)

1. **Registry** → hardcoded in `lib/exercises.ts` (single source of truth)
2. **Components** → stored in `components/exercises/`
3. **Pages** → `app/exercises/[slug]/page.tsx` renders each exercise
4. **Adding a new exercise** → create component + add one entry to the `exercises[]` array (that's it)

### Authentication

1. **Config** → `auth.ts` (Auth.js v5, Credentials provider)
2. **Credentials** → stored in `.env` (`ADMIN_EMAIL`, `ADMIN_PASSWORD`)
3. **Route handler** → `app/api/auth/[...nextauth]/route.ts`
4. **Protection** → `proxy.ts` redirects unauthenticated users away from `/admin/*`
5. **Session** → Auth.js manages a cookie-based session

---

## What I learned building this

### Phase 1
- Next.js App Router and dynamic routes with `[slug]`
- Static generation with `generateStaticParams` vs. server-rendering
- Building interactive React components — managing state, timers, animations
- TypeScript discipline — enforcing strict typing across the full stack
- Modular architecture — separating data access (`lib/`) from presentation (`components/`)
- Client-side filtering and search in React

### Phase 2
- Prisma 7 with driver adapters (`PrismaPg`)
- Auth.js v5 (NextAuth.js) — credentials provider, sessions, cookies
- PostgreSQL via Vercel Postgres — schema design and migrations
- Server Actions — mutations without API routes
- Route protection via middleware (Next.js 16 `proxy.ts`)
- Separation of concerns — `lib/articles.ts` (data), `lib/actions.ts` (mutations), pages (presentation)

---

## Next steps (Phase 3 — future)

- Dark mode support
- Rich text editor for article body (Markdown preview)
- More interactive exercises
- Analytics dashboard
- Public user accounts (future expansion)

---

## About me

**Nicolas Lavarde** — Full-stack developer building modern web applications with a focus on clean code and user-centered design.

Other projects:
- **Questmaker2** — [questmaker2.vercel.app](https://questmaker2.vercel.app) — Interactive RPG mechanics application with virtual currency and rate limiting

---

## License

This project is personal and open source.

---

## Get in touch

- GitHub: [@ThreeFrogs511](https://github.com/ThreeFrogs511)
- LinkedIn: [nicolaslavarde](https://www.linkedin.com/in/nicolas-lavarde-68999837b/)
- Email: Available on request