/**
 * Backend Status Indicator
 * Shows whether the app is using backend or local storage
 */

'use client';

import React, { useState, useEffect } from 'react';
import { unifiedApiClient } from '@/lib/unified-api-client';
import { FaServer, FaDatabase, FaCircle } from 'react-icons/fa';

export function BackendStatus() {
  const [isBackendOnline, setIsBackendOnline] = useState<boolean | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check initial status
    const status = unifiedApiClient.getBackendStatus();
    setIsBackendOnline(status);

    // Update status every 30 seconds
    const interval = setInterval(async () => {
      await unifiedApiClient.resetBackendCheck();
      try {
        await unifiedApiClient.getProjects();
        setIsBackendOnline(true);
      } catch {
        setIsBackendOnline(false);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isBackendOnline === null) {
    return null; // Don't show until we know the status
  }

  return (
    <div 
      className="fixed bottom-4 right-4 z-50"
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      <button
        className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
          isBackendOnline
            ? 'bg-green-600 hover:bg-green-700'
            : 'bg-orange-600 hover:bg-orange-700'
        } text-white text-sm font-semibold`}
      >
        <FaCircle className={`text-xs ${isBackendOnline ? 'animate-pulse' : ''}`} />
        {isBackendOnline ? (
          <><FaServer className="text-base" /> Backend</>
        ) : (
          <><FaDatabase className="text-base" /> Local</>
        )}
      </button>

      {showDetails && (
        <div className="absolute bottom-full right-0 mb-2 w-64 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xl p-4">
          <h4 className="font-semibold text-slate-900 dark:text-white mb-2">
            Data Source Status
          </h4>
          <div className="space-y-2 text-sm">
            {isBackendOnline ? (
              <>
                <p className="text-green-600 dark:text-green-400 flex items-center gap-2">
                  <FaCircle className="text-xs" />
                  Backend connected
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Data is synced with the remote server. All changes are persisted to the database.
                </p>
              </>
            ) : (
              <>
                <p className="text-orange-600 dark:text-orange-400 flex items-center gap-2">
                  <FaCircle className="text-xs" />
                  Using local storage
                </p>
                <p className="text-slate-600 dark:text-slate-400">
                  Backend is unavailable. Using local storage fallback. Changes are saved locally and will sync when backend is available.
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
