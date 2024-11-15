import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ShopPage from './pages/shop/shopPage/ShopPage';
import EventMainPage from './pages/event/EventMainPage';
import EventDetailPage from './pages/event/EventDetailPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import SignUpCompletePage from './pages/auth/SignUpCompletePage';
import MyPage from './pages/mypage/MyPage';
import AdminPage from './pages/admin/main/AdminPage';
import DetailPage from './pages/shop/detailPage/DetailPage';
import CartPage from './pages/cart/CartPage';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import NoticePage from './pages/notice/NoticePage';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import PublicLayout from './layouts/publicLayout/PublicLayout';
import FindPwPage from './pages/auth/FindPwPage';
import FindIdPage from './pages/auth/FindIdPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import Banner from './pages/admin/banner/Banner';
import CheckoutPage from './pages/checkout/CheckoutPage';
import CheckoutCompletePage from './pages/checkout/CheckoutCompletePage';
import CategoryPage from './pages/shop/categoryPage/CategoryPage';
import SaleSearch from './pages/admin/sale/search/SaleSearch';
import SalePayment from './pages/admin/sale/payment/SalePayment';
import SaleOrdering from './pages/admin/sale/ordering/SaleOrdering';
import SaleDelivery from './pages/admin/sale/delivery/SaleDelivery';

function App() {
  return (
    <>
      <Routes>
        {/* PrivateRoute */}
        {/* 마이페이지 */}
        <Route element={<PublicLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path='/mypage' element={<MyPage />} />
          </Route>

          {/* PublicRoute */}
          {/* 쇼핑 */}
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/shop/:majorCategory' element={<CategoryPage />} />
          <Route path='/shop/:majorCategory/:middleCategory' element={<CategoryPage />} />
          <Route path='/shop/detail/:id' element={<DetailPage />} />

          {/* 이벤트 */}
          <Route path='/event' element={<EventMainPage />} />
          <Route path='/event/:id' element={<EventDetailPage />} />

          {/* 인증 */}
          <Route path='/auth' element={<Navigate to={'/auth/signin'} replace={true} />} />
          <Route path='/auth/signin' element={<SignInPage />} />
          <Route path='/auth/signup' element={<SignUpPage />} />
          <Route path='/auth/signup/complete' element={<SignUpCompletePage />} />
          <Route path='/auth/findPw' element={<FindPwPage />} />
          <Route path='/auth/findId' element={<FindIdPage />} />

          {/* 장바구니 */}
          <Route path='/cart' element={<CartPage />} />

          {/* 결제 */}
          <Route path='/checkout' element={<CheckoutPage />} />
          <Route path='/checkout/success' element={<CheckoutCompletePage />} />

          {/* 공지사항 */}
          <Route path='/notice' element={<NoticePage />} />

          {/* 메인 */}
          <Route path='/' element={<HomePage />} />
        </Route>

        {/* 관리자 */}
        <Route path='/admin/login' element={<AdminLoginPage />} />
        <Route element={<AdminLayout />}>
          <Route path='/admin' element={<AdminRoute />}>
            <Route path='' element={<AdminPage />} />
            <Route path='product'>
              <Route path='edit' element={<AdminPage />} />
              <Route path='add' element={<AdminPage />} />
            </Route>
            <Route path='sale'>
              <Route path='search' element={<SaleSearch />} />
              <Route path='payment' element={<SalePayment />} />
              <Route path='ordering' element={<SaleOrdering />} />
              <Route path='delivery' element={<SaleDelivery />} />
              {/* <Route path='cancel' element={<AdminPage />} />
              <Route path='return' element={<AdminPage />} />
              <Route path='exchange' element={<AdminPage />} /> */}
            </Route>
            {/* <Route path='inquiry' element={<AdminPage />} />
            <Route path='review' element={<AdminPage />} /> */}
            <Route path='store'>
              {/* <Route path='logo' element={<AdminPage />} /> */}
              <Route path='banner' element={<Banner />} />
              <Route path='bestitem' element={<AdminPage />} />
              {/* <Route path='newarrival' element={<AdminPage />} /> */}
              <Route path='mdschoice' element={<AdminPage />} />
            </Route>
            {/* <Route path='event'>
              <Route path='edit' element={<AdminPage />} />
              <Route path='add' element={<AdminPage />} />
            </Route>
            <Route path='user' element={<AdminPage />} />
            <Route path='statistics' element={<AdminPage />} />
            <Route path='notification' element={<AdminPage />} /> */}
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
