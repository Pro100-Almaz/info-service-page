import { CASES } from "@/lib/cases-data";
import { PortfolioClient, type ProjectItem } from "./PortfolioClient";

// ─── Convert cases data to ProjectItem format ────────────────────────────────

const PROJECTS: ProjectItem[] = CASES.map((c, i) => ({
  _id: c.slug,
  title: c.title,
  shortDescription: c.excerpt,
  slug: { current: c.slug },
  industry: c.industry,
  featured: i === 2, // case 003 (AI SaaS, own product) is featured/large
  technologies: c.stackPreview.map((name, j) => ({
    _id: `${c.slug}-tech-${j}`,
    name,
  })),
}));

// ─── Component ────────────────────────────────────────────────────────────────

export function Portfolio() {
  return <PortfolioClient projects={PROJECTS} />;
}
