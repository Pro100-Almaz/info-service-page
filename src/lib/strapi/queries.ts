import { strapiRequest } from './client';
import type { BlogPost, StrapiListResponse, StrapiSingleResponse } from './types';

// Fetch all blog posts (for listing page)
export async function getBlogPosts(params?: {
  page?: number;
  pageSize?: number;
  category?: string;
}): Promise<StrapiListResponse<BlogPost>> {
  const query: Record<string, string> = {
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'populate[coverImage][fields][2]': 'width',
    'populate[coverImage][fields][3]': 'height',
    'populate[seo][fields][0]': 'metaTitle',
    'populate[seo][fields][1]': 'metaDescription',
    'populate[seo][fields][2]': 'keywords',
    'sort[0]': 'publishedAt:desc',
    'pagination[page]': String(params?.page ?? 1),
    'pagination[pageSize]': String(params?.pageSize ?? 9),
  };

  if (params?.category) {
    query['filters[category][$eq]'] = params.category;
  }

  return strapiRequest<StrapiListResponse<BlogPost>>('/blog-posts', query);
}

// Fetch single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const response = await strapiRequest<StrapiListResponse<BlogPost>>('/blog-posts', {
    'filters[slug][$eq]': slug,
    'populate[coverImage][fields][0]': 'url',
    'populate[coverImage][fields][1]': 'alternativeText',
    'populate[coverImage][fields][2]': 'width',
    'populate[coverImage][fields][3]': 'height',
    'populate[seo][populate][ogImage]': '*',
  });

  return response.data[0] ?? null;
}

// Fetch all slugs (for generateStaticParams)
export async function getAllBlogSlugs(): Promise<string[]> {
  const response = await strapiRequest<StrapiListResponse<BlogPost>>('/blog-posts', {
    'fields[0]': 'slug',
    'pagination[pageSize]': '100',
  });

  return response.data.map((post) => post.slug);
}
