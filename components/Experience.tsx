"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
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
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0); // 0..1 across the whole track
  const [interacted, setInteracted] = useState(false);

  // Track which card is centred + how far we've travelled, so the counter,
  // dot rail and progress line all follow the scroll continuously.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);

    const center = track.scrollLeft + track.clientWidth / 2;
    let closest = 0;
    let min = Infinity;
    Array.from(track.children).forEach((child, i) => {
      const el = child as HTMLElement;
      const c = el.offsetLeft + el.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < min) {
        min = d;
        closest = i;
      }
    });
    setActive(closest);
  }, []);

  useEffect(() => {
    onScroll();
  }, [onScroll]);

  const scrollToIndex = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(experiences.length - 1, i));
    const el = track.children[clamped] as HTMLElement | undefined;
    if (!el) return;
    const left = el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2;
    setInteracted(true);
    track.scrollTo({ left, behavior: "smooth" });
  }, []);

  // Grab-and-slide with a pointer (desktop mouse). Touch + trackpad already
  // scroll natively; this just makes the "slide the deck" gesture work with
  // a mouse. A small threshold distinguishes a drag from a click on a link.
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
    // Only hijack primary-button drags on the track itself, not on links.
    if (e.button !== 0) return;
    const track = trackRef.current;
    if (!track) return;
    drag.current = {
      down: true,
      startX: e.clientX,
      startLeft: track.scrollLeft,
      moved: false,
    };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const track = trackRef.current;
    if (!track || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 6) {
      drag.current.moved = true;
      setInteracted(true);
      track.classList.add("exp-dragging");
    }
    if (drag.current.moved) {
      track.scrollLeft = drag.current.startLeft - dx;
    }
  };

  const endDrag = () => {
    const track = trackRef.current;
    drag.current.down = false;
    track?.classList.remove("exp-dragging");
  };

  // Swallow the click that a drag would otherwise fire (e.g. on the YNU link).
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const atStart = active === 0;
  const atEnd = active === experiences.length - 1;

  return (
    <StackSection id="experience" className="bg-cyan text-cyan-ink">
      <div className="py-16 sm:py-20 md:py-24">
        <div className="px-5 sm:px-6 md:px-12 lg:px-20">
          <motion.div
            {...reveal()}
            className="flex flex-wrap items-end justify-between gap-4"
          >
            <h2 className="font-display font-black tracking-[-0.02em] text-4xl md:text-5xl">
              Experience
            </h2>
            <p className="font-display text-xs font-bold uppercase tracking-meta text-cyan-soft">
              {experiences.length} positions — swipe to explore
            </p>
          </motion.div>
        </div>

        {/* Horizontal deck — the section's own gesture, distinct from the
            vertical page stack. Drag, swipe or use the arrows to move. */}
        <motion.div {...reveal(0.1)} className="relative mt-12">
          <div
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            className="exp-track flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
          >
            {experiences.map((exp, i) => {
              const { accent } =
                DOMAIN_ACCENT[exp.domain] ?? DOMAIN_ACCENT.Research;
              return (
                <article
                  key={i}
                  className="snap-center shrink-0 w-[86vw] sm:w-[520px] md:w-[560px] lg:w-[620px] first:ml-5 sm:first:ml-6 md:first:ml-12 lg:first:ml-20 last:mr-5 sm:last:mr-6 md:last:mr-12 lg:last:mr-20"
                >
                  <div
                    className="flex h-full flex-col p-6 sm:p-8 md:p-9 text-white select-none"
                    style={{ backgroundColor: accent }}
                  >
                    <div className="flex items-center justify-between gap-4 font-display text-xs font-bold uppercase tracking-meta text-white/80">
                      <span>
                        {String(i + 1).padStart(2, "0")} /{" "}
                        {String(experiences.length).padStart(2, "0")}
                      </span>
                      <span>{exp.duration}</span>
                    </div>

                    <h3 className="mt-6 font-display font-black tracking-[-0.02em] leading-[1.05] text-2xl md:text-3xl">
                      <AmpText text={exp.role} />
                    </h3>
                    <p className="mt-3 font-display text-sm font-bold">
                      {exp.company}{" "}
                      <span className="font-semibold text-white/85">
                        — {exp.location}
                      </span>
                    </p>

                    <p className="mt-6 text-base md:text-lg leading-relaxed text-white/95">
                      {exp.description}
                    </p>

                    <ul className="mt-6 border-t border-white/30">
                      {exp.achievements.map((item) => (
                        <li
                          key={item}
                          className="py-3.5 border-b border-white/35 text-[15px] leading-relaxed text-white"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Swipe hint — a small pill in the section palette with a marching
              dotted arrow. Fades out the moment the reader interacts. */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0, y: 8 }}
            animate={
              interacted
                ? { opacity: 0, y: 8, pointerEvents: "none" }
                : { opacity: 1, y: 0 }
            }
            transition={{ duration: 0.5, ease, delay: interacted ? 0 : 0.6 }}
            className="pointer-events-none absolute right-5 sm:right-6 md:right-12 lg:right-20 top-4 flex items-center gap-2 bg-cyan-ink px-3.5 py-2 font-display text-[11px] font-bold uppercase tracking-meta text-cyan"
          >
            <span>Swipe for more</span>
            <svg
              width="34"
              height="10"
              viewBox="0 0 34 10"
              fill="none"
              className="exp-hint-arrow"
            >
              <line
                x1="1"
                y1="5"
                x2="27"
                y2="5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeDasharray="2 4"
              />
              <path
                d="M25 1L31 5L25 9"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </motion.div>

        {/* Controls: dot rail + continuous progress line + prev / next */}
        <div className="mt-8 px-5 sm:px-6 md:px-12 lg:px-20">
          <div className="flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              {experiences.map((exp, i) => {
                const { accent } =
                  DOMAIN_ACCENT[exp.domain] ?? DOMAIN_ACCENT.Research;
                const on = i === active;
                return (
                  <button
                    key={i}
                    onClick={() => scrollToIndex(i)}
                    aria-label={`Go to ${exp.company}, position ${i + 1}`}
                    className="group flex items-center py-2"
                  >
                    <span
                      className="block h-3 w-3 rounded-full ring-2 ring-cyan-ink/30 transition-all duration-300"
                      style={{
                        backgroundColor: on ? accent : "transparent",
                        transform: on ? "scale(1.25)" : "scale(1)",
                      }}
                    />
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => scrollToIndex(active - 1)}
                disabled={atStart}
                aria-label="Previous position"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-ink/40 text-cyan-ink transition-all duration-300 hover:bg-cyan-ink hover:text-cyan disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cyan-ink"
              >
                <ArrowLeft size={18} strokeWidth={2.2} />
              </button>
              <button
                onClick={() => scrollToIndex(active + 1)}
                disabled={atEnd}
                aria-label="Next position"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-ink/40 text-cyan-ink transition-all duration-300 hover:bg-cyan-ink hover:text-cyan disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-cyan-ink"
              >
                <ArrowRight size={18} strokeWidth={2.2} />
              </button>
            </div>
          </div>

          {/* Continuous progress line */}
          <div className="mt-5 h-[3px] w-full bg-cyan-ink/15">
            <div
              className="h-full bg-cyan-ink transition-[width] duration-150 ease-out"
              style={{
                width: `${Math.max(12, progress * 100)}%`,
              }}
            />
          </div>
        </div>
      </div>
    </StackSection>
  );
}
