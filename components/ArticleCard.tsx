import Link from 'next/link'

type Props = {
  slug: string
  title: string
  date: string
  excerpt: string
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function ArticleCard({ slug, title, date, excerpt }: Props) {
  return (
    <article className="py-8 border-b border-neutral-200 last:border-none">
      <Link href={`/articles/${slug}`} className="group block">
        <h2 className="text-xl font-semibold group-hover:underline underline-offset-4 transition-colors mb-1">
          {title}
        </h2>
      </Link>
      <p className="text-sm text-neutral-500 mb-3">{formatDate(date)}</p>
      <p className="text-neutral-700 leading-relaxed">{excerpt}</p>
    </article>
  )
}
