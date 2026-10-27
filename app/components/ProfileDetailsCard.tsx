'use client';

import { FormEvent, useEffect, useState } from 'react';
import { Check, LoaderCircle, Save } from 'lucide-react';
import { apiClient } from '@/lib/api-client';
import { PROFILE_CONTENT_UPDATED_EVENT } from '@/lib/profile-events';
import { profileData } from '@/data/profileData';

type ProfileFields = {
  name: string;
  bio: string;
  about: string;
  email: string;
  phone: string;
  location: string;
};

const defaultProfile: ProfileFields = {
  name: profileData.name,
  bio: profileData.bio,
  about: profileData.about,
  email: profileData.email,
  phone: profileData.phone,
  location: profileData.location,
};

export default function ProfileDetailsCard() {
  const [formData, setFormData] = useState<ProfileFields>(defaultProfile);
  const [savedData, setSavedData] = useState<ProfileFields>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const profile = await apiClient.getProfile();
      const nextProfile: ProfileFields = profile ? {
        name: profile.name || defaultProfile.name,
        bio: profile.bio || defaultProfile.bio,
        about: profile.about || defaultProfile.about,
        email: profile.email || defaultProfile.email,
        phone: profile.phone || defaultProfile.phone,
        location: profile.location || defaultProfile.location,
      } : defaultProfile;
      setFormData(nextProfile);
      setSavedData(nextProfile);
    } catch {
      setFormData(defaultProfile);
      setSavedData(defaultProfile);
      setSaveMessage('Saved profile unavailable. Defaults loaded; you can still edit and save.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProfile();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setSaveMessage('');

    try {
      const updatedProfile = await apiClient.updateProfile(formData);
      const nextProfile: ProfileFields = {
        name: updatedProfile.name || formData.name,
        bio: updatedProfile.bio || formData.bio,
        about: updatedProfile.about || formData.about,
        email: updatedProfile.email || formData.email,
        phone: updatedProfile.phone || formData.phone,
        location: updatedProfile.location || formData.location,
      };
      setFormData(nextProfile);
      setSavedData(nextProfile);
      window.dispatchEvent(new CustomEvent(PROFILE_CONTENT_UPDATED_EVENT, { detail: nextProfile }));
      setSaveMessage('Profile details saved.');
    } catch (error) {
      setSaveMessage(error instanceof Error ? error.message : 'Could not save profile details.');
    } finally {
      setIsSaving(false);
    }
  };

  const isDirty = Object.keys(savedData).some(
    (key) => formData[key as keyof ProfileFields] !== savedData[key as keyof ProfileFields],
  );

  const updateField = (field: keyof ProfileFields, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setSaveMessage('');
  };

  const fieldClassName = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-950 dark:text-white';

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <header className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-200 px-5 py-4 dark:border-slate-800 sm:px-6">
        <div>
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">Public profile</h2>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Edit the introduction and contact details visitors see.</p>
        </div>
        {isLoading && <LoaderCircle className="mt-1 h-4 w-4 animate-spin text-primary" aria-label="Loading profile" />}
      </header>

      <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
        <div>
          <label htmlFor="profile-bio" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Introduction</label>
          <textarea
            id="profile-bio"
            required
            rows={4}
            maxLength={600}
            value={formData.bio}
            onChange={(event) => updateField('bio', event.target.value)}
            disabled={isLoading || isSaving}
            className={`${fieldClassName} resize-y leading-6`}
          />
          <p className="mt-1 text-right text-xs text-slate-500 dark:text-slate-400">{formData.bio.length}/600</p>
        </div>

        <div>
          <label htmlFor="profile-about" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">About section</label>
          <textarea
            id="profile-about"
            required
            rows={5}
            maxLength={1600}
            value={formData.about}
            onChange={(event) => updateField('about', event.target.value)}
            disabled={isLoading || isSaving}
            className={`${fieldClassName} resize-y leading-6`}
          />
          <p className="mt-1 text-right text-xs text-slate-500 dark:text-slate-400">{formData.about.length}/1600</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="profile-location" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
            <input id="profile-location" value={formData.location} onChange={(event) => updateField('location', event.target.value)} disabled={isLoading || isSaving} className={fieldClassName} />
          </div>
          <div>
            <label htmlFor="profile-email" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input id="profile-email" type="email" required value={formData.email} onChange={(event) => updateField('email', event.target.value)} disabled={isLoading || isSaving} className={fieldClassName} />
          </div>
          <div>
            <label htmlFor="profile-phone" className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">Phone</label>
            <input id="profile-phone" type="tel" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} disabled={isLoading || isSaving} className={fieldClassName} />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
          <p className={`text-sm ${saveMessage.includes('saved') ? 'text-emerald-700 dark:text-emerald-300' : 'text-red-700 dark:text-red-300'}`} aria-live="polite">
            {saveMessage}
          </p>
          <button
            type="submit"
            disabled={isLoading || isSaving || !isDirty}
            className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? <LoaderCircle size={16} className="animate-spin" /> : saveMessage.includes('saved') ? <Check size={16} /> : <Save size={16} />}
            {isSaving ? 'Saving…' : 'Save changes'}
          </button>
        </div>
      </form>
    </section>
  );
}