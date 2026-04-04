'use client'

import { useState } from 'react'
import ArticleCard from './ArticleCard'
import type { Article } from '@/lib/types'

type Props = {
  articles: Article[]
}

export default function FilterableArticleList({ articles }: Props) {
  // State for the search query
  const [query, setQuery] = useState('')

  // Filter articles based on the search query
  const filtered = query.trim()
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(query.toLowerCase()) ||
          a.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : articles

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search articles..."
        aria-label="Search articles"
        className="w-full bg-transparent border-b border-neutral-400 py-2 text-base placeholder:text-neutral-400 focus:outline-none focus:border-neutral-800 transition-colors mb-2"
      />
      <div>
        {filtered.length > 0 ? (
          filtered.map((article) => (
            <ArticleCard key={article.slug} {...article} />
          ))
        ) : (
          <p className="py-12 text-neutral-500">No articles match your search.</p>
        )}
      </div>
    </div>
  )
}
