import { Route, Routes } from 'react-router-dom';
import PublicLayout from '@/layouts/publicLayout/PublicLayout';
import ProtectPrivateRoute from '@/routes/ProtectPrivateRoute';
import HomePage from '@/pages/home/HomePage';
import ShopPage from '@/pages/shop/shopPage/ShopPage';
import CategoryPage from '@/pages/shop/categoryPage/CategoryPage';
import DetailPage from '@/pages/shop/detailPage/DetailPage';
import EventMainPage from '@/pages/event/EventMainPage';
import EventDetailPage from '@/pages/event/EventDetailPage';
import SignInPage from '@/pages/auth/SignInPage';
import SignUpPage from '@/pages/auth/SignUpPage';
import OauthCallbackPage from '@/pages/auth/OauthCallbackPage';
import MyPage from '@/pages/mypage/MyPage';
import CartPage from '@/pages/cart/CartPage';
import CheckoutPage from '@/pages/checkout/CheckoutPage';
import CheckoutCompletePage from '@/pages/checkout/CheckoutCompletePage';
import NoticePage from '@/pages/notice/NoticePage';
import SignUpCompletePage from '@/pages/auth/SignUpCompletePage';
import FindPwPage from '@/pages/auth/FindPwPage';
import FindIdPage from '@/pages/auth/FindIdPage';
import AuthInitializer from './AuthInitializer';
import FindIdCompletePage from '@/pages/auth/FindIdCompletePage';
import FindPwCompletePage from '@/pages/auth/FindPwCompletePage';

const PublicRoutes = () => (
  <Routes>
    <Route element={<AuthInitializer />}>
      <Route element={<PublicLayout />}>
        {/* 쇼핑 */}
        <Route path='/shop' element={<ShopPage />} />
        <Route path='/shop/:majorCategory' element={<CategoryPage />} />
        <Route path='/shop/:majorCategory/:middleCategory' element={<CategoryPage />} />
        <Route path='/product/detail/:id' element={<DetailPage />} />

        {/* 이벤트 */}
        <Route path='/event' element={<EventMainPage />} />
        <Route path='/event/:id' element={<EventDetailPage />} />

        {/* 인증 */}
        <Route path='/auth/signin' element={<SignInPage />} />
        <Route path='/auth/signup' element={<SignUpPage />} />
        <Route path='/auth/signup/complete' element={<SignUpCompletePage />} />
        <Route path='/auth/findId' element={<FindIdPage />} />
        <Route path='/auth/findId/complete' element={<FindIdCompletePage />} />
        <Route path='/auth/findPw' element={<FindPwPage />} />
        <Route path='/auth/findPw/complete' element={<FindPwCompletePage />} />
        <Route path='/auth/callback' element={<OauthCallbackPage />} />

        {/* 장바구니 */}
        <Route path='/cart' element={<CartPage />} />

        {/* 결제 */}
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='/checkout/success' element={<CheckoutCompletePage />} />

        {/* 공지사항 */}
        <Route path='/notice' element={<NoticePage />} />

        {/* 메인 */}
        <Route path='/' element={<HomePage />} />

        <Route element={<ProtectPrivateRoute />}>
          <Route path='/mypage' element={<MyPage />} />
        </Route>
      </Route>
    </Route>
  </Routes>
);

export default PublicRoutes;
