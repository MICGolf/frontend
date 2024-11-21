import { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useMobileScrollStore } from '@/config/store';
import { useMediaQuery } from 'react-responsive';
import HistoryFab from './HistoryFab';
import EventPopup from './EventPopup';
import { Homeimages1 } from '@/assets/dummys/productListDatas';
import Intro from '@/pages/home/components/Intro';

const PublicLayout = () => {
  const isMobileMode = useMobileScrollStore((state) => state.isMobileMode);
  const isShopMobileView = useMediaQuery({ maxWidth: 768 });
  const isCartMobileView = useMediaQuery({ maxWidth: 1024 });
  const isFooterMobileView = useMediaQuery({ maxWidth: 1280 });
  const { setIsMobileMode } = useMobileScrollStore();
  const [showIntro, setShowIntro] = useState(false); // 애니메이션 실행 여부

  useEffect(() => {
    const isIntroShown = sessionStorage.getItem('introShown');

    if (!isIntroShown) {
      setShowIntro(true); // 애니메이션 실행
      setIsMobileMode(true); // 스크롤 방지

      const timer = setTimeout(() => {
        setShowIntro(false); // 애니메이션 종료
        setIsMobileMode(false);
        sessionStorage.setItem('introShown', 'true'); // sessionStorage에 저장
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (isMobileMode) {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }

    return () => {
      document.body.classList.remove('disable-scroll');
    };
  }, [isMobileMode, isShopMobileView]);

  const location = useLocation();

  const paddingBottomByLocation = () => {
    if (
      (isShopMobileView && location.pathname.startsWith('/shop/detail')) ||
      (isFooterMobileView && location.pathname.startsWith('/cart'))
    ) {
      return '40px';
    }

    if (isCartMobileView) {
      if (location.pathname.startsWith('/checkout')) {
        return '128px';
      }
    }

    return 0;
  };

  const minHeightByViewState = () => {
    if (isFooterMobileView) {
      return 'calc(100vh - 57px)';
    } else {
      return 'calc(100vh - 232px)';
    }
  };

  return (
    <div style={{ paddingBottom: paddingBottomByLocation() }}>
      <Header />
      <main style={{ minHeight: minHeightByViewState() }}>
        <Outlet />
      </main>
      <Footer />
      <HistoryFab />
      <EventPopup images={Homeimages1} />
      <Intro showIntro={showIntro} />
    </div>
  );
};

export default PublicLayout;
