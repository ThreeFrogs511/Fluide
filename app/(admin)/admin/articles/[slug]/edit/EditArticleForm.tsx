'use client'

import { useState } from 'react'
import type { Article } from '@/lib/types'
import { updateArticleAction, deleteArticleAction } from '@/lib/actions'

export default function EditArticleForm({ article }: { article: Article }) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState('')
  const [deleting, setDeleting] = useState(false)

  async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    const formData = new FormData(e.currentTarget)
    const slug = formData.get('slug') as string

    if (!/^[a-z0-9-]+$/.test(slug)) {
      setError('Slug may only contain lowercase letters, numbers, and hyphens.')
      return
    }

    setLoading(true)

    const result = await updateArticleAction(article.slug, {
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

  async function handleDelete() {
    setDeleting(true)
    const result = await deleteArticleAction(article.slug)
    setDeleting(false)
    if (result?.error) {
      setError(result.error)
    }
  }

  return (
    <div>
      <form onSubmit={handleUpdate} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={article.title}
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
            defaultValue={article.slug}
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
            defaultValue={article.date}
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
            defaultValue={article.excerpt}
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
            defaultValue={article.body}
            className="w-full border border-neutral-300 rounded-md px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-neutral-800 focus:border-transparent resize-y font-mono"
          />
          <p className="text-xs text-neutral-400 mt-1">Separate paragraphs with a blank line.</p>
        </div>

        <div className="flex items-center gap-3">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={article.published}
            className="h-4 w-4 rounded border-neutral-300 accent-neutral-900"
          />
          <label htmlFor="published" className="text-sm font-medium">
            Published
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
            {loading ? 'Saving…' : 'Save changes'}
          </button>
          <a
            href="/admin"
            className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>

      <div className="max-w-2xl mt-16 pt-8 border-t border-neutral-200">
        <h2 className="text-base font-semibold mb-1">Delete article</h2>
        <p className="text-sm text-neutral-500 mb-4">
          To delete this article, type its slug to confirm.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={deleteConfirm}
            onChange={(e) => setDeleteConfirm(e.target.value)}
            placeholder={article.slug}
            className="border border-neutral-300 rounded-md px-3 py-2 text-sm bg-transparent focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-mono w-64"
          />
          <button
            type="button"
            disabled={deleteConfirm !== article.slug || deleting}
            onClick={handleDelete}
            className="bg-red-600 text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {deleting ? 'Deleting…' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}
