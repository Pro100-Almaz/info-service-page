import type { PortableTextBlock } from 'next-sanity'

// ─── Shared ─────────────────────────────────────────────────────────────────

export interface SanityImage {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number; height: number; width: number }
  crop?: { top: number; bottom: number; left: number; right: number }
}

export interface Slug {
  _type: 'slug'
  current: string
}

// ─── Site Settings ───────────────────────────────────────────────────────────

export interface SiteSettings {
  _id: string
  title: string
  tagline?: string
  description?: string
  logo?: SanityImage
  ogImage?: SanityImage
  email?: string
  phone?: string
  address?: string
  socials?: {
    linkedin?: string
    github?: string
    twitter?: string
    telegram?: string
  }
}

// ─── Technology ──────────────────────────────────────────────────────────────

export interface Technology {
  _id: string
  name: string
  slug: Slug
  logo?: SanityImage
  category?:
    | 'frontend'
    | 'backend'
    | 'mobile'
    | 'database'
    | 'devops'
    | 'ai_ml'
    | 'design'
    | 'other'
}

// ─── Service ─────────────────────────────────────────────────────────────────

export interface ServiceFeature {
  title: string
  description?: string
}

export interface Service {
  _id: string
  title: string
  slug: Slug
  icon?: string
  shortDescription?: string
  description?: PortableTextBlock[]
  image?: SanityImage
  features?: ServiceFeature[]
  technologies?: Technology[]
  order?: number
  featured: boolean
}

// ─── Project ─────────────────────────────────────────────────────────────────

export interface ProjectResult {
  metric: string
  label: string
}

export interface Project {
  _id: string
  title: string
  slug: Slug
  client?: string
  clientLogo?: SanityImage
  industry?:
    | 'fintech'
    | 'ecommerce'
    | 'healthcare'
    | 'logistics'
    | 'real_estate'
    | 'education'
    | 'media'
    | 'saas'
    | 'other'
  coverImage?: SanityImage
  gallery?: SanityImage[]
  shortDescription?: string
  challenge?: PortableTextBlock[]
  solution?: PortableTextBlock[]
  results?: ProjectResult[]
  services?: Service[]
  technologies?: Technology[]
  testimonial?: Testimonial
  projectUrl?: string
  completedAt?: string
  featured: boolean
  publishedAt?: string
}

// ─── Team Member ─────────────────────────────────────────────────────────────

export interface TeamMember {
  _id: string
  name: string
  slug?: Slug
  role: string
  department?:
    | 'leadership'
    | 'engineering'
    | 'design'
    | 'qa'
    | 'devops'
    | 'sales'
    | 'pm'
    | 'hr'
  photo?: SanityImage
  bio?: PortableTextBlock[]
  skills?: string[]
  linkedin?: string
  github?: string
  order?: number
  featured: boolean
}

// ─── Testimonial ─────────────────────────────────────────────────────────────

export interface Testimonial {
  _id: string
  author: string
  role?: string
  company?: string
  avatar?: SanityImage
  quote: string
  rating?: number
  featured: boolean
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FAQ {
  _id: string
  question: string
  answer: PortableTextBlock[]
  category?: 'general' | 'services' | 'pricing' | 'process' | 'technical'
  order?: number
}

// ─── Blog Post ───────────────────────────────────────────────────────────────

export interface Post {
  _id: string
  title: string
  slug: Slug
  author?: TeamMember
  coverImage?: SanityImage
  excerpt?: string
  body?: PortableTextBlock[]
  categories?: string[]
  tags?: string[]
  publishedAt?: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: SanityImage
  }
}