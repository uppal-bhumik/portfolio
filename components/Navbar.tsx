"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Detect active section
      const sections = ["about", "experience", "projects", "contact"];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      setActiveSection(current || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#about", label: "About", icon: "👤" },
    { href: "#experience", label: "Experience", icon: "💼" },
    { href: "#projects", label: "Projects", icon: "🚀" },
    { href: "#contact", label: "Contact", icon: "📧" }
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/80 backdrop-blur-lg shadow-lg shadow-slate-900/50 border-b border-slate-800/50"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
        <div className="flex justify-between items-center">
          {/* Logo/Name - Left Side */}
          <a 
            href="#" 
            className="relative group"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <span className="font-bold text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:from-blue-300 hover:via-purple-300 hover:to-pink-300 transition-all duration-300">
              Bhumik Uppal
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
          </a>

          {/* Desktop Navigation - Right Side */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`relative text-sm font-medium tracking-wide transition-all duration-300 group ${
                  activeSection === link.href.slice(1)
                    ? "text-white"
                    : "text-slate-400 hover:text-white"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
              >
                <span className="flex items-center gap-2">
                  <span className="text-xs opacity-70 group-hover:opacity-100 transition-opacity">
                    {link.icon}
                  </span>
                  {link.label}
                </span>
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-pink-400 transition-all duration-300 ${
                    activeSection === link.href.slice(1)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </a>
            ))}

            {/* CTA Button */}
            <a
              href="#contact"
              className="px-5 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 group"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-slate-300 transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-slate-300 transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`w-6 h-0.5 bg-slate-300 transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
          }`}
        >
          <div className="flex flex-col gap-4 py-4 border-t border-slate-800">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? "bg-slate-800/50 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/30"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  const element = document.querySelector(link.href);
                  element?.scrollIntoView({ behavior: "smooth" });
                  setMobileMenuOpen(false);
                }}
              >
                <span className="text-lg">{link.icon}</span>
                <span className="font-medium">{link.label}</span>
              </a>
            ))}
            <a
              href="#contact"
              className="mx-4 mt-2 px-5 py-3 text-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
                setMobileMenuOpen(false);
              }}
            >
              Let's Talk
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}