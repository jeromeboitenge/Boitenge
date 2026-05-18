'use client';
import Hero from './components/Hero';
import About from './about/page';
import Skills from './skills/page';
import Projects from './projects/page';
import Experience from './experience/page';
import Certificates from './components/Certificates';
import Contact from './contact/page';

export default function HomePage() {
  return (
    <main className="scroll-smooth">
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="skills">
        <Skills />
      </section>

      <section id="projects">
        <Projects />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="certificates">
        <Certificates />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
