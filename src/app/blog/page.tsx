import React from 'react';
import { getArticles, getCategories } from '@/lib/sanity';
import ArticleCard from '@/components/blog/ArticleCard';
import Link from 'next/link';
import { Article, Category } from '@/types/sanity';

export const metadata = {
  title: 'Blog - Abogados Online Ecuador',
  description: 'Artículos y noticias sobre temas legales y notariales en Ecuador',
};

export const revalidate = 3600; // Revalidar cada hora

export default async function BlogPage() {
  const articles = await getArticles();
  const categories = await getCategories();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Blog de Abogados Online
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Artículos, guías y noticias sobre temas legales y notariales en Ecuador
        </p>
      </div>

      {/* Filtro de categorías */}
      {categories.length > 0 && (
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <Link 
              href="/blog"
              className="px-4 py-2 rounded-full bg-brand-600 text-white font-medium text-sm hover:bg-brand-700 transition-colors"
            >
              Todos
            </Link>
            {categories.map((category: Category) => (
              <Link
                key={category._id}
                href={`/blog/categoria/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-medium text-sm hover:bg-gray-200 transition-colors"
              >
                {category.title}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Lista de artículos */}
      {articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article: Article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No hay artículos disponibles en este momento.</p>
        </div>
      )}
    </div>
  );
}
