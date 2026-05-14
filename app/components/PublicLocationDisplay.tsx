'use client';

import { useEffect, useState } from 'react';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';

interface LocationData {
  id: string;
  latitude: number;
  longitude: number;
  city: string | null;
  country: string | null;
  updatedAt: string;
}

export default function PublicLocationDisplay() {
  const [location, setLocation] = useState<LocationData | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portifolio-backend-ptck.onrender.com';
        const res = await fetch(`${apiUrl}/api/location`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.latitude) setLocation(data);
        }
      } catch {}
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 30000);
    return () => clearInterval(interval);
  }, []);

  const timeAgo = (dateStr: string) => {
    const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
    if (seconds < 60) return 'Just now';
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const displayLocation = location
    ? [location.city, location.country].filter(Boolean).join(', ') || 'Live Location'
    : 'Kigali, Rwanda';

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <div className="relative">
          <FaMapMarkerAlt className="text-emerald-500 text-xs sm:text-sm" />
          {location && (
            <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-800 dark:text-white">
            {displayLocation}
          </span>
          {location && (
            <span className="text-[8px] xs:text-[9px] text-slate-600 dark:text-slate-300 flex items-center gap-1">
              <FaClock className="text-[7px]" />
              {timeAgo(location.updatedAt)}
            </span>
          )}
        </div>
      </div>

      <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className={`relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 ${location ? 'bg-emerald-500' : 'bg-slate-400'}`} />
      </span>
    </div>
  );
}
