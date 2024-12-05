import { useState } from 'react';
import LoginOrPaymentModal from './LoginOrPaymentModal';
import { CartItemData } from '@/assets/dummys/types';
import AddCartModal from './AddCartModal';

export type SignUpModalType = '결제모달' | '장바구니';

type useModalStateProps = {
  paymentData?: {
    items: CartItemData[];
    totalPrice: number;
    totalDeliveryFee: number;
  };
};

const useModalState = ({ paymentData }: useModalStateProps = {}) => {
  const [currentModal, setCurrentModal] = useState<SignUpModalType | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false); // ADD : 모달 애니메이션 상태관리를 위해 추가

  const handleModalOpen = (type: SignUpModalType) => {
    setCurrentModal(type);
    setIsOpen(true);
  };

  const handleModalClose = () => {
    setIsOpen(false);
    setTimeout(() => setCurrentModal(null), 300); // FIX : 모달 애니메이션을 위한 딜레이 추가
  };

  const renderModalContent = (): React.ReactNode => {
    switch (currentModal) {
      case '결제모달': {
        if (paymentData) {
          return <LoginOrPaymentModal onClose={handleModalClose} paymentData={paymentData} isOpen={isOpen} />;
        }
        return null;
      }
      case '장바구니': {
        return <AddCartModal onClose={handleModalClose} isOpen={isOpen} />;
      }
    }
  };
  return { handleModalOpen, handleModalClose, renderModalContent };
};

export default useModalState;
