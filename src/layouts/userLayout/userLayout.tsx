import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const UserLayout = () => {
  return (
    <>
      <Header />
      <main className='h-[200dvh]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default UserLayout;
