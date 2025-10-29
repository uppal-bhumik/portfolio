"use client";

import { useEffect, useRef, useState } from "react";

export default function Experience() {
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

  const experiences = [
    {
      role: "AI & Full Stack Developer Intern",
      company: "Escorts Kubota Ltd.",
      location: "Faridabad",
      duration: "July 2025 – August 2025",
      type: "Internship",
      achievements: [
        "Designed and deployed an AI-powered business intelligence assistant that converts natural language queries into actionable data insights",
        "Developed the full stack using Flask, SQLAlchemy ORM, and Streamlit; integrated LLMs for intelligent query understanding",
        "Delivered a production-ready tool enabling non-technical teams to analyze sales data through visual dashboards"
      ],
      tags: ["AI/ML", "Flask", "LLMs", "Streamlit", "SQLAlchemy"],
      icon: "💼"
    }
  ];

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 px-6 md:px-8 max-w-7xl mx-auto relative z-10"
    >
      <div className="w-full">
        {/* Section Header */}
        <div
          className={`mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            Work Experience
          </h2>
         
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-pink-400 mt-4"></div>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 hidden md:block"></div>

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Timeline Dot */}
                <div className="hidden md:flex absolute left-0 md:left-6 top-8 w-5 h-5 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-4 border-slate-950 z-10"></div>

                {/* Card */}
                <div className="md:ml-20 group">
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 md:p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10 hover:transform hover:scale-[1.02]">
                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="relative z-10">
                      {/* Header */}
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <span className="text-3xl">{exp.icon}</span>
                            <div>
                              <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                                {exp.role}
                              </h3>
                              <p className="text-slate-400 font-semibold text-base md:text-lg mt-1">
                                {exp.company} | {exp.location}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-start md:items-end gap-2">
                          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                            {exp.type}
                          </span>
                          <p className="text-slate-500 text-sm font-medium">
                            📅 {exp.duration}
                          </p>
                        </div>
                      </div>

                      {/* Achievements */}
                      <ul className="space-y-3 mb-6">
                        {exp.achievements.map((achievement, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-slate-300 leading-relaxed"
                          >
                            <span className="text-blue-400 mt-1 flex-shrink-0">▹</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-slate-800/50 text-slate-300 border border-slate-700/50 hover:border-purple-500/50 hover:bg-slate-800 transition-all duration-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}