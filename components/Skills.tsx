"use client";

import { motion } from "framer-motion";
import {
  Code2,
  BrainCircuit,
  Server,
  Database,
  Rocket,
  GraduationCap,
  Trophy,
  BookOpen,
  type LucideIcon,
} from "lucide-react";
import StackSection from "@/components/ui/StackSection";
import AmpText from "@/components/ui/AmpText";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease },
});

/* ── Skills data ── */
const skillCategories: {
  label: string;
  icon: LucideIcon;
  accent: string;
  items: string[];
}[] = [
  {
    label: "Programming",
    icon: Code2,
    accent: "#7B96B4",
    items: ["Python", "Java", "SQL"],
  },
  {
    label: "Applied AI",
    icon: BrainCircuit,
    accent: "#BF8D84",
    items: [
      "Computer Vision",
      "YOLOv5",
      "Model Training",
      "Fine Tuning",
      "Model Evaluation",
      "Inference Pipelines",
      "RAG Pipelines",
      "Vector Databases",
      "TensorFlow",
      "LangGraph",
    ],
  },
  {
    label: "Backend",
    icon: Server,
    accent: "#9AA38B",
    items: [
      "Backend Architecture",
      "System Design",
      "API Design",
      "REST APIs",
      "FastAPI",
      "OAuth 2.0",
      "JWT",
      "Database Design",
      "SQLAlchemy ORM",
      "Cloud Integration",
    ],
  },
  {
    label: "Databases",
    icon: Database,
    accent: "#AE9F7E",
    items: ["PostgreSQL", "MongoDB", "MySQL"],
  },
  {
    label: "Cloud & DevOps",
    icon: Rocket,
    accent: "#8F8E8C",
    items: ["Docker", "AWS", "Nginx", "Git", "Render", "CI/CD Pipeline", "GitHub Actions"],
  },
];

/* ── Achievements data ── */
const achievements = [
  { title: "Brewing Codes 3.0", detail: "5th Place • Top 5 of 80 Teams" },
  { title: "Smart India Hackathon", detail: "Institutional Finalist" },
  { title: "Hack-O-Clock", detail: "Google Developer Group Hackathon" },
  { title: "Microsoft Azure Ideathon", detail: "AI & Cloud Innovation Challenge" },
];

const publication = {
  venue: "Springer • ICICC 2025",
  title: "Advanced Computer Vision for Automated Waste Segregation",
  description:
    "Developed and evaluated a computer vision pipeline for automated waste segregation using deep learning, image processing, and edge deployment techniques.",
  link: "https://link.springer.com/chapter/10.1007/978-981-96-7134-2_24",
};

