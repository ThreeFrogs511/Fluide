import { notFound } from 'next/navigation'
import { getArticle } from '@/lib/articles'
import EditArticleForm from './EditArticleForm'

export default async function EditArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) notFound()

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">Edit article</h1>
      <EditArticleForm article={article} />
    </div>
  )
}
