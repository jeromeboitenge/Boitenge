'use client';

import { useState, useEffect, useCallback } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
  address?: string;
}

interface LocationError {
  code: number;
  message: string;
}

export function useLocationTracking(options?: {
  enableHighAccuracy?: boolean;
  timeout?: number;
  maximumAge?: number;
  trackingInterval?: number;
  sendToBackend?: boolean;
}) {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [error, setError] = useState<LocationError | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState<'granted' | 'denied' | 'prompt'>('prompt');

  const defaultOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
    trackingInterval: 30000, // Update every 30 seconds
    sendToBackend: true,
    ...options,
  };

  // Get address from coordinates using reverse geocoding
  const getAddress = async (lat: number, lon: number): Promise<string | undefined> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error('Failed to get address:', error);
      return undefined;
    }
  };

  // Send location to backend
  const sendLocationToBackend = async (locationData: LocationData) => {
    try {
      const response = await fetch('/api/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData),
      });

      if (!response.ok) {
        console.error('Failed to send location to backend');
      }
    } catch (error) {
      console.error('Error sending location:', error);
    }
  };

  // Get current position
  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by your browser',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        };

        // Get address
        const address = await getAddress(locationData.latitude, locationData.longitude);
        if (address) {
          locationData.address = address;
        }

        setLocation(locationData);
        setError(null);

        // Send to backend if enabled
        if (defaultOptions.sendToBackend) {
          await sendLocationToBackend(locationData);
        }

        // Store in localStorage
        localStorage.setItem('last-location', JSON.stringify(locationData));
      },
      (error) => {
        setError({
          code: error.code,
          message: error.message,
        });
      },
      {
        enableHighAccuracy: defaultOptions.enableHighAccuracy,
        timeout: defaultOptions.timeout,
        maximumAge: defaultOptions.maximumAge,
      }
    );
  }, [defaultOptions.enableHighAccuracy, defaultOptions.timeout, defaultOptions.maximumAge, defaultOptions.sendToBackend]);

  // Start tracking
  const startTracking = useCallback(() => {
    setIsTracking(true);
    getCurrentPosition();
  }, [getCurrentPosition]);

  // Stop tracking
  const stopTracking = useCallback(() => {
    setIsTracking(false);
  }, []);

  // Check permission status
  useEffect(() => {
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setPermissionStatus(result.state as 'granted' | 'denied' | 'prompt');
        
        result.addEventListener('change', () => {
          setPermissionStatus(result.state as 'granted' | 'denied' | 'prompt');
        });
      });
    }
  }, []);

  // Auto-start tracking and set up interval
  useEffect(() => {
    if (isTracking) {
      getCurrentPosition();
      
      const intervalId = setInterval(() => {
        getCurrentPosition();
      }, defaultOptions.trackingInterval);

      return () => clearInterval(intervalId);
    }
  }, [isTracking, getCurrentPosition, defaultOptions.trackingInterval]);

  return {
    location,
    error,
    isTracking,
    permissionStatus,
    startTracking,
    stopTracking,
    getCurrentPosition,
  };
}
