import logoBlack from '@/assets/imgs/logoBlack.svg';
import { Link, useLocation } from 'react-router-dom';
import cart from '@/assets/icons/cart.svg';
import lens from '@/assets/icons/lens.svg';
import like from '@/assets/icons/like.svg';
import user from '@/assets/icons/user.svg';
import arrowRight from '@/assets/icons/arrowRight.svg';
import { useEffect, useRef, useState } from 'react';
import { useHeaderStore } from '@/config/store';

const Header = () => {
  const location = useLocation();
  const [headerBgColor, setHeaderBgColor] = useState<string>('transparent'); // 헤더 플래그
  const headerRef = useRef<HTMLElement | null>(null);
  const { setHeaderRef } = useHeaderStore();

  useEffect(() => {
    if (headerRef.current) {
      setHeaderRef(headerRef.current);
    }
  }, []);

  // INFO: path 조건에 따라 헤더 배경색 변경
  useEffect(() => {
    if (location.pathname !== '/') {
      setHeaderBgColor('white');
    } else {
      setHeaderBgColor('transparent');
    }
  }, [location.pathname]);

  return (
    <header
      ref={headerRef}
      className={`fixed z-50 w-full shadow-lg ${headerBgColor === 'white' ? 'bg-gray100' : 'bg-transparent'}`}
    >
      <div className='flex h-[40px] w-full cursor-pointer items-center justify-center bg-black text-center text-white'>
        믹골프 자사몰 신규 런칭 프로모션 진행중! 최대 80,000원 전품목 15% 할인중. 프로모션 상품 보러가기&nbsp;
        <span>
          <img src={arrowRight} alt='오른쪽 화살표' />
        </span>
      </div>
      <div className='flex h-[70px] items-center justify-between px-[130px]'>
        <div className='flex'>
          <Link to={'/'} className='mr-[64px]'>
            <img src={logoBlack} alt='믹골프 로고' />
          </Link>
          <nav className='flex gap-3 text-gray300'>
            <Link className='w-[70px] hover:text-black' to={'/shop'}>
              Shop
            </Link>
            <Link className='w-[70px] hover:text-black' to={'/event'}>
              Event
            </Link>
            <Link className='w-[70px] hover:text-black' to={'/notice'}>
              Notice
            </Link>
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
    </header>
  );
};

export default Header;
