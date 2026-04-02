import Link from 'next/link'

const exercises = [
  {
    slug: 'box-breathing',
    title: 'Box Breathing',
    description:
      'A simple four-part breath cycle to calm the nervous system and reset before speaking.',
    duration: '5 min',
  },
]

export default function ExercisesPage() {
  return (
    <>
      <header className="mb-12">
        <h1 className="mb-4">Exercises</h1>
        <p className="text-neutral-600 text-lg">
          Practical breathing techniques you can use anywhere, anytime.
        </p>
      </header>
      <div>
        {exercises.map((exercise) => (
          <article
            key={exercise.slug}
            className="py-8 border-b border-neutral-200 last:border-none"
          >
            <Link href={`/exercises/${exercise.slug}`} className="group block">
              <h2 className="text-xl font-semibold group-hover:underline underline-offset-4 mb-1">
                {exercise.title}
              </h2>
            </Link>
            <p className="text-sm text-neutral-500 mb-3">{exercise.duration}</p>
            <p className="text-neutral-700 leading-relaxed">{exercise.description}</p>
          </article>
        ))}
      </div>
    </>
  )
}
