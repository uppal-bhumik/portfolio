"use client";

import { useEffect, useState } from "react";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > lastY && y > 120);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          hidden && !isOpen ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !isOpen
            ? "bg-paper/95 border-b border-line"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12 lg:px-20 py-5">
          <button
            onClick={() => scrollToSection("#hero")}
            className="font-display text-lg font-black uppercase tracking-tight text-ink"
          >
            Bhumik Uppal
          </button>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="font-display text-xs font-bold uppercase tracking-meta text-ink-soft hover:bg-ink hover:text-paper px-3 py-2 transition-all duration-300"
              >
                {link.name}
              </button>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="md:hidden text-[11px] uppercase tracking-meta text-ink"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-paper md:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col items-start justify-center gap-8 px-6 pt-16">
          {navLinks.map((link, i) => (
            <button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className="font-display text-4xl font-black uppercase tracking-tight text-ink"
            >
              <span className="font-mono text-xs text-ink-faint align-top mr-3">
                0{i + 1}
              </span>
              {link.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
