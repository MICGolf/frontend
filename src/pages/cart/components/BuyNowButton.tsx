interface BuyNowButtonProps {
  size?: 's' | 'm' | 'l';
}

const BuyNowButton = ({ size = 'm' }: BuyNowButtonProps) => {
  // 사이즈별 클래스 매핑
  const sizeClasses = {
    s: 'h-[30px] w-[80px] text-xs',
    m: 'h-[40px] w-[130px] text-sm',
    l: 'h-[50px] w-[170px] text-md',
  };

  return (
    <button
      className={`border border-primary bg-primary text-secondary transition-all duration-300 hover:bg-secondary hover:text-primary ${sizeClasses[size]}`}
    >
      바로구매
    </button>
  );
};

export default BuyNowButton;
