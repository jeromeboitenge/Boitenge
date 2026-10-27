import CvCard from '@/components/CvCard';

export default function AdminResumePage() {
  return (
    <div className="space-y-5">
      <header>
        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Resume</h2>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Manage the document linked from your public profile.</p>
      </header>
      <div className="max-w-3xl"><CvCard /></div>
    </div>
  );
}