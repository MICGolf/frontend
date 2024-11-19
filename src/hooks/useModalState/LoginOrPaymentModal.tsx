import { CartItemData2 } from '@/assets/dummys/types';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type LoginOrPaymentModalProps = {
  onClose: () => void;
  paymentData: {
    items: CartItemData2[];
    totalPrice: number;
    totalDeliveryFee: number;
  };
};

const LoginOrPaymentModal = ({ onClose, paymentData }: LoginOrPaymentModalProps) => {
  const navigate = useNavigate();

  const handleGuestPayment = () => {
    onClose;
    navigate('/checkout', { state: paymentData });
  };

  const handleLoginClick = () => {
    onClose;
    navigate('/auth/signin');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className='fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: 'spring',
              damping: 20,
              stiffness: 300,
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.8,
            y: 20,
            transition: {
              type: 'spring',
              damping: 18,
              stiffness: 300,
              duration: 0.3,
            },
          }}
          onClick={(e) => e.stopPropagation()}
          className='flex flex-col gap-4 bg-white px-[40px] py-[20px] sm:px-[120px] sm:py-[30px] md:px-[200px] md:py-[40px] lg:px-[240px] lg:py-[60px]'
        >
          <p className='teext-base sm:text-lg md:text-xl lg:text-2xl'>
            로그인이 안돼있어요 !<br />
            비회원으로 주문하시겠습니까?
          </p>
          <button
            onClick={handleLoginClick}
            className='flex-1 bg-primary px-4 py-2 text-base text-white transition-all duration-300 hover:scale-105 hover:bg-opacity-70 md:px-5 md:py-3 xl:px-6 xl:py-4'
          >
            로그인 하기
          </button>
          <button
            onClick={handleGuestPayment}
            className='flex-1 border border-primary bg-white px-4 py-2 text-base text-black transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:opacity-70 md:px-5 md:py-3 xl:px-6 xl:py-4'
          >
            비회원 결제
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginOrPaymentModal;
