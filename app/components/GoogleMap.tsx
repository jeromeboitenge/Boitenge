'use client';

import { useEffect, useState } from 'react';

interface LocationData {
  latitude: number;
  longitude: number;
}

export default function GoogleMap() {
  const [location, setLocation] = useState<LocationData>({ latitude: -1.9570, longitude: 30.1127 });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://portifolio-backend-ptck.onrender.com';
        const res = await fetch(`${apiUrl}/api/location`);
        if (res.ok) {
          const data = await res.json();
          if (data?.latitude && data?.longitude) {
            setLocation({ latitude: data.latitude, longitude: data.longitude });
          }
        }
      } catch {}
    };

    fetchLocation();
    const interval = setInterval(fetchLocation, 30000);
    return () => clearInterval(interval);
  }, []);

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.latitude},${location.longitude}&zoom=14`;

  return (
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden shadow-lg mt-4">
      <iframe
        src={mapUrl}
        className="w-full h-full border-0"
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
