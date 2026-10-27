"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaCertificate, FaGraduationCap } from "react-icons/fa";
import { PORTFOLIO_DATA_UPDATED_EVENT, unifiedApiClient } from "@/lib/unified-api-client";
import type { Certificate } from "@/types/content";
import CertificateViewer from "./CertificateViewer";
import CertificateCard from "./CertificateCard";

export default function Certificates() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCertificates = async (showLoading: boolean) => {
      try {
        if (showLoading) setIsLoading(true);
        const data = await unifiedApiClient.getCertificates();
        if (!isMounted) return;
        setCertificates(data.sort((a, b) => a.order - b.order));
        setError(null);
      } catch (err) {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Failed to load certificates");
        console.error("Error fetching certificates:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    const refreshCertificates = () => void fetchCertificates(false);
    void fetchCertificates(true);
    window.addEventListener(PORTFOLIO_DATA_UPDATED_EVENT, refreshCertificates);

    return () => {
      isMounted = false;
      window.removeEventListener(PORTFOLIO_DATA_UPDATED_EVENT, refreshCertificates);
    };
  }, []);

  return (
    <section aria-labelledby="certifications-heading" className="site-section">
      <div className="site-container">
        <motion.header
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4 }}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2">
            <FaGraduationCap className="text-primary" aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">
              Learning &amp; credentials
            </span>
          </div>
          <h2
            id="certifications-heading"
            className="font-display text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl"
          >
            Certifications &amp; credentials
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-400">
            Credentials and training records shared in my portfolio. Open a card to view its certificate.
          </p>
        </motion.header>

        {isLoading ? (
          <div className="flex min-h-48 items-center justify-center gap-3 text-sm text-slate-500 dark:text-slate-400" role="status">
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-r-transparent" />
            Loading certificates
          </div>
        ) : error ? (
          <p className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700 dark:border-red-900/60 dark:bg-red-950/30 dark:text-red-300" role="alert">
            {error}
          </p>
        ) : certificates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-14 text-center dark:border-slate-700 dark:bg-slate-900">
            <FaCertificate className="mx-auto mb-4 text-4xl text-slate-300 dark:text-slate-700" aria-hidden="true" />
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              No credentials to show yet
            </h3>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate, index) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                index={index}
                onView={setSelectedCertificate}
              />
            ))}
          </div>
        )}
      </div>

      {selectedCertificate && (
        <CertificateViewer
          isOpen
          onClose={() => setSelectedCertificate(null)}
          certificateName={selectedCertificate.name}
          certificateUrl={selectedCertificate.imageUrl || selectedCertificate.credentialUrl}
          issuer={selectedCertificate.issuer}
          issueDate={selectedCertificate.issueDate}
        />
      )}
    </section>
  );
}
