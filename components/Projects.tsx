"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import StackSection from "@/components/ui/StackSection";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease },
});

// R/GA-style muted colour blocks — one identity per project
const projects = [
  {
    title: "TalentScout AI",
    category: "Applied AI",
    color: "#7B96B4",
    description:
      "Built an AI powered hiring platform that automates technical screening through conversational interviews. Designed the complete full stack architecture with LLM based candidate evaluation, dynamic question generation, and structured hiring reports for recruiters.",
    footer: "LLM Powered Recruitment",
    github: "https://github.com/uppal-bhumik/TalentScout-AI",
  },
  {
    title: "Smart Waste Segregation",
    category: "Computer Vision",
    color: "#9AA38B",
    description:
      "Developed a hybrid YOLOv5 and CNN based waste segregation system for real time edge inference. Published the research through Springer after deploying the solution on Raspberry Pi using TensorFlow Lite.",
    footer: "Springer Publication",
    github: "https://github.com/uppal-bhumik/waste_segregation",
  },
  {
    title: "MedGuard",
    category: "Healthcare AI",
    color: "#BF8D84",
    description:
      "Built an AI powered medication safety platform that combines OCR and language models to parse prescriptions, detect adverse drug interactions, and deliver multilingual health assistance with offline support.",
    footer: "OCR + LLM Pipeline",
    github: "https://github.com/uppal-bhumik/MedGuard",
  },
  {
    title: "She Nurtures AI",
    category: "Healthcare AI",
    color: "#8F8E8C",
    description:
      "Developed an empathetic AI assistant focused on women's reproductive healthcare, delivering accessible voice and chat based guidance through intelligent conversational workflows and Azure speech services.",
    footer: "Healthcare Assistant",
    github: "https://github.com/uppal-bhumik/she-nurtures-ai",
  },
];

export default function Projects() {
  return (
    <StackSection id="projects" className="bg-stone text-stone-ink">
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <motion.div
          {...reveal()}
          className="projects-head flex flex-wrap items-end justify-between gap-4"
        >
          <h2 className="font-display font-black tracking-[-0.02em] text-4xl md:text-5xl">
            Projects
          </h2>
          <p className="font-display text-xs font-bold uppercase tracking-meta text-stone-soft">
            Selected work — 4 projects
          </p>
        </motion.div>

        <div className="project-grid mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div key={project.title} {...reveal(0.1 + i * 0.05)}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card relative flex h-full min-h-[300px] flex-col justify-between p-8 md:p-10 text-white"
                style={{ backgroundColor: project.color }}
              >
                <div>
                  <span className="font-display text-xs font-bold uppercase tracking-meta text-white/75">
                    {project.category}
                  </span>
                  <h3 className="mt-6 font-display font-black tracking-[-0.02em] leading-[1.05] text-3xl md:text-4xl">
                    {project.title}
                  </h3>

                  {/* Unfolds on hover to reveal the full case-study copy */}
                  <div className="project-details">
                    <div>
                      <p className="pt-5 text-sm leading-relaxed text-white/90">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/30 pt-4 font-display text-xs font-bold uppercase tracking-meta">
                  <span className="text-white/90">{project.footer}</span>
                  <span className="inline-flex items-center gap-1.5 text-white/90 transition-colors group-hover:text-white">
                    GitHub
                    <ArrowUpRight size={15} strokeWidth={2.5} />
                  </span>
                </div>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </StackSection>
  );
}
