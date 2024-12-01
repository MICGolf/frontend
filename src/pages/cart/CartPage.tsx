import { useEffect, useState } from 'react';
import { useAuthStore } from '@/config/store';
import { useCartSelection } from '@/hooks/useCartSelection';
import useCartCalculations from '@/hooks/useCartCalculations';
import { useNavigate } from 'react-router-dom';
import useModalState from '@/hooks/useModalState/useModalState';
import { useMediaQuery } from 'react-responsive';
import PaymentModal from './components/PaymentModal';
import PaymentStickyBox from './components/PaymentStickyBox';
import CartItem from './components/CartItem';
import useLocalStorage from '@/hooks/useLocalStorage';
import SelectAllCheckBox from './components/SelectAllCheckBox';
import CartItemSkeleton from './components/skeletons/CartItemSkeleton';
// import { useCart } from '@/hooks/useCart';

const CartPage = () => {
  const { user } = useAuthStore();
  // const { cartItems, syncGuestCartToUser } = useCart();
  const [cartItems] = useLocalStorage('cartItems', []);
  const [isLoading, setIsLoading] = useState(true);
  const {
    cartItemArr,
    selectedItems,
    selectedProducts,
    handleBuyNow,
    handleCartSelectToggle,
    handleUpdateCount,
    handleSelectAll,
    handleRemoveSelectedItems,
    handleRemoveSingleItem,
    selectAll,
  } = useCartSelection(cartItems);
  const { totalPrice, totalDeliveryFee } = useCartCalculations(selectedProducts);
  const navigate = useNavigate();
  const paymentData = {
    items: selectedProducts,
    totalPrice,
    totalDeliveryFee,
  };
  const { handleModalOpen, renderModalContent } = useModalState({ paymentData });
  const [globalSelectCount, setGlobalSelectCount] = useState(0);
  const shouldResponsive = useMediaQuery({ maxWidth: '1280px' });

  const handlePayment = () => {
    if (user) {
      navigate('/checkout', {
        state: paymentData,
      });
    } else {
      handleModalOpen('결제모달');
    }
  };

  useEffect(() => {
    setGlobalSelectCount(selectedProducts.length);
  }, [selectedProducts, cartItemArr]);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsLoading(false);
    })();
  }, []);

  return (
    <article className='mx-auto w-full max-w-[1660px] px-[24px] py-[160px] transition-all duration-300 ease-in-out xl:px-[130px]'>
      {/* 타이틀 */}
      <h2 className='mb-[24px] w-full text-3xl font-semibold'>장바구니</h2>
      <section className='flex-2 flex h-full w-full gap-12'>
        <div className='flex w-full flex-col'>
          {/* 장바구니 헤더 영역 */}
          <div className='flex w-full justify-between border-y border-gray300 py-4 text-sm'>
            <div className='flex w-full items-center gap-3'>
              <SelectAllCheckBox isChecked={selectAll} cartItemArr={cartItemArr} handleSelectAll={handleSelectAll} />
              <span>전체선택 ({globalSelectCount})</span>
            </div>
            <div className='flex w-full justify-end'>
              <button onClick={handleRemoveSelectedItems}>선택삭제</button>
            </div>
          </div>
          {/* 장바구니 리스트 영역 */}
          <ul className='my-6 flex w-full flex-col gap-8'>
            {isLoading ? (
              <CartItemSkeleton />
            ) : (
              cartItemArr.map((item, idx) => (
                <CartItem
                  key={idx}
                  data={item}
                  selectedItems={selectedItems}
                  handleModalOpen={handleModalOpen}
                  handleBuyNow={handleBuyNow}
                  handleCartSelectToggle={handleCartSelectToggle}
                  handleUpdateCount={handleUpdateCount}
                  handleRemoveSingleItem={handleRemoveSingleItem}
                />
              ))
            )}
          </ul>
        </div>

        {/* 결제 창 : 모달타입 OR 배너타입 */}
        {shouldResponsive ? (
          <PaymentModal
            isLoading={isLoading}
            selectedItems={selectedItems}
            totalPrice={totalPrice}
            totalDeliveryFee={totalDeliveryFee}
            handlePayment={handlePayment}
            globalSelectCount={globalSelectCount}
            cartItemArr={cartItemArr}
          />
        ) : (
          <PaymentStickyBox
            isLoading={isLoading}
            selectedItems={selectedItems}
            totalPrice={totalPrice}
            totalDeliveryFee={totalDeliveryFee}
            handlePayment={handlePayment}
            globalSelectCount={globalSelectCount}
            cartItemArr={cartItemArr}
          />
        )}
      </section>
      {/* 비회원일 경우 뜨는 모달 창 */}
      {renderModalContent()}
    </article>
  );
};

export default CartPage;
