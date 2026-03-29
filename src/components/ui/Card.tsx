"use client";

import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className = "", hover = true }: CardProps) {
  return (
    <motion.div
      whileHover={hover ? { y: -4 } : undefined}
      transition={{ duration: 0.2 }}
      className={`
        border border-border bg-card p-6
        text-card-foreground
        transition-colors duration-200
        ${hover ? "hover:border-muted-foreground/30" : ""}
        ${className}
      `}
    >
      {children}
    </motion.div>
  );
}
