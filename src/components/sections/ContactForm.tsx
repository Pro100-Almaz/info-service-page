"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Layout,
  Globe,
  Smartphone,
  Rocket,
  Wrench,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

// ─── Types ───────────────────────────────────────────────────────────────────

type ProjectType =
  | "Лендинг"
  | "Веб-приложение"
  | "Мобильное приложение"
  | "MVP / Стартап"
  | "Доработка"
  | "Другое"
  | null;

type Budget = "до 300к" | "300к – 1М" | "1М +" | "Обсудим" | null;

interface FormData {
  projectType: ProjectType;
  description: string;
  budget: Budget;
  name: string;
  contact: string;
  comment: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const PROJECT_TYPES: { label: ProjectType & string; icon: React.ReactNode }[] =
  [
    { label: "Лендинг", icon: <Layout className="w-5 h-5" /> },
    { label: "Веб-приложение", icon: <Globe className="w-5 h-5" /> },
    {
      label: "Мобильное приложение",
      icon: <Smartphone className="w-5 h-5" />,
    },
    { label: "MVP / Стартап", icon: <Rocket className="w-5 h-5" /> },
    { label: "Доработка", icon: <Wrench className="w-5 h-5" /> },
    { label: "Другое", icon: <Sparkles className="w-5 h-5" /> },
  ];

const BUDGETS: Budget[] = ["до 300к", "300к – 1М", "1М +", "Обсудим"];

const STEPS = ["Тип проекта", "О проекте", "Контакты", "Готово"];

// ─── Step progress ────────────────────────────────────────────────────────────

function StepIndicator({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  return (
    <div className="flex items-center gap-2 mb-10">
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            animate={{
              backgroundColor:
                i < current
                  ? "#60a5fa"
                  : i === current
                    ? "#fafafa"
                    : "transparent",
              borderColor:
                i < current
                  ? "#60a5fa"
                  : i === current
                    ? "#fafafa"
                    : "rgba(255,255,255,0.15)",
              width: i === current ? 28 : 8,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="h-2 border"
            style={{ minWidth: 8 }}
          />
          {i < total - 1 && (
            <div className="w-6 h-px bg-white/10" />
          )}
        </div>
      ))}
      <span className="ml-3 text-white/30 text-base font-mono tracking-widest uppercase">
        {String(current + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );
}

// ─── Slide variants ───────────────────────────────────────────────────────────

function getVariants(direction: number) {
  return {
    enter: { x: direction > 0 ? 60 : -60, opacity: 0 },
    center: { x: 0, opacity: 1 },
    exit: { x: direction > 0 ? -60 : 60, opacity: 0 },
  };
}

// ─── Step 1: Project type ─────────────────────────────────────────────────────

function Step1({
  value,
  onChange,
}: {
  value: ProjectType;
  onChange: (v: ProjectType) => void;
}) {
  return (
    <div>
      <h3 className="text-xl font-medium text-white mb-2">Тип проекта</h3>
      <p className="text-white/40 text-base mb-8">
        Выберите, что будем создавать.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PROJECT_TYPES.map(({ label, icon }) => {
          const selected = value === label;
          return (
            <motion.button
              key={label}
              onClick={() => onChange(selected ? null : (label as ProjectType))}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15 }}
              className={`
                flex flex-col gap-3 p-4 text-left border transition-colors duration-200 cursor-pointer
                ${selected
                  ? "border-blue-400 bg-blue-400/[0.06] text-white"
                  : "border-white/[0.08] hover:border-white/20 text-white/60 hover:text-white/80"
                }
              `}
            >
              <span
                className={`transition-colors duration-200 ${selected ? "text-blue-400" : "text-white/30"
                  }`}
              >
                {icon}
              </span>
              <span className="text-base leading-tight">{label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 2: About project ────────────────────────────────────────────────────

function Step2({
  description,
  budget,
  onDescriptionChange,
  onBudgetChange,
}: {
  description: string;
  budget: Budget;
  onDescriptionChange: (v: string) => void;
  onBudgetChange: (v: Budget) => void;
}) {
  return (
    <div>
      <h3 className="text-xl font-medium text-white mb-2">О проекте</h3>
      <p className="text-white/40 text-base mb-8">
        Пара слов о задаче и бюджете.
      </p>

      <textarea
        value={description}
        onChange={(e) => onDescriptionChange(e.target.value)}
        placeholder="Расскажите о проекте — что нужно сделать, какие есть идеи, сроки..."
        rows={5}
        className="
          w-full bg-transparent border border-white/[0.08] text-white/80
          placeholder:text-white/20 text-base p-4 resize-none
          outline-none focus:border-white/30 transition-colors duration-200
          font-mono
        "
      />

      <p className="text-white/40 text-base mt-8 mb-4">Бюджет</p>
      <div className="flex flex-wrap gap-3">
        {BUDGETS.map((b) => {
          const selected = budget === b;
          return (
            <motion.button
              key={b}
              onClick={() => onBudgetChange(selected ? null : b)}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.15 }}
              className={`
                px-4 py-2 border text-base font-mono transition-colors duration-200 cursor-pointer
                ${selected
                  ? "border-blue-400 bg-blue-400/[0.06] text-white"
                  : "border-white/[0.08] hover:border-white/20 text-white/50 hover:text-white/80"
                }
              `}
            >
              {b}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Step 3: Contacts ─────────────────────────────────────────────────────────

function Step3({
  name,
  contact,
  comment,
  onNameChange,
  onContactChange,
  onCommentChange,
}: {
  name: string;
  contact: string;
  comment: string;
  onNameChange: (v: string) => void;
  onContactChange: (v: string) => void;
  onCommentChange: (v: string) => void;
}) {
  const inputClass = `
    w-full bg-transparent border-b border-white/[0.12] text-white/80
    placeholder:text-white/20 text-base py-3 px-0
    outline-none focus:border-white/40 transition-colors duration-200
    font-mono
  `;

  return (
    <div>
      <h3 className="text-xl font-medium text-white mb-2">Контакты</h3>
      <p className="text-white/40 text-base mb-8">
        Как с вами связаться?
      </p>

      <div className="flex flex-col gap-6">
        <div>
          <input
            type="text"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Ваше имя"
            className={inputClass}
          />
        </div>
        <div>
          <input
            type="phone"
            value={contact}
            onChange={(e) => onContactChange(e.target.value)}
            placeholder="Телефон "
            className={inputClass}
          />
        </div>
        <div>
          <textarea
            value={comment}
            onChange={(e) => onCommentChange(e.target.value)}
            placeholder="Комментарий (необязательно)"
            rows={3}
            className="
              w-full bg-transparent border-b border-white/[0.12] text-white/80
              placeholder:text-white/20 text-base py-3 px-0 resize-none
              outline-none focus:border-white/40 transition-colors duration-200
              font-mono
            "
          />
        </div>
      </div>
    </div>
  );
}

// ─── Step 4: Success ──────────────────────────────────────────────────────────

function Step4() {
  return (
    <div className="flex flex-col items-start py-8">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-8"
      >
        <svg
          width="56"
          height="56"
          viewBox="0 0 56 56"
          fill="none"
          className="overflow-visible"
        >
          <motion.rect
            x="1"
            y="1"
            width="54"
            height="54"
            stroke="#60a5fa"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
          <motion.path
            d="M16 28L24 36L40 20"
            stroke="#60a5fa"
            strokeWidth="1.5"
            strokeLinecap="square"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.4 }}
      >
        <p className="text-blue-400 text-base tracking-widest uppercase mb-3">
          Отправлено
        </p>
        <h3 className="text-2xl md:text-3xl font-medium text-white mb-4">
          Заявка принята
        </h3>
        <p className="text-white/40 text-base leading-relaxed max-w-sm">
          Мы свяжемся с вами в ближайшее время, чтобы обсудить детали проекта.
          Обычно это занимает не больше одного рабочего дня.
        </p>
      </motion.div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const [form, setForm] = useState<FormData>({
    projectType: null,
    description: "",
    budget: null,
    name: "",
    contact: "",
    comment: "",
  });

  const totalSteps = STEPS.length;
  const isLast = step === totalSteps - 1;

  function goNext() {
    setDirection(1);
    setStep((s) => Math.min(s + 1, totalSteps - 1));
  }

  function goBack() {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 0));
  }

  function canProceed() {
    if (step === 0) return !!form.projectType;
    if (step === 2) return !!form.name.trim() && !!form.contact.trim();
    return true;
  }

  const variants = getVariants(direction);

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="max-w-3xl mx-auto px-4 md:px-8 lg:px-10">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-blue-400 text-base tracking-widest uppercase mb-3">
            КОНТАКТЫ
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Обсудить проект
          </h2>
          <p className="text-white/50 text-base">
            Заполните форму — мы ответим в течение одного рабочего дня.
          </p>
        </motion.div>

        {/* Form card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="border border-white/[0.08] p-8 md:p-10 overflow-hidden relative"
          style={{
            background:
              "radial-gradient(ellipse at 85% 110%, rgba(59,130,246,0.13) 0%, transparent 55%), radial-gradient(ellipse at 0% -5%, rgba(96,165,250,0.07) 0%, transparent 45%), #0c0c0c",
          }}
        >
          {/* Thin blue accent line at top */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

          {/* Bottom-right glow orb */}
          <div
            className="absolute bottom-0 right-0 w-64 h-64 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 100% 100%, rgba(59,130,246,0.10) 0%, transparent 65%)",
            }}
          />

          {/* Top-left dim orb */}
          <div
            className="absolute top-0 left-0 w-48 h-48 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 0% 0%, rgba(96,165,250,0.05) 0%, transparent 70%)",
            }}
          />

          {/* Step indicator — hidden on success */}
          {!isLast && (
            <StepIndicator current={step} total={totalSteps - 1} />
          )}

          {/* Animated step content */}
          <div className="relative overflow-hidden min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                {step === 0 && (
                  <Step1
                    value={form.projectType}
                    onChange={(v) => setForm((f) => ({ ...f, projectType: v }))}
                  />
                )}
                {step === 1 && (
                  <Step2
                    description={form.description}
                    budget={form.budget}
                    onDescriptionChange={(v) =>
                      setForm((f) => ({ ...f, description: v }))
                    }
                    onBudgetChange={(v) =>
                      setForm((f) => ({ ...f, budget: v }))
                    }
                  />
                )}
                {step === 2 && (
                  <Step3
                    name={form.name}
                    contact={form.contact}
                    comment={form.comment}
                    onNameChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    onContactChange={(v) =>
                      setForm((f) => ({ ...f, contact: v }))
                    }
                    onCommentChange={(v) =>
                      setForm((f) => ({ ...f, comment: v }))
                    }
                  />
                )}
                {step === 3 && <Step4 />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          {!isLast && (
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-white/[0.06]">
              <div>
                {step > 0 && (
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={goBack}
                    className="text-white/40 hover:text-white/80 border-white/10"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Назад
                  </Button>
                )}
              </div>

              <Button
                variant="primary"
                size="md"
                onClick={goNext}
                disabled={!canProceed()}
                className="font-mono"
              >
                {step === 2 ? "Отправить" : "Далее"}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
