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
    <footer className="relative bg-white dark:bg-darkBg border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 mt-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-200 dark:border-slate-800 pb-16">

          {/* ABOUT */}
          <div className="space-y-6 lg:col-span-1">
            <Link href="/" className="text-2xl font-display font-bold text-lightText dark:text-darkText tracking-wide flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">JB</span>
              Jerome
            </Link>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              Passionate software engineer crafting digital solutions that make a difference. 
              Let's build something amazing together.
            </p>

            {/* Social icons */}
            <div className="flex space-x-4 pt-2">
              <a
                href="https://twitter.com/jeromeboitenge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary text-slate-600 dark:text-slate-400 transition-all duration-300 shadow-sm"
              >
                <FaTwitter size={18} />
              </a>

              <a
                href="https://linkedin.com/in/jeromeboitenge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary text-slate-600 dark:text-slate-400 transition-all duration-300 shadow-sm"
              >
                <FaLinkedin size={18} />
              </a>

              <a
                href="https://github.com/jeromeboitenge"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary text-slate-600 dark:text-slate-400 transition-all duration-300 shadow-sm"
              >
                <FaGithub size={18} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/#home" className="hover:text-primary dark:hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/#skills" className="hover:text-primary dark:hover:text-primary transition-colors">Skills</Link></li>
              <li><Link href="/#experience" className="hover:text-primary dark:hover:text-primary transition-colors">Experience</Link></li>
              <li><Link href="/#projects" className="hover:text-primary dark:hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/#contact" className="hover:text-primary dark:hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Services</h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>Web Development & Design</li>
              <li>Backend Development & APIs</li>
              <li>Database Administration</li>
              <li>Hardware & Software Maintenance</li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-6">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white">Get In Touch</h4>
            <div className="space-y-4">

              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Mail size={16} className="text-primary" />
                </div>
                <a
                  href="mailto:jeromeboitenge@gmail.com"
                  className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors"
                >
                  jeromeboitenge@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Phone size={16} className="text-primary" />
                </div>
                <a
                  href="tel:+250782433539"
                  className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors"
                >
                  +250 782 433 539
                </a>
              </div>

              <div className="flex items-center space-x-3 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MapPin size={16} className="text-primary" />
                </div>
                <a
                  href="https://maps.app.goo.gl/Pm6nVE3Qb2LzXCng8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors"
                >
                  Kigali, Rwanda
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-sm text-slate-500 dark:text-slate-400">
          <p>© {currentYear} Jerome Boitenge. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Crafted with passion and precision</p>
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
