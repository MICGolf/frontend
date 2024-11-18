export interface HeaderRefStore {
  headerRef: HTMLElement | null;
  setHeaderRef: (headerRef: HTMLElement | null) => void;
}

export interface User {
  id: number;
  name: string;
  email: string;
  cartItems: any[];
}

export interface UserStore {
  user: User | null; // FIX: user type 정의
  setUser: (user: User) => void; // FIX: user type 정의
}

export interface MobileStore {
  isMobileMode: boolean;
  setIsMobileMode: (state: boolean) => void;
}
