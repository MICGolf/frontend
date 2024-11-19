import { CartItemData2 } from '@/assets/dummys/types';
import CloseIco from '@/assets/icons/CloseIco';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

type LoginOrPaymentModalProps = {
  onClose: () => void;
  paymentData: {
    items: CartItemData2[];
    totalPrice: number;
    totalDeliveryFee: number;
  };
  isOpen: boolean;
};

const LoginOrPaymentModal = ({ isOpen, onClose, paymentData }: LoginOrPaymentModalProps) => {
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
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'
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
            className='relative w-full max-w-[800px] bg-white p-6 shadow-lg sm:p-8 md:p-10'
          >
            <button
              onClick={onClose}
              className='absolute flex items-center justify-center w-8 h-8 transition-all duration-300 right-4 top-4 hover:rotate-180'
            >
              <CloseIco size={16} />
            </button>
            <div className='flex flex-col items-center gap-6 pt-12 sm:gap-8 sm:pt-16 md:gap-10 md:pt-20'>
              <h3 className='text-xl font-semibold text-center text-primary sm:text-2xl md:text-4xl'>
                로그인이 안돼있어요 !<br />
                비회원으로 주문하시겠습니까?
              </h3>
              <div className='flex flex-col items-center w-full gap-4'>
                <button
                  onClick={handleLoginClick}
                  className='w-full max-w-[700px] bg-primary px-3 py-2 font-light text-secondary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:opacity-70 sm:px-6 sm:py-4 md:px-8 md:py-5'
                >
                  로그인 하기
                </button>
                <button
                  onClick={handleGuestPayment}
                  className='w-full max-w-[700px] border border-primary bg-secondary px-3 py-2 font-light text-primary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:opacity-70 sm:px-6 sm:py-4 md:px-8 md:py-5'
                >
                  비회원 결제
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginOrPaymentModal;
