'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const links = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // SCROLL SPY LOGIC
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.6 }
    );

    sections.forEach((sec) => observer.observe(sec));
    return () => observer.disconnect();
  }, []);

  if (!mounted) return null;

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        'fixed top-0 inset-x-0 z-50 transition-all duration-300',
        scrolled ? 'py-4' : 'py-6'
      )}
    >
      <div className={clsx(
        'mx-auto max-w-5xl px-6 py-3 flex justify-between items-center transition-all duration-300',
        scrolled ? 'glass rounded-full' : 'bg-transparent'
      )}>
        <Link href="/" className="text-xl font-display font-bold text-lightText dark:text-darkText tracking-wide flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">JB</span>
          Jerome
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-1 items-center bg-lightBg/50 dark:bg-darkBg/50 backdrop-blur-md px-2 py-1 rounded-full border border-slate-200 dark:border-slate-800">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300',
                activeSection.toLowerCase() === link.name.toLowerCase()
                  ? 'bg-primary text-white shadow-md shadow-primary/25'
                  : 'text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary hover:bg-primary/10'
              )}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {/* Dark Mode Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            aria-label="Toggle Dark Mode"
          >
            {theme === 'dark' ? <FaSun className="text-amber-400" /> : <FaMoon />}
          </button>
          
          <a href="#contact" className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary/20">
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? <FaSun className="text-amber-400" /> : <FaMoon />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl text-lightText dark:text-darkText">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-20 left-4 right-4 glass-card p-4 rounded-3xl flex flex-col space-y-2 md:hidden"
          >
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'px-4 py-3 rounded-2xl text-sm font-medium transition-all',
                  activeSection.toLowerCase() === link.name.toLowerCase()
                    ? 'bg-primary/10 text-primary'
                    : 'text-slate-600 dark:text-slate-300'
                )}
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setIsOpen(false)}
              className="mt-4 px-4 py-3 rounded-2xl bg-primary text-white text-sm font-medium text-center shadow-lg shadow-primary/20"
            >
              Let's Talk
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
