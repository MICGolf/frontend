import { Outlet } from 'react-router-dom';
import { SideBar } from './SideBar';

const AdminLayout = () => {
  return (
    <>
      <div className='flex min-h-screen font-sans text-base text-white'>
        <div>
          <SideBar />
        </div>
        <main className='grow bg-slate-50 px-8 py-7 text-black'>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default AdminLayout;
