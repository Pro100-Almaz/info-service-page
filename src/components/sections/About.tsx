"use client";

import { motion } from "framer-motion";
import { Eye, Star, Zap, Handshake } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";

const values = [
  {
    icon: Eye,
    title: "Прозрачность",
    description: "Трекер задач, регулярные созвоны, вся документация — вы видите прогресс в реальном времени, без закрытых процессов",
  },
  {
    icon: Star,
    title: "Опыт 10+ лет",
    description: "Не джуны на субподряде. Основной состав — разработчики, которые сами строили сложные продукты с нуля",
  },
  {
    icon: Zap,
    title: "Быстрый старт",
    description: "Лендинг — от 5 рабочих дней. Корпоративный сайт — 2–4 недели. Работаем спринтами без затяжных согласований",
  },
  {
    icon: Handshake,
    title: "Берёмся за сложные задачи",
    description: "Если другие говорят «нереализуемо» — мы разбираемся и предлагаем решение. 100+ проектов: от лендингов до корпоративных платформ",
  },
];

const stats = [
  { value: "100+", label: "Проектов сдано" },
  { value: "20+", label: "Довольных клиентов" },
  { value: "10+", label: "Лет опыта команды" },
  { value: "12", label: "Человек в команде" },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-border py-20 sm:py-28 overflow-hidden">
      {/* Animated gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -80, 60, 0],
            scale: [1, 1.3, 0.85, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-1/3 -left-1/4 h-[70%] w-[70%] rounded-full bg-blue-600/20 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -70, 50, 0],
            y: [0, 60, -70, 0],
            scale: [1, 0.8, 1.25, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -bottom-1/3 -right-1/4 h-[70%] w-[70%] rounded-full bg-blue-500/15 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, 40, -40, 0],
            y: [0, -50, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/3 h-[40%] w-[40%] rounded-full bg-indigo-500/10 blur-[80px]"
        />
      </div>

      <div className="container-main relative z-10">
        <SectionHeading
          label="О компании"
          title="Разбираемся в задаче, а не просто пишем код"
          align="center"
        />

        {/* Two-column layout: text + values */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left — text + stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-baseleading-relaxed text-muted-foreground sm:text-base">
              Astratech Solutions — IT-компания из Астаны. Основана в 2024 году
              командой разработчиков с бэкграундом 10+ лет в IT-продуктах. За это
              время реализовали более 100 проектов: от лендингов до корпоративных
              CRM и LMS-платформ с тысячами пользователей.
            </p>
            <p className="mt-4 text-baseleading-relaxed text-muted-foreground sm:text-base">
              Нас выбирают, когда задача сложная — когда другие говорят «это
              долго» или «давайте упростим». Берёмся за то, что требует
              настоящего погружения в процессы клиента. Наша работа — не просто
              написать код, а дать бизнесу инструмент, который реально работает.
            </p>

            {/* Stats grid */}
            <div className="mt-10 grid grid-cols-2 gap-px border border-border">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                  className="border border-border bg-card p-5"
                >
                  <div className="text-2xl font-medium text-foreground">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-base text-muted-foreground">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — values */}
          <div className="space-y-px border border-border">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group flex gap-5 border-b border-border p-5 last:border-b-0 transition-colors hover:bg-card"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors group-hover:border-muted-foreground/50 group-hover:text-foreground">
                  <value.icon className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-basefont-medium text-foreground">
                    {value.title}
                  </h3>
                  <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
