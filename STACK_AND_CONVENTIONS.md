# Fluide — stack & conventions

## Tech stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js 16 (App Router) | Scaffolded with `create-next-app` |
| Language | TypeScript | No `any`, ever |
| Styling | Tailwind CSS | No CSS modules, no inline styles |
| ORM | Prisma | Phase 2 only |
| Database | PostgreSQL via Vercel Postgres | Phase 2 only |
| Auth | NextAuth.js v5 | Phase 2 only, single admin user |
| Deployment | Vercel | |
| Min Node | 20.9 | |

## Developer profile

Nicolas Lavarde — ~1 year experience, French government-certified bootcamp (DWWM).
Comfortable with: TypeScript, React, Next.js, raw SQL via `pg`.
New to: Prisma (connect concepts to raw SQL equivalents), NextAuth.js (connect to basic session/cookie mechanics).
When explaining new concepts, always relate back to what he already knows.

## Naming conventions

| Thing | Convention | Example |
|---|---|---|
| Components | PascalCase | `ArticleCard.tsx` |
| Pages | `page.tsx` | `app/about/page.tsx` |
| Lib functions | camelCase | `getArticles()` |
| Types | PascalCase | `Article`, `Exercise` |
| Slugs | kebab-case | `box-breathing`, `my-first-article` |
| JSON keys | camelCase | `{ "slug": "...", "createdAt": "..." }` |

## Component conventions

```tsx
// Server component (default — no directive needed)
export default function ArticlePage({ params }: { params: { slug: string } }) {}

// Client component (only when necessary)
'use client'
export default function SearchBar() {}

// Component with typed props
type Props = {
  article: Article
}
export default function ArticleCard({ article }: Props) {}
```

## lib/ conventions

```ts
// lib/articles.ts — data access only, no JSX
import articles from '@/content/articles.json'

export type Article = {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
}

export function getArticles(): Article[] {
  return articles
}

export function getArticle(slug: string): Article | undefined {
  return articles.find(a => a.slug === slug)
}
```

## Path aliases

`@/` maps to the project root (configured by `create-next-app`).
Always use `@/` for imports, never relative paths like `../../`.

```ts
import { getArticles } from '@/lib/articles'
import ArticleCard from '@/components/ArticleCard'
```

## What already exists (do not recreate)

The following were created by `create-next-app` and should not be overwritten:
- `next.config.ts`
- `tsconfig.json`
- `eslint.config.mjs`
- `postcss.config.mjs`
- `package.json` / `package-lock.json`
- `.gitignore`
- `public/` (default assets)

When editing `app/layout.tsx` or `app/page.tsx`, edit in place — do not recreate.
