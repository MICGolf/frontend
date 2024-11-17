interface SaleLabelProps {
  classString: string;
  text: string;
}

const SaleLabel = ({ classString, text }: SaleLabelProps) => {
  return (
    <span className={`flex h-6 items-center justify-center px-2 text-center text-[10px] ${classString}`}>{text}</span>
  );
};

export default SaleLabel;
