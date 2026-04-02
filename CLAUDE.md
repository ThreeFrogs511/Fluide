# Fluide — Claude context

## What is Fluide

Fluide is a personal blog and interactive wellness tool built by Nicolas Lavarde. The project is personal: Nicolas stutters, and Fluide is a space to write about stuttering, breathing techniques, fluency, and well-being — built from lived experience.

- **Brand name:** Fluide
- **Language:** English only — all UI, copy, and code comments
- **Tone:** Warm and human, not corporate

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript — no `any` |
| Styling | Tailwind CSS only — no CSS modules, no inline styles |
| ORM | Prisma (Phase 2) |
| Database | PostgreSQL via Vercel Postgres (Phase 2) |
| Auth | NextAuth.js v5 (Phase 2) |
| Deployment | Vercel |
| Min Node | 20.9 |

---

## File structure

```
fluide/
├── app/
│   ├── layout.tsx                  # Global shell — navbar + footer
│   ├── page.tsx                    # Homepage — article list + search
│   ├── globals.css                 # Tailwind base + tokens
│   ├── about/
│   │   └── page.tsx
│   ├── articles/
│   │   └── [slug]/
│   │       └── page.tsx            # Individual article page
│   ├── exercises/
│   │   ├── page.tsx                # Exercise index
│   │   └── [slug]/
│   │       └── page.tsx            # Individual exercise page
│   └── (admin)/                    # Phase 2 only — do not create yet
├── components/
│   ├── Navbar.tsx
│   ├── ArticleCard.tsx
│   └── exercises/
│       ├── BreathingWidget.tsx     # Box breathing exercise
│       └── ...                     # Future exercise components
├── lib/
│   ├── articles.ts                 # Data access — reads JSON now, Prisma in Phase 2
│   ├── exercises.ts                # Exercise registry
│   └── utils.ts
├── content/
│   ├── articles.json               # Hardcoded articles — deleted in Phase 2
│   └── exercises.json              # Exercise metadata (optional)
└── public/
    ├── favicon.ico
    └── images/
```

---

## Key logic patterns

### Article data flow

`content/articles.json` → `lib/articles.ts` → page components

`lib/articles.ts` exposes two functions:
- `getArticles()` — returns all articles
- `getArticle(slug: string)` — returns one article or undefined

In Phase 2, only `lib/articles.ts` changes (reads from Prisma instead of JSON). No component changes needed.

### Exercise registry

`lib/exercises.ts` is the single source of truth for all exercises. It exports:
- `exercises` — array of `Exercise` objects, each with `slug`, `title`, `description`, `duration`, `component`
- `getExercise(slug: string)` — lookup by slug

Adding a new exercise = create a component in `components/exercises/`, add one entry to the `exercises` array. Nothing else changes.

### Dynamic routes and `generateStaticParams`

Both `app/articles/[slug]/page.tsx` and `app/exercises/[slug]/page.tsx` use `generateStaticParams` to pre-render all known slugs at build time. Each calls its respective lib function to get the list of slugs.

Unknown slugs call `notFound()` to trigger the built-in 404 page.

### `'use client'` policy

Only use `'use client'` where strictly necessary:
- Search input on the article list (client-side filtering)
- Breathing widget (uses timers and React state)

Everything else is a server component by default.

---

## Types

```ts
type Article = {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
}

type Exercise = {
  slug: string
  title: string
  description: string
  duration: string
  component: ComponentType
}
```

---

## Phases

### Phase 1 — public core (current)
- Article list page with live search
- Individual article pages
- Interactive breathing exercise (box breathing)
- About page
- Data from local JSON files
- Fully static — no API routes, no auth, no database

### Phase 2 — admin layer (do not build yet)
- NextAuth.js authentication (single admin user)
- Protected `(admin)` route group
- Article CRUD via Prisma + Vercel Postgres
- `lib/articles.ts` swapped to read from DB — no other files change

---

## Rules for this project

- Never scaffold Phase 2 code while working on Phase 1
- Never use `any` in TypeScript
- Never use CSS modules or inline styles — Tailwind only
- Never create API routes in Phase 1
- Never edit root config files (`next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`) unless explicitly asked
- Keep components simple and readable — no over-engineering
- `lib/` contains logic only — no JSX, no UI
- `components/` contains UI only — no direct data fetching outside of what is passed as props