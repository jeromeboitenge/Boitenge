'use client';

import { useEffect, useState } from 'react';

export default function AdminDiagnostics() {
  const [authData, setAuthData] = useState<any>(null);

  useEffect(() => {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      try {
        const data = JSON.parse(authStorage);
        setAuthData(data);
      } catch (e) {
        console.error('Failed to parse auth data:', e);
      }
    }
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black/90 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">Auth Diagnostics</h3>
      <div className="space-y-1">
        <p>Token: {authData?.state?.token ? '✓ Present' : '✗ Missing'}</p>
        <p>User: {authData?.state?.user?.email || 'N/A'}</p>
        <p>Role: {authData?.state?.user?.role || 'N/A'}</p>
      </div>
    </div>
  );
}
