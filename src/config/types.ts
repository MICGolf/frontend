export interface HeaderRefStore {
  headerRef: HTMLElement | null;
  setHeaderRef: (headerRef: HTMLElement | null) => void;
}

export interface MobileStore {
  isMobileMode: boolean;
  setIsMobileMode: (state: boolean) => void;
}
