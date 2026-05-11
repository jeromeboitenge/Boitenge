/**
 * ImageUpload Component
 * Handles image file selection, preview, and upload
 * Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaCloudUploadAlt, FaImage, FaTimes } from 'react-icons/fa';
import { apiClient } from '@/lib/api-client';

export interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  onError?: (error: string) => void;
  label?: string;
  maxSize?: number; // in MB
  acceptedFormats?: string[];
}

const DEFAULT_MAX_SIZE = 5; // 5MB
const DEFAULT_FORMATS = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export function ImageUpload({
  value,
  onChange,
  onError,
  label = 'Upload Image',
  maxSize = DEFAULT_MAX_SIZE,
  acceptedFormats = DEFAULT_FORMATS,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewUrlRef = useRef<string | null>(null);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }
    };
  }, []);

  const validateFile = (file: File): string | null => {
    // Check file size
    const maxSizeBytes = maxSize * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File size exceeds ${maxSize}MB limit`;
    }

    // Check file type
    if (!acceptedFormats.includes(file.type)) {
      return 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed';
    }

    return null;
  };

  const handleFileSelect = async (file: File) => {
    // Clear previous error
    setError(null);
    if (onError) onError('');

    // Validate file
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      if (onError) onError(validationError);
      return;
    }

    // Create preview
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
    }
    const objectUrl = URL.createObjectURL(file);
    previewUrlRef.current = objectUrl;
    setPreview(objectUrl);

    // Upload file
    setIsUploading(true);
    setProgress(0);

    try {
      // Simulate progress (since we don't have real progress from the API)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await apiClient.uploadImage(file);

      clearInterval(progressInterval);
      setProgress(100);

      if (response.success && response.data.url) {
        onChange(response.data.url);
        setPreview(response.data.url);
        // Clean up object URL since we now have the real URL
        if (previewUrlRef.current) {
          URL.revokeObjectURL(previewUrlRef.current);
          previewUrlRef.current = null;
        }
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Upload failed. Please try again.';
      setError(errorMessage);
      if (onError) onError(errorMessage);
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } finally {
      setIsUploading(false);
      setProgress(0);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setError(null);
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300">
          {label}
        </label>
      )}

      <div
        className={`relative border-2 border-dashed rounded-xl transition-all ${
          isDragging
            ? 'border-primary bg-primary/5'
            : error
            ? 'border-red-500 bg-red-50 dark:bg-red-900/10'
            : 'border-slate-300 dark:border-slate-700 hover:border-primary/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {preview ? (
          <div className="relative">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
            {!isUploading && (
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-2 right-2 p-2 bg-red-600 hover:bg-red-700 text-white rounded-full shadow-lg transition-colors"
                aria-label="Remove image"
              >
                <FaTimes />
              </button>
            )}
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg">
                <div className="text-center text-white">
                  <div className="mb-2">
                    <svg className="animate-spin h-8 w-8 mx-auto" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm font-semibold">{progress}%</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="p-8 text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex justify-center mb-4">
              {isUploading ? (
                <svg className="animate-spin h-12 w-12 text-primary" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <FaCloudUploadAlt className="w-12 h-12 text-slate-400" />
              )}
            </div>
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {isUploading ? 'Uploading...' : 'Click to upload or drag and drop'}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              JPEG, PNG, WebP, or GIF (max {maxSize}MB)
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedFormats.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
          <FaImage className="w-4 h-4" />
          {error}
        </p>
      )}
    </div>
  );
}
