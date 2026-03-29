"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "relative w-full bg-background z-0",
        className
      )}
    >
      {/* Lamp effect — positioned in the top area */}
      <div className="absolute top-0 left-0 right-0 h-[60vh] overflow-hidden">
        <div className="relative flex w-full h-full items-center justify-center -translate-y-[10%]">
          {/* Left conic gradient */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage:
                "conic-gradient(from 70deg at center top, #3b82f6, transparent, transparent)",
            }}
            className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem]"
          >
            <div
              className="absolute w-full left-0 h-40 bottom-0 z-20"
              style={{
                background: "var(--background)",
                maskImage: "linear-gradient(to top, white, transparent)",
                WebkitMaskImage: "linear-gradient(to top, white, transparent)",
              }}
            />
            <div
              className="absolute w-40 h-full left-0 bottom-0 z-20"
              style={{
                background: "var(--background)",
                maskImage: "linear-gradient(to right, white, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to right, white, transparent)",
              }}
            />
          </motion.div>

          {/* Right conic gradient */}
          <motion.div
            initial={{ opacity: 0.5, width: "15rem" }}
            whileInView={{ opacity: 1, width: "30rem" }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            style={{
              backgroundImage:
                "conic-gradient(from 290deg at center top, transparent, transparent, #3b82f6)",
            }}
            className="absolute inset-auto left-1/2 h-56 w-[30rem]"
          >
            <div
              className="absolute w-40 h-full right-0 bottom-0 z-20"
              style={{
                background: "var(--background)",
                maskImage: "linear-gradient(to left, white, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to left, white, transparent)",
              }}
            />
            <div
              className="absolute w-full right-0 h-40 bottom-0 z-20"
              style={{
                background: "var(--background)",
                maskImage: "linear-gradient(to top, white, transparent)",
                WebkitMaskImage: "linear-gradient(to top, white, transparent)",
              }}
            />
          </motion.div>

          {/* Background blur layers */}
          <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-background blur-2xl" />
          <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

          {/* Glow effects */}
          <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-blue-500 opacity-50 blur-3xl" />
          <motion.div
            initial={{ width: "8rem" }}
            whileInView={{ width: "16rem" }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-blue-400 blur-2xl"
          />

          {/* Lamp line */}
          <motion.div
            initial={{ width: "15rem" }}
            whileInView={{ width: "30rem" }}
            viewport={{ once: true }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-blue-400"
          />

          {/* Top mask */}
          <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-background" />
        </div>
      </div>

      {/* Content — flows naturally, positioned below the lamp */}
      <div className="relative z-50 flex min-h-screen flex-col items-center justify-center px-5 py-24">
        {children}
      </div>
    </div>
  );
};
