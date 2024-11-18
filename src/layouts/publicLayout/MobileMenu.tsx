import { useState } from 'react';
import { navigations } from '@/assets/dummys/navigationData';
import { Link } from 'react-router-dom';
import HamburgerMenu from './HamburgerMenu';
import logoWhite from '@/assets/imgs/logoWhite.svg';
import CartIco from '@/assets/icons/CartIco';
import UserIco from '@/assets/icons/UserIco';
import { ChevronRight } from 'lucide-react';
import { shopCategoryData } from '@/assets/dummys/categoryDatas';

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const MobileMenu = ({ isOpen, setIsOpen }: MobileMenuProps) => {
  const [openCategories, setOpenCategories] = useState<Record<number, boolean>>({});

  const toggleCategory = (id: number) => {
    setOpenCategories((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      className={`bg-transparentBlack fixed left-0 top-0 z-[1000] flex h-screen w-full flex-col gap-20 overflow-auto pb-20 backdrop-blur-lg ${
        isOpen ? 'animate-fade-in' : 'animate-fade-out'
      }`}
    >
      <div className='w-full px-6'>
        <div className='h-[39px] w-full'></div>
        <div className='flex h-[70px] w-full items-center justify-between'>
          <Link to={'/'} className='h-[26px] w-[73px]'>
            <img src={logoWhite} alt='믹골프 로고' className='h-full w-full object-contain' />
          </Link>
          <HamburgerMenu isOpen={isOpen} setIsOpen={setIsOpen} color='white' />
        </div>
      </div>

      {/* 네비게이션 영역 */}
      <nav className='w-full'>
        <ul className='flex w-full flex-col text-white'>
          {navigations.map((nav, idx) => (
            <li key={idx} className='h-full w-full'>
              <Link
                className='hover:bg-transparentBlack flex h-[70px] w-full items-center justify-between px-6 text-lg font-medium transition-colors duration-300'
                to={`/${nav}`}
              >
                <span>{nav.charAt(0).toUpperCase() + nav.slice(1)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* 카테고리 영역 */}
      <nav className='w-full'>
        <ul className='flex w-full flex-col text-white'>
          {shopCategoryData.map((major) => (
            <li key={major.id} className='w-full'>
              <div
                className='hover:bg-transparentBlack flex h-[70px] w-full cursor-pointer items-center justify-between px-6 text-lg font-medium transition-colors duration-300'
                onClick={() => toggleCategory(major.id)}
              >
                <span>{major.majorCategory}</span>
                <ChevronRight
                  className={`transition-transform duration-300 ease-in-out ${
                    openCategories[major.id] ? '-rotate-90' : 'rotate-90'
                  }`}
                />
              </div>
              <ul
                className={`overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                  openCategories[major.id] ? 'max-h-96' : 'max-h-0'
                }`}
              >
                {major.middleCategories.map((middle) => (
                  <li key={middle.id}>
                    <Link
                      className='hover:bg-transparentBlack flex h-[50px] w-full items-center justify-between px-12 text-sm font-light transition-all duration-300 ease-in-out'
                      to={`/shop/${middle.category.toLowerCase()}`}
                    >
                      <span>{middle.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>

      {/* 마이페이지 및 장바구니 */}
      <nav className='w-full'>
        <ul className='flex flex-col text-white'>
          <Link
            to={'/mypage'}
            className='hover:bg-transparentBlack flex h-[70px] w-full items-center justify-between px-6 transition-colors duration-300'
          >
            <UserIco color='white' />
            <span>마이페이지</span>
          </Link>
          <Link
            to={'/cart'}
            className='hover:bg-transparentBlack flex h-[70px] w-full items-center justify-between px-6 transition-colors duration-300'
          >
            <CartIco color='white' />
            <span>장바구니</span>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default MobileMenu;
