import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaymentModalToggler from './PaymentModalToggler';

interface PaymentModalProps {
  totalPrice: number;
  totalDeliveryFee: number;
  handlePayment: () => void | React.ReactNode;
}

const PaymentModal = ({ totalPrice, totalDeliveryFee, handlePayment }: PaymentModalProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const calculateTotal = () => {
    return totalPrice + totalDeliveryFee;
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: isOpen ? 0 : '90%' }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
          className='fixed bottom-0 left-0 z-50 w-full'
        >
          <PaymentModalToggler isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className='h-[calc(40vh-4rem)] w-full border border-gray300 bg-white px-4 py-10'>
            <h3 className='mb-4 text-lg font-semibold'>총 상품 0개</h3>
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
              onClick={handlePayment}
            >
              결제하기
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
};

export default PaymentModal;
