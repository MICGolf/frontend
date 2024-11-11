import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <>
      <Header />
      <main className='pt-[110px]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default PublicLayout;
