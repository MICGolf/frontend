import { useSaleContext } from './SaleProvider';

interface SaleLabelProps {
  classString?: string; // 선택적으로 추가 클래스 제공
  text?: string; // 선택적으로 텍스트 제공 (기본값은 saleLabelText 사용)
}

const SaleLabel = ({ classString = '', text }: SaleLabelProps) => {
  const { isSale, saleLabelText, labelClassNames } = useSaleContext();

  if (!isSale) return null;

  return (
    <p
      className={`flex h-6 max-w-fit items-center justify-center px-2 text-center text-[10px] ${labelClassNames} ${classString}`}
    >
      <span className='whitespace-nowrap'>{text || saleLabelText}</span>
    </p>
  );
};

export default SaleLabel;
