'use client';

import { useState, useEffect } from 'react';
import { Experience } from '@/types';
import Modal from './Modal';
import toast from 'react-hot-toast';

interface ExperienceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  experience?: Experience;
}

export default function ExperienceFormModal({ isOpen, onClose, onSuccess, experience }: ExperienceFormModalProps) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    description: '',
    startDate: '',
    endDate: '',
    achievements: [] as string[],
    order: 0
  });
  const [achievementInput, setAchievementInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company,
        position: experience.position,
        description: experience.description,
        startDate: experience.startDate.toISOString().split('T')[0],
        endDate: experience.endDate ? experience.endDate.toISOString().split('T')[0] : '',
        achievements: experience.achievements,
        order: experience.order
      });
    } else {
      setFormData({
        company: '',
        position: '',
        description: '',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        achievements: [],
        order: 0
      });
    }
  }, [experience, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
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

      const url = experience 
        ? `https://portifolio-backend-ptck.onrender.com/api/experience/${experience.id}`
        : 'https://portifolio-backend-ptck.onrender.com/api/experience';
      
      const method = experience ? 'PATCH' : 'POST';
      
      const payload = {
        position: formData.position,
        company: formData.company,
        startDate: new Date(formData.startDate).toISOString(),
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
        description: formData.description,
        points: formData.achievements,
        order: formData.order
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to save experience');
      }

      toast.success(experience ? 'Experience updated!' : 'Experience created!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to save experience');
    } finally {
      setIsSubmitting(false);
    }
  };

  const addAchievement = () => {
    if (achievementInput.trim() && !formData.achievements.includes(achievementInput.trim())) {
      setFormData({ ...formData, achievements: [...formData.achievements, achievementInput.trim()] });
      setAchievementInput('');
    }
  };

  const removeAchievement = (achievement: string) => {
    setFormData({ ...formData, achievements: formData.achievements.filter(a => a !== achievement) });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={experience ? 'Edit Experience' : 'Add New Experience'} size="lg">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Company */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Company *
            </label>
            <input
              type="text"
              required
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="TechCorp Solutions"
            />
          </div>

          {/* Position */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Position *
            </label>
            <input
              type="text"
              required
              value={formData.position}
              onChange={(e) => setFormData({ ...formData, position: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Senior Full Stack Developer"
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
              placeholder="Lead development of enterprise web applications..."
            />
          </div>

          {/* Start Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Start Date *
            </label>
            <input
              type="date"
              required
              value={formData.startDate}
              onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* End Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              End Date (Leave empty if current)
            </label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Achievements */}
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
              Key Achievements
            </label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={achievementInput}
                onChange={(e) => setAchievementInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addAchievement())}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Led development of 3 major features..."
              />
              <button
                type="button"
                onClick={addAchievement}
                className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.achievements.map((achievement, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-between"
                >
                  <span className="text-sm text-slate-700 dark:text-slate-300">{achievement}</span>
                  <button type="button" onClick={() => removeAchievement(achievement)} className="text-red-500 hover:text-red-700">
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
            disabled={isSubmitting}
            className="flex-1 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : experience ? 'Update Experience' : 'Create Experience'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
