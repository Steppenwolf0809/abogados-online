import React from 'react';
import { getArticleBySlug } from '@/lib/sanity';
import { urlForImage } from '@/lib/sanity-image';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PortableText from '@/components/blog/PortableText';

export const revalidate = 3600; // Revalidar cada hora

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    return {
      title: 'Artículo no encontrado - Abogados Online Ecuador',
    };
  }
  
  return {
    title: `${article.title} - Abogados Online Ecuador`,
    description: article.excerpt || 'Artículo legal en Abogados Online Ecuador',
  };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  
  if (!article) {
    notFound();
  }
  
  const formattedDate = new Date(article.publishedAt).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/blog" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Volver al blog
      </Link>
      
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        {article.mainImage && (
          <div className="relative w-full h-64 md:h-96">
            <Image
              src={urlForImage(article.mainImage).url()}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        
        <div className="p-6 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {article.categories?.map((category: string, index: number) => (
              <span
                key={index}
                className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded"
              >
                {category}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <div className="flex items-center text-gray-500 text-sm mb-6">
            <span>{formattedDate}</span>
            {article.author && (
              <>
                <span className="mx-2">•</span>
                <span>Por {article.author.name}</span>
              </>
            )}
          </div>
          
          {article.excerpt && (
            <div className="text-lg text-gray-700 mb-6 font-medium italic">
              {article.excerpt}
            </div>
          )}
          
          {article.body && (
            <div className="mt-8">
              <PortableText value={article.body} />
            </div>
          )}
        </div>
      </article>
    </div>
  );
}
