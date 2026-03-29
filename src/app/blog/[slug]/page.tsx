import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getAllBlogSlugs } from '@/lib/strapi/queries';
import { getStrapiMediaUrl } from '@/lib/strapi/client';
import { CATEGORY_LABELS } from '@/lib/strapi/types';
import { BlocksRenderer } from '@strapi/blocks-react-renderer';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// ISR: regenerate the page in the background every 60s
export const revalidate = 60;

// generateStaticParams: pre-build known slugs at build time
export async function generateStaticParams() {
  try {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

// Dynamic SEO metadata per post
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return { title: 'Статья не найдена | Astratech' };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://astratech.kz';
  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = post.seo?.metaDescription || post.excerpt || '';
  const ogImageUrl =
    getStrapiMediaUrl(post.seo?.ogImage?.url) ||
    getStrapiMediaUrl(post.coverImage?.url);

  return {
    title: `${metaTitle} | Astratech`,
    description: metaDescription,
    keywords: post.seo?.keywords,
    alternates: {
      canonical: post.seo?.canonicalURL || `${siteUrl}/blog/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `${siteUrl}/blog/${slug}`,
      ...(ogImageUrl && { images: [{ url: ogImageUrl, width: 1200, height: 630 }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      ...(ogImageUrl && { images: [ogImageUrl] }),
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) notFound();

  const coverUrl = getStrapiMediaUrl(post.coverImage?.url);
  const categoryLabel = post.category ? CATEGORY_LABELS[post.category] : null;
  const tags: string[] = typeof post.tags === 'string'
    ? post.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="blog-post-page">
        <div className="container-main">

          {/* Back link */}
          <Link href="/blog" className="blog-post__back">
            ← Все статьи
          </Link>

          {/* Post Header */}
          <header className="blog-post__header">
            {categoryLabel && (
              <span className="blog-post__category">{categoryLabel}</span>
            )}
            <h1 className="blog-post__title">{post.title}</h1>
            <div className="blog-post__meta">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              {post.readingTime && <span>· {post.readingTime} мин. чтения</span>}
              {post.author && <span>· {post.author}</span>}
            </div>
            {post.excerpt && (
              <p className="blog-post__excerpt">{post.excerpt}</p>
            )}
          </header>

          {/* Cover Image */}
          {coverUrl && (
            <div className="blog-post__cover">
              <Image
                src={coverUrl}
                alt={post.coverImage?.alternativeText || post.title}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 900px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          )}

          {/* Body */}
          {post.body && post.body.length > 0 && (
            <div className="blog-post__body">
              <BlocksRenderer content={post.body as Parameters<typeof BlocksRenderer>[0]['content']} />
            </div>
          )}

          {/* Tags */}
          {tags.length > 0 && (
            <div className="blog-post__tags" aria-label="Теги">
              {tags.map((tag) => (
                <span key={tag} className="blog-post__tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Back to blog CTA */}
          <div className="blog-post__footer-cta">
            <Link href="/blog" className="blog-post__back">
              ← Вернуться к блогу
            </Link>
            <a href="/#contact" className="blog-post__cta-btn">
              Обсудить проект
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
