"use client";

import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";

const scrollToTop = () => {
  if (typeof window !== "undefined") {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 mt-20">
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/10 to-transparent dark:from-primary/20 dark:to-transparent pointer-events-none" />
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 border-b border-slate-200 dark:border-slate-800 pb-16">

          {/* ABOUT */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 text-2xl font-display font-bold tracking-wide text-slate-900 dark:text-white">
              <span className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm shadow-lg shadow-primary/10">JB</span>
              Jerome
            </Link>

            <p className="max-w-sm text-sm leading-7 text-slate-600 dark:text-slate-400">
              Passionate software engineer crafting digital solutions that make a difference. Let's build something amazing together.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href="https://twitter.com/jeromeboitenge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="https://linkedin.com/in/jeromeboitenge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaLinkedin size={18} />
              </a>
              <a
                href="https://github.com/jeromeboitenge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-800 shadow-sm hover:bg-primary hover:text-white transition-all duration-300"
              >
                <FaGithub size={18} />
              </a>
            </div>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition"
            >
              Hire me
            </Link>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/#home" className="hover:text-primary dark:hover:text-primary transition">Home</Link></li>
              <li><Link href="/#skills" className="hover:text-primary dark:hover:text-primary transition">Skills</Link></li>
              <li><Link href="/#experience" className="hover:text-primary dark:hover:text-primary transition">Experience</Link></li>
              <li><Link href="/#projects" className="hover:text-primary dark:hover:text-primary transition">Projects</Link></li>
              <li><Link href="/#contact" className="hover:text-primary dark:hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900 dark:text-white">Services</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>Web Development & Design</li>
              <li>Backend Development & APIs</li>
              <li>Database Architecture</li>
              <li>Technical Support & Maintenance</li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-[0.35em] text-slate-900 dark:text-white">Get In Touch</h4>
            <div className="space-y-4">
              <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Mail size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Email</p>
                    <a href="mailto:jeromeboitenge@gmail.com" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition">jeromeboitenge@gmail.com</a>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Phone size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Phone</p>
                    <a href="tel:+250782433539" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition">+250 782 433 539</a>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-200 bg-white/90 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Location</p>
                    <a href="https://maps.app.goo.gl/Pm6nVE3Qb2LzXCng8" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-600 dark:text-slate-400 hover:text-primary transition">Kigali, Rwanda</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 dark:border-slate-800 pt-8 text-sm text-slate-500 dark:text-slate-400 md:flex-row md:items-center md:justify-between">
          <p>© {currentYear} Jerome Boitenge. All rights reserved.</p>
          <p>Designed with intent and built for impact.</p>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={clsx(
          "fixed bottom-8 right-8 p-3 rounded-full bg-primary text-white shadow-lg hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 z-40",
          showScrollTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
