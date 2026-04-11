# Fluide

A personal blog and interactive wellness platform exploring stuttering, breathing techniques, and fluency — built with Next.js and TypeScript.

---

## Overview

Fluide is a space to write about stuttering and fluency from lived experience — documenting techniques that work, research findings, and building interactive tools for mindfulness and breathing practice.

---

## Features

### Phase 1 (Current)
- **Article list** with live client-side search
- **Individual article pages** with full content
- **Interactive breathing exercise** — box breathing with animated visual guide
- **About page**
- Fully static, deployed on Vercel
- Data stored in local JSON files

### Phase 2 (Planned)
- Admin authentication via NextAuth.js
- CMS for article management (create, edit, publish, delete)
- Database-backed articles (PostgreSQL via Vercel Postgres)
- Admin dashboard protected by middleware

---

## Tech Stack

| Layer | Technology | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Deployed on Vercel |
| Language | TypeScript | Strict typing, no `any` |
| Styling | Tailwind CSS | Utility-first, responsive design |
| Data | JSON (Phase 1) → PostgreSQL (Phase 2) | Prisma ORM planned |
| Auth | None (Phase 1) → NextAuth.js v5 (Phase 2) | Admin-only, single user |

---

## Running locally

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

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

---

## Project structure

```
fluide/
├── app/                      # Next.js App Router — every folder = a route
│   ├── layout.tsx            # Global shell: navbar + footer
│   ├── page.tsx              # Homepage: article list + search
│   ├── about/page.tsx        # /about
│   ├── articles/[slug]/      # /articles/:slug (dynamic, static generation)
│   └── exercises/[slug]/     # /exercises/:slug (dynamic, static generation)
│
├── components/
│   ├── Navbar.tsx            # Site navigation
│   ├── ArticleCard.tsx       # Card on article list
│   └── exercises/
│       └── BreathingWidget.tsx  # Box breathing exercise
│
├── lib/
│   ├── articles.ts           # getArticles(), getArticle(slug)
│   ├── exercises.ts          # Exercise registry, getExercise(slug)
│   └── utils.ts              # Shared helpers
│
├── content/
│   └── articles.json         # Article data (deleted in Phase 2)
│
└── public/
    └── images/               # Article covers, OG images
```

---

## How it works

### Articles
1. **JSON source** → stored in `content/articles.json`
2. **Access layer** → `lib/articles.ts` exports `getArticles()` and `getArticle(slug)`
3. **Pages** → `app/articles/[slug]/page.tsx` renders individual articles
4. **Static generation** → `generateStaticParams()` pre-renders all articles at build time

**Phase 2 change:** Only `lib/articles.ts` changes — it reads from Prisma instead. No page components are affected.

### Exercises
1. **Registry** → defined in `lib/exercises.ts` (single source of truth)
2. **Components** → stored in `components/exercises/` (e.g., `BreathingWidget.tsx`)
3. **Pages** → `app/exercises/[slug]/page.tsx` renders each exercise
4. **Adding a new exercise** → create component + add one entry to registry (that's it)

---

## What I learned building this

- Static generation with `generateStaticParams` — pre-rendering dynamic routes at build time
- Building interactive React components — managing state, timers, and animations
- TypeScript discipline — enforcing strict typing across the full stack
- Modular architecture — separating data access (`lib/`) from presentation (`components/`)
- Deployment automation — zero-config deployments from GitHub to Vercel

---

## Next steps

1. **Deploy on Vercel** ✅ (in progress)
2. Add 1–2 more interactive exercises
3. Expand content to 10+ articles
4. Begin Phase 2 — authentication and CMS

---

## Technologies

- **Prisma** — next-generation ORM for database access
- **NextAuth.js** — enterprise-grade authentication system
- **PostgreSQL + Vercel** — production database infrastructure

---

## About me

**Nicolas Lavarde** — Full-stack developer specializing in modern web applications.

Other projects:
- **Questmaker2** — [questmaker2.vercel.app](https://questmaker2.vercel.app) — Interactive RPG mechanics application with virtual currency and rate limiting

---

## License

This project is personal and open source. See `LICENSE` for details.

---

## Get in touch

Found a bug? Have suggestions? Feel free to open an issue or reach out.

- GitHub: [@ThreeFrogs511](https://github.com/ThreeFrogs511)
- LinkedIn: [nicolaslavarde](https://www.linkedin.com/in/nicolas-lavarde-68999837b/) 