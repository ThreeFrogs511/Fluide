export type Article = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  body: string;
};

export function getArticles(): Article[] {
  return [];
}

export function getArticle(slug: string): Article | undefined {
  return undefined;
}
