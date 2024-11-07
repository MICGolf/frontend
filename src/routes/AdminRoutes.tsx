import { Route, Routes } from 'react-router-dom';
import AdminRoute from './AdminRoute';
import AdminPage from '@/pages/admin/AdminPage';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';

const AdminRoutes = () => {
  return (
    <Routes>
      {/* AdminRoute */}
      {/* 관리자 */}
      <Route element={<AdminRoute />}>
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/admin/login' element={<AdminLoginPage />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;
