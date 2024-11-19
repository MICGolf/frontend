import logoBlack from '@/assets/imgs/logoBlack.svg';
import { Link, useLocation } from 'react-router-dom';
import arrowRight from '@/assets/icons/arrowRight.svg';
import { useEffect, useRef, useState } from 'react';
import { useHeaderStore } from '@/config/store';
import { eventCategoryData, noticeCategoryData, shopCategoryData } from '@/assets/dummys/categoryDatas';
import Categories from '../../pages/cart/Categories';
import { navigations } from '@/assets/dummys/navigationData';
import { useMediaQuery } from 'react-responsive';
import HamburgerMenu from './HamburgerMenu';
import MobileMenu from './MobileMenu';
import CartIco from '@/assets/icons/CartIco';
import UserIco from '@/assets/icons/UserIco';

const Header = () => {
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [_, setIsMouseOverNav] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const { setHeaderRef } = useHeaderStore();
  const shouldResponsive = useMediaQuery({ maxWidth: 767 });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const location = useLocation();

  useEffect(() => {
    if (headerRef.current) {
      setHeaderRef(headerRef.current);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsHeaderVisible(currentScrollY < lastScrollY - 5 || currentScrollY < 5);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavEnter = (nav: string) => setActiveNav(nav);

  const handleSubNavEnter = () => setIsMouseOverNav(true);
  const handleSubNavLeave = () => {
    setIsMouseOverNav(false);
    setActiveNav(null);
  };

  const renderCurrentCategory = (activeNav: string | null) => {
    if (activeNav === 'shop') return shopCategoryData;
    if (activeNav === 'event') return eventCategoryData;
    if (activeNav === 'notice') return noticeCategoryData;
    return [];
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* 모바일 전용 메뉴 영역 */}
      {isMobileMenuOpen && shouldResponsive && <MobileMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />}

      <header
        ref={headerRef}
        className={`fixed top-0 z-[99] w-full transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
      >
        <div className='relative z-[99]'>
          {/* 최상단 띠배너 영역 */}
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
            className={`flex h-[70px] items-center justify-between px-[24px] shadow-lg transition-all duration-300 md:px-[130px] ${'bg-white'}`}
          >
            <div className='flex gap-10'>
              {/* 로고 영역 */}
              <Link to={'/'} className='h-[26px] w-[73px]'>
                <img src={logoBlack} alt='믹골프 로고' className='h-full w-full object-contain' />
              </Link>

              {/* 네비게이션 영역 */}
              {!shouldResponsive && (
                <nav>
                  <ul className='flex gap-6 text-gray300'>
                    {navigations.map((nav, idx) => (
                      <li key={idx}>
                        <Link
                          className='w-[70px] hover:text-black'
                          to={`/${nav}`}
                          onMouseEnter={() => handleNavEnter(nav)}
                        >
                          {nav.charAt(0).toUpperCase() + nav.slice(1)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>
            {/* 유저 유틸리티 영역 */}
            {shouldResponsive ? (
              <HamburgerMenu isOpen={isMobileMenuOpen} setIsOpen={setIsMobileMenuOpen} />
            ) : (
              <ul className='flex w-full justify-end gap-[16px]'>
                <li>
                  <Link to={'/cart'} className='h-[25px] w-[25px]'>
                    <CartIco />
                  </Link>
                </li>
                <li>
                  <Link to={'/mypage'} className='h-[25px] w-[25px]'>
                    <UserIco />
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </div>

        {/* 카테고리 영역 */}
        {activeNav && (
          <Categories
            content={activeNav}
            onMouseEnter={handleSubNavEnter}
            onMouseLeave={handleSubNavLeave}
            categoryData={renderCurrentCategory(activeNav)}
          />
        )}
      </header>
    </>
  );
};

export default Header;
