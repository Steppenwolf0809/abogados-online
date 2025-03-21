'use client';

import { PortableText as SanityPortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity-image';

interface PortableTextProps {
  value: any;
}

// Componentes simplificados para evitar errores de TypeScript
const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset) {
        return null;
      }
      
      return (
        <div className="relative w-full h-auto my-8">
          <figure>
            <div className="relative w-full h-[400px]">
              <Image
                src={urlForImage(value).url()}
                alt={value.alt || 'Imagen del artículo'}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            {value.caption && (
              <figcaption className="text-center text-sm text-gray-500 mt-2">
                {value.caption}
              </figcaption>
            )}
          </figure>
        </div>
      );
    },
  },
};

export default function PortableText({ value }: PortableTextProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
