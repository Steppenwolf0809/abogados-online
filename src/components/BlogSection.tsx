'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ScrollAnimation from './ScrollAnimation';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  slug: string;
}

// Sample blog posts - these would typically come from a CMS or API
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Guía completa sobre trámites notariales en Ecuador',
    excerpt: 'Todo lo que necesitas saber sobre los trámites notariales más comunes en Ecuador y cómo realizarlos de manera eficiente.',
    date: '15 Feb 2025',
    author: 'Dr. Carlos Mendoza',
    category: 'Guías Legales',
    imageUrl: '/images/background-texture.jpg',
    slug: 'guia-tramites-notariales-ecuador'
  },
  {
    id: '2',
    title: 'Compraventa de bienes inmuebles: Aspectos legales a considerar',
    excerpt: 'Conoce los aspectos legales más importantes a tener en cuenta antes de realizar una compraventa de bienes inmuebles en Ecuador.',
    date: '10 Feb 2025',
    author: 'Dra. María Torres',
    category: 'Bienes Raíces',
    imageUrl: '/images/background-texture.jpg',
    slug: 'compraventa-bienes-inmuebles-aspectos-legales'
  },
  {
    id: '3',
    title: 'Posesiones efectivas: Procedimiento y requisitos',
    excerpt: 'Aprende sobre el procedimiento y los requisitos necesarios para realizar una posesión efectiva de bienes hereditarios en Ecuador.',
    date: '5 Feb 2025',
    author: 'Dr. Juan Pérez',
    category: 'Herencias',
    imageUrl: '/images/background-texture.jpg',
    slug: 'posesiones-efectivas-procedimiento-requisitos'
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation animation="fadeIn">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-brand-700 bg-brand-100 rounded-full mb-3">Nuestro Blog</span>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
              Artículos y Recursos Legales
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Información actualizada y consejos prácticos sobre temas legales y notariales
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <ScrollAnimation 
              key={post.id} 
              animation="slideUp" 
              delay={index * 100}
              className="h-full"
            >
              <article className="bg-white rounded-2xl overflow-hidden shadow-sm h-full flex flex-col transition-all duration-300 hover:shadow-md">
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-semibold text-white bg-brand-600 rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <span>{post.author}</span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    <Link href={`/blog/${post.slug}`} className="hover:text-brand-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="text-brand-600 font-medium inline-flex items-center group"
                  >
                    Leer más
                    <svg 
                      className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </article>
            </ScrollAnimation>
          ))}
        </div>
        
        <ScrollAnimation animation="fadeIn" delay={300}>
          <div className="mt-16 text-center">
            <Link 
              href="/blog"
              className="inline-flex items-center px-6 py-3 border-2 border-brand-600 text-base font-medium rounded-full text-brand-600 bg-white hover:bg-brand-50 transition-colors duration-300"
            >
              Ver todos los artículos
              <svg className="ml-2 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
}
