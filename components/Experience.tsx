"use client";

import { motion } from "framer-motion";
import StackSection from "@/components/ui/StackSection";
import AmpText from "@/components/ui/AmpText";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease },
});

// Accent is tied to the role's domain, drawn from the Projects palette —
// so the colour reads as intentional, not cycled. AI/backend work carries
// the slate-blue engineering tone; other domains get their own.
// Exact Projects-card palette for the card fills; `bright` is a lifted
// variant of the same hue so the rail marks stay legible on the dark
// graphite section background.
const DOMAIN_ACCENT: Record<string, { accent: string; bright: string }> = {
  "FOUNDER'S OFFICE": { accent: "#7B96B4", bright: "#AECBE8" }, // slate blue
  "YOUR NEXT UNIVERSITY": { accent: "#BF8D84", bright: "#E8B7AC" }, // terracotta
  "ESCORTS KUBOTA": { accent: "#9AA38B", bright: "#C4D0B2" }, // sage green
  Research: { accent: "#8F8E8C", bright: "#CFCECC" }, // slate gray
};

const experiences = [
  {
    domain: "FOUNDER'S OFFICE",
    role: "Software Developer, Founder's Office",
    company: "Univaegis AI",
    location: "Delhi, India",
    duration: "Jul — Present 2026",
    placeholder: false,
    description:
      "After successfully completing my internship, I joined UNIVAEGIS AI as a full time Software Developer, working directly with the CEO to build and scale AI products. My role extends beyond development, contributing to backend architecture, product planning, integrations, and technical decisions across multiple platform features.",
    achievements: [
      "Designed and maintained backend systems powering authentication, bookings, scheduling, and platform workflows while ensuring reliability and scalability.",
      "Collaborated closely with product leadership to translate ideas into production ready features, balancing technical implementation with product requirements.",
      "Integrated cloud services, third party platforms, and AI capabilities to support intelligent workflows across the product ecosystem.",
    ],
  },
  {
    domain: "YOUR NEXT UNIVERSITY",
    role: "Software Engineer Intern",
    company: "Univaegis AI",
    location: "Delhi, India",
    duration: "Jan — Jul 2026",
    placeholder: false,
    description: (
      <>
        Worked on{" "}
        <a
          href="https://yournextuniversity.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-white/40 hover:decoration-white transition-colors underline-offset-2 font-semibold"
        >
          Your Next University (YNU)
        </a>
        , an AI powered platform helping students plan their study abroad journey. I contributed across backend development, authentication, booking workflows, payment integrations, scheduling, and internal administration tools while collaborating directly with the founder.
      </>
    ),
    achievements: [
      "Built the complete authentication flow including Google OAuth, JWT authorization, OTP verification, password reset, and secure user onboarding.",
      "Designed and implemented the peer counselling workflow covering counsellor discovery, booking, payments, Google Calendar scheduling, and automated Google Meet generation.",
      "Developed internal dashboards and platform services for administrators and peer counsellors while integrating AWS S3, payment gateways, and external APIs.",
    ],
  },
  {
    domain: "ESCORTS KUBOTA",
    role: "AI & Full Stack Developer Intern",
    company: "Escorts Kubota Ltd.",
    location: "Faridabad",
    duration: "Jul — Aug 2025",
    placeholder: false,
    description:
      "Designed and developed an AI powered business intelligence assistant that transformed natural language questions into meaningful business insights. The solution combined backend engineering, language models, and interactive visualization into an internal analytics platform.",
    achievements: [
      "Built the application using Flask, SQLAlchemy, and Streamlit, creating an end to end workflow from database queries to visual reports.",
      "Integrated language models to interpret business questions and generate structured responses from enterprise datasets.",
      "Delivered an internal tool that simplified data exploration for non technical teams, enabling faster decision making without writing SQL queries.",
    ],
  },
];

export default function Experience() {
  return (
    <StackSection id="experience" className="bg-cyan text-cyan-ink">
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <motion.div
          {...reveal()}
          className="flex flex-wrap items-end justify-between gap-4"
        >
          <h2 className="font-display font-black tracking-[-0.02em] text-4xl md:text-5xl">
            Experience
          </h2>
          <p className="font-display text-xs font-bold uppercase tracking-meta text-cyan-soft">
            3 positions
          </p>
        </motion.div>

        {/* Timeline — a thin rail with a colour-coded dot per role */}
        <div className="mt-14">
          {experiences.map((exp, i) => {
            const { accent, bright } =
              DOMAIN_ACCENT[exp.domain] ?? DOMAIN_ACCENT.Research;
            const last = i === experiences.length - 1;
            return (
              <motion.article
                key={i}
                {...reveal(0.1)}
                className="grid grid-cols-[16px_1fr] md:grid-cols-[188px_1fr] gap-x-6 md:gap-x-10"
              >
                {/* Rail: connecting line + dot + date anchor */}
                <div
                  className={`relative pl-6 md:pl-8 ${last ? "" : "border-l-4"
                    } border-cyan-ink/40 pb-14 md:pb-20`}
                >
                  <span
                    aria-hidden
                    className="absolute left-[-8px] top-1 h-4 w-4 rounded-full ring-4 ring-cyan bg-cyan-ink"
                  />
                  <p className="font-display text-base font-black uppercase tracking-meta leading-none text-cyan-ink pt-0.5">
                    {exp.duration}
                  </p>
                  {exp.placeholder && (
                    <span className="mt-3 inline-block bg-cyan-ink/10 px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-meta text-cyan-soft">
                      To be updated
                    </span>
                  )}
                </div>

                {/* Card: full accent colour block, like the Projects cards */}
                <div className="pb-14 md:pb-20">
                  <div
                    className="p-7 md:p-9 text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <h3 className="font-display font-black tracking-[-0.02em] leading-[1.05] text-2xl md:text-3xl">
                      <AmpText text={exp.role} />
                    </h3>
                    <p className="mt-3 font-display text-sm font-bold">
                      {exp.company}{" "}
                      <span className="font-semibold text-white/85">
                        — {exp.location}
                      </span>
                    </p>

                    <p className="mt-6 text-lg leading-relaxed text-white/95">
                      {exp.description}
                    </p>

                    <ul className="mt-6 border-t border-white/30">
                      {exp.achievements.map((item) => (
                        <li
                          key={item}
                          className="py-3.5 border-b border-white/35 text-base leading-relaxed text-white"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </StackSection>
  );
}
