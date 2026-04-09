# Fluide — data flow reference

## Article data flow

```
content/articles.json
        ↓
lib/articles.ts          ← only file that knows where data comes from
  getArticles()          ← returns Article[]
  getArticle(slug)       ← returns Article | undefined
        ↓
app/page.tsx             ← calls getArticles(), passes to ArticleCard
app/articles/[slug]/page.tsx  ← calls getArticle(params.slug)
```

### Phase 2 change
Only `lib/articles.ts` changes — it swaps the JSON read for a Prisma query.
No component, no page, no route file needs to change.

## Exercise data flow

```
lib/exercises.ts         ← single source of truth (NOT a JSON file)
  exercises[]            ← registry array
  getExercise(slug)      ← returns Exercise | undefined
        ↓
app/exercises/page.tsx        ← maps over exercises[] to render index
app/exercises/[slug]/page.tsx ← calls getExercise(params.slug), renders component
```

### Adding a new exercise (always these two steps, nothing else)
1. Create component in `components/exercises/NewExercise.tsx`
2. Add one entry to `exercises[]` in `lib/exercises.ts`

The index page and the dynamic route update automatically.

## TypeScript types

```ts
type Article = {
  slug: string
  title: string
  date: string        // ISO string e.g. "2025-04-01"
  excerpt: string     // Short summary for ArticleCard
  body: string        // Full content, rendered on article page
}

type Exercise = {
  slug: string
  title: string
  description: string
  duration: string    // Human-readable e.g. "5 min"
  component: ComponentType  // React component, rendered on exercise page
}
```

## Static generation — how generateStaticParams works

Both dynamic routes use `generateStaticParams` to pre-render all pages at build time.

```ts
// app/articles/[slug]/page.tsx
export function generateStaticParams() {
  return getArticles().map(a => ({ slug: a.slug }))
}

// app/exercises/[slug]/page.tsx
export function generateStaticParams() {
  return exercises.map(e => ({ slug: e.slug }))
}
```

- Runs once at build time (`next build`), never at request time
- Returns `{ slug: string }[]` — Next.js builds one HTML file per object
- Unknown slugs → `notFound()` → 404
- Phase 2: articles route drops `generateStaticParams` and becomes server-rendered (DB data isn't known at build time)
