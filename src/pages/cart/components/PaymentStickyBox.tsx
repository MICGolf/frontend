import { CartItemData2 } from '@/assets/dummys/types';

interface PaymentStickyBoxProps {
  totalPrice: number;
  totalDeliveryFee: number;
  globalSelectCount: number;
  cartItemArr: CartItemData2[];
  handlePayment: () => void | React.ReactNode;
}

const PaymentStickyBox = ({
  totalPrice,
  totalDeliveryFee,
  globalSelectCount,
  cartItemArr,
  handlePayment,
}: PaymentStickyBoxProps) => {
  const calculateTotal = () => {
    return totalPrice + totalDeliveryFee;
  };

  const handlePaymentButton = () => {
    if (cartItemArr.length === 0 || globalSelectCount === 0) {
      alert('선택된 아이템이 없어요!'); // FIX: 토스트UI로 대체할 예정
    } else {
      handlePayment();
    }
  };

  return (
    <div className='min-w-[300px]'>
      <div className='sticky top-[160px] w-full border border-gray300 bg-white px-4 py-10 transition-[top] duration-300'>
        <h3 className='mb-4 text-lg font-semibold'>총 상품 {globalSelectCount}개</h3>
        <div className='flex flex-col gap-2 mb-4'>
          <div className='flex justify-between text-sm'>
            <span>상품금액</span>
            <span>{totalPrice.toLocaleString()}원</span>
          </div>
          <div className='flex justify-between text-sm'>
            <span>배송비</span>
            <span>{totalDeliveryFee.toLocaleString()}원</span>
          </div>
        </div>

        <div className='flex flex-col items-end py-4 text-xl font-semibold border-y border-gray300'>
          <span>결제 예상 금액</span>
          <span>{calculateTotal().toLocaleString()}원</span>
        </div>
        <button
          className='w-full py-2 mt-4 text-sm transition-all duration-300 border border-primary bg-primary text-secondary hover:bg-secondary hover:text-primary'
          onClick={handlePaymentButton}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentStickyBox;
