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

      <div className="grid min-w-0 grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">

        {/* LEFT: Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6 rounded border border-gray-200 bg-white p-5 dark:border-gray-700 dark:bg-[#1a1a1a] sm:p-7"
        >
          <h3 className="text-3xl font-semibold text-slate-900 dark:text-white">Let’s Talk Via</h3>

          {/* Contact Links */}
          <div className="flex flex-col gap-5 mt-4">
            {contacts.map((item, i) => (
              <div
                key={i}
                className="group flex min-w-0 items-center gap-3 rounded border border-gray-200 bg-gray-100 px-4 py-4 transition-colors hover:border-primary/40 dark:border-gray-600 dark:bg-[#2a2a2a] sm:gap-4 sm:px-5"
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
                <span className="min-w-0 flex-1 break-words text-sm text-slate-900 transition group-hover:text-primary dark:text-white sm:text-base">
                  {item.label}
                </span>
                {item.copyValue && (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      copyToClipboard(item.copyValue as string, item.key);
                    }}
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded text-slate-400 transition-colors hover:bg-slate-200 hover:text-primary dark:hover:bg-slate-700"
                    aria-label={`Copy ${item.label}`}
                    title="Copy"
                  >
                    {copied === item.key ? <FaCheck className="text-green-500" /> : <FaCopy />}
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="mt-2 rounded border border-primary/15 bg-primary/5 p-4 text-sm text-slate-600 dark:bg-primary/10 dark:text-slate-300">
            Prefer email or WhatsApp for the fastest response. I look forward to hearing about
            your project!
          </div>
        </motion.div>

        {/* RIGHT: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="min-w-0"
        >
          <ContactForm onSuccess={showToast} />
        </motion.div>

      </div>
    </section>
  );
}