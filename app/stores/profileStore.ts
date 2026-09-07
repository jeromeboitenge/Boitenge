import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const DEFAULT_IMAGE = '/Nzaramyimana-Jerome.jpeg';

interface ProfileState {
  imageUrl: string;
  setImageUrl: (url: string) => void;
  resetImage: () => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      imageUrl: DEFAULT_IMAGE,
      setImageUrl: (url: string) => set({ imageUrl: url }),
      resetImage: () => set({ imageUrl: DEFAULT_IMAGE }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ imageUrl: state.imageUrl }),
    }
  )
);
