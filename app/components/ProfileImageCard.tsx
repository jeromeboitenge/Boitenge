'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCloudUploadAlt, FaTimes, FaUndo, FaCamera, FaSpinner } from 'react-icons/fa';
import { apiClient } from '@/lib/api-client';
import { useProfileStore } from '@/stores/profileStore';
import { toast } from 'react-hot-toast';

const ACCEPTED_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const MAX_SIZE_MB = 5;

export default function ProfileImageCard() {
  const { imageUrl, setImageUrl, resetImage } = useProfileStore();
  const [preview, setPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  const cleanupPreview = useCallback(() => {
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  }, []);

  const validateFile = (file: File): string | null => {
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File size exceeds ${MAX_SIZE_MB}MB limit`;
    }
    if (!ACCEPTED_FORMATS.includes(file.type)) {
      return 'Only JPEG, PNG, WebP, and GIF are allowed';
    }
    return null;
  };

  const handleFile = async (file: File) => {
    const error = validateFile(file);
    if (error) {
      toast.error(error);
      return;
    }

    cleanupPreview();
    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setPreview(objectUrl);
    setIsUploading(true);
    setProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev >= 90 ? 90 : prev + 10));
      }, 100);

      const response = await apiClient.uploadImage(file);
      clearInterval(progressInterval);
      setProgress(100);

      if (response.success && response.data.url) {
        cleanupPreview();
        setPreview(null);
        setImageUrl(response.data.url);
        setHasChanges(false);
        toast.success('Profile image updated!');
      } else {
        throw new Error('Upload failed');
      }
    } catch {
      toast.error('Upload failed. Please try again.');
      setPreview(null);
      cleanupPreview();
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

  const handleCancel = () => {
    cleanupPreview();
    setPreview(null);
    setHasChanges(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleReset = () => {
    cleanupPreview();
    setPreview(null);
    setHasChanges(false);
    resetImage();
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.success('Profile image reset to default');
  };

  const displayImage = preview || imageUrl;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-lg">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <FaCamera className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Profile Photo</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Upload and manage your profile picture</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Image Display Area */}
        <div className="flex flex-col items-center gap-6">
          {/* Circular Image Preview */}
          <div className="relative group">
            {/* Gradient Ring */}
            <div className="absolute -inset-1 bg-gradient-to-tr from-primary via-accent to-primary rounded-full opacity-60 blur-sm group-hover:opacity-80 transition-opacity duration-300" />
            
            {/* Image Container */}
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-800 border-4 border-white dark:border-slate-900 shadow-xl">
              <AnimatePresence mode="wait">
                {isUploading && preview ? (
                  <motion.div
                    key="uploading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={preview}
                      alt="Uploading"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="text-center">
                        <FaSpinner className="text-white text-3xl animate-spin mx-auto mb-2" />
                        <span className="text-white text-sm font-semibold">{progress}%</span>
                      </div>
                    </div>
                  </motion.div>
                ) : displayImage ? (
                  <motion.img
                    key="image"
                    src={displayImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-accent/20"
                  >
                    <FaCamera className="text-4xl text-primary/40" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Upload Overlay Button */}
            {!isUploading && (
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-1 right-1 w-10 h-10 bg-primary hover:bg-primary/90 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 active:scale-95"
              >
                <FaCamera className="text-sm" />
              </button>
            )}
          </div>

          {/* Drag & Drop Zone */}
          <div
            className={`w-full max-w-md border-2 border-dashed rounded-2xl transition-all duration-200 ${
              isDragging
                ? 'border-primary bg-primary/5 scale-[1.02]'
                : 'border-slate-300 dark:border-slate-700 hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            <div
              className="p-6 text-center cursor-pointer"
              onClick={() => !isUploading && fileInputRef.current?.click()}
            >
              <FaCloudUploadAlt className={`text-4xl mx-auto mb-3 transition-colors ${
                isDragging ? 'text-primary' : 'text-slate-400'
              }`} />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {isDragging ? 'Drop your image here' : 'Click to upload or drag and drop'}
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                JPEG, PNG, WebP, or GIF up to {MAX_SIZE_MB}MB
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <AnimatePresence>
            {(preview || hasChanges) && !isUploading && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex gap-3"
              >
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  <FaTimes className="text-xs" /> Cancel
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reset to Default */}
          {imageUrl !== '/Nzaramyimana-Jerome.jpeg' && !isUploading && (
            <button
              onClick={handleReset}
              className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              <FaUndo className="text-xs" /> Reset to default
            </button>
          )}
        </div>
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
