"use client";

import { useEffect, useRef, useState } from "react";

export default function Projects() {
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

  const projects = [
    {
      title: "Talent Scout AI",
      description: "Created an AI-driven hiring platform with conversational LLM integration for automated candidate evaluation. Implemented full-stack architecture enabling real-time question generation and hiring report generation.",
      tags: ["AI/ML", "LLMs", "Full Stack", "Automation"],
      icon: "🤖",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "IoT Waste Segregation",
      description: "Built a YOLOv5+ CNN hybrid model achieving 94% accuracy on custom datasets. Deployed on Raspberry Pi using TensorFlow Lite for real-time edge inference.",
      tags: ["Computer Vision", "IoT", "YOLOv5", "TensorFlow"],
      icon: "♻️",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Sign Language Learning App",
      description: "Developed an LSTM-CNN model with MediaPipe for hand tracking; achieved high-accuracy gesture recognition (less than 100ms latency). Deployed via Flask API for real-time English/Gujarati translation.",
      tags: ["Deep Learning", "MediaPipe", "Flask", "Real-time"],
      icon: "🤟",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      title: "She Nurtures AI Assistant",
      description: "Developed an empathetic health assistant offering reproductive health support, pitched to the Govt. of Karnataka. Built a dual-mode web app (Node.js, Azure TTS) providing accessible voice and chat-based guidance.",
      tags: ["Healthcare AI", "Node.js", "Azure", "Voice Tech"],
      icon: "💝",
      gradient: "from-rose-500 to-orange-500"
    }
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 px-8 max-w-7xl mx-auto relative z-10"
    >
      <div className="w-full">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Projects
          </h2>
          <p className="text-gray-300 text-lg mb-12">My work</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`bg-[#1d1836] p-6 rounded-2xl border border-purple-500/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-purple-500/10 group ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{
                transitionDelay: `${index * 150}ms`
              }}
            >
              {/* Project Header */}
              <div className="flex items-start gap-4 mb-4">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${project.gradient} flex items-center justify-center text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  {project.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-bold text-xl mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                    {project.title}
                  </h3>
                </div>
              </div>

              {/* Project Description */}
              <p className="text-gray-400 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors duration-300">
                {project.description}
              </p>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                {project.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-slate-800/50 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/20 hover:border-blue-500/40 hover:bg-slate-800/80 transition-all duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Hover Accent Line */}
              <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${project.gradient} rounded-full mt-4 transition-all duration-500`}></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`mt-16 text-center transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gray-400 text-sm mb-4">
            Want to see more? Check out my GitHub for additional projects!
          </p>
          <a
            href="https://github.com/uppal-bhumik"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
          >
            <span>View GitHub</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}