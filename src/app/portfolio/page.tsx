"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CASES, CASE_CATEGORIES } from "@/lib/cases-data";

// ─── Gradients (per-card visual identity) ────────────────────────────────────

const GRADIENTS = [
  "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 55%), radial-gradient(circle at 75% 65%, #1d4ed8 0%, transparent 55%), radial-gradient(circle at 50% 85%, #1e3a5f 0%, transparent 70%)",
  "radial-gradient(circle at 20% 30%, #10b981 0%, transparent 55%), radial-gradient(circle at 80% 70%, #059669 0%, transparent 55%), radial-gradient(circle at 50% 55%, #064e3b 0%, transparent 70%)",
  "radial-gradient(circle at 70% 30%, #8b5cf6 0%, transparent 55%), radial-gradient(circle at 30% 70%, #7c3aed 0%, transparent 55%), radial-gradient(circle at 50% 55%, #4c1d95 0%, transparent 70%)",
];

const STATS = [
  { value: "100+", label: "Завершённых проектов" },
  { value: "3", label: "Кейса в портфолио" },
  { value: "20+", label: "SaaS-клиентов" },
  { value: "2024", label: "Основана компания" },
];

// ─── Case Card ────────────────────────────────────────────────────────────────

function CaseCard({ item, index }: { item: (typeof CASES)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const gradient = GRADIENTS[index % GRADIENTS.length];

  return (
    <Link href={`/portfolio/${item.slug}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.08 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative flex flex-col border border-white/[0.08] bg-white/[0.02] overflow-hidden cursor-pointer hover:border-blue-500/30 transition-colors duration-300 h-full"
      >
        {/* Gradient preview area */}
        <div className="relative h-44 md:h-52 overflow-hidden flex-shrink-0">
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: gradient }}
          />

          {/* Noise texture */}
          <svg className="absolute inset-0 w-full h-full" aria-hidden>
            <filter id={`noise-${item.slug}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect
              width="100%"
              height="100%"
              filter={`url(#noise-${item.slug})`}
              opacity="0.12"
            />
          </svg>

          {/* Bottom fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />

          {/* Badges */}
          <div className="absolute top-4 left-4 flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-1 text-xs border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm leading-none">
              {item.industry}
            </span>
            {item.isOwn && (
              <span className="px-2.5 py-1 text-xs border border-blue-500/40 bg-blue-500/10 text-blue-400 leading-none">
                Собственный продукт
              </span>
            )}
          </div>

          {/* Arrow indicator */}
          <motion.div
            className="absolute top-4 right-4"
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
            transition={{ duration: 0.25 }}
          >
            <div className="w-8 h-8 border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white" />
            </div>
          </motion.div>
        </div>

        {/* Card content */}
        <div className="flex flex-col flex-1 p-5 md:p-6">
          {/* Number + year */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-white/10 font-mono leading-none select-none">
              {item.number}
            </span>
            <span className="text-xs text-white/30 font-mono">{item.year}</span>
          </div>

          {/* Title */}
          <h2 className="text-base md:text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 leading-snug">
            {item.title}
          </h2>

          {/* Excerpt */}
          <p className="text-white/40 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
            {item.excerpt}
          </p>

          {/* Stack tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.stackPreview.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 border border-white/[0.06] bg-white/[0.02] text-white/35 font-mono leading-none"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Footer row */}
          <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
            <span className="text-xs text-white/25 font-mono">{item.status}</span>
            <span className="text-xs text-white/40 font-mono group-hover:text-white/70 transition-colors duration-200">
              Смотреть кейс →
            </span>
          </div>
        </div>

        {/* Glow on hover */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: hovered
              ? "inset 0 0 80px rgba(59,130,246,0.05)"
              : "inset 0 0 0px rgba(59,130,246,0)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </Link>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? CASES.filter((c) => c.categoryId === activeCategory)
    : CASES;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="pt-28 md:pt-36 pb-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">

          {/* ── Page header ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 md:mb-14 pb-10 border-b border-white/[0.06]"
          >
            <p className="text-blue-400 text-xs tracking-widest uppercase mb-3 font-mono">
              Портфолио
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 tracking-tight">
              Наши проекты
            </h1>
            <p className="text-white/40 max-w-xl text-base leading-relaxed">
              Реальные задачи, продуманные решения, измеримые результаты
            </p>
          </motion.div>

          {/* ── Category filter ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-10 md:mb-12"
          >
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 text-sm font-mono border transition-all duration-200 ${
                !activeCategory
                  ? "border-blue-500/60 text-blue-400 bg-blue-500/5"
                  : "border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/20"
              }`}
            >
              Все
            </button>
            {CASE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.id ? null : cat.id
                  )
                }
                className={`px-4 py-2 text-sm font-mono border transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "border-blue-500/60 text-blue-400 bg-blue-500/5"
                    : "border-white/[0.08] text-white/40 hover:text-white/70 hover:border-white/20"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </motion.div>

          {/* ── Cases grid ────────────────────────────────────── */}
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeCategory ?? "all"}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 mb-16 md:mb-20"
              >
                {filtered.map((item, i) => (
                  <CaseCard key={item.slug} item={item} index={i} />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-24 text-center text-white/30 font-mono text-sm mb-20"
              >
                Кейсов не найдено. Попробуйте другую категорию.
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Stats strip ───────────────────────────────────── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.06] border border-white/[0.06] mb-6">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="bg-background px-5 py-6 md:px-6 md:py-7"
              >
                <div className="text-2xl md:text-3xl font-bold text-white font-mono mb-1 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-white/30 font-mono leading-snug">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA ───────────────────────────────────────────── */}
          <div className="border border-white/[0.08] bg-white/[0.02] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <p className="text-white/50 text-base max-w-lg leading-relaxed">
              Есть похожая задача? Расскажите — обсудим архитектуру и сроки.
            </p>
            <a
              href="/#contact"
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-medium hover:bg-white/90 transition-colors duration-200"
            >
              Обсудить проект
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
