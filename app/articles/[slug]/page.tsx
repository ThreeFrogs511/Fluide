import { notFound } from 'next/navigation'
import { getArticle } from '@/lib/articles'

export const revalidate = 0

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

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
