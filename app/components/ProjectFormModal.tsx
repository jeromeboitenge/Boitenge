'use client';

import { useState, useEffect } from 'react';
import { Project, ProjectInput } from '@/types';
import Modal from './Modal';
import toast from 'react-hot-toast';
import { FaUpload, FaImage, FaTimes } from 'react-icons/fa';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  project?: Project;
}

export default function ProjectFormModal({ isOpen, onClose, onSuccess, project }: ProjectFormModalProps) {
  const [formData, setFormData] = useState<ProjectInput>({
    title: '',
    description: '',
    technologies: [],
    liveUrl: '',
    githubUrl: '',
    imageUrl: '',
    highlights: [],
    order: 0,
    isPublished: true
  });
  const [techInput, setTechInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title,
        description: project.description,
        technologies: project.technologies,
        liveUrl: project.liveUrl,
        githubUrl: project.githubUrl,
        imageUrl: project.imageUrl,
        highlights: project.highlights,
        order: project.order,
        isPublished: project.isPublished
      });
    } else {
      setFormData({
        title: '',
        description: '',
        technologies: [],
        liveUrl: '',
        githubUrl: '',
        imageUrl: '',
        highlights: [],
        order: 0,
        isPublished: true
      });
    }
    setImageFile(null);
  }, [project, isOpen]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(selectedFile.type)) {
        toast.error('Please upload an image file (JPG, PNG, WebP)');
        return;
      }
      // Validate file size (max 5MB)
      if (selectedFile.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setImageFile(selectedFile);
    }
  };

  const uploadImageToCloudinary = async (): Promise<string | null> => {
    if (!imageFile) return null;

    setUploading(true);
    try {
      const uploadFormData = new FormData();
      uploadFormData.append('file', imageFile);
      uploadFormData.append('resource', 'project-images');
      uploadFormData.append('publicId', `project-${Date.now()}`);

      // Get real auth token from localStorage
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

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const headers: Record<string, string> = {};
      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      const response = await fetch('https://portifolio-backend-ptck.onrender.com/api/uploads', {
        method: 'POST',
        headers,
        body: uploadFormData,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }

      const data = await response.json();
      return data.secure_url || data.url;
    } catch (error) {
      // Don't log to console
      if (error instanceof Error && error.name === 'AbortError') {
        toast.error('Upload timeout - please try again');
      } else if (error instanceof Error && error.message.includes('401')) {
        toast.error('Authentication required. Please login again.');
      } else {
        toast.error('Failed to upload project image');
      }
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Upload image if provided
      let projectImageUrl = formData.imageUrl;
      if (imageFile) {
        const uploadedUrl = await uploadImageToCloudinary();
        if (!uploadedUrl) {
          setIsSubmitting(false);
          return;
        }
        projectImageUrl = uploadedUrl;
      }
      const url = project 
        ? `https://portifolio-backend-ptck.onrender.com/api/projects/${project.id}`
        : 'https://portifolio-backend-ptck.onrender.com/api/projects';
      
      const method = project ? 'PATCH' : 'POST';
      
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

      const payload: any = {
        title: formData.title,
        description: formData.description,
        technologies: formData.technologies,
        highlights: formData.highlights,
        order: formData.order,
        imageUrl: projectImageUrl
      };

      // Only add liveUrl if it's a valid URL
      if (formData.liveUrl && formData.liveUrl.trim()) {
        payload.liveUrl = formData.liveUrl;
      }
      
      // Store githubUrl in localStorage for frontend use (backend doesn't support it)
      if (formData.githubUrl && formData.githubUrl.trim()) {
        const projectGithubUrls = JSON.parse(localStorage.getItem('project-github-urls') || '{}');
        projectGithubUrls[project?.id || 'new'] = formData.githubUrl;
        localStorage.setItem('project-github-urls', JSON.stringify(projectGithubUrls));
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`Failed to save project: ${response.status}`);
      }

      toast.success(project ? 'Project updated!' : 'Project created!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to save project');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addTechnology = () => {
    if (techInput.trim() && !formData.technologies.includes(techInput.trim())) {
      setFormData({ ...formData, technologies: [...formData.technologies, techInput.trim()] });
      setTechInput('');
    }
  };

  const removeTechnology = (tech: string) => {
    setFormData({ ...formData, technologies: formData.technologies.filter(t => t !== tech) });
  };

  const addHighlight = () => {
    if (highlightInput.trim() && !formData.highlights.includes(highlightInput.trim())) {
      setFormData({ ...formData, highlights: [...formData.highlights, highlightInput.trim()] });
      setHighlightInput('');
    }
  };

  const removeHighlight = (highlight: string) => {
    setFormData({ ...formData, highlights: formData.highlights.filter(h => h !== highlight) });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={project ? 'Edit Project' : 'Add New Project'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Title */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Project Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="E-commerce Platform"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="A full-stack e-commerce platform..."
            />
          </div>

          {/* Live URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Live URL
            </label>
            <input
              type="url"
              value={formData.liveUrl}
              onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://example.com"
            />
          </div>

          {/* GitHub URL */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              GitHub URL
            </label>
            <input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="https://github.com/username/repo"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Project Image
            </label>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-primary dark:hover:border-primary transition-colors">
                    <FaUpload className="text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {imageFile ? imageFile.name : 'Upload project screenshot'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.webp"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imageFile && (
                  <button
                    type="button"
                    onClick={() => setImageFile(null)}
                    className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30"
                  >
                    <FaTimes />
                  </button>
                )}
              </div>
              {imageFile && (
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-xl">
                  <FaImage className="text-primary" />
                  <span className="text-sm text-slate-700 dark:text-slate-300 flex-1">{imageFile.name}</span>
                  <span className="text-xs text-slate-500">{(imageFile.size / 1024).toFixed(2)} KB</span>
                </div>
              )}
              {formData.imageUrl && !imageFile && (
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <FaImage className="text-slate-400" />
                  <span className="text-sm text-slate-600 dark:text-slate-400 flex-1">Current: {formData.imageUrl}</span>
                </div>
              )}
              <p className="text-xs text-slate-500">
                Accepted formats: JPG, PNG, WebP (Max 5MB). Upload a new image to replace the current one.
              </p>
            </div>
          </div>

          {/* Technologies */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Technologies
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology())}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="React, Node.js, etc."
              />
              <button
                type="button"
                onClick={addTechnology}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.technologies.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold flex items-center gap-2"
                >
                  {tech}
                  <button type="button" onClick={() => removeTechnology(tech)} className="hover:text-red-500">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Highlights
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addHighlight())}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Key achievement or feature"
              />
              <button
                type="button"
                onClick={addHighlight}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.highlights.map((highlight, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between"
                >
                  <span className="text-sm text-slate-700 dark:text-slate-300">{highlight}</span>
                  <button type="button" onClick={() => removeHighlight(highlight)} className="text-red-500 hover:text-red-700">
                    ×
                  </button>
                </div>
              ))}
            </div>
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
                Uploading Image...
              </>
            ) : isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
                Saving...
              </>
            ) : (
              project ? 'Update Project' : 'Create Project'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}
