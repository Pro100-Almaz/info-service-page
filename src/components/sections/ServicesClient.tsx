"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FEATURED_SERVICES, ALL_SERVICES } from "@/lib/services-data";

// Fallback gradients per card
const GRADIENTS = [
  {
    gradient:
      "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #2563eb 0%, transparent 50%), radial-gradient(circle at 50% 50%, #1e40af 0%, transparent 70%)",
    noiseOpacity: 0.7,
  },
  {
    gradient:
      "radial-gradient(circle at 20% 80%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 80% 20%, #6d28d9 0%, transparent 50%), radial-gradient(circle at 50% 50%, #4c1d95 0%, transparent 70%)",
    noiseOpacity: 0.6,
  },
  {
    gradient:
      "radial-gradient(circle at 60% 30%, #ec4899 0%, transparent 50%), radial-gradient(circle at 30% 70%, #db2777 0%, transparent 50%), radial-gradient(circle at 80% 80%, #9d174d 0%, transparent 60%)",
    noiseOpacity: 0.65,
  },
  {
    gradient:
      "radial-gradient(circle at 40% 20%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 70% 70%, #d97706 0%, transparent 50%), radial-gradient(circle at 20% 60%, #b45309 0%, transparent 60%)",
    noiseOpacity: 0.7,
  },
  {
    gradient:
      "radial-gradient(circle at 50% 30%, #10b981 0%, transparent 50%), radial-gradient(circle at 20% 70%, #059669 0%, transparent 50%), radial-gradient(circle at 80% 50%, #047857 0%, transparent 60%)",
    noiseOpacity: 0.65,
  },
  {
    gradient:
      "radial-gradient(circle at 30% 60%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 70% 30%, #0891b2 0%, transparent 50%), radial-gradient(circle at 50% 50%, #164e63 0%, transparent 70%)",
    noiseOpacity: 0.65,
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" as const },
  }),
};

const showAllButton = ALL_SERVICES.length > 6;

export function ServicesClient() {
  return (
    <section id="services" className="border-t border-border py-20 sm:py-28">
      <div className="container-main">
        <SectionHeading
          label="Что мы делаем"
          title="Наши услуги"
          subtitle="Полный цикл разработки цифровых продуктов — от идеи до поддержки"
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_SERVICES.map((service, i) => {
            const { gradient, noiseOpacity } = GRADIENTS[i % GRADIENTS.length];
            return (
              <motion.div
                key={service.id}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={cardVariants}
              >
                <a
                  href={`/services#${service.slug}`}
                  className="group relative block border border-border transition-colors duration-300 hover:border-muted-foreground/40 cursor-pointer"
                >
                  {/* Gradient image area */}
                  <div className="relative aspect-square overflow-hidden">
                    <div className="absolute inset-0" style={{ background: gradient }} />

                    <svg className="absolute inset-0 h-full w-full" style={{ opacity: noiseOpacity }}>
                      <filter id={`noise-${i}`}>
                        <feTurbulence
                          type="fractalNoise"
                          baseFrequency="0.65"
                          numOctaves="3"
                          stitchTiles="stitch"
                        />
                        <feColorMatrix type="saturate" values="0" />
                      </filter>
                      <rect width="100%" height="100%" filter={`url(#noise-${i})`} />
                    </svg>

                    <div
                      className="absolute inset-0 mix-blend-overlay"
                      style={{ background: gradient }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "radial-gradient(circle at center, transparent 30%, rgba(10,10,10,0.6) 100%)",
                      }}
                    />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-mono text-white/60 uppercase tracking-widest">
                        {service.categoryTitle}
                      </span>
                    </div>

                    <div className="absolute inset-0 flex items-end justify-end p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex h-10 w-10 items-center justify-center border border-white/30 bg-black/40 backdrop-blur-sm">
                        <ArrowUpRight className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  </div>

                  {/* Text content */}
                  <div className="border-t border-border p-5">
                    <h3 className="text-base font-medium tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted-foreground">
                      {service.shortDescription}
                    </p>
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
        >
          <p className="text-base text-muted-foreground">
            Нужна консультация?{" "}
            <a
              href="#contact"
              className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
            >
              Напишите нам
            </a>
          </p>

          {showAllButton && (
            <a
              href="/services"
              className="
                inline-flex items-center gap-2 border border-border px-6 py-3
                text-base font-mono font-medium text-foreground
                transition-colors duration-200 hover:border-muted-foreground/40 hover:bg-accent
              "
            >
              Все услуги
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
