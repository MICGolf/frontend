import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className='pt-[110px]' style={{ minHeight: 'calc(100dvh - 290px)' }}>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
