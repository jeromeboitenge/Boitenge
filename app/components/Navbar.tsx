'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { useAuth } from './auth/AuthProvider';

const links = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/projects' },
  { name: 'Experience', href: '/experience' },
  { name: 'Docs', href: '/docs' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, isAuthenticated, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();


  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.user-menu-container')) {
        setShowUserMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Set active section based on current page
  useEffect(() => {
    if (pathname === '/') {
      setActiveSection('Home');
    } else if (pathname === '/about') {
      setActiveSection('About');
    } else if (pathname === '/skills') {
      setActiveSection('Skills');
    } else if (pathname === '/projects') {
      setActiveSection('Projects');
    } else if (pathname === '/experience') {
      setActiveSection('Experience');
    } else if (pathname === '/contact') {
      setActiveSection('Contact');
    } else if (pathname === '/docs') {
      setActiveSection('Docs');
    }
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await logout();
      setShowUserMenu(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

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
            <Link
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
            </Link>
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

          {/* Authentication Controls */}
          {isAuthenticated ? (
            <div className="relative user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 px-3 py-2 rounded-full bg-primary text-white hover:bg-primary-600 transition-colors shadow-lg shadow-primary/20"
              >
                <FaUser className="text-sm" />
                <span className="text-sm font-medium">{user?.name || 'Admin'}</span>
              </button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-1 z-50"
                  >
                    <Link
                      href="/admin"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <FaCog className="text-xs" />
                      <span>Admin Dashboard</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-left"
                    >
                      <FaSignOutAlt className="text-xs" />
                      <span>Sign Out</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link 
              href="/admin/login" 
              className="px-5 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary-600 transition-colors shadow-lg shadow-primary/20"
            >
              Sign In
            </Link>
          )}
          
          <Link href="/contact" className="px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            Let's Talk
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
          >
            {theme === 'dark' ? <FaSun className="text-amber-400" /> : <FaMoon />}
          </button>
          
          {/* Mobile Auth Button */}
          {isAuthenticated ? (
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-2 rounded-full bg-primary text-white"
            >
              <FaUser />
            </button>
          ) : (
            <Link 
              href="/admin/login" 
              className="p-2 rounded-full bg-primary text-white"
            >
              <FaUser />
            </Link>
          )}
          
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
              <Link
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
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            {isAuthenticated ? (
              <div className="pt-2 border-t border-slate-200 dark:border-slate-700 space-y-2">
                <div className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-white">
                  {user?.name || 'Admin'}
                </div>
                <Link
                  href="/admin"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 px-4 py-3 rounded-2xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <FaCog className="text-xs" />
                  <span>Admin Dashboard</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex items-center space-x-2 w-full px-4 py-3 rounded-2xl text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all text-left"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="mt-2 px-4 py-3 rounded-2xl bg-primary text-white text-sm font-medium text-center shadow-lg shadow-primary/20"
              >
                Sign In
              </Link>
            )}
            
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-medium text-center hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
            >
              Let's Talk
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile User Menu Dropdown (separate from main menu) */}
      <AnimatePresence>
        {showUserMenu && isAuthenticated && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-20 right-4 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50 md:hidden"
          >
            <div className="px-4 py-2 text-sm font-medium text-slate-900 dark:text-white border-b border-slate-200 dark:border-slate-700">
              {user?.name || 'Admin'}
            </div>
            <Link
              href="/admin"
              className="flex items-center space-x-2 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              onClick={() => setShowUserMenu(false)}
            >
              <FaCog className="text-xs" />
              <span>Admin Dashboard</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 text-left"
            >
              <FaSignOutAlt className="text-xs" />
              <span>Sign Out</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
