import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';
import { useMobileScrollStore } from '@/config/store';
import { useMediaQuery } from 'react-responsive';

const PublicLayout = () => {
  const isMobileMode = useMobileScrollStore((state) => state.isMobileMode);
  const isMobileView = useMediaQuery({ maxWidth: 768 });

  useEffect(() => {
    if (isMobileMode) {
      document.body.classList.add('disable-scroll');
    } else {
      document.body.classList.remove('disable-scroll');
    }

    return () => {
      document.body.classList.remove('disable-scroll');
    };
  }, [isMobileMode]);

  const location = useLocation();

  const paddingBottomByLocation = () => {
    if (!isMobileView) return;

    if (location.pathname.startsWith('/shop/detail')) {
      return '40px';
    }

    if (location.pathname.startsWith('/cart')) {
      return '128px';
    }

    return 0;
  };

  return (
    <div style={{ paddingBottom: paddingBottomByLocation() }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;
