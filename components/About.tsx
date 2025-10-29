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

  const skills = [
    { name: "Python", level: 95, icon: "🐍" },
    { name: "TensorFlow", level: 90, icon: "🧠" },
    { name: "Docker", level: 85, icon: "🐳" },
    { name: "Azure", level: 80, icon: "☁️" },
    { name: "SQL", level: 88, icon: "🗄️" },
    { name: "MLOps", level: 85, icon: "⚙️" }
  ];

  const highlights = [
    { icon: "📚", title: "Published Researcher", desc: "Springer Publications" },
    { icon: "🎓", title: "B.Tech Student", desc: "Industrial IoT" },
    { icon: "🤖", title: "AI Specialist", desc: "End-to-End Systems" },
    { icon: "🚀", title: "Full-Stack", desc: "R&D to Deployment" }
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
                I am a <span className="text-white font-semibold">final-year B.Tech Industrial IoT student</span> with a deep specialization in <span className="text-blue-400 font-semibold">Generative AI</span>, <span className="text-purple-400 font-semibold">Computer Vision</span>, and <span className="text-pink-400 font-semibold">MLOps</span>.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed pl-6 mt-4">
                As a <span className="text-white font-semibold">published Springer researcher</span>, I have hands-on experience developing and deploying end-to-end AI systems, from initial R&D to full-stack deployment.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed pl-6 mt-4">
                I am proficient in <span className="text-blue-400">Python</span>, <span className="text-blue-400">TensorFlow</span>, <span className="text-blue-400">SQL</span>, <span className="text-blue-400">Docker</span>, and <span className="text-blue-400">Microsoft Azure</span>, and I am passionate about building intelligent solutions to real-world problems.
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
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="flex items-center gap-2 text-slate-300 font-medium">
                      <span>{skill.icon}</span>
                      {skill.name}
                    </span>
                    <span className="text-slate-400 text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-slate-800/50 rounded-full overflow-hidden border border-slate-700/50">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: isVisible ? `${skill.level}%` : "0%",
                        transitionDelay: `${600 + index * 100}ms`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Info Card */}
            <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border border-slate-700/50">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <span>💡</span>
                Current Focus
              </h4>
              <p className="text-slate-300 text-sm leading-relaxed">
                Building scalable AI/ML systems with a focus on <span className="text-blue-400 font-medium">Generative AI applications</span>, <span className="text-purple-400 font-medium">Computer Vision pipelines</span>, and implementing robust <span className="text-pink-400 font-medium">MLOps practices</span> for production environments.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}