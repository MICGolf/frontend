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
      <div className='flex gap-4 bg-white px-14 py-8'>
        <button onClick={handleLoginClick} className='bg-black px-6 py-4 text-white'>
          로그인 하기
        </button>
        <button onClick={handleGuestPayment} className='bg-black px-6 py-4 text-white'>
          비회원 결제
        </button>
      </div>
    </div>
  );
};

export default LoginOrPaymentModal;
