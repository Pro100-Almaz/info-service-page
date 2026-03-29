import { groq } from 'next-sanity'
import { client } from './client'
import type {
  SiteSettings,
  Service,
  Project,
  TeamMember,
  Testimonial,
  Technology,
  FAQ,
  Post,
} from './types'

// ─── Fragments ───────────────────────────────────────────────────────────────

const imageFields = groq`
  asset,
  hotspot,
  crop
`

const slugFields = groq`slug { current }`

const technologyFields = groq`
  _id,
  name,
  ${slugFields},
  logo { ${imageFields} },
  category
`

const serviceCardFields = groq`
  _id,
  title,
  ${slugFields},
  icon,
  shortDescription,
  image { ${imageFields} },
  order,
  featured
`

const testimonialFields = groq`
  _id,
  author,
  role,
  company,
  avatar { ${imageFields} },
  quote,
  rating,
  featured
`

const teamMemberCardFields = groq`
  _id,
  name,
  ${slugFields},
  role,
  department,
  photo { ${imageFields} },
  skills,
  linkedin,
  github,
  order,
  featured
`

// ─── Site Settings ───────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return client.fetch(
    groq`*[_type == "siteSettings"][0] {
      _id,
      title,
      tagline,
      description,
      logo { ${imageFields} },
      ogImage { ${imageFields} },
      email,
      phone,
      address,
      socials
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

// ─── Services ────────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  return client.fetch(
    groq`*[_type == "service"] | order(order asc) {
      ${serviceCardFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getFeaturedServices(): Promise<Service[]> {
  return client.fetch(
    groq`*[_type == "service" && featured == true] | order(order asc) {
      ${serviceCardFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return client.fetch(
    groq`*[_type == "service" && slug.current == $slug][0] {
      _id,
      title,
      ${slugFields},
      icon,
      shortDescription,
      description,
      image { ${imageFields} },
      features[] { title, description },
      technologies[] -> { ${technologyFields} },
      order,
      featured
    }`,
    { slug },
    { next: { revalidate: 3600 } },
  )
}

// ─── Projects ────────────────────────────────────────────────────────────────

const projectCardFields = groq`
  _id,
  title,
  ${slugFields},
  client,
  clientLogo { ${imageFields} },
  industry,
  coverImage { ${imageFields} },
  shortDescription,
  technologies[] -> { ${technologyFields} },
  completedAt,
  featured
`

export async function getProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "project"] | order(completedAt desc) {
      ${projectCardFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getFeaturedProjects(): Promise<Project[]> {
  return client.fetch(
    groq`*[_type == "project" && featured == true] | order(completedAt desc) {
      ${projectCardFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      ${slugFields},
      client,
      clientLogo { ${imageFields} },
      industry,
      coverImage { ${imageFields} },
      gallery[] { ${imageFields} },
      shortDescription,
      challenge,
      solution,
      results[] { metric, label },
      services[] -> { ${serviceCardFields} },
      technologies[] -> { ${technologyFields} },
      testimonial -> { ${testimonialFields} },
      projectUrl,
      completedAt,
      featured,
      publishedAt
    }`,
    { slug },
    { next: { revalidate: 3600 } },
  )
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export async function getTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(
    groq`*[_type == "teamMember"] | order(order asc) {
      ${teamMemberCardFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getFeaturedTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(
    groq`*[_type == "teamMember" && featured == true] | order(order asc) {
      ${teamMemberCardFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export async function getTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    groq`*[_type == "testimonial"] | order(_createdAt desc) {
      ${testimonialFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    groq`*[_type == "testimonial" && featured == true] | order(_createdAt desc) {
      ${testimonialFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

// ─── Technologies ─────────────────────────────────────────────────────────────

export async function getTechnologies(): Promise<Technology[]> {
  return client.fetch(
    groq`*[_type == "technology"] | order(name asc) {
      ${technologyFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getTechnologiesByCategory(category: string): Promise<Technology[]> {
  return client.fetch(
    groq`*[_type == "technology" && category == $category] | order(name asc) {
      ${technologyFields}
    }`,
    { category },
    { next: { revalidate: 3600 } },
  )
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────

export async function getFAQs(): Promise<FAQ[]> {
  return client.fetch(
    groq`*[_type == "faq"] | order(order asc) {
      _id,
      question,
      answer,
      category,
      order
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getFAQsByCategory(category: string): Promise<FAQ[]> {
  return client.fetch(
    groq`*[_type == "faq" && category == $category] | order(order asc) {
      _id,
      question,
      answer,
      category,
      order
    }`,
    { category },
    { next: { revalidate: 3600 } },
  )
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────

const postCardFields = groq`
  _id,
  title,
  ${slugFields},
  author -> { ${teamMemberCardFields} },
  coverImage { ${imageFields} },
  excerpt,
  categories,
  tags,
  publishedAt
`

export async function getPosts(): Promise<Post[]> {
  return client.fetch(
    groq`*[_type == "post" && defined(publishedAt)] | order(publishedAt desc) {
      ${postCardFields}
    }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      ${slugFields},
      author -> { ${teamMemberCardFields} },
      coverImage { ${imageFields} },
      excerpt,
      body,
      categories,
      tags,
      publishedAt,
      seo {
        metaTitle,
        metaDescription,
        ogImage { ${imageFields} }
      }
    }`,
    { slug },
    { next: { revalidate: 3600 } },
  )
}

export async function getPostSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(
    groq`*[_type == "post" && defined(publishedAt)] { ${slugFields} }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getProjectSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(
    groq`*[_type == "project"] { ${slugFields} }`,
    {},
    { next: { revalidate: 3600 } },
  )
}

export async function getServiceSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(
    groq`*[_type == "service"] { ${slugFields} }`,
    {},
    { next: { revalidate: 3600 } },
  )
}