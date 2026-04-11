'use client'

import { useState } from 'react'
import { createArticleAction } from '@/lib/actions'

const today = new Date().toISOString().split('T')[0]

export default function NewArticlePage() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const slug = formData.get('slug') as string

    if (!/^[a-z0-9-]+$/.test(slug)) {
      setError('Slug may only contain lowercase letters, numbers, and hyphens.')
      return
    }

    setLoading(true)

    const result = await createArticleAction({
      title: formData.get('title') as string,
      slug,
      date: formData.get('date') as string,
      excerpt: formData.get('excerpt') as string,
      body: formData.get('body') as string,
      published: formData.get('published') === 'on',
    })

    setLoading(false)

    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-8">New article</h1>
      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="slug" className="block text-sm font-medium mb-1">
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            required
            placeholder="my-article-title"
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent font-mono"
          />
          <p className="text-xs text-neutral-400 mt-1">Lowercase letters, numbers, and hyphens only.</p>
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            required
            defaultValue={today}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            required
            rows={3}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent resize-y"
          />
        </div>

        <div>
          <label htmlFor="body" className="block text-sm font-medium mb-1">
            Body
          </label>
          <textarea
            id="body"
            name="body"
            required
            rows={20}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent resize-y font-mono"
          />
          <p className="text-xs text-neutral-400 mt-1">Separate paragraphs with a blank line.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="published"
            name="published"
            type="checkbox"
            className="h-4 w-4 rounded border-neutral-300 accent-neutral-900"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Publish immediately
          </label>
        </div>

        {error && (
          <p className="text-sm text-red-600">{error}</p>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-neutral-900 text-white rounded-md px-5 py-2 text-sm font-medium hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating…' : 'Create article'}
          </button>
          <a
            href="/admin"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
