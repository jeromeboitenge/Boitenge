'use client';

import { useEffect, useState } from 'react';
import { useLocationTracking } from '@/hooks/useLocationTracking';
import { useAuth } from '@/components/auth';
import { FaMapMarkerAlt, FaCheck, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function LocationTracker() {
  const { user } = useAuth();
  const [isVisible, setIsVisible] = useState(false);
  
  const {
    location,
    error,
    isTracking,
    permissionStatus,
    startTracking,
    stopTracking,
  } = useLocationTracking({
    enableHighAccuracy: true,
    trackingInterval: 30000,
    sendToBackend: true,
  });

  // Auto-start tracking when permission is granted and user is admin
  useEffect(() => {
    if (user && (user.role === 'admin' || user.role === 'owner')) {
      if (permissionStatus === 'granted' && !isTracking) {
        startTracking();
      }
    }
  }, [permissionStatus, user]);

  // Request permission on mount for admin users
  useEffect(() => {
    if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
      return;
    }

    const requestPermission = async () => {
      try {
        if ('geolocation' in navigator) {
          navigator.geolocation.getCurrentPosition(
            () => {
              startTracking();
            },
            () => {}
          );
        }
      } catch {}
    };

    requestPermission();
  }, [user]);

  // Don't render UI for non-admin users
  if (!user || (user.role !== 'admin' && user.role !== 'owner')) {
    return null;
  }

  return (
    <>
      {/* Status Indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed bottom-4 left-4 z-40"
      >
        <button
          onClick={() => setIsVisible(!isVisible)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full shadow-lg transition-all ${
            isTracking
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
          }`}
          title={isTracking ? 'Location tracking active' : 'Location tracking inactive'}
        >
          {isTracking ? (
            <>
              <FaMapMarkerAlt className="animate-pulse" />
              <span className="text-sm font-semibold">Tracking</span>
            </>
          ) : (
            <>
              <FaMapMarkerAlt />
              <span className="text-sm font-semibold">Inactive</span>
            </>
          )}
        </button>
      </motion.div>

      {/* Location Details Panel */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-4 z-40 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <FaMapMarkerAlt className="text-primary" />
                Location Tracking
              </h3>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <FaTimes className="text-slate-500" />
              </button>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status</span>
                <div className="flex items-center gap-2">
                  {isTracking ? (
                    <>
                      <FaCheck className="text-green-500" />
                      <span className="text-sm font-semibold text-green-500">Active</span>
                    </>
                  ) : (
                    <>
                      <FaTimes className="text-red-500" />
                      <span className="text-sm font-semibold text-red-500">Inactive</span>
                    </>
                  )}
                </div>
              </div>

              {/* Permission Status */}
              <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Permission</span>
                <span className={`text-sm font-semibold capitalize ${
                  permissionStatus === 'granted' ? 'text-green-500' : 
                  permissionStatus === 'denied' ? 'text-red-500' : 
                  'text-yellow-500'
                }`}>
                  {permissionStatus}
                </span>
              </div>

              {/* Current Location */}
              {location && (
                <>
                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Coordinates</p>
                    <p className="text-sm font-mono text-slate-900 dark:text-white">
                      {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                    </p>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Accuracy</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      ±{location.accuracy.toFixed(0)} meters
                    </p>
                  </div>

                  {location.address && (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Address</p>
                      <p className="text-sm text-slate-900 dark:text-white line-clamp-2">
                        {location.address}
                      </p>
                    </div>
                  )}

                  <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl">
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">Last Updated</p>
                    <p className="text-sm text-slate-900 dark:text-white">
                      {new Date(location.timestamp).toLocaleString()}
                    </p>
                  </div>
                </>
              )}

              {/* Error */}
              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-xl">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {error.message}
                  </p>
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-2 pt-2">
                {isTracking ? (
                  <button
                    onClick={stopTracking}
                    className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold text-sm transition-colors"
                  >
                    Stop Tracking
                  </button>
                ) : (
                  <button
                    onClick={startTracking}
                    className="flex-1 px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl font-semibold text-sm transition-colors"
                  >
                    Start Tracking
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
