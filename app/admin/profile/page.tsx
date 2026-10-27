/**
 * Admin Profile Page
 * Dedicated page for the owner to manage their profile photo and CV
 */

'use client';

import ProfileImageCard from '@/components/ProfileImageCard';
import ProfileDetailsCard from '@/components/ProfileDetailsCard';
import CvCard from '@/components/CvCard';

export default function AdminProfilePage() {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Profile &amp; About</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Update the information and assets shown to portfolio visitors.</p>
      </header>
      <ProfileDetailsCard />
      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
        <ProfileImageCard />
        <CvCard />
      </div>
    </div>
  );
}