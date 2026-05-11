'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function BackendStatusToast() {
  const [status, setStatus] = useState<'checking' | 'online' | 'offline' | 'hidden'>('checking');
  const [show, setShow] = useState(true);

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://portifolio-backend-ptck.onrender.com/health', {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          setStatus('online');
          setTimeout(() => setShow(false), 3000);
        } else {
          setStatus('offline');
        }
      } catch (error) {
        setStatus('offline');
      }
    };

    checkBackend();
  }, []);

  if (!show || status === 'hidden') return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="fixed top-24 right-4 z-50 max-w-sm"
      >
        <div className={`glass-card p-4 rounded-2xl shadow-lg border-l-4 ${
          status === 'checking' ? 'border-blue-500' :
          status === 'online' ? 'border-green-500' :
          'border-yellow-500'
        }`}>
          <div className="flex items-center gap-3">
            {status === 'checking' && (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-blue-500 border-t-transparent"></div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Connecting to backend...
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    This may take a moment
                  </p>
                </div>
              </>
            )}
            {status === 'online' && (
              <>
                <div className="flex h-5 w-5 items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Backend connected
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Loading live data
                  </p>
                </div>
              </>
            )}
            {status === 'offline' && (
              <>
                <div className="flex h-5 w-5 items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    Using local data
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Backend unavailable
                  </p>
                </div>
                <button
                  onClick={() => setShow(false)}
                  className="ml-auto text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  ✕
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
