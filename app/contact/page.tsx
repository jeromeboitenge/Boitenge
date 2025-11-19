'use client';

import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';

import {
  FaWhatsapp,
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaTwitter
} from 'react-icons/fa';

export default function Contact() {

  // Toast Example Trigger
  const showToast = () => {
    toast.success("Message Sent Successfully!", {
      style: {
        background: "#1d1d1d",
        color: "white",
      },
    });
  };

  return (
    <section id="contact" className="max-w-7xl mx-auto py-24 px-4 md:px-8">

      <Toaster position="top-right" />

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl md:text-5xl font-extrabold text-center mb-16 
                   text-darkText dark:text-white"
      >
        Contact <span className="text-primary">Me</span>
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-16">

        {/* LEFT — Card */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="
            bg-white dark:bg-[#1a1a1a]
            border border-gray-200 dark:border-gray-700
            shadow-lg rounded-2xl p-8
            flex flex-col gap-6
          "
        >
          <h3 className="text-3xl font-semibold text-darkText dark:text-white">
            Let’s Talk
          </h3>

          <p className="text-lg leading-relaxed text-gray-700 dark:text-white">
     Feel free to reach out for collaborations, projects, or opportunities. 
     I’ll respond as soon as possible.
          </p>

          {/* Contact List */}
          <div className="flex flex-col gap-5 mt-4">

            {[
              {
                icon: <FaEnvelope className="text-3xl text-primary" />,
                label: "jeromeboitenge@gmail.com",
                href: "mailto:jeromeboitenge@gmail.com"
              },
              {
                icon: <FaWhatsapp className="text-3xl text-green-500" />,
                label: "0782 433 539",
                href: "https://wa.me/250782433539"
              },
              {
                icon: <FaLinkedin className="text-3xl text-blue-600" />,
                label: "LinkedIn",
                href: "https://www.linkedin.com/in/nzaramyimana-jerome-961714391"
              },
              {
                icon: <FaGithub className="text-3xl dark:text-white" />,
                label: "GitHub",
                href: "https://github.com/jeromeboitenge"
              },
              {
                icon: <FaTwitter className="text-3xl text-blue-400" />,
                label: "Twitter",
                href: "https://twitter.com/jeromeboitenge"
              },
            ].map((item, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.03 }}
                className="
                  group flex items-center gap-4 
                  px-5 py-4 
                  rounded-xl 
                  bg-gray-100 dark:bg-[#2a2a2a]
                  border border-gray-200 dark:border-gray-600
                  shadow-sm hover:shadow-md
                  transition
                "
                href={item.href}
                target="_blank"
              >
                {item.icon}
                <span className="
                  text-lg transition
                  text-darkText dark:text-white
                  group-hover:text-primary
                ">
                  {item.label}
                </span>
              </motion.a>
            ))}

          </div>
        </motion.div>

        {/* RIGHT — Contact Form with Toast */}
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
