import { CartItemData } from '@/assets/dummys/types';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useEffect, useState } from 'react';

interface PaymentStickyBoxProps {
  isLoading: boolean;
  selectedItems: string[];
  totalPrice: number;
  totalDeliveryFee: number;
  globalSelectCount: number;
  cartItemArr: CartItemData[];
  handlePayment: () => void | React.ReactNode;
}

const PaymentStickyBox = ({
  isLoading,
  selectedItems,
  totalPrice,
  totalDeliveryFee,
  globalSelectCount,
  cartItemArr,
  handlePayment,
}: PaymentStickyBoxProps) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const calculateTotal = () => {
    return totalPrice + totalDeliveryFee;
  };

  const handlePaymentButton = () => {
    handlePayment();
  };

  useEffect(() => {
    if (cartItemArr.length === 0 || globalSelectCount === 0) {
      setIsDisabled(true);
    }
    if (selectedItems.length > 0) {
      setIsDisabled(false);
    }
  }, [cartItemArr.length, globalSelectCount, selectedItems.length]);

  return (
    <div className='min-w-[300px]'>
      <div className='sticky top-[160px] w-full border border-gray300 bg-white px-4 py-10 transition-[top] duration-300'>
        {isLoading ? (
          <div className='h-[150px] w-full'>
            <LoadingSpinner size='s' />
          </div>
        ) : (
          <>
            <h3 className='mb-4 text-lg font-semibold'>총 상품 {globalSelectCount}개</h3>
            <div className='mb-4 flex flex-col gap-2'>
              <div className='flex justify-between text-sm'>
                <span>상품금액</span>
                <span>₩{totalPrice.toLocaleString()}</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>배송비</span>
                <span>₩{totalDeliveryFee.toLocaleString()}</span>
              </div>
            </div>

            <div className='flex flex-col items-end border-y border-gray300 py-4 text-xl font-semibold'>
              <span>결제 예상 금액</span>
              <span>₩{calculateTotal().toLocaleString()}</span>
            </div>
            <button
              type='button'
              className={`mt-4 w-full border py-2 text-sm transition-all duration-300 ${
                isDisabled
                  ? 'cursor-not-allowed border-gray300 bg-gray100 text-gray300'
                  : 'border-primary bg-primary text-secondary hover:bg-secondary hover:text-primary'
              }`}
              disabled={isDisabled}
              onClick={handlePaymentButton}
            >
              결제하기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentStickyBox;
