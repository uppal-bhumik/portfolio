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
const DOMAIN_ACCENT: Record<string, { accent: string; bright: string }> = {
  "FOUNDER'S OFFICE": { accent: "#7B96B4", bright: "#AECBE8" }, // slate blue
  "YOUR NEXT UNIVERSITY": { accent: "#BF8D84", bright: "#E8B7AC" }, // terracotta
  "ESCORTS KUBOTA": { accent: "#9AA38B", bright: "#C4D0B2" }, // sage green
  Research: { accent: "#8F8E8C", bright: "#CFCECC" }, // slate gray
};

const experiences = [
  {
    domain: "FOUNDER'S OFFICE",
    tag: "Founder's Office",
    role: "Software Developer, Founder's Office",
    company: "Univaegis AI",
    location: "Delhi, India",
    duration: "Jul — Present 2026",
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
    tag: "Your Next University",
    role: "Software Engineer Intern",
    company: "Univaegis AI",
    location: "Delhi, India",
    duration: "Jan — Jul 2026",
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
    tag: "Escorts Kubota",
    role: "AI & Full Stack Developer Intern",
    company: "Escorts Kubota Ltd.",
    location: "Faridabad",
    duration: "Jul — Aug 2025",
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
  const [pad, setPad] = useState(24); // inline gutter so end cards can centre
  const [interacted, setInteracted] = useState(false);

  // Centre-gutter so the first and last cards can sit dead-centre too.
  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.children[0] as HTMLElement | undefined;
    if (!first) return;
    setPad(Math.max(20, (track.clientWidth - first.offsetWidth) / 2));
  }, []);

  // Track which card is centred + how far we've travelled, so the counter,
  // dot rail, blur-focus and progress line all follow the scroll.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    setProgress(max > 0 ? track.scrollLeft / max : 0);

    // Any deck movement — wheel, trackpad, touch — retires the swipe cue.
    if (track.scrollLeft > 8) setInteracted(true);

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
    const track = trackRef.current;
    if (!track) return;
    // A ResizeObserver corrects the centre-gutter once the deck has its
    // final width — mount-time layout can still be settling.
    const ro = new ResizeObserver(() => {
      measure();
      onScroll();
    });
    ro.observe(track);
    return () => ro.disconnect();
  }, [measure, onScroll]);

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


  // Grab-and-slide with a mouse. Touch + trackpad scroll natively; a small
  // threshold tells a drag apart from a click on the YNU link.
  const drag = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent) => {
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
    if (drag.current.moved) track.scrollLeft = drag.current.startLeft - dx;
  };

  const endDrag = () => {
    trackRef.current?.classList.remove("exp-dragging");
    drag.current.down = false;
  };

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
      <div className="exp-shell py-10 sm:py-12 md:py-14">
        {/* Header — the swipe cue now lives on the deck, centre-right */}
        <div className="px-5 sm:px-6 md:px-12 lg:px-20">
          <motion.div
            {...reveal()}
            className="flex flex-wrap items-end justify-between gap-x-8 gap-y-3"
          >
            <h2 className="font-display font-black tracking-[-0.02em] text-4xl md:text-5xl">
              Experience
            </h2>
            <p className="font-display font-black tracking-[-0.02em] text-cyan-soft pb-1 flex items-baseline gap-0.5 text-lg md:text-xl">
              <span className="text-cyan-ink">{String(active + 1).padStart(2, "0")}</span>
              <span className="text-cyan-ink/25 font-light mx-0.5">/</span>
              <span>{String(experiences.length).padStart(2, "0")}</span>
            </p>
          </motion.div>
        </div>

        {/* Focus deck — one card centred & sharp, neighbours blurred back */}
        <motion.div {...reveal(0.1)} className="relative mt-6 md:mt-8">
          <div
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            onClickCapture={onClickCapture}
            style={{ paddingLeft: pad, paddingRight: pad }}
            className="exp-track flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-3"
          >
            {experiences.map((exp, i) => {
              const { accent, bright } =
                DOMAIN_ACCENT[exp.domain] ?? DOMAIN_ACCENT.Research;
              const on = i === active;
              return (
                <article
                  key={i}
                  className="snap-center shrink-0 w-[88vw] sm:w-[86vw] md:w-[76vw] lg:w-[min(72vw,980px)]"
                >
                  <div
                    className="relative isolate flex h-full flex-col overflow-hidden p-5 sm:p-7 md:p-9 text-white select-none transition-[filter,opacity,transform] duration-500"
                    style={{
                      backgroundColor: accent,
                      backgroundImage: `radial-gradient(120% 90% at 12% 0%, ${bright}66 0%, ${bright}00 55%), linear-gradient(160deg, rgba(255,255,255,0.10) 0%, rgba(0,0,0,0.14) 100%)`,
                      filter: on ? "none" : "blur(4px) saturate(0.9)",
                      opacity: on ? 1 : 0.45,
                      transform: on ? "scale(1)" : "scale(0.93)",
                    }}
                  >
                    {/* Oversized ghost index — editorial depth, clipped by card */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-4 -bottom-10 sm:-right-6 sm:-bottom-16 z-0 font-display font-black leading-none text-white/[0.08] select-none text-[10rem] sm:text-[16rem]"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* corner tick — small graphic marker */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute right-5 top-5 z-0 h-10 w-10 border-r-2 border-t-2 border-white/25"
                    />

                    {/* meta */}
                    <div className="relative z-10 flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4 font-display text-xs font-bold uppercase tracking-meta text-white/80">
                      <span className="inline-flex items-center gap-3">
                        <span className="flex h-6 items-center rounded-full border border-white/40 px-2.5 text-[11px] text-white">
                          {exp.tag}
                        </span>
                      </span>
                      <span className="text-[10px] sm:text-xs">{exp.duration}</span>
                    </div>

                    {/* title */}
                    <h3 className="relative z-10 mt-4 sm:mt-5 font-display font-black tracking-[-0.02em] leading-[1.08] text-xl sm:text-3xl md:text-4xl">
                      <AmpText text={exp.role} />
                    </h3>
                    <p className="relative z-10 mt-2 sm:mt-2.5 font-display text-[13px] sm:text-sm font-bold">
                      {exp.company}{" "}
                      <span className="font-semibold text-white/85">
                        — {exp.location}
                      </span>
                    </p>

                    {/* body — two columns on desktop; mobile hides the long
                        description to keep the card within a single screen */}
                    <div className="relative z-10 mt-4 sm:mt-6 grid gap-6 md:gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                      <p className="hidden sm:block text-[15px] md:text-base leading-relaxed text-white/95">
                        {exp.description}
                      </p>
                      <ul className="border-t border-white/25 sm:border-t md:border-t-0 md:border-l md:border-white/25 md:pl-8">
                        {exp.achievements.map((item, k) => (
                          <li
                            key={k}
                            className="flex gap-3 py-2 sm:py-2.5 text-[12.5px] sm:text-[13.5px] leading-snug text-white/95"
                          >
                            <span className="font-display text-xs font-black text-white/60 pt-0.5">
                              {String(k + 1).padStart(2, "0")}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Glowing swipe cue — centre-right, over the blurred next card.
              Pulses to pull the eye sideways; retires on first interaction. */}
          <motion.div
            aria-hidden
            initial={{ opacity: 0 }}
            animate={{ opacity: interacted || atEnd ? 0 : 1 }}
            transition={{ duration: 0.5, ease, delay: interacted ? 0 : 0.7 }}
            className="pointer-events-none absolute right-3 md:right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-2.5 text-cyan-ink md:flex"
          >
            <span className="relative flex h-16 w-16 items-center justify-center">
              <span className="exp-ping absolute inset-0 rounded-full bg-cyan-ink/25" />
              <span className="exp-glow flex h-14 w-14 items-center justify-center rounded-full bg-cyan-ink text-cyan">
                <ArrowRight size={22} strokeWidth={2.6} />
              </span>
            </span>
            <span className="text-center font-display text-[10px] font-black uppercase leading-tight tracking-meta">
              Swipe
              <br />
              for more
            </span>
          </motion.div>
        </motion.div>

        {/* Controls: dot rail + continuous progress line + prev / next */}
        <div className="mt-6 px-5 sm:px-6 md:px-12 lg:px-20">
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

          <div className="mt-5 h-[3px] w-full bg-cyan-ink/15">
            <div
              className="h-full bg-cyan-ink transition-[width] duration-150 ease-out"
              style={{ width: `${Math.max(12, progress * 100)}%` }}
            />
          </div>
        </div>
      </div>
    </StackSection>
  );
}
