"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";

const faqData = [
  {
    question: "Сколько стоит разработка проекта?",
    answer:
      "Стоимость зависит от сложности, объёма функционала и сроков. Простой лендинг — от 150 000 ₽, веб-приложение — от 500 000 ₽, мобильное приложение — от 800 000 ₽. Точную оценку даём после анализа требований.",
  },
  {
    question: "Какие сроки разработки?",
    answer:
      "Лендинг — 2–3 недели, корпоративный сайт — 4–6 недель, веб-приложение — 2–4 месяца, мобильное приложение — 3–6 месяцев. Сроки зависят от сложности и объёма проекта.",
  },
  {
    question: "Какие технологии вы используете?",
    answer:
      "Frontend: React, Next.js, Vue.js, React Native. Backend: Node.js, Python, Go. Базы данных: PostgreSQL, MongoDB, Redis. Инфраструктура: AWS, Vercel, Docker. Выбираем стек под задачи проекта.",
  },
  {
    question: "Как происходит процесс работы?",
    answer:
      "Работаем по Agile-методологии спринтами по 2 недели. После каждого спринта — демо и обратная связь. У вас всегда есть доступ к прогрессу через трекер задач и регулярные созвоны.",
  },
  {
    question: "Предоставляете ли вы поддержку после запуска?",
    answer:
      "Да, после запуска предоставляем гарантийную поддержку 3 месяца. Также предлагаем пакеты постоянной поддержки: мониторинг, обновления, исправление багов и развитие функционала.",
  },
  {
    question: "Можно ли доработать существующий проект?",
    answer:
      "Да, берём проекты на доработку. Проводим аудит текущего кода, оцениваем состояние и предлагаем план улучшений. Работаем с любым стеком технологий.",
  },
];

function FAQItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: (typeof faqData)[0];
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="border-b border-white/[0.08]"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 md:py-6 text-left group cursor-pointer"
      >
        <span className="text-base text-white/80 group-hover:text-white transition-colors duration-200 pr-8">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0"
        >
          <Plus className="w-4 h-4 text-white/40 group-hover:text-blue-400 transition-colors duration-200" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-white/40 text-base leading-relaxed pb-5 md:pb-6 pr-12">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-blue-400 text-base tracking-widest uppercase mb-3">
            FAQ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Частые вопросы
          </h2>
          <p className="text-white/50 text-base">
            Ответы на популярные вопросы о нашей работе.
          </p>
        </motion.div>

        <div className="border-t border-white/[0.08]">
          {faqData.map((item, index) => (
            <FAQItem
              key={index}
              item={item}
              index={index}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
