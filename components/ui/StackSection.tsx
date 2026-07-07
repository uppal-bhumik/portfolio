"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Editorial page-stack transition. Every section is `position: sticky`
 * inside the shared <main>, so as the reader scrolls, the next section
 * slides over the previous one like a sheet of paper — pure CSS sticky,
 * no scroll-jacking, no transforms.
 *
 * Sections taller than the viewport pin by their bottom edge
 * (top = 100vh - height) so their full content remains readable
 * before the next page covers them.
 */
export default function StackSection({
  id,
  className = "",
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(0);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const handleChange = () => setIsMobile(mql.matches);
    handleChange();
    mql.addEventListener("change", handleChange);
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // On mobile, sections are often taller than the viewport which makes
    // sticky positioning produce ugly negative top values. Disable it.
    if (isMobile) {
      setTop(0);
      return;
    }

    const update = () =>
      setTop(Math.min(0, window.innerHeight - el.offsetHeight));

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [isMobile]);

  return (
    <section
      id={id}
      ref={ref}
      className={className}
      style={{
        position: isMobile ? "relative" : "sticky",
        top: isMobile ? undefined : top,
        boxShadow: isMobile
          ? undefined
          : "0 -1px 0 rgba(0, 0, 0, 0.05), 0 -32px 64px -32px rgba(0, 0, 0, 0.16)",
      }}
    >
      {children}
    </section>
  );
}
