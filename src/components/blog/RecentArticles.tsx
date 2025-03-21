'use client';

import React from 'react';
import Link from 'next/link';
import ArticleCard from './ArticleCard';
import { Article } from '@/types/sanity';

interface RecentArticlesProps {
  articles: Article[];
}

export default function RecentArticles({ articles }: RecentArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Artículos Recientes
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Mantente informado con nuestros últimos artículos sobre temas legales y notariales
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article) => (
            <ArticleCard key={article._id} article={article} />
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 bg-brand-600 text-white font-medium rounded-md hover:bg-brand-700 transition-colors"
          >
            Ver todos los artículos
          </Link>
        </div>
      </div>
    </section>
  );
}
