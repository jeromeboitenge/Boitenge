'use client';

import { useState, useEffect } from 'react';
import { Skill } from '@/types';
import Modal from './Modal';
import toast from 'react-hot-toast';

interface SkillFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  skill?: Skill;
}

export default function SkillFormModal({ isOpen, onClose, onSuccess, skill }: SkillFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend' as 'frontend' | 'backend' | 'database' | 'tools' | 'other',
    proficiency: 50,
    yearsOfExperience: 1,
    order: 0,
    isVisible: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (skill) {
      setFormData({
        name: skill.name,
        category: skill.category,
        proficiency: skill.proficiency,
        yearsOfExperience: skill.yearsOfExperience,
        order: skill.order,
        isVisible: skill.isVisible
      });
    } else {
      setFormData({
        name: '',
        category: 'frontend',
        proficiency: 50,
        yearsOfExperience: 1,
        order: 0,
        isVisible: true
      });
    }
  }, [skill, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = skill 
        ? `https://portifolio-backend-ptck.onrender.com/api/skills/${skill.id}`
        : 'https://portifolio-backend-ptck.onrender.com/api/skills';
      
      const method = skill ? 'PATCH' : 'POST';
      
      const payload = {
        title: formData.name,
        category: formData.category.charAt(0).toUpperCase() + formData.category.slice(1),
        level: formData.proficiency >= 80 ? 'Expert' : formData.proficiency >= 60 ? 'Advanced' : 'Intermediate',
        yearsExperience: formData.yearsOfExperience,
        proficiency: formData.proficiency,
        isActive: formData.isVisible,
        order: formData.order
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) throw new Error('Failed to save skill');

      toast.success(skill ? 'Skill updated!' : 'Skill created!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to save skill');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={skill ? 'Edit Skill' : 'Add New Skill'} size="md">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Skill Name */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Skill Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="React, Node.js, etc."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Category *
          </label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="database">Database</option>
            <option value="tools">Tools</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Proficiency */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Proficiency: {formData.proficiency}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={formData.proficiency}
            onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value) })}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-slate-500 mt-1">
            <span>Beginner</span>
            <span>Intermediate</span>
            <span>Expert</span>
          </div>
        </div>

        {/* Years of Experience */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
            Years of Experience
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={formData.yearsOfExperience}
            onChange={(e) => setFormData({ ...formData, yearsOfExperience: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          />
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

        {/* Visible */}
        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isVisible"
            checked={formData.isVisible}
            onChange={(e) => setFormData({ ...formData, isVisible: e.target.checked })}
            className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary"
          />
          <label htmlFor="isVisible" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
            Visible on portfolio
          </label>
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
            {isSubmitting ? 'Saving...' : skill ? 'Update Skill' : 'Create Skill'}
          </button>
        </div>
      </form>
    </Modal>
  );
}
