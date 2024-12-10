import { useEffect, useState } from 'react';
import { useCartSelection } from '@/hooks/useCartSelection';
import useCartCalculations from '@/hooks/useCartCalculations';
import { useNavigate } from 'react-router-dom';
import useModalState from '@/hooks/useModalState/useModalState';
import { useMediaQuery } from 'react-responsive';
import PaymentModal from './components/PaymentModal';
import PaymentStickyBox from './components/PaymentStickyBox';
import CartItem from './components/CartItem';
import SelectAllCheckBox from './components/SelectAllCheckBox';
import CartItemSkeleton from './components/skeletons/CartItemSkeleton';
import { useAuthStore } from '@/config/store';
import useGetCartItem from '@/hooks/useGetCartItem';
import { deleteCartItem } from '@/hooks/useDeleteCartItem';
import { useQueryClient } from '@tanstack/react-query';
const CartPage = () => {
  const { user } = useAuthStore();
  const accessToken = localStorage.getItem('accessToken') || '';
  const { cartItems, isPending, isError, error } = useGetCartItem();
  const queryClient = useQueryClient();
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
  console.log(selectedProducts);

  const handlePayment = async () => {
    if (user) {
      navigate('/checkout', {
        state: paymentData,
      });
    } else {
      handleModalOpen('결제모달');
    }
  };

  const handleAsyncDeleteSelectedItems = async () => {
    try {
      await Promise.all(selectedProducts.map((item) => deleteCartItem(item.productId, item.optionId, accessToken)));
    } catch (err) {
      throw err;
    } finally {
      queryClient.invalidateQueries({ queryKey: ['cartItems'] });
    }
  };

  useEffect(() => {
    setGlobalSelectCount(selectedProducts.length);
  }, [selectedProducts, cartItemArr]);

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
              <button
                onClick={
                  user
                    ? () => {
                        handleAsyncDeleteSelectedItems();
                        handleRemoveSelectedItems();
                      }
                    : handleRemoveSelectedItems
                }
              >
                선택삭제
              </button>
            </div>
          </div>
          {/* 장바구니 리스트 영역 */}
          <ul className='my-6 flex w-full flex-col gap-8'>
            {isError && (
              <div className='flex justify-center'>
                <span>{error?.message}</span>
              </div>
            )}
            {isPending && <CartItemSkeleton />}
            {!isError &&
              cartItems &&
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
              ))}
          </ul>
        </div>

        {/* 결제 창 : 모달타입 OR 배너타입 */}
        {shouldResponsive ? (
          <PaymentModal
            isLoading={isPending}
            selectedItems={selectedItems}
            totalPrice={totalPrice}
            totalDeliveryFee={totalDeliveryFee}
            handlePayment={handlePayment}
            globalSelectCount={globalSelectCount}
            cartItemArr={cartItemArr}
          />
        ) : (
          <PaymentStickyBox
            isLoading={isPending}
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
