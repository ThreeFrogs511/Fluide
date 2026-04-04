import articles from '@/content/articles.json'
import type { Article } from '@/lib/types'

//fetch the articles from the JSON file for now, but eventually this will be replaced 
// with calls to a CMS or database
export function getArticles(): Article[] {
  return articles;
}

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
