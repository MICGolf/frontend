import { useState } from 'react';
import PrivatePolicyModal from './PrivatePolicyModal';
import TermsOfServiceModal from './TermsOfServiceModal';
import LoginOrPaymentModal from './LoginOrPaymentModal';
import { CartItemData } from '@/assets/dummys/types';

type SignUpModalType = '개인정보' | '이용약관' | '결제모달';

type useModalStateProps = {
  paymentData?: {
    items: CartItemData[];
    totalPrice: number;
    totalDeliveryFee: number;
  };
};

const useModalState = ({ paymentData }: useModalStateProps = {}) => {
  const [currentModal, setCurrentModal] = useState<SignUpModalType | null>(null);

  const handleModalOpen = (type: SignUpModalType) => {
    setCurrentModal(type);
  };

  const handleModalClose = () => {
    setCurrentModal(null);
  };

  const renderModalContent = () => {
    switch (currentModal) {
      case '개인정보': {
        return <PrivatePolicyModal onClose={handleModalClose} />;
      }
      case '이용약관': {
        return <TermsOfServiceModal onClose={handleModalClose} />;
      }
      case '결제모달': {
        if (paymentData) {
          return <LoginOrPaymentModal onClose={handleModalClose} paymentData={paymentData} />;
        }
        return null;
      }
    }
  };
  return { handleModalOpen, handleModalClose, renderModalContent };
};

export default useModalState;
