'use client';

import type { ReactNode } from 'react';
import { LayoutGrid, List, Search } from 'lucide-react';

type ViewMode = 'grid' | 'table';

export default function DataToolbar({
  search,
  onSearchChange,
  placeholder,
  viewMode,
  onViewModeChange,
  filters,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  placeholder: string;
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  filters?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center">
      <label className="flex min-h-10 min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 px-3 text-slate-500 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/15 dark:border-slate-700">
        <Search size={16} aria-hidden="true" />
        <input value={search} onChange={(event) => onSearchChange(event.target.value)} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-sm text-slate-900 outline-none placeholder:text-slate-400 dark:text-white" />
      </label>
      {filters}
      <div className="flex shrink-0 rounded-lg border border-slate-200 p-1 dark:border-slate-700" aria-label="View mode">
        <button type="button" onClick={() => onViewModeChange('grid')} aria-label="Grid view" aria-pressed={viewMode === 'grid'} className={`flex h-8 w-9 items-center justify-center rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><LayoutGrid size={16} /></button>
        <button type="button" onClick={() => onViewModeChange('table')} aria-label="Table view" aria-pressed={viewMode === 'table'} className={`flex h-8 w-9 items-center justify-center rounded-md transition-colors ${viewMode === 'table' ? 'bg-primary/10 text-primary' : 'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}><List size={16} /></button>
      </div>
    </div>
  );
}
