import { prisma } from '@/lib/prisma'
import type { Article } from '@/lib/types'

export type CreateArticleInput = {
  slug: string
  title: string
  date: string
  excerpt: string
  body: string
  published: boolean
}

export type UpdateArticleInput = {
  slug?: string
  title?: string
  date?: string
  excerpt?: string
  body?: string
  published?: boolean
}

// Published articles only, ordered by date descending — used by public pages
export async function getArticles(): Promise<Article[]> {
  return prisma.article.findMany({
    where: { published: true },
    orderBy: { date: 'desc' },
  })
}

// All articles including drafts — used by admin dashboard
export async function getAllArticles(): Promise<Article[]> {
  return prisma.article.findMany({
    orderBy: { date: 'desc' },
  })
}

export async function getArticle(slug: string): Promise<Article | null> {
  return prisma.article.findUnique({
    where: { slug },
  })
}

export async function createArticle(data: CreateArticleInput): Promise<Article> {
  return prisma.article.create({ data })
}

export async function updateArticle(slug: string, data: UpdateArticleInput): Promise<Article> {
  return prisma.article.update({
    where: { slug },
    data,
  })
}

export async function deleteArticle(slug: string): Promise<Article> {
  return prisma.article.delete({
    where: { slug },
  })
}
