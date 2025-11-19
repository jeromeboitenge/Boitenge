'use client';

import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm"; 
import toast, { Toaster } from "react-hot-toast";
import {
  FaWhatsapp,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaFacebook,
} from "react-icons/fa";

export default function ContactPage() {
  // Toast for success
  const showToast = () => {
    toast.success("Message Sent Successfully!", {
      style: { background: "#1d1d1d", color: "white" },
    });
  };

  // Social contact links
  const contacts = [
    {
      icon: <FaEnvelope />,
      label: "jeromeboitenge@gmail.com",
      href: "mailto:jeromeboitenge@gmail.com",
      color: "text-primary",
    },
    {
      icon: <FaWhatsapp />,
      label: "0782 433 539",
      href: "https://wa.me/250782433539",
      color: "text-green-500",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/nzaramyimana-jerome-961714391",
      color: "text-blue-600",
    },
    {
      icon: <FaGithub />,
      label: "GitHub",
      href: "https://github.com/jeromeboitenge",
      color: "text-gray-800 dark:text-white",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      href: "https://twitter.com/jeromeboitenge",
      color: "text-blue-400",
    },
    {
      icon: <FaFacebook />,
      label: "Facebook",
      href: "https://www.facebook.com/jeromeboitenge", // replace with your actual FB link
      color: "text-blue-700",
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
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 text-darkText dark:text-white"
      >
        Contact <span className="text-primary">Me</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-16">

        {/* LEFT: Contact Info Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 shadow-lg rounded-2xl p-8 flex flex-col gap-6"
        >
          <h3 className="text-3xl font-semibold text-darkText dark:text-white">Let’s Talk Via</h3>
         

          {/* Contact Links */}
          <div className="flex flex-col gap-5 mt-4">
            {contacts.map((item, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.05 }}
                className={`
                  group flex items-center gap-4 px-5 py-4 rounded-xl
                  bg-gray-100 dark:bg-[#2a2a2a]
                  border border-gray-200 dark:border-gray-600
                  shadow-sm hover:shadow-md
                  transition
                `}
                href={item.href}
                target="_blank"
              >
                <span className={`${item.color} text-3xl`}>{item.icon}</span>
                <span className="text-lg text-darkText dark:text-white transition group-hover:text-primary">
                  {item.label}
                </span>
              </motion.a>
            ))}
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
