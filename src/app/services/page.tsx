import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SERVICE_CATEGORIES, ALL_SERVICES } from "@/lib/services-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Все услуги — Astratech Solutions",
  description:
    "Веб-разработка, мобильные приложения, CRM и LMS-платформы, автоматизация, AI-решения. IT-компания из Астаны с опытом 10+ лет.",
};

// Gradient per card index
const GRADIENTS = [
  "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 55%), radial-gradient(circle at 70% 70%, #1e40af 0%, transparent 60%)",
  "radial-gradient(circle at 20% 80%, #8b5cf6 0%, transparent 55%), radial-gradient(circle at 80% 20%, #4c1d95 0%, transparent 60%)",
  "radial-gradient(circle at 60% 30%, #ec4899 0%, transparent 55%), radial-gradient(circle at 30% 70%, #9d174d 0%, transparent 60%)",
  "radial-gradient(circle at 40% 20%, #f59e0b 0%, transparent 55%), radial-gradient(circle at 70% 70%, #b45309 0%, transparent 60%)",
  "radial-gradient(circle at 50% 30%, #10b981 0%, transparent 55%), radial-gradient(circle at 20% 70%, #047857 0%, transparent 60%)",
  "radial-gradient(circle at 30% 60%, #06b6d4 0%, transparent 55%), radial-gradient(circle at 70% 30%, #164e63 0%, transparent 60%)",
  "radial-gradient(circle at 70% 40%, #f97316 0%, transparent 55%), radial-gradient(circle at 30% 70%, #c2410c 0%, transparent 60%)",
  "radial-gradient(circle at 50% 70%, #a855f7 0%, transparent 55%), radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 60%)",
  "radial-gradient(circle at 20% 30%, #14b8a6 0%, transparent 55%), radial-gradient(circle at 70% 80%, #0f766e 0%, transparent 60%)",
  "radial-gradient(circle at 60% 60%, #e11d48 0%, transparent 55%), radial-gradient(circle at 20% 20%, #9f1239 0%, transparent 60%)",
  "radial-gradient(circle at 40% 50%, #6366f1 0%, transparent 55%), radial-gradient(circle at 80% 40%, #3730a3 0%, transparent 60%)",
];

export default function ServicesPage() {
  // Compute a global index for gradients across all categories
  let globalIdx = 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Page hero */}
      <section className="border-b border-border pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container-main">
          <p className="text-blue-400 text-sm tracking-widest uppercase mb-4 font-mono">
            ASTRATECH SOLUTIONS
          </p>
          <h1 className="text-3xl font-medium tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl mb-6">
            Наши услуги
          </h1>
          <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
            11 направлений. Полный цикл — от проектирования до запуска и
            поддержки. Работаем с компаниями по всему Казахстану и СНГ.
          </p>
          {/* Stats row */}
          <div className="mt-10 flex flex-wrap gap-8">
            {[
              { value: "100+", label: "Реализованных проектов" },
              { value: "10+", label: "Лет опыта команды" },
              { value: "5", label: "Направлений разработки" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories + services */}
      {SERVICE_CATEGORIES.map((category) => (
        <section
          key={category.id}
          id={category.id}
          className="border-b border-border py-16 md:py-20"
        >
          <div className="container-main">
            {/* Category header */}
            <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-2">
                  {category.id.toUpperCase()}
                </p>
                <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
                  {category.title}
                </h2>
                <p className="mt-2 text-base text-muted-foreground">
                  {category.description}
                </p>
              </div>
              <span className="text-sm font-mono text-muted-foreground/40 shrink-0">
                {category.services.length}{" "}
                {category.services.length === 1 ? "услуга" : "услуги"}
              </span>
            </div>

            {/* Services grid */}
            <div
              className={`grid gap-4 ${
                category.services.length === 1
                  ? "sm:grid-cols-1 max-w-md"
                  : category.services.length === 2
                  ? "sm:grid-cols-2"
                  : "sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {category.services.map((service) => {
                const gradient = GRADIENTS[globalIdx % GRADIENTS.length];
                const idx = globalIdx++;
                return (
                  <div
                    key={service.id}
                    id={service.slug}
                    className="group relative border border-border transition-colors duration-300 hover:border-muted-foreground/40"
                  >
                    {/* Gradient accent bar */}
                    <div
                      className="h-1 w-full"
                      style={{ background: gradient }}
                    />

                    <div className="p-6">
                      <h3 className="text-base font-medium tracking-tight text-foreground mb-3">
                        {service.title}
                      </h3>
                      <p className="text-base leading-relaxed text-muted-foreground">
                        {service.shortDescription}
                      </p>
                      <div className="mt-6">
                        <a
                          href="/#contact"
                          className="inline-flex items-center gap-1 text-sm font-mono text-blue-400 hover:text-blue-300 transition-colors duration-150"
                        >
                          Обсудить проект →
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ))}

      {/* CTA section */}
      <section className="py-20 md:py-28">
        <div className="container-main text-center">
          <p className="text-blue-400 text-sm tracking-widest uppercase mb-4 font-mono">
            ГОТОВЫ НАЧАТЬ?
          </p>
          <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl mb-4">
            Расскажите о своей задаче
          </h2>
          <p className="text-base text-muted-foreground max-w-md mx-auto mb-10">
            Ответим в течение одного рабочего дня. Если задача сложная — тем
            лучше: именно такие нам интересны.
          </p>
          <a
            href="/#contact"
            className="
              inline-flex items-center gap-2 bg-foreground text-background
              px-8 py-4 text-base font-mono font-medium
              transition-opacity duration-200 hover:opacity-90
            "
          >
            Обсудить проект
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
