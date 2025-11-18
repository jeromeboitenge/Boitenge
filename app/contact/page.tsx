'use client';
import ContactForm from '../components/ContactForm';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaLinkedin, FaGithub, FaTwitter } from 'react-icons/fa';

export default function Contact() {
  return (
    <section className="max-w-7xl mx-auto py-20 px-4 md:px-8">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold text-center mb-12"
      >
        Contact Me
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-start gap-6"
        >
          <h3 className="text-2xl font-semibold">Get in Touch</h3>
          <p className="text-gray-700 dark:text-gray-300">
            I’m always open to discussing new projects, opportunities, or collaborations.  
            You can reach me via email, WhatsApp, or through social media.
          </p>

          <div className="flex flex-col gap-3">
            <a href="mailto:jeromeboitenge@gmail.com" className="flex items-center gap-3 hover:text-primary transition">
              <FaEnvelope /> jeromeboitenge@gmail.com
            </a>
            <a href="https://wa.me/250788XXXXXX" target="_blank" className="flex items-center gap-3 hover:text-primary transition">
              <FaWhatsapp /> WhatsApp
            </a>
            <a href="https://www.linkedin.com/in/jeromeboitenge/" target="_blank" className="flex items-center gap-3 hover:text-primary transition">
              <FaLinkedin /> LinkedIn
            </a>
            <a href="https://github.com/jeromeboitenge" target="_blank" className="flex items-center gap-3 hover:text-primary transition">
              <FaGithub /> GitHub
            </a>
            <a href="https://twitter.com/jeromeboitenge" target="_blank" className="flex items-center gap-3 hover:text-primary transition">
              <FaTwitter /> Twitter
            </a>
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ContactForm />
        </motion.div>
      </div>
    </section>
  );
}
