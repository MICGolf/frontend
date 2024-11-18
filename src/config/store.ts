import { create } from 'zustand';
import { HeaderRefStore, MobileStore, User, UserStore } from './types';

export const useHeaderStore = create<HeaderRefStore>((set) => ({
  headerRef: null,
  setHeaderRef: (headerRef) => set({ headerRef }),
}));

export const useUserStore = create<UserStore>(() => ({
  user: null,
  setUser: (user: User) => ({ user }),
}));

export const useMobileScrollStore = create<MobileStore>((set) => ({
  isMobileMode: false,
  setIsMobileMode: () => set((state) => ({ isMobileMode: !state.isMobileMode })),
}));
