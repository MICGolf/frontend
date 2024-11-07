import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import ShopPage from './pages/shop/ShopPage';
import EventMainPage from './pages/event/EventMainPage';
import EventDetailPage from './pages/event/EventDetailPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';
import SignUpCompletePage from './pages/auth/SignUpCompletePage';
import PasswordResetPage from './pages/auth/PasswordResetPage';
import MyPage from './pages/mypage/MyPage';
import AdminPage from './pages/admin/AdminPage';
import AdminLoginPage from './pages/admin/AdminLoginPage';
import DetailPage from './pages/shop/DetailPage';
import CategoryPage from './pages/shop/CategoryPage';
import CartPage from './pages/cart/CartPage';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import NoticePage from './pages/notice/NoticePage';
import AdminLayout from './layouts/adminLayout/AdminLayout';
import UserLayout from './layouts/userLayout/UserLayout';

function App() {
  return (
    <>
      <Routes>
        {/* PrivateRoute */}
        {/* 마이페이지 */}
        <Route element={<UserLayout />}>
          <Route element={<PrivateRoute />}>
            <Route path='/mypage' element={<MyPage />} />
          </Route>

          {/* PublicRoute */}
          {/* 쇼핑 */}
          <Route path='/shop' element={<ShopPage />} />
          <Route path='/shop/:category' element={<CategoryPage />} />
          <Route path='/shop/:category/:id' element={<DetailPage />} />

          {/* 이벤트 */}
          <Route path='/event' element={<EventMainPage />} />
          <Route path='/event/:id' element={<EventDetailPage />} />

          {/* 인증 */}
          <Route path='/signin' element={<SignInPage />} />
          <Route path='/signup' element={<SignUpPage />} />
          <Route path='/signup/complete' element={<SignUpCompletePage />} />
          <Route path='/password-reset' element={<PasswordResetPage />} />

          {/* 장바구니 */}
          <Route path='/cart' element={<CartPage />} />

          {/* 공지사항 */}
          <Route path='/notice' element={<NoticePage />} />

          {/* 메인 */}
          <Route path='/' element={<HomePage />} />
        </Route>

        {/* 관리자 */}
        <Route path='/admin/login' element={<AdminLoginPage />} />
        <Route element={<AdminLayout />}>
          <Route element={<AdminRoute />}>
            <Route path='/admin' element={<AdminPage />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
