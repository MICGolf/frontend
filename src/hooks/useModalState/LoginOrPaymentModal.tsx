import { CartItemData } from '@/assets/dummys/types';
import { useNavigate } from 'react-router-dom';

type LoginOrPaymentModalProps = {
  onClose: () => void;
  paymentData: {
    items: CartItemData[];
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
    <div onClick={onClose} className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div onClick={(e) => e.stopPropagation()} className='flex flex-col gap-4 bg-white px-[240px] py-[60px]'>
        <p className='text-2xl'>
          로그인이 안돼있어요 !<br />
          비회원으로 주문하시겠습니까?
        </p>
        <button
          onClick={handleLoginClick}
          className='flex-1 bg-primary px-6 py-4 text-white transition-all duration-300 hover:scale-105 hover:bg-opacity-70'
        >
          로그인 하기
        </button>
        <button
          onClick={handleGuestPayment}
          className='flex-1 border border-primary bg-white px-6 py-4 text-black transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white hover:opacity-70'
        >
          비회원 결제
        </button>
      </div>
    </div>
  );
};

export default LoginOrPaymentModal;
