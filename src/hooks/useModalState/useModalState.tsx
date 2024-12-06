import { useState } from 'react';
import LoginOrPaymentModal from './LoginOrPaymentModal';
import { CartItemData } from '@/assets/dummys/types';
import AddCartModal from './AddCartModal';
import { UserPrivacyModal } from './UserPrivacyModal';
import AddUserCartFailedModal from './AddUserCartFailedModal';
import { UseMutationResult } from '@tanstack/react-query';

export type SignUpModalType = '개인정보' | '이용약관' | '결제모달' | '장바구니' | '장바구니추가실패';

type useModalStateProps = {
  paymentData?: {
    items: CartItemData[];
    totalPrice: number;
    totalDeliveryFee: number;
  };
  mutation?: UseMutationResult<any, Error, any>; // mutation 추가
};

const useModalState = ({ paymentData, mutation }: useModalStateProps) => {
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
      case '장바구니추가실패': {
        return <AddUserCartFailedModal onClose={handleModalClose} isOpen={isOpen} errMsg={mutation?.error?.message} />;
      }
    }
  };
  return { handleModalOpen, handleModalClose, renderModalContent };
};

export default useModalState;
