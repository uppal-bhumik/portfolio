"use client";

import { useEffect, useRef, useState } from "react";
import { FiMail, FiPhone, FiLinkedin, FiGithub, FiMapPin, FiSend } from "react-icons/fi";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: "uppal.bhumik1910@gmail.com",
      href: "mailto:uppal.bhumik1910@gmail.com",
      color: "from-blue-400 to-purple-400"
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: "+91-9034872088",
      href: "tel:+919034872088",
      color: "from-purple-400 to-pink-400"
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/bhumik-uppal",
      href: "https://www.linkedin.com/in/bhumik-uppal-74a70724b/",
      color: "from-blue-400 to-cyan-400",
      external: true
    },
    {
      icon: FiGithub,
      label: "GitHub",
      value: "github.com/uppal-bhumik",
      href: "https://github.com/uppal-bhumik",
      color: "from-purple-400 to-pink-400",
      external: true
    }
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-8 max-w-7xl mx-auto relative z-10 flex items-center"
    >
      <div className="w-full">
        {/* Section Header */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Get In Touch
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto">
            Let's collaborate on your next AI/ML project or discuss innovative solutions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-pink-400 mx-auto mt-6"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Contact Info Cards */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Let's Connect</h3>
              <p className="text-slate-400">
                I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              </p>
            </div>

            {contactInfo.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <a
                  key={index}
                  href={contact.href}
                  target={contact.external ? "_blank" : undefined}
                  rel={contact.external ? "noopener noreferrer" : undefined}
                  className={`group flex items-center gap-4 p-5 bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:transform hover:scale-[1.02] ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className={`p-3 rounded-lg bg-gradient-to-br ${contact.color} bg-opacity-10 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="text-2xl text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-slate-400 text-sm font-medium mb-1">{contact.label}</p>
                    <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                      {contact.value}
                    </p>
                  </div>
                  {contact.external && (
                    <svg
                      className="w-5 h-5 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                  )}
                </a>
              );
            })}

            {/* Location Card */}
            <div
              className={`flex items-center gap-4 p-5 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-slate-700/50 rounded-xl transition-all duration-1000 delay-700 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              <div className="p-3 rounded-lg bg-slate-800/50">
                <FiMapPin className="text-2xl text-blue-400" />
              </div>
              <div>
                <p className="text-slate-400 text-sm font-medium mb-1">Location</p>
                <p className="text-white font-medium">Delhi, India</p>
              </div>
            </div>
          </div>

          {/* Right Column - CTA Card */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 overflow-hidden">
              {/* Gradient Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>

              <div className="relative z-10">
                <div className="text-center mb-8">
                  <div className="inline-block p-4 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 mb-6">
                    <FiSend className="text-3xl text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Ready to Start?</h3>
                  <p className="text-slate-400">
                    Whether you have a project in mind or just want to chat about AI/ML, I'd love to hear from you!
                  </p>
                </div>

                <div className="space-y-4">
                  <a
                    href="mailto:uppal.bhumik1910@gmail.com"
                    className="block w-full px-6 py-4 text-center rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  >
                    Send Me an Email
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/in/bhumik-uppal-74a70724b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full px-6 py-4 text-center rounded-xl bg-slate-800/50 border border-slate-700 text-white font-semibold hover:border-blue-500/50 hover:bg-slate-800 transition-all duration-300"
                  >
                    Connect on LinkedIn
                  </a>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-700/50">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-1">Ready</p>
                    <p className="text-xs text-slate-400">To Collaborate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-1">Quick</p>
                    <p className="text-xs text-slate-400">Learner</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-1">Result</p>
                    <p className="text-xs text-slate-400">Driven</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div
          className={`text-center mt-16 transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-slate-500 text-sm">
            © 2025 Bhumik Uppal. Built with Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}