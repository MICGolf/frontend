import { create } from 'zustand';

interface HeaderRefStore {
  headerRef: HTMLElement | null;
  setHeaderRef: (headerRef: HTMLElement | null) => void;
}

export const useHeaderStore = create<HeaderRefStore>((set) => ({
  headerRef: null,
  setHeaderRef: (headerRef) => set({ headerRef }),
}));

interface User {
  id: number;
  name: string;
  email: string;
  cartItems: any[];
}

interface UserStore {
  user: User | null; // FIX: user type 정의
  setUser: (user: User) => void; // FIX: user type 정의
}

interface MobileStore {
  isMobileMode: boolean;
  setIsMobileMode: (state: boolean) => void;
}

export const useUserStore = create<UserStore>(() => ({
  user: null,
  setUser: (user: User) => ({ user }),
}));

export const useMobileScrollStore = create<MobileStore>((set) => ({
  isMobileMode: false,
  setIsMobileMode: () => set((state) => ({ isMobileMode: !state.isMobileMode })),
}));

export const useFooterStyleStore = create<MobileStore>((set) => ({
  isMobileMode: false,
  setIsMobileMode: () => set((state) => ({ isMobileMode: !state.isMobileMode })),
}));
