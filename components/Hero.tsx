"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import StackSection from "@/components/ui/StackSection";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease },
});

export default function Hero() {
  return (
    <StackSection id="hero" className="bg-paper text-ink">
      <div className="min-h-[85vh] flex items-center px-5 sm:px-6 md:px-12 lg:px-20 pt-24 sm:pt-28 pb-12 sm:pb-16">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-x-12 gap-y-12 items-center">
          {/* Text block */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <motion.h1
              {...reveal(0.1)}
              className="font-display font-black tracking-[-0.03em] leading-[1.02] text-[clamp(2.75rem,6.5vw,5.5rem)]"
            >
              Hi, I&apos;m Bhumik
            </motion.h1>

            <motion.p
              {...reveal(0.25)}
              className="mt-6 max-w-2xl text-xl md:text-2xl leading-snug text-ink-soft"
            >
              <span className="font-display font-bold text-ink">
                Backend Engineer <span className="amp">&amp;</span> Applied AI Developer
              </span>{" "}
              building intelligent software from backend architecture to production deployment.
            </motion.p>

            <motion.p
              {...reveal(0.3)}
              className="mt-6 max-w-2xl text-base md:text-lg leading-relaxed text-ink-soft"
            >
              I enjoy building software that brings together backend engineering and applied AI. Most of my work revolves around designing APIs, building authentication and data systems, integrating cloud services, and embedding AI capabilities such as computer vision and LLMs into real products. Alongside product development, I&apos;ve also published research in computer vision, giving me experience across both engineering and research.
            </motion.p>

            <motion.div {...reveal(0.4)} className="mt-7 sm:mt-9 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="/bhumik_resume.pdf"
                download="bhumik_resume.pdf"
                className="px-7 py-3.5 bg-ink text-paper font-display text-sm font-bold uppercase tracking-meta hover:bg-ink-soft transition-colors duration-300"
              >
                Download Résumé
              </a>
              <button
                onClick={() =>
                  document
                    .querySelector("#projects")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3.5 border border-ink text-ink font-display text-sm font-bold uppercase tracking-meta hover:bg-ink hover:text-paper transition-colors duration-300"
              >
                View Projects
              </button>
            </motion.div>

            <motion.p
              {...reveal(0.5)}
              className="mt-9 font-display text-xs font-semibold uppercase tracking-meta text-ink-faint"
            >
              Delhi, India | Available for Opportunities
            </motion.p>
          </div>

          {/* The one portrait on the site */}
          <motion.div
            {...reveal(0.2)}
            className="lg:col-span-4 order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative w-52 h-72 sm:w-56 sm:h-80 md:w-64 md:h-[22rem] lg:w-[22rem] lg:h-[30rem] rounded-3xl overflow-hidden border border-line bg-[#EBEAE7]">
              <Image
                src="/IMG_1186.JPG.jpeg"
                alt="Portrait of Bhumik Uppal"
                fill
                priority
                sizes="(max-width: 1024px) 256px, 320px"
                className="object-cover object-bottom"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </StackSection>
  );
}
