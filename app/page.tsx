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
    <>
      <section id="home">
        <Hero />
      </section>
      <About />
      <Skills />
      <Projects />
      <Experience />
      <section id="certificates">
        <Certificates />
      </section>
      <Contact />
    </>
  );
}
