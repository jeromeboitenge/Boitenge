'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaRegEnvelope, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { analytics } from '@/lib/analytics';
import { buildBackendUrl } from '@/lib/backend-config';

interface ContactFormProps {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: ContactFormProps) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  // Auto-hide success/error message after 30 seconds
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
      // Send to both backend (for admin dashboard) and Formspree (for email)
      const [backendResponse, localResponse, emailResponse] = await Promise.allSettled([
        fetch(buildBackendUrl('/api/messages'), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
        fetch("/api/messages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }),
        fetch("https://formspree.io/f/mkgyjkll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        })
      ]);

      // Success if at least one succeeds
      const backendSuccess = backendResponse.status === 'fulfilled' && backendResponse.value.ok;
      const localSuccess = localResponse.status === 'fulfilled' && localResponse.value.ok;
      const emailSuccess = emailResponse.status === 'fulfilled' && emailResponse.value.ok;

      if (backendSuccess || localSuccess || emailSuccess) {
        setForm({ name: "", email: "", message: "" });
        setStatus("success");
        analytics.trackContactForm(); // Track contact form submission
        if (onSuccess) onSuccess();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  // Overlay for success/error messages
  if (status === "success" || status === "error") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex min-h-[350px] min-w-0 flex-col items-center justify-center rounded border border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900 sm:p-10"
      >
        {status === "success" ? (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
              <FaCheckCircle className="text-emerald-500 text-7xl mb-6 drop-shadow-md" />
            </motion.div>
            <p className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
              Message Sent!
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Thank you for reaching out. I'll get back to you shortly.
            </p>
          </>
        ) : (
          <>
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: 0.5 }}>
              <FaTimesCircle className="text-rose-500 text-7xl mb-6 drop-shadow-md" />
            </motion.div>
            <p className="text-2xl md:text-3xl font-display font-bold text-slate-900 dark:text-white mb-2">
              Oops! Delivery Failed
            </p>
            <p className="text-slate-600 dark:text-slate-400">
              Something went wrong. Please try again later.
            </p>
          </>
        )}
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 rounded border border-slate-300 px-6 py-3 font-medium text-slate-800 transition-colors hover:border-primary hover:text-primary dark:border-slate-700 dark:text-slate-100"
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
      viewport={{ once: true }}
      className="w-full min-w-0 rounded border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 sm:p-7 md:p-9"
    >
      {/* Top section */}
      <div className="flex flex-col items-start gap-2 mb-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded bg-primary/10">
            <FaRegEnvelope className="text-primary text-2xl" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white sm:text-2xl">Let's Connect</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Fill out the form and I'll get back to you within 24 hours.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
          <input
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="John Doe"
            className="w-full rounded border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Email Address</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="john@example.com"
            className="w-full rounded border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">Your Message</label>
          <textarea
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="How can I help you?"
            className="w-full resize-none rounded border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          ></textarea>
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex min-h-11 w-full items-center justify-center gap-3 rounded bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-70"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            <span className="animate-spin border-2 border-white/30 border-t-white rounded-full w-5 h-5"></span>
          ) : (
            "Send Message"
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
