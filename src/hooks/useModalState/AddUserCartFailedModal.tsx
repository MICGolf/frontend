import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import CloseIco from '@/assets/icons/CloseIco';

interface AddCartFailedModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const AddUserCartFailedModal = ({ onClose, isOpen }: AddCartFailedModalProps) => {
  const navigate = useNavigate();
  const handleOnClick = (path: string) => {
    navigate(`/${path}`);
  };
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm'
          onClick={onClose}
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
            className='relative w-full max-w-[800px] bg-white p-6 shadow-lg sm:p-8 md:p-10'
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className='absolute flex items-center justify-center w-8 h-8 transition-all duration-300 right-4 top-4 hover:rotate-180'
            >
              <CloseIco size={16} />
            </button>
            <div className='flex flex-col items-center gap-6 pt-12 sm:gap-8 sm:pt-16 md:gap-10 md:pt-20'>
              <h3 className='text-xl font-semibold text-center text-primary sm:text-2xl md:text-4xl'>
                장바구니 추가에 실패했어요.
              </h3>
              <div className='flex flex-col items-center w-full gap-4'>
                <button
                  className='w-full max-w-[700px] bg-primary px-3 py-2 font-light text-secondary transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:opacity-70 sm:px-6 sm:py-4 md:px-8 md:py-5'
                  onClick={() => handleOnClick('shop')}
                >
                  상품 더 둘러보기
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddUserCartFailedModal;
