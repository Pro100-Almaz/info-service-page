"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const GRADIENTS = [
  "radial-gradient(circle at 30% 40%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 70% 60%, #1d4ed8 0%, transparent 50%), radial-gradient(circle at 50% 80%, #1e3a5f 0%, transparent 70%)",
  "radial-gradient(circle at 20% 30%, #10b981 0%, transparent 50%), radial-gradient(circle at 80% 70%, #059669 0%, transparent 50%), radial-gradient(circle at 50% 50%, #064e3b 0%, transparent 70%)",
  "radial-gradient(circle at 70% 30%, #8b5cf6 0%, transparent 50%), radial-gradient(circle at 30% 70%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 50% 50%, #4c1d95 0%, transparent 70%)",
  "radial-gradient(circle at 40% 60%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 70% 30%, #d97706 0%, transparent 50%), radial-gradient(circle at 30% 30%, #78350f 0%, transparent 70%)",
  "radial-gradient(circle at 60% 40%, #ec4899 0%, transparent 50%), radial-gradient(circle at 30% 70%, #db2777 0%, transparent 50%), radial-gradient(circle at 80% 20%, #9d174d 0%, transparent 60%)",
  "radial-gradient(circle at 30% 30%, #06b6d4 0%, transparent 50%), radial-gradient(circle at 70% 70%, #0891b2 0%, transparent 50%), radial-gradient(circle at 50% 50%, #164e63 0%, transparent 70%)",
];

export interface ProjectItem {
  _id: string;
  title: string;
  shortDescription?: string;
  slug: { current: string };
  industry?: string;
  featured: boolean;
  technologies?: Array<{ _id: string; name: string }>;
}

function ProjectCard({
  project,
  index,
}: {
  project: ProjectItem;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const isLarge = project.featured;

  return (
    <Link href={`/portfolio/${project.slug.current}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`group relative flex flex-col border border-white/[0.08] bg-white/[0.02] overflow-hidden cursor-pointer hover:border-blue-500/30 transition-colors duration-300 ${
          isLarge ? "md:col-span-2 md:row-span-2" : ""
        }`}
      >
        {/* Preview area */}
        <div
          className={`relative overflow-hidden ${
            isLarge ? "flex-1 min-h-[14rem]" : "h-48 md:h-56"
          }`}
        >
          <div
            className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-110"
            style={{ backgroundImage: gradient }}
          />

          {/* Noise overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-50">
            <filter id={`noise-portfolio-${index}`}>
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect
              width="100%"
              height="100%"
              filter={`url(#noise-portfolio-${index})`}
              opacity="0.15"
            />
          </svg>

          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent" />

          {project.industry && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 text-base border border-white/10 bg-white/5 text-white/60 backdrop-blur-sm">
                {project.industry}
              </span>
            </div>
          )}

          <motion.div
            className="absolute top-4 right-4"
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-8 h-8 border border-white/20 bg-white/5 backdrop-blur-sm flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4 text-white/80" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5 md:p-6 mt-auto">
          <h3 className="text-lg md:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
            {project.title}
          </h3>
          {project.shortDescription && (
            <p className="text-white/40 text-base leading-relaxed mb-4 line-clamp-2">
              {project.shortDescription}
            </p>
          )}

          {/* Technology tags */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech._id}
                  className="text-base px-2.5 py-1 border border-white/[0.06] bg-white/[0.03] text-white/40"
                >
                  {tech.name}
                </span>
              ))}
            </div>
          )}
        </div>

        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            boxShadow: isHovered
              ? "inset 0 0 60px rgba(59, 130, 246, 0.06)"
              : "inset 0 0 0px rgba(59, 130, 246, 0)",
          }}
          transition={{ duration: 0.4 }}
        />
      </motion.div>
    </Link>
  );
}

export function PortfolioClient({ projects }: { projects: ProjectItem[] }) {
  return (
    <section className="relative py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 md:mb-16"
        >
          <p className="text-blue-400 text-base tracking-widest uppercase mb-3">
            Портфолио
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Наши проекты
          </h2>
          <p className="text-white/50 max-w-2xl text-base md:text-base">
            Каждый проект — это уникальная задача, решённая с вниманием к
            деталям, качеству кода и пользовательскому опыту.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project._id} project={project} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 px-6 py-3 border border-white/[0.1] bg-white/[0.03] text-white/60 text-base hover:border-blue-500/30 hover:text-blue-400 transition-all duration-300"
          >
            Смотреть все проекты
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
