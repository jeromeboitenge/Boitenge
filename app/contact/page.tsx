'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Define props interface
interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Auto-hide messages after 30 seconds
  useEffect(() => {
    if (status === "success" || status === "error") {
      const timer = setTimeout(() => setStatus("idle"), 30000);
      return () => clearTimeout(timer);
    }
  }, [status]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("https://formspree.io/f/mkgyjkll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        setForm({ name: "", email: "", message: "" });
        setStatus("success");
        if (onSuccess) onSuccess(); // call the callback if provided
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  if (status === "success" || status === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center bg-white dark:bg-[#1b1b1b] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 text-center min-h-[300px]"
      >
        {status === "success" ? (
          <>
            <FaCheckCircle className="text-green-500 text-6xl mb-4" />
            <p className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
              Your message was sent successfully!
            </p>
          </>
        ) : (
          <>
            <FaTimesCircle className="text-red-500 text-6xl mb-4" />
            <p className="text-3xl md:text-4xl font-bold text-red-600 dark:text-red-400">
              Oops! Something went wrong.
            </p>
          </>
        )}
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-xl hover:opacity-90 transition-all"
        >
          Send Another Message
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-white dark:bg-[#1b1b1b] p-8 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
    >
      {/* Top section */}
      <div className="flex flex-col items-start gap-2 mb-6">
        <div className="flex items-center gap-4">
          <FaRegEnvelope className="text-primary text-4xl" />
          <h3 className="text-2xl font-semibold dark:text-white">Send a Message</h3>
        </div>
        <p className="text-sm text-gray-700 dark:text-white opacity-60 ml-[52px]">
          We’ll respond to you as soon as possible
        </p>
      </div>

      {/* Name */}
      <label className="text-lg font-medium dark:text-gray-300">Name</label>
      <input
        type="text"
        required
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Enter your name"
        className="w-full mt-2 mb-5 p-3 rounded-xl text-lg bg-gray-100 dark:bg-[#2b2b2b] text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Email */}
      <label className="text-lg font-medium dark:text-gray-300">Email</label>
      <input
        type="email"
        required
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Enter your email"
        className="w-full mt-2 mb-5 p-3 rounded-xl text-lg bg-gray-100 dark:bg-[#2b2b2b] text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      />

      {/* Message */}
      <label className="text-lg font-medium dark:text-gray-300">Message</label>
      <textarea
        required
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        placeholder="Write your message..."
        className="w-full mt-2 mb-5 p-3 rounded-xl text-lg bg-gray-100 dark:bg-[#2b2b2b] text-black dark:text-white border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary"
      ></textarea>

      {/* Submit Button with Loader */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full mt-4 p-3 text-lg font-semibold bg-primary text-white rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-3"
        disabled={status === "sending"}
      >
        {status === "sending" && (
          <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5"></span>
        )}
        Send Message
      </motion.button>
    </motion.form>
  );
}
