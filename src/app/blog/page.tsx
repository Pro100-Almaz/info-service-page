import type { Metadata } from 'next';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/strapi/queries';
import { BlogCard } from '@/components/blog/BlogCard';
import { CATEGORY_LABELS } from '@/lib/strapi/types';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Блог | Astratech Solutions',
  description:
    'Статьи о веб-разработке, мобильных приложениях, технологиях и цифровой трансформации бизнеса.',
  openGraph: {
    title: 'Блог | Astratech Solutions',
    description:
      'Статьи о веб-разработке, мобильных приложениях, технологиях и цифровой трансформации бизнеса.',
    type: 'website',
  },
};

interface BlogPageProps {
  searchParams: Promise<{ category?: string; page?: string }>;
}

const CATEGORIES = Object.entries(CATEGORY_LABELS);

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const category = params.category;
  const page = Number(params.page) || 1;

  let posts = null;
  let error = false;

  try {
    posts = await getBlogPosts({ page, pageSize: 9, category });
  } catch {
    error = true;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="blog-page">
        <div className="container-main">

          {/* Page header */}
          <header className="blog-page__header">
            <p className="blog-page__label">БЛОГ</p>
            <h1 className="blog-page__title">Статьи и материалы</h1>
            <p className="blog-page__subtitle">
              О разработке, технологиях и цифровой трансформации бизнеса
            </p>
          </header>

          {/* Category filter */}
          <nav className="blog-categories" aria-label="Категории блога">
            <Link
              href="/blog"
              className={`blog-categories__btn${!category ? ' blog-categories__btn--active' : ''}`}
            >
              Все
            </Link>
            {CATEGORIES.map(([key, label]) => (
              <Link
                key={key}
                href={`/blog?category=${key}`}
                className={`blog-categories__btn${category === key ? ' blog-categories__btn--active' : ''}`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Error state */}
          {error && (
            <div className="blog-empty">
              <h2>Не удалось загрузить статьи</h2>
              <p>Убедитесь, что Strapi запущен на порту 1337.</p>
            </div>
          )}

          {/* Posts grid */}
          {!error && posts && (
            <>
              {posts.data.length === 0 ? (
                <div className="blog-empty">
                  <h2>Статей пока нет</h2>
                  <p>Загляните позже — скоро появятся новые материалы.</p>
                </div>
              ) : (
                <div className="blog-grid">
                  {posts.data.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {posts.meta.pagination.pageCount > 1 && (
                <nav className="blog-pagination" aria-label="Пагинация">
                  {Array.from(
                    { length: posts.meta.pagination.pageCount },
                    (_, i) => i + 1
                  ).map((p) => (
                    <Link
                      key={p}
                      href={`/blog?${category ? `category=${category}&` : ''}page=${p}`}
                      className={`blog-categories__btn${p === page ? ' blog-categories__btn--active' : ''}`}
                      aria-label={`Страница ${p}`}
                    >
                      {p}
                    </Link>
                  ))}
                </nav>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
