import FilterableArticleList from '@/components/FilterableArticleList'
import { getArticles } from '@/lib/articles'

export const revalidate = 0

export default async function HomePage() {
  const articles = await getArticles()

  console.log(articles)
  return (
    <>
      <header className="mb-12">
        <h1 className="mb-4">All my writings</h1>
        <p className="text-neutral-600 text-lg">
          Notes on stuttering, breathing, and finding ease in speech.
        </p>
      </header>
      <FilterableArticleList articles={articles} />
    </>
  )
}
