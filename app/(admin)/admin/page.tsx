import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function AdminPage() {
  const articles = await getAllArticles()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Articles</h1>
        <Link
          href="/admin/articles/new"
          className="bg-neutral-900 text-white text-sm font-medium px-4 py-2 rounded-md hover:bg-neutral-700 transition-colors"
        >
          New article
        </Link>
      </div>

      {articles.length === 0 ? (
        <p className="text-neutral-500 py-8">No articles yet. Create your first one.</p>
      ) : (
        <div>
          {articles.map((article) => (
            <div
              key={article.slug}
              className="flex items-center justify-between py-4 border-b border-neutral-200 last:border-none gap-4"
            >
              <div className="min-w-0">
                <p className="font-medium truncate">{article.title}</p>
                <p className="text-sm text-neutral-500">{formatDate(article.date)}</p>
              </div>
              <div className="flex items-center gap-4 shrink-0">
                <span
                  className={
                    article.published
                      ? 'text-xs font-medium text-green-700 bg-green-100 px-2 py-0.5 rounded-full'
                      : 'text-xs font-medium text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded-full'
                  }
                >
                  {article.published ? 'Published' : 'Draft'}
                </span>
                <Link
                  href={`/admin/articles/${article.slug}/edit`}
                  className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
