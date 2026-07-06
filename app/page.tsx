import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import SkillsAndAchievements from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="relative w-full">
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <SkillsAndAchievements />
      <Projects />
      <Contact />
    </main>
  );
}
