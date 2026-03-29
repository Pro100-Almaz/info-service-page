import Image from 'next/image';
import Link from 'next/link';
import { BlogPost, CATEGORY_LABELS } from '@/lib/strapi/types';
import { getStrapiMediaUrl } from '@/lib/strapi/client';

interface BlogCardProps {
  post: BlogPost;
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = getStrapiMediaUrl(post.coverImage?.url);
  const categoryLabel = post.category ? CATEGORY_LABELS[post.category] : null;

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="blog-card"
      aria-label={`Читать: ${post.title}`}
    >
      <article>
        {imageUrl && (
          <div className="blog-card__image-wrapper">
            <Image
              src={imageUrl}
              alt={post.coverImage?.alternativeText || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="blog-card__image"
            />
          </div>
        )}
        {!imageUrl && (
          <div className="blog-card__image-wrapper blog-card__image-placeholder">
            <span className="blog-card__placeholder-icon">✍️</span>
          </div>
        )}

        <div className="blog-card__content">
          {categoryLabel && (
            <span className="blog-card__category">{categoryLabel}</span>
          )}
          <h2 className="blog-card__title">{post.title}</h2>
          {post.excerpt && (
            <p className="blog-card__excerpt">{post.excerpt}</p>
          )}
          <div className="blog-card__meta">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            {post.readingTime && (
              <span className="blog-card__reading-time">· {post.readingTime} мин. чтения</span>
            )}
            {post.author && (
              <span className="blog-card__author">· {post.author}</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}
