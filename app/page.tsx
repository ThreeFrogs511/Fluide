import FilterableArticleList from '@/components/FilterableArticleList'


//hardcoded placeholder article list for now, but eventually this will be fetched from a CMS or database
const articles = [
  {
    slug: 'learning-to-breathe',
    title: 'Learning to Breathe',
    date: '2025-03-15',
    excerpt:
      'Stuttering taught me that breath is not just air — it is timing, trust, and the willingness to slow down. Here is what I have learned.',
    body: '',
  },
  {
    slug: 'what-fluency-means-to-me',
    title: 'What Fluency Means to Me',
    date: '2025-01-28',
    excerpt:
      'Fluency is not the absence of stuttering. It is the feeling of being present in a conversation without fear running the clock.',
    body: '',
  },
]

export default function HomePage() {
  return (
    <>
      <header className="mb-12">
        <h1 className="mb-4">Writing</h1>
        <p className="text-neutral-600 text-lg">
          Notes on stuttering, breathing, and finding ease in speech.
        </p>
      </header>
      <FilterableArticleList articles={articles} />
    </>
  )
}
