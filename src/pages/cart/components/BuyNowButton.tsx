import { CartItemData } from '@/assets/dummys/types';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';

interface BuyNowButtonProps {
  data: CartItemData;
  size?: 's' | 'm' | 'l';
  handleBuyNow: (itemId: string) => void;
  handleModalOpen: (type: SignUpModalType) => void;
}

const BuyNowButton = ({ size = 'm', data, handleModalOpen, handleBuyNow }: BuyNowButtonProps) => {
  // 사이즈별 클래스 매핑
  const sizeClasses = {
    s: 'h-[30px] w-[80px] text-xs',
    m: 'h-[40px] w-[130px] text-sm',
    l: 'h-[50px] w-[170px] text-md',
  };

  const handleClick = () => {
    handleBuyNow(data.id);
    handleModalOpen('결제모달');
  };

  return (
    <button
      className={`border border-primary bg-primary text-secondary transition-all duration-300 hover:bg-secondary hover:text-primary ${sizeClasses[size]}`}
      onClick={handleClick}
    >
      바로구매
    </button>
  );
};

export default BuyNowButton;
