import { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useMobileScrollStore } from '@/config/store';

const PublicLayout = () => {
  const isMobileMode = useMobileScrollStore((state) => state.isMobileMode);

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

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
