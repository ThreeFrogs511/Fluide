import { notFound } from 'next/navigation'

type Exercise = {
  slug: string
  title: string
  description: string
  duration: string
}

const exercises: Exercise[] = [
  {
    slug: 'box-breathing',
    title: 'Box Breathing',
    description:
      'A simple four-part breath cycle to calm the nervous system and reset before speaking.',
    duration: '5 min',
  },
]

export function generateStaticParams(): { slug: string }[] {
  return exercises.map((e) => ({ slug: e.slug }))
}

export default function ExercisePage({
  params,
}: {
  params: { slug: string }
}) {
  const exercise = exercises.find((e) => e.slug === params.slug)

  if (!exercise) notFound()

  return (
    <div className="max-w-2xl">
      <header className="mb-10">
        <h1 className="mb-3">{exercise.title}</h1>
        <p className="text-neutral-600 text-lg leading-relaxed">
          {exercise.description}
        </p>
        <p className="text-sm text-neutral-500 mt-3">{exercise.duration}</p>
      </header>
      <div className="border border-neutral-300 rounded-sm p-10 text-center text-neutral-400 text-sm">
        Exercise widget renders here
      </div>
    </div>
  )
}
