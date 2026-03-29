// Strapi API Types for Next.js

export interface StrapiSeo {
  id: number;
  metaTitle: string;
  metaDescription: string;
  keywords?: string;
  canonicalURL?: string;
  ogImage?: StrapiMedia;
}

export interface StrapiMedia {
  id: number;
  url: string;
  alternativeText?: string;
  width?: number;
  height?: number;
  formats?: {
    thumbnail?: StrapiMediaFormat;
    small?: StrapiMediaFormat;
    medium?: StrapiMediaFormat;
    large?: StrapiMediaFormat;
  };
}

export interface StrapiMediaFormat {
  url: string;
  width: number;
  height: number;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt?: string;
  body?: object[];
  coverImage?: StrapiMedia;
  author?: string;
  category?: 'general' | 'tech' | 'business' | 'design' | 'development' | 'marketing';
  tags?: string; // comma-separated: "nextjs, react, seo"
  readingTime?: number;
  seo?: StrapiSeo;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface StrapiListResponse<T> {
  data: T[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: object;
}

export const CATEGORY_LABELS: Record<string, string> = {
  general: 'Общее',
  tech: 'Технологии',
  business: 'Бизнес',
  design: 'Дизайн',
  development: 'Разработка',
  marketing: 'Маркетинг',
};
