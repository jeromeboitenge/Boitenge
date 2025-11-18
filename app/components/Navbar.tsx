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
        <Link href="/" className="text-2xl font-bold text-primary">
          Jerome Boitenge
        </Link>

        <div className="hidden md:flex space-x-6 items-center">
          {links.map((link) => (
            <Link key={link.name} href={link.href} className="hover:text-primary">
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="ml-4 text-xl"
          >
            {theme === 'dark' ? <FaSun /> : <FaMoon />}
          </button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>Menu</button>
          {isOpen && (
            <div className="absolute right-4 mt-2 bg-lightBg dark:bg-darkText p-4 rounded shadow-lg flex flex-col space-y-2">
              {links.map((link) => (
                <Link key={link.name} href={link.href} onClick={() => setIsOpen(false)}>
                  {link.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
