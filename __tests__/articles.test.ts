import { describe, it, expect, vi, beforeEach } from 'vitest'
import type { Article } from '@/lib/types'
import { getArticles, getAllArticles, getArticle } from '@/lib/articles'
import { prisma } from '@/lib/prisma'

vi.mock('@/lib/prisma', () => ({
  prisma: {
    article: {
      findMany: vi.fn(),
      findUnique: vi.fn(),
    },
  },
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

const draft: Article = { ...mockArticle, id: '2', slug: 'draft-article', published: false }

beforeEach(() => vi.clearAllMocks())

describe('getArticles', () => {
  it('queries only published articles', async () => {
    vi.mocked(prisma.article.findMany).mockResolvedValue([mockArticle])
    await getArticles()
    expect(prisma.article.findMany).toHaveBeenCalledWith({
      where: { published: true },
      orderBy: { date: 'desc' },
    })
  })

  it('orders results by date descending', async () => {
    vi.mocked(prisma.article.findMany).mockResolvedValue([mockArticle])
    await getArticles()
    expect(prisma.article.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ orderBy: { date: 'desc' } }),
    )
  })

  it('returns the articles from prisma', async () => {
    vi.mocked(prisma.article.findMany).mockResolvedValue([mockArticle])
    const result = await getArticles()
    expect(result).toEqual([mockArticle])
  })
})

describe('getAllArticles', () => {
  it('queries all articles without a published filter', async () => {
    vi.mocked(prisma.article.findMany).mockResolvedValue([mockArticle, draft])
    await getAllArticles()
    expect(prisma.article.findMany).toHaveBeenCalledWith({ orderBy: { date: 'desc' } })
  })

  it('returns drafts alongside published articles', async () => {
    vi.mocked(prisma.article.findMany).mockResolvedValue([mockArticle, draft])
    const result = await getAllArticles()
    expect(result).toEqual([mockArticle, draft])
  })
})

describe('getArticle', () => {
  it('returns the article when found', async () => {
    vi.mocked(prisma.article.findUnique).mockResolvedValue(mockArticle)
    const result = await getArticle('test-article')
    expect(result).toEqual(mockArticle)
  })

  it('returns null when the slug does not exist', async () => {
    vi.mocked(prisma.article.findUnique).mockResolvedValue(null)
    const result = await getArticle('nonexistent')
    expect(result).toBeNull()
  })
})
