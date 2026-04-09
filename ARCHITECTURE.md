# Fluide — architecture reference

## Folder structure

```
fluide/
├── app/                          # Next.js App Router — every folder = a route
│   ├── layout.tsx                # Global shell: Navbar + footer, wraps all routes
│   ├── page.tsx                  # / — article list + client-side search
│   ├── globals.css               # Tailwind base imports
│   ├── about/
│   │   └── page.tsx              # /about
│   ├── articles/
│   │   └── [slug]/
│   │       └── page.tsx          # /articles/:slug — uses generateStaticParams
│   ├── exercises/
│   │   ├── page.tsx              # /exercises — exercise index
│   │   └── [slug]/
│   │       └── page.tsx          # /exercises/:slug — uses generateStaticParams
│   └── (admin)/                  # ← PHASE 2 ONLY, do not create yet
│       └── ...                   # Protected by NextAuth middleware
│
├── components/
│   ├── Navbar.tsx                # Site navigation
│   ├── ArticleCard.tsx           # Card used on article list page
│   └── exercises/
│       ├── BreathingWidget.tsx   # Box breathing — 'use client', uses timers
│       └── ...                   # Future exercise components added here
│
├── lib/
│   ├── articles.ts               # getArticles() + getArticle(slug) — reads JSON now, Prisma in Phase 2
│   ├── exercises.ts              # Exercise registry + getExercise(slug)
│   └── utils.ts                  # Shared helpers
│
├── content/
│   ├── articles.json             # Hardcoded article data — deleted in Phase 2
│   └── (no exercises.json)       # Registry in lib/exercises.ts is the source of truth
│
└── public/
    ├── favicon.ico
    └── images/                   # Article cover images, OG images
```

## Route map

| URL | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Server component, search bar extracted as `'use client'` |
| `/about` | `app/about/page.tsx` | Static, no data |
| `/articles/[slug]` | `app/articles/[slug]/page.tsx` | `generateStaticParams` from `lib/articles.ts` |
| `/exercises` | `app/exercises/page.tsx` | Maps over registry |
| `/exercises/[slug]` | `app/exercises/[slug]/page.tsx` | `generateStaticParams` from `lib/exercises.ts` |

## `'use client'` policy

Only two components need `'use client'`:
- Search input on `app/page.tsx` — extracted into its own component so the page stays a server component
- `BreathingWidget.tsx` — uses `useState` and `setInterval`

Everything else is a server component by default. Never add `'use client'` without a reason.
