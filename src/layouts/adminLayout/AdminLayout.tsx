import { Outlet } from 'react-router-dom';
import { SideBar } from './SideBar';

const AdminLayout = () => {
  return (
    <>
      <div className='flex min-h-screen font-sans text-base text-white'>
        <div className='flex'>
          <SideBar />
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
