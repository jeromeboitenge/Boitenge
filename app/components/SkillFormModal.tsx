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

const DEFAULT_CATEGORIES = ['frontend', 'backend', 'database', 'tools', 'other'];

export default function SkillFormModal({ isOpen, onClose, onSuccess, skill }: SkillFormModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'frontend' as string,
    proficiency: 50,
    yearsOfExperience: 1,
    order: 0,
    isVisible: true
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState<string[]>(DEFAULT_CATEGORIES);
  const [showCustomInput, setShowCustomInput] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Load custom categories from localStorage
      const savedCategories = localStorage.getItem('skillCategories');
      if (savedCategories) {
        const parsed = JSON.parse(savedCategories);
        setCategories([...DEFAULT_CATEGORIES, ...parsed.filter((c: string) => !DEFAULT_CATEGORIES.includes(c))]);
      }

      if (skill) {
        setFormData({
          name: skill.name,
          category: skill.category,
          proficiency: skill.proficiency,
          yearsOfExperience: skill.yearsOfExperience,
          order: skill.order,
          isVisible: skill.isVisible
        });
        setShowCustomInput(false);
      } else {
        setFormData({
          name: '',
          category: 'frontend',
          proficiency: 50,
          yearsOfExperience: 1,
          order: 0,
          isVisible: true
        });
        setShowCustomInput(false);
      }
      setCustomCategory('');
    }
  }, [skill, isOpen]);

  const handleCategoryChange = (value: string) => {
    if (value === 'other') {
      setShowCustomInput(true);
      setFormData({ ...formData, category: '' });
    } else {
      setShowCustomInput(false);
      setFormData({ ...formData, category: value });
    }
  };

  const handleCustomCategorySubmit = () => {
    if (customCategory.trim()) {
      const newCategory = customCategory.trim().toLowerCase();
      if (!categories.includes(newCategory)) {
        const updatedCategories = [...categories, newCategory];
        setCategories(updatedCategories);
        // Save to localStorage
        const customCats = updatedCategories.filter(c => !DEFAULT_CATEGORIES.includes(c));
        localStorage.setItem('skillCategories', JSON.stringify(customCats));
      }
      setFormData({ ...formData, category: newCategory });
      setShowCustomInput(false);
      setCustomCategory('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (showCustomInput && !customCategory.trim()) {
      toast.error('Please enter a category name or select an existing one');
      return;
    }

    if (showCustomInput) {
      handleCustomCategorySubmit();
      return;
    }

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
          ...(accessToken && { 'Authorization': `Bearer ${accessToken}` })
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error('Failed to save skill');
      }

      toast.success(skill ? 'Skill updated!' : 'Skill created!');
      onSuccess();
      onClose();
    } catch (error) {
      toast.error('Failed to save skill');
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
          {!showCustomInput ? (
            <select
              value={formData.category || 'other'}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
              <option value="other">+ Add New Category</option>
            </select>
          ) : (
            <div className="space-y-2">
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="Enter category name"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleCustomCategorySubmit}
                  className="flex-1 px-4 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90"
                >
                  Add Category
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCustomInput(false);
                    setCustomCategory('');
                    setFormData({ ...formData, category: 'frontend' });
                  }}
                  className="flex-1 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg font-semibold hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
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
        {!showCustomInput && (
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
        )}
      </form>
    </Modal>
  );
}
