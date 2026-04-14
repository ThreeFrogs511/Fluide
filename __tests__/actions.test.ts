import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Article } from '@/lib/types'
import { createArticleAction, updateArticleAction, deleteArticleAction } from '@/lib/actions'
import { createArticle, updateArticle, deleteArticle } from '@/lib/articles'
import { redirect } from 'next/navigation'

vi.mock('@/lib/articles', () => ({
  createArticle: vi.fn(),
  updateArticle: vi.fn(),
  deleteArticle: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  redirect: vi.fn(),
}))

const mockArticle: Article = {
  id: '1',
  slug: 'test-article',
  title: 'Test Article',
  date: '2024-01-01',
  excerpt: 'Test excerpt',
  body: 'Test body',
  published: true,
  createdAt: new Date('2024-01-01'),
  updatedAt: new Date('2024-01-01'),
}

const createInput = {
  slug: 'test-article',
  title: 'Test Article',
  date: '2024-01-01',
  excerpt: 'Test excerpt',
  body: 'Test body',
  published: true,
}

beforeEach(() => vi.clearAllMocks())

describe('createArticleAction', () => {
  it('calls createArticle with the provided data', async () => {
    vi.mocked(createArticle).mockResolvedValue(mockArticle)
    await createArticleAction(createInput)
    expect(createArticle).toHaveBeenCalledWith(createInput)
  })

  it('redirects to /admin on success', async () => {
    vi.mocked(createArticle).mockResolvedValue(mockArticle)
    await createArticleAction(createInput)
    expect(redirect).toHaveBeenCalledWith('/admin')
  })

  it('returns a slug-conflict error when prisma code is P2002', async () => {
    vi.mocked(createArticle).mockRejectedValue({ code: 'P2002' })
    const result = await createArticleAction(createInput)
    expect(result).toEqual({ error: 'An article with this slug already exists.' })
  })

  it('returns a generic error on unexpected failure', async () => {
    vi.mocked(createArticle).mockRejectedValue(new Error('db error'))
    const result = await createArticleAction(createInput)
    expect(result).toEqual({ error: 'Something went wrong. Please try again.' })
  })
})

describe('updateArticleAction', () => {
  it('calls updateArticle with the correct slug and data', async () => {
    vi.mocked(updateArticle).mockResolvedValue(mockArticle)
    await updateArticleAction('test-article', { title: 'Updated' })
    expect(updateArticle).toHaveBeenCalledWith('test-article', { title: 'Updated' })
  })

  it('redirects to /admin on success', async () => {
    vi.mocked(updateArticle).mockResolvedValue(mockArticle)
    await updateArticleAction('test-article', { title: 'Updated' })
    expect(redirect).toHaveBeenCalledWith('/admin')
  })

  it('returns an error object on failure', async () => {
    vi.mocked(updateArticle).mockRejectedValue(new Error('db error'))
    const result = await updateArticleAction('test-article', { title: 'Updated' })
    expect(result).toEqual({ error: 'Something went wrong. Please try again.' })
  })
})

describe('deleteArticleAction', () => {
  it('calls deleteArticle with the correct slug', async () => {
    vi.mocked(deleteArticle).mockResolvedValue(mockArticle)
    await deleteArticleAction('test-article')
    expect(deleteArticle).toHaveBeenCalledWith('test-article')
  })

  it('redirects to /admin on success', async () => {
    vi.mocked(deleteArticle).mockResolvedValue(mockArticle)
    await deleteArticleAction('test-article')
    expect(redirect).toHaveBeenCalledWith('/admin')
  })

  it('returns an error object on failure', async () => {
    vi.mocked(deleteArticle).mockRejectedValue(new Error('db error'))
    const result = await deleteArticleAction('test-article')
    expect(result).toEqual({ error: 'Something went wrong. Please try again.' })
  })
})
