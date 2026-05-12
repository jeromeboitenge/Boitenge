'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaDownload, FaExpand, FaCompress } from 'react-icons/fa';
import { useState } from 'react';

interface CertificateViewerProps {
  isOpen: boolean;
  onClose: () => void;
  certificateName: string;
  certificateUrl?: string;
  issuer: string;
  issueDate: Date;
}

export default function CertificateViewer({
  isOpen,
  onClose,
  certificateName,
  certificateUrl,
  issuer,
  issueDate,
}: CertificateViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    if (certificateUrl) {
      const link = document.createElement('a');
      link.href = certificateUrl;
      link.download = `${certificateName.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className={`fixed z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden ${
              isFullscreen
                ? 'inset-4'
                : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] max-w-5xl max-h-[90vh]'
            }`}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {certificateName}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                  {issuer} • {issueDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {certificateUrl && (
                  <button
                    onClick={handleDownload}
                    className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    title="Download certificate"
                  >
                    <FaDownload />
                  </button>
                )}
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <FaCompress /> : <FaExpand />}
                </button>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  title="Close"
                >
                  <FaTimes />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="relative overflow-auto" style={{ height: isFullscreen ? 'calc(100% - 80px)' : '70vh' }}>
              {certificateUrl ? (
                <div className="flex items-center justify-center min-h-full bg-slate-100 dark:bg-slate-950 p-4">
                  {!imageLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  )}
                  <img
                    src={certificateUrl}
                    alt={certificateName}
                    onLoad={() => setImageLoaded(true)}
                    className={`max-w-full h-auto rounded-lg shadow-2xl transition-opacity duration-300 ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-20 h-20 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center mb-4">
                    <svg
                      className="w-10 h-10 text-slate-400 dark:text-slate-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Certificate Preview Not Available
                  </h4>
                  <p className="text-slate-600 dark:text-slate-400 max-w-md">
                    The certificate image is not available for preview. Please contact the administrator for more information.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
