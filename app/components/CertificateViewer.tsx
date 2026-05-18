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
  const [viewMode, setViewMode] = useState<'image' | 'pdf'>('image');
  
  // Check if URL is a PDF
  const isPDF = certificateUrl?.toLowerCase().endsWith('.pdf');
  
  // Convert Cloudinary PDF to high-res image
  const getImageUrl = (url: string | undefined) => {
    if (!url) return null;
    if (!url.includes('cloudinary.com') || !isPDF) return url;
    
    // Transform Cloudinary PDF URL to show first page as high-res image
    return url.replace('/upload/', '/upload/f_jpg,pg_1,w_1200,q_90/');
  };
  
  const imageUrl = getImageUrl(certificateUrl);

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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: 'spring', duration: 0.5, bounce: 0.3 }}
            className={`relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col ${
              isFullscreen
                ? 'w-full h-full max-w-none max-h-none'
                : 'w-full max-w-6xl h-[90vh]'
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
                {isPDF && (
                  <button
                    onClick={() => setViewMode(viewMode === 'image' ? 'pdf' : 'image')}
                    className="px-3 py-2 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors text-sm font-semibold"
                    title={viewMode === 'image' ? 'View PDF' : 'View Image'}
                  >
                    {viewMode === 'image' ? '📄 PDF' : '🖼️ Image'}
                  </button>
                )}
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
            <div className="flex-1 overflow-hidden bg-slate-100 dark:bg-slate-950">
              <div className="w-full h-full flex items-center justify-center p-8">
                {certificateUrl ? (
                  viewMode === 'pdf' && isPDF ? (
                    // PDF Viewer
                    <iframe
                      src={certificateUrl}
                      className="w-full h-full rounded-lg shadow-2xl bg-white"
                      title={certificateName}
                    />
                  ) : (
                    // Image Viewer (works for both images and converted PDFs)
                    <>
                      {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                        </div>
                      )}
                      <img
                        src={imageUrl || certificateUrl}
                        alt={certificateName}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(true)}
                        className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                          imageLoaded ? 'opacity-100' : 'opacity-0'
                        }`}
                      />
                    </>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
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
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
