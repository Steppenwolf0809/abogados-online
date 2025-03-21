'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { urlForImage } from '@/lib/sanity-image';
import { Article } from '@/types/sanity';

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <Link href={`/blog/${article.slug.current}`}>
        <div className="relative h-48 w-full">
          {article.mainImage ? (
            <Image
              src={urlForImage(article.mainImage).url()}
              alt={article.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {article.categories?.map((category, index) => (
              <span
                key={index}
                className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{article.title}</h3>
          {article.excerpt && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-3">{article.excerpt}</p>
          )}
          <p className="text-gray-500 text-xs">{formattedDate}</p>
        </div>
      </Link>
    </div>
  );
}
