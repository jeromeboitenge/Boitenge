'use client';

import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function TrackLocationPage() {
  const [location, setLocation] = useState<GeolocationPosition | null>(null);
  const [address, setAddress] = useState<string>('');
  const [status, setStatus] = useState<'idle' | 'tracking' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [isTracking, setIsTracking] = useState(false);

  const getAddress = async (lat: number, lon: number) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return data.display_name || 'Unknown location';
    } catch {
      return 'Unknown location';
    }
  };

  const sendLocation = async (position: GeolocationPosition) => {
    try {
      setStatus('tracking');
      const { latitude, longitude, accuracy } = position.coords;
      
      const addr = await getAddress(latitude, longitude);
      setAddress(addr);

      const response = await fetch('/api/location/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          latitude,
          longitude,
          accuracy,
          address: addr,
        }),
      });

      if (response.ok) {
        setStatus('success');
        setMessage('Location updated successfully!');
      } else {
        throw new Error('Failed to update location');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Failed to send location');
    } finally {
      setIsTracking(false);
    }
  };

  const startTracking = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setMessage('Geolocation not supported');
      return;
    }

    setIsTracking(true);
    setStatus('tracking');
    setMessage('Getting your location...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
        sendLocation(position);
      },
      (error) => {
        setStatus('error');
        setMessage(`Error: ${error.message}`);
        setIsTracking(false);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const startContinuousTracking = () => {
    if (!navigator.geolocation) {
      setStatus('error');
      setMessage('Geolocation not supported');
      return;
    }

    setIsTracking(true);
    
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        setLocation(position);
        sendLocation(position);
      },
      (error) => {
        setStatus('error');
        setMessage(`Error: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <FaMapMarkerAlt className="text-3xl text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Location Tracker
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Share your GPS location from your phone
          </p>
        </div>

        {location && (
          <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-4 space-y-2">
            <div className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Latitude:</strong> {location.coords.latitude.toFixed(6)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Longitude:</strong> {location.coords.longitude.toFixed(6)}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-300">
              <strong>Accuracy:</strong> ±{Math.round(location.coords.accuracy)}m
            </div>
            {address && (
              <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-600">
                {address}
              </div>
            )}
          </div>
        )}

        {message && (
          <div className={`flex items-center gap-3 p-4 rounded-xl ${
            status === 'success' 
              ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
              : status === 'error'
              ? 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
              : 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400'
          }`}>
            {status === 'success' && <FaCheckCircle className="text-xl" />}
            {status === 'error' && <FaExclamationTriangle className="text-xl" />}
            <span className="text-sm font-medium">{message}</span>
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={startTracking}
            disabled={isTracking}
            className="w-full bg-primary hover:bg-primary/90 disabled:bg-slate-300 dark:disabled:bg-slate-600 text-white font-semibold py-4 rounded-xl transition-all active:scale-95 shadow-lg"
          >
            {isTracking ? 'Tracking...' : 'Update Location Once'}
          </button>

          <button
            onClick={() => {
              if (isTracking) {
                setIsTracking(false);
                setStatus('idle');
                setMessage('');
              } else {
                startContinuousTracking();
              }
            }}
            className={`w-full font-semibold py-4 rounded-xl transition-all active:scale-95 shadow-lg ${
              isTracking
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white'
            }`}
          >
            {isTracking ? 'Stop Continuous Tracking' : 'Start Continuous Tracking'}
          </button>
        </div>

        <div className="text-xs text-center text-slate-500 dark:text-slate-400 pt-4 border-t border-slate-200 dark:border-slate-700">
          Your location is shared publicly on your portfolio
        </div>
      </div>
    </div>
  );
}
