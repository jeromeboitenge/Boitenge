'use client';

import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
  createdAt: string;
}

export default function PublicLocationDisplay() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('/api/location/latest');
        if (response.ok) {
          const data = await response.json();
          if (data && !data.error) {
            setLocation(data);
          }
        }
      } catch (error) {
        console.error('Failed to fetch location:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch immediately
    fetchLocation();

    // Update every 30 seconds
    const interval = setInterval(fetchLocation, 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-between w-full">
        <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white">
          Kigali, Rwanda
        </span>
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
        </span>
      </div>
    );
  }

  if (!location) {
    return (
      <div className="flex items-center justify-between w-full">
        <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white">
          Kigali, Rwanda
        </span>
        <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-slate-400"></span>
        </span>
      </div>
    );
  }

  const timeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center justify-between w-full"
    >
      <div className="flex items-center gap-2">
        <div className="relative">
          <FaMapMarkerAlt className="text-green-500 text-xs sm:text-sm" />
          <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
        </div>
        
        <div className="flex flex-col">
          <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold text-slate-800 dark:text-white">
            {location.address ? (
              location.address.split(',').slice(-2).join(',').trim()
            ) : (
              'Live Location'
            )}
          </span>
          <span className="text-[8px] xs:text-[9px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <FaClock className="text-[7px]" />
            {timeAgo(location.timestamp)}
          </span>
        </div>
      </div>

      <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-emerald-500"></span>
      </span>
    </motion.div>
  );
}
