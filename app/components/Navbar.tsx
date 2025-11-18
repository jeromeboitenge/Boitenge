'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

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

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed w-full z-50 bg-lightBg dark:bg-darkBg shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          Jerome Boitenge
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`px-3 py-2 rounded-md transition 
                ${activeSection.toLowerCase() === link.name.toLowerCase()
                  ? 'bg-primary text-white'
                  : 'hover:text-primary'
                }
              `}
            >
              {link.name}
            </a>
          ))}

          {/* Dark Mode Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-4 text-xl"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="absolute right-4 top-16 bg-lightBg dark:bg-darkBg p-4 rounded shadow-lg flex flex-col space-y-2 md:hidden">
            {links.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`px-3 py-2 rounded-md transition 
                  ${activeSection.toLowerCase() === link.name.toLowerCase()
                    ? 'bg-primary text-white'
                    : ''
                  }
                `}
              >
                {link.name}
              </a>
            ))}

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="text-xl mt-2"
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        )}
      </div>
    </motion.nav>
  );
}
