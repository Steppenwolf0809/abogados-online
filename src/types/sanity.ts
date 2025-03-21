export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  crop?: {
    _type: 'sanity.imageCrop';
    bottom: number;
    left: number;
    right: number;
    top: number;
  };
  hotspot?: {
    _type: 'sanity.imageHotspot';
    height: number;
    width: number;
    x: number;
    y: number;
  };
}

export interface Category {
  _id: string;
  title: string;
  description?: string;
}

export interface Author {
  _id: string;
  name: string;
  image?: SanityImage;
  bio?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: {
    current: string;
    _type: 'slug';
  };
  excerpt?: string;
  mainImage?: SanityImage;
  body?: any; // Tipo para el contenido de Portable Text
  publishedAt: string;
  categories?: string[];
  author?: Author;
}
