# Fluide — phase map & decisions

## Phase 1 — public core (current)

**Goal:** ship a live, public-facing blog before touching any backend.

### In scope
- [ ] Article list page (`app/page.tsx`) with client-side search
- [ ] Individual article pages (`app/articles/[slug]/page.tsx`)
- [ ] Exercise index (`app/exercises/page.tsx`)
- [ ] Box breathing exercise (`app/exercises/box-breathing`)
- [ ] About page (`app/about/page.tsx`)
- [ ] Deployed on Vercel with real content

### Data source
- Articles: `content/articles.json` (hardcoded)
- Exercises: `lib/exercises.ts` registry (hardcoded)

### Explicitly out of scope for Phase 1
- No API routes
- No Prisma, no database
- No authentication
- No `(admin)` route group — do not create it
- No dark mode decision made yet (open)

---

## Phase 2 — admin layer (do not build yet)

**Goal:** add a CMS on top of the live product.

### In scope
- NextAuth.js v5 — single admin user, no public accounts
- `(admin)` route group protected by middleware
- Article CRUD: create, edit, publish/unpublish, delete
- Prisma + Vercel Postgres as data layer
- `lib/articles.ts` swapped to read from Prisma

### Migration notes
- `content/articles.json` deleted
- `app/articles/[slug]/page.tsx` drops `generateStaticParams`, becomes server-rendered
- No other Phase 1 files need changes

---

## Open decisions

| Decision | Status | Notes |
|---|---|---|
| Dark mode | Open | Phase 1 or Phase 2? |
| AI-powered features | Open | Worth exploring or out of scope? |
| Public user accounts | Deferred | Admin-only auth for now |

---

## Hard rules — always apply

- Never scaffold Phase 2 code while working on Phase 1
- Never use `any` in TypeScript
- Never use CSS modules or inline styles — Tailwind only
- Never create API routes in Phase 1
- Never edit root config files unless explicitly asked
- `lib/` = logic only, no JSX
- `components/` = UI only, no direct data fetching
- `'use client'` only where strictly necessary
- Simple over clever — this is a portfolio project, not a SaaS product
