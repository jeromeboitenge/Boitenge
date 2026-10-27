'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes, FaUser, FaSignOutAlt, FaCog, FaCamera } from 'react-icons/fa';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from './auth/AuthProvider';

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
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();
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
      router.push('/');
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
        'fixed inset-x-0 top-0 z-50 border-b transition-all duration-300',
        scrolled
          ? 'border-slate-200 bg-lightBg/95 py-2 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-darkBg/95'
          : 'border-transparent bg-lightBg/80 py-3 backdrop-blur-sm dark:bg-darkBg/75'
      )}
    >
      <div className="site-container flex items-center justify-between gap-4 max-[320px]:gap-2">
        <Link href="/" className="flex shrink-0 items-center gap-3 text-slate-950 dark:text-white max-[320px]:gap-0">
          <span className="flex h-9 w-9 items-center justify-center rounded bg-primary font-display text-sm font-bold text-white max-[320px]:h-8 max-[320px]:w-8">JB</span>
          <span className="font-display text-base font-bold">Jerome</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-1 min-[900px]:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={clsx(
                'rounded px-3 py-2 text-[13px] font-medium transition-colors',
                activeSection.toLowerCase() === link.name.toLowerCase()
                  ? 'text-primary'
                  : 'text-slate-600 hover:bg-white/70 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden items-center space-x-4 min-[900px]:flex">
          {/* Dark Mode Button */}
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-600 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-300"
            aria-label="Toggle color theme"
            title="Toggle color theme"
          >
            {theme === 'dark' ? <FaSun className="text-amber-400" /> : <FaMoon />}
          </button>

          {/* Authentication Controls */}
          {isAuthenticated ? (
            <div className="relative user-menu-container">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 rounded bg-primary px-3 py-2 text-white transition-colors hover:bg-primary-700"
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
                    className="absolute right-0 z-50 mt-2 w-48 rounded border border-slate-200 bg-white py-1 shadow-sm dark:border-slate-700 dark:bg-slate-800"
                  >
                    <Link
                      href="/admin"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <FaCog className="text-xs" />
                      <span>Admin Dashboard</span>
                    </Link>
                    <Link
                      href="/admin/profile"
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <FaCamera className="text-xs" />
                      <span>Edit Profile Photo</span>
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
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white transition-colors hover:bg-primary-700"
              aria-label="Owner sign in"
              title="Owner sign in"
            >
              <FaUser aria-hidden="true" />
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 max-[320px]:gap-1 min-[900px]:hidden">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-600 dark:border-slate-700 dark:text-slate-300 max-[320px]:h-8 max-[320px]:w-8"
            aria-label="Toggle color theme"
            title="Toggle color theme"
          >
            {theme === 'dark' ? <FaSun className="text-amber-400" /> : <FaMoon />}
          </button>
          
          {/* Mobile Auth Button */}
          {isAuthenticated ? (
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex h-10 w-10 items-center justify-center rounded bg-primary text-white max-[320px]:hidden"
              aria-label="Open account menu"
            >
              <FaUser />
            </button>
          ) : (
            <Link 
              href="/admin/login" 
              className="flex h-10 w-10 items-center justify-center rounded bg-primary text-white max-[320px]:hidden"
              aria-label="Sign in"
            >
              <FaUser />
            </Link>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 text-slate-800 dark:border-slate-700 dark:text-slate-100 max-[320px]:h-9 max-[320px]:w-9"
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
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
            className="absolute left-4 right-4 top-16 flex max-h-[calc(100dvh-5rem)] flex-col gap-1 overflow-y-auto rounded border border-slate-200 bg-lightBg p-3 shadow-sm dark:border-slate-700 dark:bg-darkBg max-[320px]:left-2 max-[320px]:right-2 max-[320px]:p-2 min-[900px]:hidden"
          >
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={clsx(
                  'min-h-11 rounded px-4 py-3 text-sm font-medium transition-colors',
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
                  className="flex items-center space-x-2 rounded px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <FaCog className="text-xs" />
                  <span>Admin Dashboard</span>
                </Link>
                <Link
                  href="/admin/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center space-x-2 rounded px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <FaCamera className="text-xs" />
                  <span>Edit Profile Photo</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center space-x-2 rounded px-4 py-3 text-left text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <FaSignOutAlt className="text-xs" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                href="/admin/login"
                onClick={() => setIsOpen(false)}
                className="mt-2 rounded bg-primary px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Sign In
              </Link>
            )}
            
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="min-h-11 rounded border border-primary px-4 py-3 text-center text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
            >
              Contact
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
            className="absolute right-4 top-20 z-50 w-48 rounded border border-slate-200 bg-white py-2 shadow-sm dark:border-slate-700 dark:bg-slate-800 min-[900px]:hidden"
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
            <Link
              href="/admin/profile"
              className="flex items-center space-x-2 px-4 py-3 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              onClick={() => setShowUserMenu(false)}
            >
              <FaCamera className="text-xs" />
              <span>Edit Profile Photo</span>
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
