import { notFound } from 'next/navigation'
import { exercises, getExercise } from '@/lib/exercises'
import ScrollToWidget from '@/components/exercises/ScrollToWidget'

// Tells Next.js which slugs exist at build time so it can pre-render them as static HTML.
// Returns [{ slug: 'cyclic-sighing' }, ...] — one object per registered exercise.
// Unknown slugs (not in this list) fall through to notFound() below.
export function generateStaticParams(): { slug: string }[] {
  return exercises.map((e) => ({ slug: e.slug }))
}

// In Next.js 16 App Router, `params` is a Promise — it must be awaited.
// The function must be async because of this.
export default async function ExercisePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const exercise = getExercise(slug)

  if (!exercise) notFound()


  const ExerciseComponent = exercise.component

  return (
    <div className="max-w-2xl">
      <header className="mb-12">
        <h1 className="mb-3">{exercise.title}</h1>
        <p className="text-neutral-600 text-lg leading-relaxed">
          {exercise.description}
        </p>
        <p className="text-sm text-neutral-500">{exercise.duration}</p>
        <ScrollToWidget />
      </header>
      {/* id="widget" is the scroll target for the ScrollToWidget button above */}
      <div id="widget">
        <ExerciseComponent />
      </div>
    </div>
  )
}
