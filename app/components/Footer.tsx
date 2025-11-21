"use client";

import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import Link from "next/link";

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
  const primaryColor = "text-primary";

  return (
    <footer className="relative bg-lightBg dark:bg-[#111] border-t border-gray-200 dark:border-gray-800 pt-16 mt-16 font-poppins">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 border-b border-gray-200 dark:border-gray-700 pb-12">

          {/* ABOUT */}
          <div className="space-y-4 col-span-2 sm:col-span-1">
            <div className="flex items-center space-x-2 text-2xl font-bold">
              <span className="text-accent text-4xl">⚡</span>
              <span className="text-darkText dark:text-white">Jerome Boitenge</span>
            </div>

            <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed max-w-xs">
              Passionate software developer crafting digital solutions that make a difference. 
              Let's build something amazing together.
            </p>

            {/* Social icons */}
            <div className="flex space-x-3 pt-2">
              <a
                href="https://twitter.com/jeromeboitenge"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition"
              >
                <FaTwitter size={22} />
              </a>

              <a
                href="https://linkedin.com/in/jeromeboitenge"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-blue-700 hover:bg-blue-800 text-white transition"
              >
                <FaLinkedin size={22} />
              </a>

              <a
                href="https://github.com/jeromeboitenge"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-white transition"
              >
                <FaGithub size={22} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-darkText dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-base text-gray-600 dark:text-gray-400">
              <li><Link href="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link href="/skills" className="hover:text-primary transition">Skills</Link></li>
              <li><Link href="/experience" className="hover:text-primary transition">Experience</Link></li>
              <li><Link href="/projects" className="hover:text-primary transition">Projects</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          {/* SERVICES */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-darkText dark:text-white">Services</h4>
            <ul className="space-y-2 text-base text-gray-600 dark:text-gray-400">
              <li>Web Development & Design</li>
              <li>Backend Development & APIs</li>
              <li>Database Administration & Management</li>
              <li>Hardware and software mantainance & repairing</li>
            </ul>
          </div>

          {/* CONTACT INFO */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-darkText dark:text-white">Get In Touch</h4>
            <div className="space-y-3">

              <div className="flex items-center space-x-3">
                <Mail size={22} className={primaryColor} />
                <a
                  href="mailto:jeromeboitenge@gmail.com"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  jeromeboitenge@gmail.com
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <Phone size={22} className={primaryColor} />
                <a
                  href="tel:+250782433539"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  +250 782 433 539
                </a>
              </div>

              <div className="flex items-center space-x-3">
                <MapPin size={22} className={primaryColor} />
                <a
                  href="https://maps.app.goo.gl/Pm6nVE3Qb2LzXCng8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-primary"
                >
                  Kigali, Rwanda
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="flex justify-between items-center py-8 text-sm text-gray-500 dark:text-gray-400">
          <p className="flex flex-col">
            <span>© {currentYear} Jerome Boitenge. All rights reserved.</span>
            <span className="mt-1">Crafted with passion and precision</span>
          </p>
        </div>
      </div>

      {/* SCROLL TO TOP */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="
          fixed bottom-6 right-6
          p-3 rounded-full 
          bg-gradient-to-r from-accent to-primary
          text-white shadow-lg
          hover:shadow-primary/40 hover:scale-110
          transition-all duration-300
          dark:shadow-accent/20
          z-40
        "
      >
        <ArrowUp size={22} />
      </button>
    </footer>
  );
}
