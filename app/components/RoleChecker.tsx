'use client';

import { useEffect, useState } from 'react';
import { useAuth } from './auth/AuthProvider';
import { FaInfoCircle, FaUserShield } from 'react-icons/fa';

export default function RoleChecker() {
  const { user } = useAuth();
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (user && user.role !== 'owner') {
      setShowInfo(true);
    }
  }, [user]);

  if (!showInfo || !user) return null;

  return (
    <div className="fixed bottom-4 left-4 max-w-md bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-400 dark:border-yellow-600 rounded-2xl p-6 shadow-2xl z-50">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <FaUserShield className="text-3xl text-yellow-600 dark:text-yellow-400" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
            <FaInfoCircle className="text-yellow-600 dark:text-yellow-400" />
            Role Information
          </h3>
          <div className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <p>
              <strong>Current Role:</strong> <span className="px-2 py-1 bg-slate-200 dark:bg-slate-700 rounded font-mono text-xs">{user.role.toUpperCase()}</span>
            </p>
            <p className="text-yellow-700 dark:text-yellow-300 font-semibold">
              ⚠️ Messages feature requires OWNER role
            </p>
            <div className="mt-4 p-3 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <p className="font-semibold mb-2">To view messages:</p>
              <ol className="list-decimal list-inside space-y-1 text-xs">
                <li>Access your backend database</li>
                <li>Find the users table</li>
                <li>Update your user's role from "ADMIN" to "OWNER"</li>
                <li>Logout and login again</li>
              </ol>
            </div>
          </div>
          <button
            onClick={() => setShowInfo(false)}
            className="mt-4 w-full px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold text-sm transition-colors"
          >
            Got it, dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
