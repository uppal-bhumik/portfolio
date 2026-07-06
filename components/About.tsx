"use client";

import { motion } from "framer-motion";
import StackSection from "@/components/ui/StackSection";
import CurrentFocus from "@/components/ui/CurrentFocus";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease },
});

export default function About() {
  return (
    <StackSection id="about" className="bg-onyx text-onyx-ink relative overflow-hidden">
      {/* Blurry background element merging with the current background */}
      <div className="absolute right-[-10%] top-1/4 w-[800px] h-[800px] bg-white/[0.03] blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute left-[-10%] bottom-[-10%] w-[600px] h-[600px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
      
      {/* Blurred duplicate of CurrentFocus to act as a textured background */}
      <div className="absolute right-0 top-1/4 w-[600px] opacity-[0.03] blur-[8px] pointer-events-none select-none scale-150 origin-right">
        <CurrentFocus />
      </div>

      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-24 relative z-10">
        <motion.h2
          {...reveal()}
          className="font-display font-black tracking-[-0.02em] text-4xl md:text-5xl text-white"
        >
          About
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
          <motion.div {...reveal(0.1)} className="lg:col-span-7">
            <p className="text-lg md:text-xl leading-relaxed text-white/90">
              I enjoy building products where strong backend engineering meets applied AI. Whether it&apos;s designing backend systems, building authentication flows, integrating AI into existing products, or deploying production ready applications, I enjoy solving engineering problems that have a real impact on the people using them.
            </p>
            <p className="mt-6 text-lg md:text-xl leading-relaxed text-white/90">
              Over the past year, I&apos;ve worked across education, healthcare, and enterprise products, taking ideas from the first database schema to deployment. Along the way, publishing research in computer vision gave me a research driven perspective that complements my hands on experience in building software.
            </p>
          </motion.div>

          {/* Shifted upwards significantly */}
          <motion.div {...reveal(0.2)} className="lg:col-span-5 lg:-mt-24">
            <CurrentFocus />
          </motion.div>
        </div>
      </div>
    </StackSection>
  );
}
