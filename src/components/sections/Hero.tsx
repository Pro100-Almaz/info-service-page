"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { LampContainer } from "@/components/ui/Lamp";

export function Hero() {
  return (
    <section id="hero">
      <LampContainer>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
          className="flex flex-col items-center text-center"
        >
          <Badge variant="outline" className="mb-6">
            ASTRATECH SOLUTIONS
          </Badge>

          <h1 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
            Разрабатываем IT-продукты,
            <br />
            которые работают на бизнес
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:mt-6">
            CRM и LMS-платформы, мобильные приложения, SaaS-решения.
            Команда с опытом 10+ лет. Беремся за задачи, от которых другие отказываются.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:mt-10">
            <Button variant="primary" size="lg" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Обсудить проект
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="lg" onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}>
              Посмотреть кейсы
            </Button>
          </div>
        </motion.div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-8 border-t border-border pt-6 sm:mt-16 sm:gap-16 sm:pt-8"
        >
          {[
            { value: "100+", label: "Реализованных проектов" },
            { value: "10+", label: "Лет опыта команды" },
            { value: "2024", label: "Год основания" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-medium text-foreground sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-base text-muted-foreground tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </LampContainer>
    </section>
  );
}
