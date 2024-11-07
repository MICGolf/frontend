import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  return (
    <main>
      <div className='bg-slate-800 text-lg'>테스트</div>
      <Outlet />
    </main>
  );
};

export default AdminLayout;