export default function SkillsAndAchievements() {
  return (
    <StackSection id="skills" className="bg-onyx text-onyx-ink">
      <div className="px-5 sm:px-6 md:px-12 lg:px-20 py-16 sm:py-20 md:py-24">
        {/* Section heading */}
        <motion.h2
          {...reveal()}
          className="font-display font-black tracking-[-0.02em] text-4xl md:text-5xl"
        >
          Expertise
        </motion.h2>

        {/* ─── SKILLS ─── */}
        <motion.p
          {...reveal(0.05)}
          className="mt-8 font-display text-xs font-bold uppercase tracking-meta text-onyx-soft"
        >
          Technical skills
        </motion.p>

        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {skillCategories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.label}
                {...reveal(0.08 + i * 0.04)}
                className="relative overflow-hidden border border-onyx-line p-5 rounded-lg"
                style={{
                  background: `linear-gradient(145deg, #3D3A36 0%, #4A4641 100%)`,
                }}
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent 0%, ${cat.accent} 50%, transparent 100%)`,
                  }}
                />

                <div className="flex items-center gap-2.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded"
                    style={{
                      backgroundColor: `${cat.accent}2E`,
                      color: cat.accent,
                    }}
                  >
                    <Icon size={16} strokeWidth={2.25} />
                  </span>
                  <h3
                    className="font-display text-xs font-bold uppercase tracking-meta"
                    style={{ color: "#E8E6E1" }}
                  >
                    <AmpText text={cat.label} />
                  </h3>
                </div>

                <div className="mt-3.5 flex flex-wrap gap-1.5">
                  {cat.items.map((item) => (
                    <motion.span
                      key={item}
                      whileHover={{ 
                        y: -2, 
                        color: "#FFFFFF", 
                        borderColor: `${cat.accent}A0` 
                      }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="px-2.5 py-1.5 font-display text-[10px] font-bold uppercase tracking-meta rounded-sm cursor-default"
                      style={{
                        backgroundColor: `${cat.accent}18`,
                        borderWidth: "1px",
                        borderStyle: "solid",
                        borderColor: `${cat.accent}40`,
                        color: cat.accent,
                      }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}

          {/* Education — same card style */}
          <motion.div
            {...reveal(0.3)}
            className="relative overflow-hidden border border-onyx-line p-5 rounded-lg"
            style={{
              background: `linear-gradient(145deg, #3D3A36 0%, #4A4641 100%)`,
            }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, transparent 0%, #645E78 50%, transparent 100%)`,
              }}
            />
            <div className="flex items-center gap-2.5">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded"
                style={{ backgroundColor: "rgba(100,94,120,0.25)", color: "#9B93B4" }}
              >
                <GraduationCap size={16} strokeWidth={2.25} />
              </span>
              <h3
                className="font-display text-xs font-bold uppercase tracking-meta"
                style={{ color: "#E8E6E1" }}
              >
                Education
              </h3>
            </div>
            <p
              className="mt-3.5 font-display font-black tracking-[-0.02em] text-base leading-tight"
              style={{ color: "#E8E6E1" }}
            >
              B.Tech • Industrial IoT
            </p>
            <p className="mt-1 text-xs leading-relaxed" style={{ color: "#9B93B4" }}>
              Vivekananda Institute of Professional Studies<br />
              2022–2026
            </p>
          </motion.div>
        </div>

        {/* ─── DIVIDER ─── */}
        <div className="my-14 border-t border-onyx-line" />

        {/* ─── ACHIEVEMENTS ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-10">
          {/* Research Publication */}
          <motion.div {...reveal(0.1)} className="lg:col-span-7">
            <p className="font-display text-sm font-black uppercase tracking-meta text-onyx-ink flex items-center gap-2.5">
              <BookOpen size={16} strokeWidth={2.5} />
              Research Publication
            </p>
            <div className="mt-4 mb-2">
              <span className="inline-block font-display text-[10px] font-bold uppercase tracking-meta text-[#E8E6E1] bg-onyx-line/40 px-2 py-1 rounded-sm border border-onyx-line">
                Published • {publication.venue}
              </span>
            </div>
            <h3 className="font-display font-black tracking-[-0.02em] leading-[1.1] text-xl md:text-2xl">
              {publication.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-onyx-soft">
              {publication.description}
            </p>
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block px-5 py-2.5 border border-onyx-ink font-display text-xs font-bold uppercase tracking-meta hover:bg-onyx-ink hover:text-onyx transition-colors duration-300"
            >
              Read on Springer →
            </a>
          </motion.div>

          {/* Competition Achievements */}
          <motion.div {...reveal(0.2)} className="lg:col-span-5">
            <p className="font-display text-xs font-bold uppercase tracking-meta text-onyx-soft flex items-center gap-2 mb-4">
              <Trophy size={14} strokeWidth={2.25} />
              Competitions
            </p>
            <div className="border-t border-onyx-line">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="py-3.5 border-b border-onyx-line"
                >
                  <h4 className="font-display font-black text-sm leading-tight">
                    {item.title}
                  </h4>
                  <p className="mt-1 font-display text-[11px] font-bold uppercase tracking-meta text-onyx-soft">
                    <AmpText text={item.detail} />
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </StackSection>
  );
}
