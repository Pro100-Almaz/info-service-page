import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CASES, type CaseData } from "@/lib/cases-data";

// ─── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

// ─── Metadata ──────────────────────────────────────────────────────────────────

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = CASES.find((c) => c.slug === slug);
  if (!item) return {};
  return {
    title: `${item.title} | Портфолио | Astratech Solutions`,
    description: item.excerpt,
  };
}

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-lg md:text-xl font-bold text-white mb-4 flex items-center gap-3">
      <span className="w-5 h-px bg-blue-500 flex-shrink-0" />
      {children}
    </h2>
  );
}

function SublabelLine({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs text-blue-400 font-mono tracking-widest uppercase mt-6 mb-3">
      {children}
    </p>
  );
}

function Paragraphs({ texts }: { texts: string[] }) {
  return (
    <div className="space-y-4">
      {texts.map((t, i) => (
        <p key={i} className="text-white/60 text-base leading-relaxed">
          {t}
        </p>
      ))}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 border-t border-white/[0.06]">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-3 py-3 border-b border-white/[0.06] text-white/60 text-sm leading-relaxed"
        >
          <span className="text-blue-400 font-mono text-xs mt-0.5 flex-shrink-0">→</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: string[] }) {
  return (
    <ol className="mt-2 border-t border-white/[0.06]">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-4 py-3 border-b border-white/[0.06] text-white/60 text-sm leading-relaxed"
        >
          <span className="text-blue-400 font-mono text-xs mt-0.5 flex-shrink-0 min-w-[1.5rem]">
            {String(i + 1).padStart(2, "0")}
          </span>
          {item}
        </li>
      ))}
    </ol>
  );
}

function CaseBody({ item }: { item: CaseData }) {
  return (
    <div className="space-y-10 md:space-y-12">

      {/* ── Задача ─────────────────────────────── */}
      <section className="pb-10 border-b border-white/[0.06]">
        <SectionTitle>Задача</SectionTitle>
        <Paragraphs texts={item.taskParagraphs} />
      </section>

      {/* ── Вызов ──────────────────────────────── */}
      {item.challengeParagraphs && item.challengeParagraphs.length > 0 && (
        <section className="pb-10 border-b border-white/[0.06]">
          <SectionTitle>Вызов</SectionTitle>
          <Paragraphs texts={item.challengeParagraphs} />
        </section>
      )}

      {/* ── Решение ────────────────────────────── */}
      <section className="pb-10 border-b border-white/[0.06]">
        <SectionTitle>Решение</SectionTitle>
        <Paragraphs texts={item.solutionIntroParagraphs} />

        {/* Sources list */}
        {item.solutionSourcesList && item.solutionSourcesList.length > 0 && (
          <>
            <SublabelLine>Источники данных</SublabelLine>
            <BulletList items={item.solutionSourcesList} />
          </>
        )}

        {/* Steps */}
        {item.solutionStepsList && item.solutionStepsList.length > 0 && (
          <>
            <SublabelLine>Как это работает</SublabelLine>
            <NumberedList items={item.solutionStepsList} />
          </>
        )}

        {/* Waterfall stages (case 002) */}
        {item.solutionStages && item.solutionStages.length > 0 && (
          <div className="mt-6 border border-white/[0.08] divide-y divide-white/[0.06]">
            {item.solutionStages.map((stage) => (
              <div key={stage.number} className="p-5 md:p-6">
                <p className="text-blue-400 font-mono text-xs tracking-widest uppercase mb-1">
                  {stage.number}
                </p>
                <h3 className="text-white font-semibold text-base mb-3">
                  {stage.title}
                </h3>
                <div className="space-y-2">
                  {stage.paragraphs.map((p, i) => (
                    <p key={i} className="text-white/50 text-sm leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Features (case 003) */}
        {item.solutionFeatures && item.solutionFeatures.length > 0 && (
          <>
            <SublabelLine>Ключевые возможности</SublabelLine>
            <div className="border border-white/[0.08] divide-y divide-white/[0.06]">
              {item.solutionFeatures.map((feat) => (
                <div key={feat.title} className="p-5 md:p-6">
                  <p className="text-white font-mono text-sm font-semibold mb-2">
                    {feat.title}
                  </p>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>

      {/* ── Стек ───────────────────────────────── */}
      <section className="pb-10 border-b border-white/[0.06]">
        <SectionTitle>Стек технологий</SectionTitle>
        <div className="border border-white/[0.08] divide-y divide-white/[0.06]">
          {item.stack.map((row) => (
            <div
              key={row.level}
              className="grid grid-cols-1 md:grid-cols-[180px_1fr] divide-y md:divide-y-0 md:divide-x divide-white/[0.06]"
            >
              <div className="px-4 py-3 text-white/35 text-xs font-mono flex items-center leading-snug">
                {row.level}
              </div>
              <div className="px-4 py-3">
                <span className="text-white text-sm">{row.tech}</span>
                {row.why && (
                  <span className="block text-white/35 text-xs font-mono mt-0.5 leading-relaxed">
                    {row.why}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Результат ──────────────────────────── */}
      <section className="pb-10 border-b border-white/[0.06]">
        <SectionTitle>Результат</SectionTitle>
        <Paragraphs texts={item.resultParagraphs} />
      </section>

      {/* ── Вывод ──────────────────────────────── */}
      <div className="border-l-2 border-blue-500/60 pl-5 py-1 bg-blue-500/[0.03]">
        <p className="text-white/50 text-sm leading-relaxed italic">
          {item.conclusion}
        </p>
      </div>

      {/* ── Tags ───────────────────────────────── */}
      <div className="flex flex-wrap gap-2 pt-2">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-3 py-1 border border-white/[0.06] text-white/30 font-mono"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* ── CTA ────────────────────────────────── */}
      <div className="border border-white/[0.08] bg-white/[0.02] p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-white/50 text-sm font-mono">
          Похожая задача? Обсудим ваш проект.
        </p>
        <a
          href="/#contact"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors duration-200 flex-shrink-0"
        >
          Связаться
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>

    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default async function CasePage({ params }: PageProps) {
  const { slug } = await params;
  const item = CASES.find((c) => c.slug === slug);
  if (!item) notFound();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-24 md:pt-28 pb-24">
        <div className="max-w-3xl mx-auto px-4 md:px-8">

          {/* Back */}
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-white/40 text-sm font-mono hover:text-white/70 transition-colors duration-200 mb-8 md:mb-10"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Все проекты
          </Link>

          {/* Header */}
          <header className="mb-10 md:mb-12 pb-10 border-b border-white/[0.06]">
            {/* Badges */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="text-blue-400 font-mono text-xs tracking-widest uppercase">
                {item.industry}
              </span>
              {item.isOwn && (
                <span className="px-2.5 py-0.5 text-xs border border-blue-500/40 text-blue-400 font-mono">
                  Собственный продукт
                </span>
              )}
            </div>

            <h1 className="text-2xl md:text-4xl font-bold text-white mb-4 leading-tight tracking-tight">
              {item.title}
            </h1>

            <div className="flex items-center gap-3 text-white/30 text-xs font-mono mb-5">
              <span>{item.year}</span>
              <span>·</span>
              <span>{item.duration}</span>
              <span>·</span>
              <span>{item.status}</span>
            </div>

            <p className="text-white/50 text-base leading-relaxed">
              {item.excerpt}
            </p>
          </header>

          {/* Content */}
          <CaseBody item={item} />

        </div>
      </main>

      <Footer />
    </div>
  );
}
