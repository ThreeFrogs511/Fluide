'use server'

import { redirect } from 'next/navigation'
import {
  createArticle,
  updateArticle,
  deleteArticle,
} from '@/lib/articles'
import type { CreateArticleInput, UpdateArticleInput } from '@/lib/articles'

export async function createArticleAction(
  data: CreateArticleInput
): Promise<{ error: string } | void> {
  try {
    await createArticle(data)
  } catch (e) {
    const err = e as { code?: string }
    if (err.code === 'P2002') {
      return { error: 'An article with this slug already exists.' }
    }
    return { error: 'Something went wrong. Please try again.' }
  }
  redirect('/admin')
}

export async function updateArticleAction(
  slug: string,
  data: UpdateArticleInput
): Promise<{ error: string } | void> {
  try {
    await updateArticle(slug, data)
  } catch {
    return { error: 'Something went wrong. Please try again.' }
  }
  redirect('/admin')
}

export async function deleteArticleAction(
  slug: string
): Promise<{ error: string } | void> {
  try {
    await deleteArticle(slug)
  } catch {
    return { error: 'Something went wrong. Please try again.' }
  }
  redirect('/admin')
}
