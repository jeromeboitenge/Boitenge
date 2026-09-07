import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { profileData } from '@/data/profileData';

const DEFAULT_IMAGE = '/Nzaramyimana-Jerome.jpeg';
const DEFAULT_CV = profileData.cvUrl;

interface ProfileState {
  imageUrl: string;
  cvUrl: string;
  setImageUrl: (url: string) => void;
  setCvUrl: (url: string) => void;
  resetImage: () => void;
  resetCv: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      imageUrl: DEFAULT_IMAGE,
      cvUrl: DEFAULT_CV,
      setImageUrl: (url: string) => set({ imageUrl: url }),
      setCvUrl: (url: string) => set({ cvUrl: url }),
      resetImage: () => set({ imageUrl: DEFAULT_IMAGE }),
      resetCv: () => set({ cvUrl: DEFAULT_CV }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ imageUrl: state.imageUrl, cvUrl: state.cvUrl }),
    }
  )
);