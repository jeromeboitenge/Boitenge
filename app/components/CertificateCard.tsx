'use client';

import { motion } from 'framer-motion';
import { FaAward, FaCalendar, FaEye, FaExternalLinkAlt } from 'react-icons/fa';
import type { Certificate } from '@/types/content';

interface CertificateCardProps {
  certificate: Certificate;
  index: number;
  onView: (certificate: Certificate) => void;
}

export default function CertificateCard({ certificate, index, onView }: CertificateCardProps) {
  // Check if the URL is a PDF
  const isPDF = certificate.imageUrl?.toLowerCase().endsWith('.pdf');
  const isImage = certificate.imageUrl && !isPDF;
  
  // Convert Cloudinary PDF to image thumbnail (first page)
  const getThumbnailUrl = (url: string | undefined) => {
    if (!url) return null;
    if (!url.includes('cloudinary.com') || !isPDF) return url;
    
    // Transform Cloudinary PDF URL to show first page as image
    // Example: /upload/v123/file.pdf -> /upload/f_jpg,pg_1/v123/file.pdf
    return url.replace('/upload/', '/upload/f_jpg,pg_1,w_800,q_auto/');
  };
  
  const thumbnailUrl = getThumbnailUrl(certificate.imageUrl);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg hover:shadow-2xl hover:border-primary/50 transition-all duration-300"
    >
      {/* Certificate Image */}
      <div className="relative h-56 bg-gradient-to-br from-primary/10 via-purple-50 to-pink-50 dark:from-primary/20 dark:via-purple-900/20 dark:to-pink-900/20 overflow-hidden">
        {thumbnailUrl ? (
          <>
            <img
              src={thumbnailUrl}
              alt={certificate.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => {
                console.error('Failed to load certificate thumbnail:', thumbnailUrl);
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  const fallback = parent.querySelector('.fallback-icon');
                  if (fallback) {
                    (fallback as HTMLElement).style.display = 'flex';
                  }
                }
              }}
            />
            <div className="fallback-icon absolute inset-0 hidden flex-col items-center justify-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                <svg className="w-20 h-20 text-primary relative z-10" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">PDF Certificate</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {isPDF && (
              <div className="absolute top-4 left-4 bg-primary/90 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                </svg>
                PDF
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <FaAward className="text-6xl text-primary/30" />
          </div>
        )}
        
        {/* View Button Overlay */}
        <button
          onClick={() => onView(certificate)}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <div className="bg-white dark:bg-slate-900 rounded-full p-4 shadow-2xl transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <FaEye className="text-2xl text-primary" />
          </div>
        </button>

        {/* Verified Badge */}
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Verified
        </div>
      </div>

      {/* Certificate Content */}
      <div className="p-6">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {certificate.name}
          </h3>
          <div className="flex items-center gap-2 text-sm mb-3">
            <div className="flex items-center gap-1 text-primary font-semibold">
              <FaAward className="text-xs" />
              {certificate.issuer}
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
          {certificate.description || `Professional certification in ${certificate.name} issued by ${certificate.issuer}.`}
        </p>

        {/* Skills Tags */}
        {certificate.skills && certificate.skills.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-4">
            {certificate.skills.slice(0, 3).map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
            {certificate.skills.length > 3 && (
              <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-semibold">
                +{certificate.skills.length - 3}
              </span>
            )}
          </div>
        ) : (
          <div className="mb-4 h-8"></div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <FaCalendar />
            {certificate.issueDate.toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'short' 
            })}
          </div>
        </div>

        {/* Credential ID */}
        {certificate.credentialId && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              ID: <span className="font-mono">{certificate.credentialId}</span>
            </p>
          </div>
        )}
      </div>
    </motion.div>
  );
}
