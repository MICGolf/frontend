import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentModalToggler from './PaymentModalToggler';
import { CartItemData2 } from '@/assets/dummys/types';

interface PaymentModalProps {
  selectedItems: string[];
  totalPrice: number;
  totalDeliveryFee: number;
  globalSelectCount: number;
  cartItemArr: CartItemData2[];
  handlePayment: () => void | React.ReactNode;
}

const PaymentModal = ({
  selectedItems,
  totalPrice,
  totalDeliveryFee,
  globalSelectCount,
  cartItemArr,
  handlePayment,
}: PaymentModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
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
    <>
      <AnimatePresence>
        <motion.div
          key='paymentModal'
          initial={{ y: '100%' }}
          animate={{ y: isOpen ? 0 : '90%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className='fixed bottom-0 left-0 z-50 w-full'
        >
          <PaymentModalToggler isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className='w-full border border-gray300 bg-white px-4 py-10'>
            <h3 className='mb-4 text-lg font-semibold'>총 상품 {globalSelectCount}개</h3>
            <div className='mb-4 flex flex-col gap-2'>
              <div className='flex justify-between text-sm'>
                <span>상품금액</span>
                <span>{totalPrice.toLocaleString()}원</span>
              </div>
              <div className='flex justify-between text-sm'>
                <span>배송비</span>
                <span>{totalDeliveryFee.toLocaleString()}원</span>
              </div>
            </div>

            <div className='flex flex-col items-end border-y border-gray300 py-4 text-xl font-semibold'>
              <span>결제 예상 금액</span>
              <span>{calculateTotal().toLocaleString()}원</span>
            </div>
            <button
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
          </div>
        </motion.div>
        {isOpen && (
          <motion.div
            key='backdrop'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-0 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default PaymentModal;
