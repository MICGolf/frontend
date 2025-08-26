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

type User = {
  isa: string;
  iss: string;
  user_id: number;
  user_name: string;
  user_type: 'guest' | 'admin';
};

type AuthState = {
  user: User | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
