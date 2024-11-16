import logoBlack from '@/assets/imgs/logoBlack.svg';
import { Link, useLocation } from 'react-router-dom';
import cart from '@/assets/icons/cart.svg';
import lens from '@/assets/icons/lens.svg';
import like from '@/assets/icons/like.svg';
import user from '@/assets/icons/user.svg';
import arrowRight from '@/assets/icons/arrowRight.svg';
import { useEffect, useRef, useState } from 'react';
import { useHeaderStore } from '@/config/store';
import { eventCategoryData, noticeCategoryData, shopCategoryData } from '@/assets/dummys/categoryDatas';
import Categories from './Categories';
import { navigations } from '@/assets/dummys/navigationData';

const Header = () => {
  const location = useLocation();
  const [headerBgColor, setHeaderBgColor] = useState<string>('transparent');
  const [isHeaderVisible, setIsHeaderVisible] = useState<boolean>(true);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [activeNav, setActiveNav] = useState<string | null>(null);
  const [_, setIsMouseOverNav] = useState<boolean>(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const { setHeaderRef } = useHeaderStore();

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

  useEffect(() => {
    setHeaderBgColor(location.pathname !== '/' ? 'white' : 'transparent');
  }, [location.pathname]);

  const handleNavEnter = (nav: string) => setActiveNav(nav);

  const handleSubNavEnter = () => setIsMouseOverNav(true);
  const handleSubNavLeave = () => {
    setIsMouseOverNav(false);
    setActiveNav(null);
  };

  // 최상위 카테고리 목록

  const renderCurrentCategory = (activeNav: string | null) => {
    if (activeNav === 'shop') return shopCategoryData;
    if (activeNav === 'event') return eventCategoryData;
    if (activeNav === 'notice') return noticeCategoryData;
    return []; // 기본값으로 빈 배열 반환
  };

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 z-[50] w-full transition-transform duration-300 ${isHeaderVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className='relative z-[20]'>
        <div
          className={'flex h-[40px] w-full cursor-pointer items-center justify-center bg-black text-center text-white'}
        >
          믹골프 자사몰 신규 런칭 프로모션 진행중! 최대 80,000원 전품목 15% 할인중. 프로모션 상품 보러가기&nbsp;
          <span>
            <img src={arrowRight} alt='오른쪽 화살표' />
          </span>
        </div>
        <div
          className={`flex h-[70px] items-center justify-between px-[130px] shadow-lg ${headerBgColor === 'white' ? 'bg-gray100' : 'bg-transparent'}`}
        >
          <div className='flex'>
            <Link to={'/'} className='mr-[64px]'>
              <img src={logoBlack} alt='믹골프 로고' />
            </Link>
            <nav className='flex gap-3 text-gray300'>
              {/* 네비게이션 동적으로 생성 */}
              {navigations.map((nav, idx) => (
                <Link
                  key={idx}
                  className='w-[70px] hover:text-black'
                  to={`/${nav}`}
                  onMouseEnter={() => handleNavEnter(nav)}
                >
                  {nav.charAt(0).toUpperCase() + nav.slice(1)}
                </Link>
              ))}
            </nav>
          </div>
          <div className='flex gap-[16px]'>
            <img className='cursor-pointer' src={lens} alt='검색' />
            <img className='cursor-pointer' src={like} alt='찜목록' />
            <Link to={'/cart'}>
              <img className='cursor-pointer' src={cart} alt='장바구니' />
            </Link>
            <Link to={'/auth/signin'}>
              <img className='cursor-pointer' src={user} alt='마이페이지' />
            </Link>
          </div>
        </div>
      </div>

      {/* 카테고리 영역 */}
      {activeNav && (
        <Categories
          content={activeNav}
          onMouseEnter={handleSubNavEnter}
          onMouseLeave={handleSubNavLeave}
          categoryData={renderCurrentCategory(activeNav)} // 동적으로 카테고리 데이터를 전달
        />
      )}
    </header>
  );
};

export default Header;
