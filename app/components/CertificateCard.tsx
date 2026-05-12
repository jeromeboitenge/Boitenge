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
        {certificate.imageUrl ? (
          <>
            <img
              src={certificate.imageUrl}
              alt={certificate.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
          
          <button
            onClick={() => onView(certificate)}
            className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            View Certificate
            <FaExternalLinkAlt className="text-xs" />
          </button>
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
