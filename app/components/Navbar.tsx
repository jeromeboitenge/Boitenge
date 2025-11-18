'use client';
import Link from 'next/link';
import { useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed w-full z-50 bg-lightBg dark:bg-darkText shadow-md"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        <Link
          href="/"
          className="text-2xl font-bold text-primary dark:text-accent transition"
        >
          Jerome Boitenge
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-darkText dark:text-lightBg hover:text-primary dark:hover:text-accent transition"
            >
              {link.name}
            </Link>
          ))}

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-4 text-xl text-darkText dark:text-lightBg transition"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-darkText dark:text-lightBg text-lg"
          >
            Menu
          </button>

          {isOpen && (
            <div className="absolute right-4 mt-3 bg-lightBg dark:bg-darkText p-4 rounded-lg shadow-lg flex flex-col space-y-4">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-darkText dark:text-lightBg hover:text-primary dark:hover:text-accent transition"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              {/* Dark Mode Toggle in Mobile */}
              <button
                onClick={() => {
                  setTheme(theme === 'dark' ? 'light' : 'dark');
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 text-darkText dark:text-lightBg"
              >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
                <span>Toggle Theme</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
