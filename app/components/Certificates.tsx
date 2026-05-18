"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import type { Certificate } from "@/types/content";
import CertificateViewer from "./CertificateViewer";
import CertificateCard from "./CertificateCard";
import { FaAward, FaCertificate, FaGraduationCap } from "react-icons/fa";

const profile = {
  name: "Jerome Nzaramyimana",
  title: "Full-Stack Developer · System Analyst · Hardware & Software Maintainer",
  email: "jeromeboitenge@gmail.com",
  phone: "+250 782 433 539",
  location: "Kigali, Rwanda",
  github: "github.com/jeromeboitenge",
  portfolio: "boitenge.vercel.app",
  summary:
    "I am Jerome NZARAMYIMANA, a full-stack developer, frontend specialist, system analyst, and hardware/software maintainer based in Kigali, Rwanda. I build scalable, secure, and visually polished digital solutions while also providing practical hardware support and system analysis.",
};

const technicalSkills = [
  "React.js",
  "Next.js",
  "Tailwind CSS",
  "HTML5 & CSS3",
  "Node.js",
  "Express.js",
  "NestJS",
  "REST API Design",
  "MongoDB",
  "PostgreSQL",
  "AI/ML Fundamentals",
  "Git & GitHub",
  "TCP/IP",
  "Cybersecurity Fundamentals",
  "Hardware Maintenance",
];

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        setIsLoading(true);
        const data = await apiClient.getCertificates();
        setCertificates(data.sort((a, b) => a.order - b.order));
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load certificates');
        console.error('Error fetching certificates:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCertificates();
  }, []);
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-primary mx-auto mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading certificates...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-500 dark:text-red-400 text-lg font-semibold">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-6">
            <FaGraduationCap className="text-primary" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              Professional Credentials
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
            Certifications & 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-600 to-pink-600">
              {" "}Credentials
            </span>
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Verified professional certifications and technical credentials demonstrating expertise across various technologies and platforms.
          </p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <FaCertificate className="text-2xl text-primary" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{certificates.length}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Total Certificates</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{certificates.length}</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Verified</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 dark:bg-purple-900/20 flex items-center justify-center">
                <FaAward className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {new Set(certificates.map(c => c.issuer)).size}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Organizations</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Certificates Grid */}
        {certificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700"
          >
            <FaCertificate className="text-6xl text-slate-300 dark:text-slate-700 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Certificates Yet</h3>
            <p className="text-slate-600 dark:text-slate-400">Certificates will appear here once added</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, idx) => (
              <CertificateCard
                key={cert.id}
                certificate={cert}
                index={idx}
                onView={setSelectedCertificate}
              />
            ))}
          </div>
        )}
      </div>

      {/* Certificate Viewer Modal */}
      {selectedCertificate && (
        <CertificateViewer
          isOpen={!!selectedCertificate}
          onClose={() => setSelectedCertificate(null)}
          certificateName={selectedCertificate.name}
          certificateUrl={selectedCertificate.imageUrl || selectedCertificate.credentialUrl}
          issuer={selectedCertificate.issuer}
          issueDate={selectedCertificate.issueDate}
        />
      )}
    </div>
  );
}
