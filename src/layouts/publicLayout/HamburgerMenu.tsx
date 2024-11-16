import { useMobileScrollStore } from '@/config/store';

interface HamburgerMenuProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
  color?: 'black' | 'white';
}

const HamburgerMenu = ({ isOpen, setIsOpen, color = 'black' }: HamburgerMenuProps) => {
  const { isMobileMode, setIsMobileMode } = useMobileScrollStore();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
    setIsMobileMode(!isMobileMode);
  };

  return (
    <button
      className='relative flex h-8 w-8 flex-col items-center justify-center gap-[2px]'
      onClick={toggleMenu}
      aria-label='Toggle menu'
    >
      <span
        className={`h-[2px] w-6 transform bg-${color} transition-transform duration-300 ${
          isOpen ? 'translate-y-[6px] rotate-45' : ''
        }`}
      ></span>
      <span
        className={`my-1 h-[2px] w-6 transform bg-${color} transition-opacity duration-300 ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      ></span>
      <span
        className={`h-[2px] w-6 transform bg-${color} transition-transform duration-300 ${
          isOpen ? '-translate-y-[10px] -rotate-45' : ''
        }`}
      ></span>
    </button>
  );
};

export default HamburgerMenu;
