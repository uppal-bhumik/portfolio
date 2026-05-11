"use client";

import { useEffect, useRef, useState } from "react";

export default function About() {
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

  const skillCategories = [
    {
      title: "Languages",
      icon: "💻",
      skills: ["Python", "Java", "SQL"]
    },
    {
      title: "AI & ML",
      icon: "🧠",
      skills: ["Computer Vision", "NLP", "RAG Pipelines"]
    },
    {
      title: "Backend",
      icon: "⚙️",
      skills: ["FastAPI", "Flask", "REST APIs", "JWT", "Authentication"]
    },
    {
      title: "Databases",
      icon: "🗄️",
      skills: ["PostgreSQL", "MySQL", "MongoDB"]
    },
    {
      title: "DevOps & Systems",
      icon: "🚀",
      skills: ["Docker", "CI/CD", "AWS", "Nginx", "Google Cloud", "Git"]
    }
  ];

  const highlights = [
    { icon: "📚", title: "Published Researcher", desc: "Springer LNNS, 2025" },
    { icon: "🎓", title: "B.Tech IoT", desc: "VIPS, New Delhi" },
    { icon: "🤖", title: "Applied AI Engineer", desc: "End-to-End Systems" },
    { icon: "🚀", title: "Full-Stack", desc: "Production Deployments" }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="min-h-screen py-20 px-6 md:px-8 max-w-7xl mx-auto relative z-10 flex items-center"
    >
      <div className="w-full">
        {/* Section Title */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 mb-4">
            About Me
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-pink-400 mb-12"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Bio */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative">
              <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full"></div>
              <p className="text-slate-300 text-lg leading-relaxed pl-6">
                <span className="text-white font-semibold">Applied AI Engineer</span> building end-to-end systems combining <span className="text-blue-400 font-semibold">full-stack development</span>, <span className="text-purple-400 font-semibold">AI capabilities</span>, and <span className="text-pink-400 font-semibold">scalable deployment</span>.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed pl-6 mt-4">
                Experienced in designing and shipping <span className="text-white font-semibold">production-ready applications</span>. Published researcher with a background in <span className="text-blue-400">computer vision</span>, <span className="text-purple-400">machine learning</span>, and <span className="text-pink-400">IoT systems</span>.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed pl-6 mt-4">
                Currently working as a <span className="text-blue-400 font-semibold">Software Developer Intern</span> at <span className="text-white font-semibold">UnivAegis (YNU Platform)</span>, building full-stack AI-powered student platforms with cloud infrastructure on AWS.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                  <p className="text-slate-400 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Skills */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Technical Skills</h3>
            
            <div className="space-y-5">
              {skillCategories.map((category, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-blue-500/30 transition-all duration-300 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl">{category.icon}</span>
                    <span className="text-white font-semibold text-sm">{category.title}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-900/50 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/20 hover:border-blue-500/40 hover:bg-slate-800/80 transition-all duration-200"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Education Card */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-slate-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span>🎓</span>
                Education
              </h4>
              <p className="text-white text-sm font-semibold">B.Tech in Industrial Internet of Things (IoT)</p>
              <p className="text-slate-400 text-sm mt-1">Vivekananda Institute of Professional Studies, New Delhi</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-blue-400 text-xs font-medium">2022 – 2026</span>
                <span className="text-slate-500 text-xs">•</span>
                <span className="text-purple-400 text-xs font-medium">CGPA: 7.41 / 10</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}