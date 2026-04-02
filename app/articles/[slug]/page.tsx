import { notFound } from 'next/navigation'

type Article = {
  slug: string
  title: string
  date: string
  body: string
}

const articles: Article[] = [
  {
    slug: 'learning-to-breathe',
    title: 'Learning to Breathe',
    date: '2025-03-15',
    body: `There is a moment, just before I speak in a room full of people, when everything tightens. My chest, my throat, my jaw. The word I want to say is right there — I can feel its shape — but it will not come out on the timetable the world expects.

Stuttering has been my companion for as long as I can remember. For a long time I treated it as an enemy, something to overcome, suppress, or hide. I got good at avoidance. I swapped words I could not say for ones that felt safer. I let silences stretch and blamed them on thinking.

What changed was breath.

Not breathing in the "just relax" sense — that advice is well-meaning and completely useless. I mean breath as a practice: something deliberate, something you return to. Box breathing, diaphragmatic breathing, the slow exhale before a sentence begins. These are not tricks. They are a way of reminding the body that there is no emergency.

I do not stutter less than I used to. But I am less afraid of it. And that, it turns out, changes everything.`,
  },
]

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function generateStaticParams(): { slug: string }[] {
  return articles.map((a) => ({ slug: a.slug }))
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string }
}) {
  const article = articles.find((a) => a.slug === params.slug)

  if (!article) notFound()

  return (
    <article className="max-w-2xl">
      <header className="mb-10">
        <h1 className="mb-3">{article.title}</h1>
        <p className="text-sm text-neutral-500">{formatDate(article.date)}</p>
      </header>
      <div className="space-y-5">
        {article.body.split('\n\n').map((paragraph, i) => (
          <p key={i} className="text-neutral-800 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  )
}
