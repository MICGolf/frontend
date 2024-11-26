import { Route, Routes } from 'react-router-dom';
import AdminLayout from '@/layouts/adminLayout/AdminLayout';
import ProtectPrivateRoute from '@/routes/ProtectPrivateRoute';
import AdminLoginPage from '@/pages/admin/AdminLoginPage';
import AdminPage from '@/pages/admin/main/AdminPage';
import ProductAdd from '@/pages/admin/product/ProductAdd';
import ProductSearch from '@/pages/admin/product/ProductSearch';
import SaleSearch from '@/pages/admin/sale/search/SaleSearch';
import SalePayment from '@/pages/admin/sale/payment/SalePayment';
import SaleOrdering from '@/pages/admin/sale/ordering/SaleOrdering';
import SaleDelivery from '@/pages/admin/sale/delivery/SaleDelivery';
import BannerPage from '@/pages/admin/store/BannerPage';
import BestItemPage from '@/pages/admin/store/BestItemPage';
import { MdsChoicePage } from '@/pages/admin/store/MdsChoicePage';
import { PromotionPage } from '@/pages/admin/store/PromotionPage';

const AdminRoutes = () => (
  <Routes>
    {/* Admin Login */}
    <Route path='/login' element={<AdminLoginPage />} />

    {/* Protected Admin Pages */}
    <Route element={<AdminLayout />}>
      <Route path='/' element={<ProtectPrivateRoute />}>
        <Route path='' element={<AdminPage />} />
        <Route path='product'>
          <Route path='search' element={<ProductSearch />} />
          <Route path='add' element={<ProductAdd />} />
        </Route>
        <Route path='sale'>
          <Route path='search' element={<SaleSearch />} />
          <Route path='payment' element={<SalePayment />} />
          <Route path='ordering' element={<SaleOrdering />} />
          <Route path='delivery' element={<SaleDelivery />} />
        </Route>
        <Route path='store'>
          <Route path='banner' element={<BannerPage />} />
          <Route path='bestitem' element={<BestItemPage />} />
          <Route path='promotion' element={<PromotionPage />} />
          <Route path='mdschoice' element={<MdsChoicePage />} />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default AdminRoutes;
