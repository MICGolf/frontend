import { useState } from 'react';
import PrivatePolicyModal from './PrivatePolicyModal';
import TermsOfServiceModal from './TermsOfServiceModal';

type SignUpModalType = '개인정보' | '이용약관';

const useTermsModalState = () => {
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
    }
  };
  return { handleModalOpen, handleModalClose, renderModalContent };
};

export default useTermsModalState;
