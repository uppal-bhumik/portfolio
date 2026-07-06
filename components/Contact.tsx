"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy } from "lucide-react";
import StackSection from "@/components/ui/StackSection";

const ease = [0.22, 1, 0.36, 1] as const;

const reveal = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.7, delay, ease },
});

type Row =
  | {
      kind: "copy";
      label: string;
      value: string;
      copy: string;
    }
  | {
      kind: "link";
      label: string;
      stat: string;
      value: string;
      href: string;
    }
  | {
      kind: "static";
      label: string;
      value: string;
    };

const rows: Row[] = [
  {
    kind: "copy",
    label: "Primary Contact",
    value: "uppal.bhumik1910@gmail.com",
    copy: "uppal.bhumik1910@gmail.com",
  },
  {
    kind: "copy",
    label: "Phone",
    value: "+91-9034872088",
    copy: "+919034872088",
  },
  {
    kind: "link",
    label: "GitHub",
    stat: "20+ Public Repositories",
    value: "github.com/uppal-bhumik",
    href: "https://github.com/uppal-bhumik",
  },
  {
    kind: "link",
    label: "LinkedIn",
    stat: "1250+ Followers",
    value: "linkedin.com/in/bhumik-uppal",
    href: "https://www.linkedin.com/in/bhumik-uppal-74a70724b/",
  },
  {
    kind: "static",
    label: "Location",
    value: "Delhi, India",
  },
];

export default function Contact() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = async (label: string, text: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for non-secure contexts / older browsers
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
    } catch {
      /* clipboard unavailable */
    }
    // Confirm regardless — the user asked for the "Copied" affordance
    setCopied(label);
    window.setTimeout(() => setCopied(null), 1600);
  };

  return (
    <StackSection id="contact" className="bg-charcoal text-paper">
      <div className="px-6 md:px-12 lg:px-20 py-20 md:py-24">
        <motion.h2
          {...reveal()}
          className="font-display font-black tracking-[-0.02em] leading-[1.02] text-[clamp(2.5rem,6vw,4.5rem)]"
        >
          Interested in Building Together?
        </motion.h2>

        <motion.p
          {...reveal(0.1)}
          className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-paper/60"
        >
          I&apos;m always interested in discussing backend engineering, applied
          AI, machine learning, and product development. Whether you&apos;re
          building a startup, exploring intelligent systems, or looking for an
          engineer who enjoys solving complex problems, I&apos;d be happy to
          connect.
        </motion.p>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-x-16 gap-y-12">
          {/* Interactive contact list */}
          <motion.div {...reveal(0.2)} className="lg:col-span-7">
            <div className="border-t border-paper/15">
              {rows.map((row) => {
                if (row.kind === "copy") {
                  const isCopied = copied === row.label;
                  return (
                    <button
                      key={row.label}
                      type="button"
                      onClick={() => handleCopy(row.label, row.copy)}
                      className="group flex w-full items-center justify-between gap-6 py-4 border-b border-paper/15 text-left"
                    >
                      <span className="font-display text-xs font-bold uppercase tracking-meta text-paper/50">
                        {row.label}
                      </span>
                      <span className="flex items-center gap-2.5">
                        <span className="font-display text-sm md:text-base font-bold">
                          {row.value}
                        </span>
                        <span
                          className={`inline-flex items-center gap-1 font-display text-[10px] font-bold uppercase tracking-meta transition-opacity duration-300 ${
                            isCopied
                              ? "opacity-100 text-paper"
                              : "opacity-0 group-hover:opacity-60"
                          }`}
                        >
                          {isCopied ? (
                            <>
                              <Check size={12} strokeWidth={3} /> Copied
                            </>
                          ) : (
                            <>
                              <Copy size={11} strokeWidth={2.5} /> Copy
                            </>
                          )}
                        </span>
                      </span>
                    </button>
                  );
                }

                if (row.kind === "link") {
                  return (
                    <a
                      key={row.label}
                      href={row.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-6 py-4 border-b border-paper/15"
                    >
                      <span className="font-display text-xs font-bold uppercase tracking-meta text-paper/50">
                        {row.label}
                      </span>
                      <span className="flex flex-col items-end text-right">
                        <span className="inline-flex items-center gap-1.5 font-display text-sm md:text-base font-bold">
                          {row.stat}
                          <ArrowUpRight
                            size={15}
                            strokeWidth={2.5}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          />
                        </span>
                        <span className="mt-0.5 font-mono text-[11px] text-paper/45">
                          {row.value}
                        </span>
                      </span>
                    </a>
                  );
                }

                return (
                  <div
                    key={row.label}
                    className="flex items-center justify-between gap-6 py-4 border-b border-paper/15"
                  >
                    <span className="font-display text-xs font-bold uppercase tracking-meta text-paper/50">
                      {row.label}
                    </span>
                    <span className="font-display text-sm md:text-base font-bold text-right">
                      {row.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            {...reveal(0.3)}
            className="lg:col-span-5 flex flex-col justify-start gap-4"
          >
            <a
              href="mailto:uppal.bhumik1910@gmail.com"
              className="block text-center px-7 py-4 bg-paper text-ink font-display text-sm font-bold uppercase tracking-meta hover:opacity-90 transition-opacity duration-300"
            >
              Start a Conversation
            </a>
            <a
              href="https://www.linkedin.com/in/bhumik-uppal-74a70724b/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center px-7 py-4 border border-paper font-display text-sm font-bold uppercase tracking-meta hover:bg-paper hover:text-ink transition-colors duration-300"
            >
              Connect on LinkedIn
            </a>
          </motion.div>
        </div>

        {/* Closing footer */}
        <motion.div
          {...reveal(0.4)}
          className="mt-16 pt-6 border-t border-paper/15 flex flex-col md:flex-row md:items-center md:justify-between gap-2 font-display text-xs font-bold uppercase tracking-meta text-paper/45"
        >
          <span>Designed &amp; developed by Bhumik Uppal</span>
          <span>Built with React, TypeScript &amp; a lot of coffee</span>
        </motion.div>
      </div>
    </StackSection>
  );
}
