import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity';
import { SanityImage } from '@/types/sanity';

const builder = imageUrlBuilder(client);

export function urlForImage(source: SanityImage) {
  return builder.image(source);
}
