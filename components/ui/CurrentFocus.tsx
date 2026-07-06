"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  "Backend Architecture",
  "Authentication Systems",
  "AI Products",
  "Applied AI",
  "Machine Learning",
  "Computer Vision",
  "Scalable APIs",
  "Cloud Infrastructure",
  "LLM Workflows",
  "Product Engineering",
  "System Design",
];

const N = items.length;
const VISIBLE = 9;
const ACTIVE_POS = 3; // 0-indexed — fourth row from the top
const ROW_H = 40;

const spring = { type: "spring" as const, stiffness: 300, damping: 28 };

export default function CurrentFocus() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStep((s) => s + 1), 850);
    return () => clearInterval(interval);
  }, []);

  // Compute 9 visible items. Active sits at ACTIVE_POS.
  // Monotonically increasing keys ensure AnimatePresence
  // tracks exit (top) and enter (bottom) correctly each tick.
  const visibleItems = Array.from({ length: VISIBLE }, (_, i) => {
    const dataIndex = ((step + i - ACTIVE_POS) % N + N) % N;
    return {
      label: items[dataIndex],
      isActive: i === ACTIVE_POS,
      key: step + i,
    };
  });

  return (
    <div className="w-full">
      {/* Header — monospace developer style */}
      <h3 className="font-mono text-[26px] font-medium text-white mb-10 select-none">
        ~/current-focus
      </h3>

      {/* Fixed viewport */}
      <div
        className="relative overflow-hidden"
        style={{ height: VISIBLE * ROW_H }}
      >
        <AnimatePresence initial={false}>
          {visibleItems.map((item, i) => (
            <motion.div
              key={item.key}
              initial={{ y: VISIBLE * ROW_H, opacity: 0 }}
              animate={{ y: i * ROW_H, opacity: 1 }}
              exit={{ y: -ROW_H, opacity: 0 }}
              transition={spring}
              className="absolute left-0 right-0"
              style={{ height: ROW_H }}
            >
              <div className="flex items-center h-full">
                <div
                  className={`flex items-center w-full rounded-md border-l-2 transition-all duration-300 ${
                    item.isActive
                      ? "bg-white/[0.06] border-white/40 h-9 px-4 text-white"
                      : "border-transparent h-9 px-4 text-white/70"
                  }`}
                >
                  <span
                    className={`mr-3 text-[11px] leading-none ${
                      item.isActive ? "text-white/80" : "text-white/40"
                    }`}
                  >
                    ▸
                  </span>
                  <span
                    className={`font-display tracking-wide ${
                      item.isActive
                        ? "text-[15px] font-medium"
                        : "text-sm font-normal"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
