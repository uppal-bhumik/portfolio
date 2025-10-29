"use client";

import { useEffect, useRef, useState } from "react";

export default function Accomplishments() {
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

  const publication = {
    venue: "Springer LNNS, 2025",
    title: "Smart Waste Management: Advanced Computer Vision for Efficient Segregation",
    description: "Published and presented at the 8th International Conference on Innovative Computing and Communication (ICICC). Proposed an optimized Computer Vision model for automated waste segregation using CNN and image processing, improving efficiency and throughput.",
    icon: "📚",
    link: "https://link.springer.com/chapter/10.1007/978-981-96-7134-2_24"
  };

  const achievements = [
    {
      title: "5th Place, Brewing Codes 3.0",
      description: "Ranked among top 5 out of 80 teams",
      icon: "🏆",
      color: "from-yellow-500 to-orange-500"
    },
    {
      title: "Smart India Hackathon (SIH)",
      description: "Selected twice at the institutional level for national participation",
      icon: "🇮🇳",
      color: "from-green-500 to-blue-500"
    },
    {
      title: "Hack-O-Clock",
      description: "Competed in event by Google Coding Group & Geek Room",
      icon: "⚡",
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Microsoft Azure Ideathon",
      description: "Participated in Cloud & AI challenge, focusing on AI deployment and automation",
      icon: "☁️",
      color: "from-cyan-500 to-purple-500"
    }
  ];

  return (
    <section
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
            Publications & Achievements
          </h2>
          <p className="text-slate-400 text-lg md:text-xl">
            Recognition and research contributions
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-pink-400 mt-4"></div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Publication Column */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center text-2xl">
                {publication.icon}
              </div>
              <h3 className="text-white font-bold text-2xl">Publication</h3>
            </div>

            <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl hover:border-pink-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-pink-500/10 group">
              {/* Venue Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-pink-500/20 text-pink-300 rounded-full text-sm font-medium border border-pink-500/30">
                  {publication.venue}
                </span>
                <a
                  href={publication.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>

              {/* Title */}
              <h4 className="text-white font-semibold text-lg mb-3 leading-relaxed group-hover:text-pink-400 transition-all duration-300">
                {publication.title}
              </h4>

              {/* Description */}
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors duration-300 mb-6">
                {publication.description}
              </p>

              {/* Read Publication Button */}
              <a
                href={publication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium hover:from-pink-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40"
              >
                Read Publication
                <svg
                  className="w-5 h-5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                </svg>
              </a>
            </div>
          </div>

          {/* Achievements Column */}
          <div
            className={`transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-2xl">
                🎯
              </div>
              <h3 className="text-white font-bold text-2xl">Achievements</h3>
            </div>

            <ul className="space-y-4">
              {achievements.map((achievement, index) => (
                <li
                  key={index}
                  className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-4 rounded-lg hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue-500/5 group"
                  style={{
                    transitionDelay: `${(index + 1) * 100}ms`
                  }}
                >
                  <div className="flex items-start gap-3">
                    {/* Icon with Gradient Background */}
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${achievement.color} flex items-center justify-center text-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      {achievement.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h5 className="text-slate-300 font-semibold text-sm mb-1 group-hover:text-white transition-colors duration-300">
                        {achievement.title}
                      </h5>
                      <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-300 transition-colors duration-300">
                        {achievement.description}
                      </p>
                    </div>
                  </div>

                  {/* Mini Accent Line */}
                  <div className={`h-0.5 w-0 group-hover:w-full bg-gradient-to-r ${achievement.color} rounded-full mt-3 transition-all duration-500`}></div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div
          className={`mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-xl text-center hover:border-blue-500/50 transition-all duration-300">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-400 mb-2">
              1
            </div>
            <div className="text-slate-400 text-sm">Publication</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-xl text-center hover:border-purple-500/50 transition-all duration-300">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
              4+
            </div>
            <div className="text-slate-400 text-sm">Achievements</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-xl text-center hover:border-green-500/50 transition-all duration-300">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400 mb-2">
              5th
            </div>
            <div className="text-slate-400 text-sm">Best Rank</div>
          </div>
          <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-xl text-center hover:border-orange-500/50 transition-all duration-300">
            <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-400 mb-2">
              2x
            </div>
            <div className="text-slate-400 text-sm">SIH Qualifier</div>
          </div>
        </div>
      </div>
    </section>
  );
}