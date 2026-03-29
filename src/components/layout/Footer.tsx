"use client";

import { SERVICE_CATEGORIES } from "@/lib/services-data";

const navLinks = [
  { label: "Услуги", href: "/services" },
  { label: "О нас", href: "#about" },
  { label: "Процесс", href: "#process" },
  { label: "Портфолио", href: "#portfolio" },
  { label: "Блог", href: "/blog" },
  { label: "FAQ", href: "#faq" },
  { label: "Контакты", href: "#contact" },
];

const contacts = [
  { label: "hello@astratech.dev", href: "mailto:hello@astratech.dev" },
  { label: "Telegram", href: "https://t.me/astratech" },
  { label: "WhatsApp", href: "https://wa.me/77000000000" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        {/* Main footer */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="text-white font-bold text-lg tracking-tight">
              ASTRATECH
            </a>
            <p className="text-white/30 text-base mt-3 leading-relaxed max-w-[200px]">
              IT-аутсорсинг из Астаны. Разрабатываем продукты, которые работают
              на бизнес.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white/50 text-base uppercase tracking-widest mb-4">
              Навигация
            </p>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/30 text-base hover:text-white/60 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services — all categories */}
          <div>
            <p className="text-white/50 text-base uppercase tracking-widest mb-4">
              Услуги
            </p>
            <ul className="space-y-2.5">
              {SERVICE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <a
                    href={`/services#${cat.id}`}
                    className="text-white/30 text-base hover:text-white/60 transition-colors duration-200"
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/services"
                  className="text-blue-400/70 text-base hover:text-blue-400 transition-colors duration-200"
                >
                  Все услуги →
                </a>
              </li>
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-white/50 text-base uppercase tracking-widest mb-4">
              Контакты
            </p>
            <ul className="space-y-2.5">
              {contacts.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    className="text-white/30 text-base hover:text-white/60 transition-colors duration-200"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-base">
            &copy; 2026 Astratech Solutions. Все права защищены.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-white/20 text-base hover:text-white/40 transition-colors duration-200"
            >
              Политика конфиденциальности
            </a>
            <a
              href="#"
              className="text-white/20 text-base hover:text-white/40 transition-colors duration-200"
            >
              Оферта
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
