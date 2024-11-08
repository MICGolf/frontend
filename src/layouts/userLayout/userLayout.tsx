import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
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

export default UserLayout;
