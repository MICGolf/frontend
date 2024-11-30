import { create } from 'zustand';
import { HeaderRefStore, MobileStore } from './types';

export const useHeaderStore = create<HeaderRefStore>((set) => ({
  headerRef: null,
  setHeaderRef: (headerRef) => set({ headerRef }),
}));

export const useMobileScrollStore = create<MobileStore>((set) => ({
  isMobileMode: false,
  setIsMobileMode: () => set((state) => ({ isMobileMode: !state.isMobileMode })),
}));

type AuthState = {
  user: { id: string; name: string } | null;
  setUser: (user: { id: string; name: string } | null) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
