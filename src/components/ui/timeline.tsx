"use client";

import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
  useMotionValue,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const animatedHeight = useMotionValue(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();

    // Small delay to ensure content is fully rendered
    const timeout = setTimeout(updateHeight, 500);

    const resizeObserver = new ResizeObserver(updateHeight);
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      clearTimeout(timeout);
      resizeObserver.disconnect();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  // Manually update animated height based on scroll progress and current height
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (height > 0) {
      animatedHeight.set(latest * height);
    }
  });

  // Also update when height changes
  useEffect(() => {
    if (height > 0) {
      animatedHeight.set(scrollYProgress.get() * height);
    }
  }, [height, scrollYProgress, animatedHeight]);

  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-[#0a0a0a] font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <h2 className="text-lg md:text-4xl mb-4 text-white max-w-4xl">
          Как мы работаем
        </h2>
        <p className="text-white/50 text-base max-w-sm">
          От идеи до запуска — прозрачный процесс с чёткими этапами и
          постоянной обратной связью на каждом шаге.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            {/* Left column: sticky dot + title */}
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start w-[70px] md:w-[480px] shrink-0">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#0a0a0a] flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-blue-900/50 border border-blue-700/50 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-blue-400/60 whitespace-nowrap">
                {item.title}
              </h3>
            </div>

            {/* Right column: content */}
            <div className="relative pl-3 pr-4 md:pl-4 flex-1 min-w-0">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-blue-400/60">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}

        {/* Background line */}
        <div
          style={{
            height: height + "px",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 99%)",
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px]"
        >
          {/* Animated fill line */}
          <motion.div
            style={{
              height: animatedHeight,
              opacity: opacityTransform,
              background:
                "linear-gradient(to top, #3b82f6 0%, #60a5fa 10%, transparent 100%)",
            }}
            className="absolute inset-x-0 top-0 w-[2px] rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
