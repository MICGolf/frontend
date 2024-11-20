import { useEffect, useState } from 'react';
import { useUserStore } from '@/config/store';
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
// import { useCart } from '@/hooks/useCart';

const CartPage = () => {
  const { user } = useUserStore();
  // const { cartItems, syncGuestCartToUser } = useCart();
  const [cartItems] = useLocalStorage('cartItems', []);
  const {
    cartItemArr,
    selectedItems,
    selectedProducts,
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

  return (
    <article className='mx-auto w-full max-w-[1660px] px-[24px] py-[160px] transition-all duration-300 ease-in-out xl:px-[130px]'>
      {/* 타이틀 */}
      <h2 className='mb-[24px] w-full text-3xl font-semibold'>장바구니</h2>
      <section className='flex w-full h-full gap-12 flex-2'>
        <div className='flex flex-col w-full'>
          {/* 장바구니 헤더 영역 */}
          <div className='flex justify-between w-full py-4 text-sm border-y border-gray300'>
            <div className='flex items-center w-full gap-3'>
              <SelectAllCheckBox isChecked={selectAll} cartItemArr={cartItemArr} handleSelectAll={handleSelectAll} />
              <span>전체선택 ({globalSelectCount})</span>
            </div>
            <div className='flex justify-end w-full'>
              <button onClick={handleRemoveSelectedItems}>선택삭제</button>
            </div>
          </div>
          {/* 장바구니 리스트 영역 */}
          <ul className='flex flex-col w-full gap-8 my-6'>
            {cartItemArr.map((item, idx) => (
              <CartItem
                key={idx}
                data={item}
                selectedItems={selectedItems}
                handleModalOpen={handleModalOpen}
                handleCartSelectToggle={handleCartSelectToggle}
                handleUpdateCount={handleUpdateCount}
                handleRemoveSingleItem={handleRemoveSingleItem}
              />
            ))}
          </ul>
        </div>

        {/* 결제 창 : 모달타입 OR 배너타입 */}
        {shouldResponsive ? (
          <PaymentModal
            totalPrice={totalPrice}
            totalDeliveryFee={totalDeliveryFee}
            handlePayment={handlePayment}
            globalSelectCount={globalSelectCount}
            cartItemArr={cartItemArr}
          />
        ) : (
          <PaymentStickyBox
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
