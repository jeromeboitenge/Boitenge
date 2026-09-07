'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaFilePdf, FaCloudUploadAlt, FaTimes, FaUndo, FaExternalLinkAlt, FaSpinner, FaFileAlt } from 'react-icons/fa';
import { apiClient } from '@/lib/api-client';
import { useProfileStore } from '@/stores/profileStore';
import { toast } from 'react-hot-toast';

const MAX_SIZE_MB = 10;
const ACCEPTED_FORMATS = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export default function CvCard() {
  const { cvUrl, setCvUrl, resetCv } = useProfileStore();
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Derive filename from stored URL when present
  React.useEffect(() => {
    if (cvUrl && !fileName) {
      try {
        const name = decodeURIComponent(cvUrl.split('/').pop()?.split('?')[0] || '');
        if (name && !name.startsWith('http')) setFileName(name);
      } catch {
        // ignore malformed URLs
      }
    }
  }, [cvUrl, fileName]);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File size exceeds ${MAX_SIZE_MB}MB limit`;
    }
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return 'Please upload a PDF or Word document';
    }
    return null;
  };

  const handleFile = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }

    setFileName(file.name);
    setIsUploading(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 100);

      const response = await apiClient.uploadFile(file, 'documents');
      clearInterval(progressInterval);
      setProgress(100);

      if (response.success && response.data.url) {
        setCvUrl(response.data.url);
        toast.success('CV uploaded! It is now linked on your portfolio.');
      } else {
        throw new Error('Upload failed');
      }
    } catch {
      toast.error('Upload failed. Please try again.');
      if (fileInputRef.current) fileInputRef.current.value = '';
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleReset = () => {
    setFileName(null);
    resetCv();
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.success('CV reset to the default');
  };

  const isCustom = cvUrl && cvUrl !== '' && !cvUrl.startsWith('https://drive.google.com');
  const isGoogleDrive = cvUrl.includes('drive.google.com');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FaFilePdf className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Curriculum Vitae</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Upload your latest CV — visitors can preview it directly on the site</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Current CV Status */}
        <AnimatePresence mode="wait">
          {cvUrl && cvUrl !== '' ? (
            <motion.div
              key="status"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-6"
            >
              <div className={`flex items-center gap-4 rounded-2xl border p-4 ${
                isCustom
                  ? 'border-primary/30 bg-primary/5'
                  : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50'
              }`}>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isCustom ? 'bg-primary/15 text-primary' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400'
                }`}>
                  <FaFileAlt className="text-xl" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate">
                    {fileName || (isGoogleDrive ? 'Google Drive CV' : 'Current CV')}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {isCustom ? 'Your uploaded CV' : 'Default CV'}
                  </p>
                </div>
                <a
                  href={isCustom ? cvUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => {
                    if (isGoogleDrive) {
                      e.preventDefault();
                      window.open(cvUrl.replace('/view', '/preview'), '_blank', 'noopener,noreferrer');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 px-3 py-1.5 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors flex-shrink-0"
                >
                  View <FaExternalLinkAlt className="text-[10px]" />
                </a>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        {/* Drag & Drop Zone */}
        <div
          className={`border-2 border-dashed rounded-2xl transition-all duration-200 ${
            isDragging
              ? 'border-primary bg-primary/5 scale-[1.02]'
              : 'border-slate-300 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
          }`}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
        >
          <div
            className="p-8 text-center cursor-pointer"
            onClick={() => !isUploading && fileInputRef.current?.click()}
          >
            {isUploading ? (
              <div className="text-center">
                <FaSpinner className="text-3xl text-primary animate-spin mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Uploading...</p>
                <div className="w-48 mx-auto h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-slate-500 mt-1.5">{progress}%</p>
              </div>
            ) : (
              <>
                <FaCloudUploadAlt className={`text-4xl mx-auto mb-3 transition-colors ${
                  isDragging ? 'text-primary' : 'text-slate-400'
                }`} />
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {isDragging ? 'Drop your CV here' : 'Click to upload or drag and drop'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  PDF or Word document, up to {MAX_SIZE_MB}MB
                </p>
              </>
            )}
          </div>
        </div>

        {/* Reset to Default */}
        {isCustom && !isUploading && (
          <div className="mt-4 text-center">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <FaUndo className="text-xs" /> Reset to default CV
            </button>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept={ACCEPTED_FORMATS.join(',')}
        onChange={handleInputChange}
        className="hidden"
        disabled={isUploading}
      />
    </div>
  );
}