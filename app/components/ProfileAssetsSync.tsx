'use client';

import { useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { useProfileStore } from '@/stores/profileStore';

export default function ProfileAssetsSync() {
  const { setImageUrl, setCvUrl, resetImage, resetCv } = useProfileStore();

  useEffect(() => {
    let isCurrent = true;
    let retryAttempt = 0;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    const retryDelays = [1000, 2000, 4000, 8000, 15000, 20000];

    const syncAssets = async () => {
      try {
        const { avatarUrl, cvUrl } = await apiClient.getProfileAssets();
        if (!isCurrent) return;
        if (avatarUrl) setImageUrl(avatarUrl);
        else resetImage();
        if (cvUrl) setCvUrl(cvUrl);
        else resetCv();
      } catch {
        if (!isCurrent || retryAttempt >= retryDelays.length) return;
        retryTimer = setTimeout(() => {
          retryAttempt += 1;
          void syncAssets();
        }, retryDelays[retryAttempt]);
      }
    };

    void syncAssets();

    return () => {
      isCurrent = false;
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [setImageUrl, setCvUrl, resetImage, resetCv]);

  return null;
}