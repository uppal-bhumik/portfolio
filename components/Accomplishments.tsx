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

const publication = {
  venue: "Springer LNNS, 2025",
  title:
    "Smart Waste Management: Advanced Computer Vision for Efficient Segregation",
  description:
    "Published and presented at the 8th International Conference on Innovative Computing and Communication (ICICC). Proposed an optimized Computer Vision model for automated waste segregation using CNN and image processing.",
  link: "https://link.springer.com/chapter/10.1007/978-981-96-7134-2_24",
};

const achievements = [
  {
    title: "5th Place, Brewing Codes 3.0",
    description: "Ranked among top 5 out of 80 teams",
  },
  {
    title: "Smart India Hackathon (SIH)",
    description: "Selected twice at the institutional level",
  },
  {
    title: "Hack-O-Clock",
    description: "Competed in event by Google Coding Group",
  },
  {
    title: "Microsoft Azure Ideathon",
    description: "Participated in Cloud & AI challenge",
  },
];

export default function Accomplishments() {
  return (
    <StackSection id="recognition" className="bg-sand text-sand-ink">
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <motion.h2
          {...reveal()}
          className="font-display font-black tracking-[-0.02em] text-4xl md:text-5xl"
        >
          Recognition
        </motion.h2>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
          {/* Publication feature */}
          <motion.article
            {...reveal(0.1)}
            className="lg:col-span-7 bg-sand-deep p-8 md:p-10 flex flex-col"
          >
            <p className="font-display text-xs font-bold uppercase tracking-meta text-sand-soft">
              Research Publication — {publication.venue}
            </p>
            <h3 className="mt-6 font-display font-black tracking-[-0.02em] leading-[1.1] text-2xl md:text-3xl">
              {publication.title}
            </h3>
            <p className="mt-6 text-base leading-relaxed text-sand-soft">
              {publication.description}
            </p>
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block self-start px-6 py-3 border border-sand-ink font-display text-xs font-bold uppercase tracking-meta hover:bg-sand-ink hover:text-sand transition-colors duration-300"
            >
              Read the paper →
            </a>
          </motion.article>

          {/* Achievements list */}
          <motion.div {...reveal(0.2)} className="lg:col-span-5">
            <div className="border-t border-sand-line">
              {achievements.map((item) => (
                <div
                  key={item.title}
                  className="py-5 border-b border-sand-line"
                >
                  <h4 className="font-display font-black text-lg leading-tight">
                    {item.title}
                  </h4>
                  <p className="mt-1.5 font-display text-xs font-bold uppercase tracking-meta text-sand-soft">
                    <AmpText text={item.description} />
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
