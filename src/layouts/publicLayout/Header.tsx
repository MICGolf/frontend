import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { useHeaderStore } from '@/config/store';
import { shopCategoryData } from '@/assets/dummys/categoryDatas';
import logoBlack from '@/assets/imgs/logoBlack.svg';
import arrowRight from '@/assets/icons/arrowRight.svg';
import Categories from '../../pages/cart/Categories';
import HamburgerMenu from './HamburgerMenu';
import MobileMenu from './MobileMenu';
import { useDebounce } from '../../hooks/useDebounce';
import UserUtilities from './UserUtilities';

const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const headerRef = useRef<HTMLElement | null>(null);
  const { setHeaderRef } = useHeaderStore();
  const shouldResponsive = useMediaQuery({ maxWidth: 767 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const location = useLocation();
  const [lastScrollY, setLastScrollY] = useState<number>(0);

  useEffect(() => {
    if (headerRef.current) {
      setHeaderRef(headerRef.current);
    }
  }, [setHeaderRef]);

  const handleScroll = useDebounce(() => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsHeaderVisible(false);
    } else if (currentScrollY < lastScrollY) {
      setIsHeaderVisible(true);
    }
    setLastScrollY(currentScrollY);
  }, 100);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleNavEnter = useCallback((navName: string) => {
    setActiveNav(navName);
  }, []);

  const handleNavLeave = useCallback(() => {
    setActiveNav(null);
  }, []);

  const memoizedCategories = useMemo(
    () => <Categories activeNav={activeNav} categoryData={activeNav === 'shop' ? shopCategoryData : []} />,
    [activeNav]
  );

  return (
    <>
      {isMobileMenuOpen && shouldResponsive && <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />}
      <header
        ref={headerRef}
        className={`fixed top-0 z-[99] w-full transition-transform duration-300 ${
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className='flex h-[39px] w-full items-center justify-center gap-4 bg-black px-4'>
          <span className='animate-pulse break-all text-center text-[10px] text-white transition-all duration-300 md:text-sm'>
            <strong>믹골프 자사몰 신규 런칭 프로모션 진행중!</strong> 최대 80,000원 전품목 15% 할인 프로모션 상품
            보러가기
          </span>
          <img
            src={arrowRight}
            alt='오른쪽 화살표'
            className='h-[19px] w-[8px] animate-pulse transition-all duration-300 md:h-[23px] md:w-[12px]'
          />
        </div>
        <div
          className={`relative flex h-[60px] items-center justify-between bg-white px-[24px] shadow-lg transition-all duration-300 md:px-[130px]`}
        >
          <div onMouseLeave={handleNavLeave} className='flex h-[60px] items-center gap-10'>
            <Link to={'/'} className='h-[26px] w-[73px]'>
              <img src={logoBlack} alt='믹골프 로고' className='h-full w-full object-contain' />
            </Link>
            {!shouldResponsive && (
              <nav>
                {memoizedCategories}
                <ul className='flex items-center gap-6 text-gray300'>
                  <li>
                    <Link className='w-[70px] hover:text-black' to='/shop' onMouseEnter={() => handleNavEnter('shop')}>
                      Shop
                    </Link>
                  </li>
                  <li>
                    <Link className='w-[70px] hover:text-black' to='/Event'>
                      Event
                    </Link>
                  </li>
                  <li>
                    <Link className='w-[70px] hover:text-black' to='/Notice'>
                      Notice
                    </Link>
                  </li>
                </ul>
              </nav>
            )}
          </div>
          {shouldResponsive ? (
            <HamburgerMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
          ) : (
            <UserUtilities />
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
