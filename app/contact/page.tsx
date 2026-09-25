'use client';

import { motion } from "framer-motion";
import { useState } from "react";
import ContactForm from "../components/ContactForm"; 
import toast, { Toaster } from "react-hot-toast";
import {
  FaWhatsapp,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaCopy,
  FaCheck,
  FaClock,
} from "react-icons/fa";

const EMAIL = "jeromeboitenge@gmail.com";
const PHONE_DISPLAY = "0782 433 539";
const PHONE_RAW = "250782433539";

export default function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const showToast = () => {
    toast.success("Message Sent Successfully!", {
      style: { background: "#1d1d1d", color: "white" },
    });
  };

  const copyToClipboard = async (value: string, key: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(key);
      toast.success("Copied to clipboard!", {
        style: { background: "#1d1d1d", color: "white" },
      });
      setTimeout(() => setCopied(null), 2000);
    } catch {
      toast.error("Could not copy. Please copy manually.");
    }
  };

  interface ContactItem {
    key: string;
    icon: JSX.Element;
    label: string;
    href: string;
    color: string;
    copyValue?: string;
  }

  // Social contact links
  const contacts: ContactItem[] = [
    {
      key: "email",
      icon: <FaEnvelope />,
      label: EMAIL,
      href: `mailto:${EMAIL}`,
      color: "text-primary",
      copyValue: EMAIL,
    },
    {
      key: "phone",
      icon: <FaWhatsapp />,
      label: PHONE_DISPLAY,
      href: `https://wa.me/${PHONE_RAW}`,
      color: "text-green-500",
      copyValue: PHONE_DISPLAY,
    },
    {
      key: "linkedin",
      icon: <FaLinkedin />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/jerome-aldrin-463b4a411?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      color: "text-blue-600",
    },
    {
      key: "github",
      icon: <FaGithub />,
      label: "GitHub",
      href: "https://github.com/jeromeboitenge",
      color: "text-gray-800 dark:text-white",
    },
    {
      key: "twitter",
      icon: <FaTwitter />,
      label: "Twitter",
      href: "https://twitter.com/jeromeboitenge",
      color: "text-blue-400",
    },
  ];

  return (
    <section id="contact" className="max-w-7xl mx-auto py-24 px-4 md:px-8">
      <Toaster position="top-right" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-6 text-darkText dark:text-white"
      >
        Contact <span className="text-primary">Me</span>
      </motion.h2>

      {/* Availability + response-time banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="max-w-3xl mx-auto mb-12 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6"
      >
        <span className="inline-flex items-center gap-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-300 dark:border-emerald-500/30 px-5 py-2.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          Currently available for new projects
        </span>
        <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300">
          <FaClock className="text-primary" />
          I usually reply within 24 hours
        </span>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16">

        {/* LEFT: Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8 flex flex-col gap-6"
        >
          <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">Let’s Talk Via</h3>

          {/* Contact Links */}
          <div className="flex flex-col gap-5 mt-4">
            {contacts.map((item, i) => (
              <div
                key={i}
                className="group flex items-center gap-4 px-5 py-4 rounded-xl bg-gray-100 dark:bg-[#2a2a2a] border border-gray-200 dark:border-gray-600 shadow-sm hover:shadow-md transition"
              >
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${item.color} text-3xl flex-shrink-0`}
                  aria-label={item.label}
                >
                  {item.icon}
                </a>
                <span className="flex-1 text-lg text-slate-900 dark:text-white transition group-hover:text-primary">
                  {item.label}
                </span>
                {item.copyValue && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(item.copyValue, item.key);
                    }}
                    className="p-2 rounded-lg text-slate-400 hover:text-primary hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                    aria-label={`Copy ${item.label}`}
                    title="Copy"
                  >
                    {copied === item.key ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 rounded-xl bg-primary/5 dark:bg-primary/10 border border-primary/20 p-4 text-sm text-slate-600 dark:text-slate-300">
            Prefer email or WhatsApp for the fastest response. I look forward to hearing about
            your project!
          </div>
        </motion.div>

        {/* RIGHT: Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <ContactForm onSuccess={showToast} />
        </motion.div>

      </div>
    </section>
  );
}