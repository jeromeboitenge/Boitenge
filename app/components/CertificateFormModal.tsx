'use client';

import { useState, useEffect } from 'react';
import { Certificate } from '@/types';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { FaUpload, FaFile, FaTimes } from 'react-icons/fa';
import { apiClient } from '@/lib/api-client';

interface CertificateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  certificate?: Certificate;
}

export default function CertificateFormModal({ isOpen, onClose, onSuccess, certificate }: CertificateFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    issuer: '',
    issueDate: '',
    description: '',
    credentialUrl: '',
    skills: [] as string[],
    order: 0
  });
  const [skillInput, setSkillInput] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (certificate) {
      setFormData({
        name: certificate.name,
        issuer: certificate.issuer,
        issueDate: certificate.issueDate.toISOString().split('T')[0],
        description: certificate.description || `Certificate in ${certificate.name}`,
        credentialUrl: certificate.credentialUrl || '',
        skills: certificate.skills || [],
        order: certificate.order
      });
    } else {
      setFormData({
        name: '',
        issuer: '',
        issueDate: new Date().toISOString().split('T')[0],
        description: '',
        credentialUrl: '',
        skills: [],
        order: 0
      });
    }
    setFile(null);
    setSkillInput('');
  }, [certificate, isOpen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validate file type (PDF or images)
      const validTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Please upload a PDF or image file (JPG, PNG)');
        return;
      }
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const uploadToCloudinary = async (): Promise<string | null> => {
    if (!file) return null;

    setUploading(true);
    try {
      const authStorage = localStorage.getItem('auth-storage');
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          const accessToken = authData?.state?.token || null;
          if (accessToken) {
            apiClient.setToken(accessToken);
          }
        } catch (e) {
          toast.error('Authentication failed. Please login again.');
          return null;
        }
      }

      const result = await apiClient.uploadImage(file);
      
      if (!result?.data?.url) {
        toast.error('Upload failed - no URL returned');
        return null;
      }
      return result.data.url;
    } catch (error) {
      toast.error('Failed to upload certificate document. Please try again or add a URL instead.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload file if provided
      let documentUrl = formData.credentialUrl;
      if (file) {
        const uploadedUrl = await uploadToCloudinary();
        if (!uploadedUrl) {
          setIsSubmitting(false);
          return;
        }
        documentUrl = uploadedUrl;
      }

      const authStorage = localStorage.getItem('auth-storage');
      let accessToken = null;
      
      if (authStorage) {
        try {
          const authData = JSON.parse(authStorage);
          accessToken = authData?.state?.token || null;
        } catch (e) {
          // Silent fail
        }
      }

      if (!accessToken) {
        toast.error('Please login first');
        setIsSubmitting(false);
        return;
      }

      const url = certificate 
        ? `https://portifolio-backend-ptck.onrender.com/api/certificates/${certificate.id}`
        : 'https://portifolio-backend-ptck.onrender.com/api/certificates';
      
      const method = certificate ? 'PATCH' : 'POST';
      
      const payload = {
        title: formData.name,
        issuer: formData.issuer,
        date: new Date(formData.issueDate).toISOString(),
        description: formData.description || `Certificate in ${formData.name}`,
        url: documentUrl,
        skills: formData.skills,
        order: formData.order
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        toast.error(`Failed to save certificate: ${response.status}`);
        throw new Error('Failed to save certificate');
      }

      const result = await response.json();

      toast.success(certificate ? 'Certificate updated!' : 'Certificate created!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to save certificate');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={certificate ? 'Edit Certificate' : 'Add New Certificate'} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Certificate Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Certificate Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="AWS Certified Solutions Architect"
          />
        </div>

        {/* Issuer */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Issuer *
          </label>
          <input
            type="text"
            required
            value={formData.issuer}
            onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Amazon Web Services"
          />
        </div>

        {/* Issue Date */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Issue Date *
          </label>
          <input
            type="date"
            required
            value={formData.issueDate}
            onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Description *
          </label>
          <textarea
            rows={3}
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Brief description of what this certification covers and validates..."
          />
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Related Skills
          </label>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
                      setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
                      setSkillInput('');
                    }
                  }
                }}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Add a skill (press Enter)"
              />
              <button
                type="button"
                onClick={() => {
                  if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
                    setFormData({ ...formData, skills: [...formData.skills, skillInput.trim()] });
                    setSkillInput('');
                  }
                }}
                className="px-6 py-3 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20"
              >
                Add
              </button>
            </div>
            {formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, skills: formData.skills.filter((_, i) => i !== idx) })}
                      className="hover:text-primary/70"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Certificate Document Upload */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Certificate Document (PDF or Image)
          </label>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <label className="flex-1 cursor-pointer">
                <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors">
                  <FaUpload className="text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {file ? file.name : 'Choose file or drag here'}
                  </span>
                </div>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              {file && (
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30"
                >
                  <FaTimes />
                </button>
              )}
            </div>
            {file && (
              <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
                <FaFile className="text-primary" />
                <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">{file.name}</span>
                <span className="text-xs text-slate-500">{(file.size / 1024).toFixed(2)} KB</span>
              </div>
            )}
            <p className="text-xs text-slate-500">
              Accepted formats: PDF, JPG, PNG (Max 5MB)
            </p>
          </div>
        </div>

        {/* Credential URL */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Credential URL (Optional)
          </label>
          <input
            type="url"
            value={formData.credentialUrl}
            onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="https://www.credly.com/badges/..."
          />
          <p className="text-xs text-slate-500 mt-1">
            If you upload a document, this URL will be replaced
          </p>
        </div>

        {/* Order */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Display Order
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4 pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl font-semibold hover:bg-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || uploading}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                Uploading...
              </>
            ) : isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                Saving...
              </>
            ) : (
              certificate ? 'Update Certificate' : 'Create Certificate'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
