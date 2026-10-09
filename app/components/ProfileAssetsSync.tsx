'use client';

import { useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { useProfileStore } from '@/stores/profileStore';

export default function ProfileAssetsSync() {
  const { setImageUrl, setCvUrl, resetImage, resetCv } = useProfileStore();

  useEffect(() => {
    let isCurrent = true;

    apiClient.getProfileAssets().then(({ avatarUrl, cvUrl }) => {
      if (!isCurrent) return;
      if (avatarUrl) setImageUrl(avatarUrl);
      else resetImage();
      if (cvUrl) setCvUrl(cvUrl);
      else resetCv();
    }).catch(() => {});

    return () => {
      isCurrent = false;
    };
  }, [setImageUrl, setCvUrl, resetImage, resetCv]);

  return null;
}