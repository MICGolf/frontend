import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useMobileScrollStore } from '@/config/store';
import { useMediaQuery } from 'react-responsive';

const PublicLayout = () => {
  const isMobileMode = useMobileScrollStore((state) => state.isMobileMode);
  const isShopMobileView = useMediaQuery({ maxWidth: 768 });
  const isCartMobileView = useMediaQuery({ maxWidth: 1024 });
  const isFooterMobileView = useMediaQuery({ maxWidth: 1280 });

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
    </div>
  );
};

export default PublicLayout;
