import { createClient } from 'next-sanity';
import { Article, Category } from '@/types/sanity';

export const client = createClient({
  projectId: 'dyi918qx',
  dataset: 'production',
  apiVersion: '2023-05-03', // Usa la fecha actual en formato YYYY-MM-DD
  useCdn: true, // `false` si quieres datos siempre actualizados
});

export async function getArticles(): Promise<Article[]> {
  return await client.fetch(`*[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    "categories": categories[]->title
  }`);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return await client.fetch(
    `*[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      body,
      publishedAt,
      "categories": categories[]->title,
      "author": author->{name, image}
    }`,
    { slug }
  );
}

export async function getCategories(): Promise<Category[]> {
  return await client.fetch(`*[_type == "category"] {
    _id,
    title,
    description
  }`);
}
