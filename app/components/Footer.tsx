"use client"; 

import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa'; 
import Link from 'next/link';

const scrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
};

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const primaryColor = 'text-primary'; 

  return (
    <footer className="relative bg-light dark:bg-[#1A1A1A] border-t border-gray-200 dark:border-gray-800 pt-12 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* === GRID COLUMNS === */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-200 dark:border-gray-800 pb-10">
          
          {/* === ABOUT === */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-2 text-xl font-bold">
              <span className="text-accent text-3xl">⚡</span>
              <span className="text-gray-900 dark:text-white">Jerome Boitenge</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 max-w-xs">
              Passionate software developer crafting digital solutions that make a difference. Let's build something amazing together.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="https://twitter.com/jeromeboitenge" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="https://linkedin.com/in/jeromeboitenge" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition-colors">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com/jeromeboitenge" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition-colors">
                <FaGithub size={20} />
              </a>
            </div>
          </div>

          {/* === QUICK LINKS === */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
              <li><Link href="/skills" className="hover:text-primary transition-colors">Skills</Link></li>
              <li><Link href="/experience" className="hover:text-primary transition-colors">Experience</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition-colors">Projects</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* === SERVICES === */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Services</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>DevOps Engineering & Automation</li>
              <li>Web Development & Design</li>
              <li>Backend Development & APIs</li>
              <li>Database Administration & Management</li>
            </ul>
          </div>

          {/* === CONTACT INFO === */}
          <div className="space-y-4">
            <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Get In Touch</h4>
            <div className="space-y-3">

              {/* Email */}
              <div className="flex items-center space-x-3">
                <Mail size={20} className={primaryColor} />
                <a 
                  href="mailto:jeromeboitenge@gmail.com" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  jeromeboitenge@gmail.com
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-center space-x-3">
                <Phone size={20} className={primaryColor} />
                <a 
                  href="tel:+250782433539" 
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  +250 782 433 539
                </a>
              </div>

              {/* Location with Google Map link */}
              <div className="flex items-center space-x-3">
                <MapPin size={20} className={primaryColor} />
                <a 
                  href="https://maps.app.goo.gl/Pm6nVE3Qb2LzXCng8" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Kigali, Rwanda
                </a>
              </div>

              {/* NEW: Small low-visibility message */}
              <p className="text-xs text-gray-500 dark:text-gray-500 opacity-70 pl-7">
                We’ll respond to you as soon as possible
              </p>

            </div>
          </div>
        </div>

        {/* === COPYRIGHT === */}
        <div className="flex justify-between items-center py-6 text-xs text-gray-500 dark:text-gray-500">
          <p className="flex flex-col">
            <span>© {currentYear} Jerome Boitenge. All rights reserved.</span>
            <span className="mt-1">Crafted with passion and precision</span>
          </p>
        </div>
      </div>

      {/* === SCROLL TO TOP BUTTON === */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-accent hover:bg-primary text-white shadow-lg transition-colors z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
}
