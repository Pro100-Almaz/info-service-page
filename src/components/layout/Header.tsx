"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { SERVICE_CATEGORIES } from "@/lib/services-data";

// ─── Types ────────────────────────────────────────────────────────────────────

interface NavLink {
  label: string;
  href: string;
  hasDropdown?: boolean;
}

const navLinks: NavLink[] = [
  { label: "Услуги", href: "/services", hasDropdown: true },
  { label: "О нас", href: "#about" },
  { label: "Процесс", href: "#process" },
  { label: "Портфолио", href: "/portfolio" },
  { label: "Блог", href: "/blog" },
  { label: "FAQ", href: "#faq" },
];

// const languages = ["RU", "KZ", "EN"] as const;
const languages = ["RU"] as const;

// ─── Services Dropdown ────────────────────────────────────────────────────────

function ServicesDropdown({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-1 w-[440px] border border-border bg-background/95 backdrop-blur-md shadow-2xl z-[200]"
    >
      {/* Category list */}
      <div className="p-2">
        {SERVICE_CATEGORIES.map((cat) => (
          <a
            key={cat.id}
            href={`/services#${cat.id}`}
            onClick={onClose}
            className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.04] transition-colors duration-150 group"
          >
            <div className="min-w-0">
              <p className="text-sm font-medium text-foreground group-hover:text-blue-400 transition-colors duration-150">
                {cat.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 leading-snug">
                {cat.description}
              </p>
            </div>
          </a>
        ))}
      </div>

      {/* Footer link */}
      <div className="border-t border-border px-6 py-3">
        <a
          href="/services"
          onClick={onClose}
          className="flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors duration-150"
        >
          Посмотреть все услуги →
        </a>
      </div>
    </motion.div>
  );
}

// ─── Main Header ──────────────────────────────────────────────────────────────

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<(typeof languages)[number]>("RU");
  const [servicesOpen, setServicesOpen] = useState(false);

  const servicesRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    setServicesOpen(false);
    // Full page navigation
    if (href.startsWith("/")) {
      window.location.href = href;
      return;
    }
    // Anchor scroll
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="container-main flex h-16 items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-base font-medium tracking-tight text-foreground">
            ASTRATECH
          </a>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-4 md:flex lg:gap-8">
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className="flex items-center gap-1 text-base font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-3.5 w-3.5 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <AnimatePresence>
                      {servicesOpen && (
                        <ServicesDropdown onClose={() => setServicesOpen(false)} />
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-base font-medium tracking-wide text-muted-foreground transition-colors hover:text-foreground cursor-pointer"
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right side */}
          <div className="hidden items-center gap-4 md:flex">
            {/* Language switcher */}
            <div className="flex items-center gap-1 text-base">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-2 py-1 font-medium transition-colors cursor-pointer ${
                    activeLang === lang
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => handleNavClick("#contact")}
            >
              Обсудить проект
            </Button>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="relative z-[110] flex h-10 w-10 items-center justify-center text-foreground md:hidden cursor-pointer"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[99] flex flex-col bg-background overflow-y-auto"
          >
            <div className="flex flex-col items-center justify-center min-h-full py-20">
              <nav className="flex flex-col items-center gap-6 w-full max-w-xs">
                {navLinks.map((link, i) => (
                  <motion.button
                    key={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                    onClick={() => handleNavClick(link.href)}
                    className="text-lg font-medium text-foreground cursor-pointer"
                  >
                    {link.label}
                  </motion.button>
                ))}

                {/* Service categories in mobile menu */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="w-full border-t border-border pt-6 mt-2"
                >
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest text-center mb-4">
                    Направления
                  </p>
                  <div className="flex flex-col gap-2">
                    {SERVICE_CATEGORIES.map((cat) => (
                      <a
                        key={cat.id}
                        href={`/services#${cat.id}`}
                        onClick={() => setMobileOpen(false)}
                        className="text-sm text-muted-foreground hover:text-foreground text-center transition-colors py-1"
                      >
                        {cat.title}
                      </a>
                    ))}
                  </div>
                </motion.div>

                <div className="flex items-center gap-2 pt-4 text-base">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveLang(lang)}
                      className={`px-3 py-1 font-medium transition-colors cursor-pointer ${
                        activeLang === lang
                          ? "text-foreground border border-border"
                          : "text-muted-foreground"
                      }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => handleNavClick("#contact")}
                  className="mt-4"
                >
                  Обсудить проект
                </Button>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
