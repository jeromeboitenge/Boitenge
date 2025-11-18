'use client';
import Hero from './components/Hero';
import About from './about/page';
import Skills from './skills/page';
import Projects from './projects/page';
import Experience from './experience/page';
import Contact from './contact/page';
import { motion } from 'framer-motion';

export default function HomePage() {
  return (
    <main className="scroll-smooth">
      {/* Hero / Home Section */}
      <section id="home">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about">
        <About />
      </section>

      {/* Skills Section */}
      <section id="skills">
        <Skills />
      </section>

      {/* Projects Section */}
      <section id="projects">
        <Projects />
      </section>

      {/* Experience Section */}
      <section id="experience">
        <Experience />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
