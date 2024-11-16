interface SaleLabelProps {
  classString: string;
  text: string;
}

const SaleLabel = ({ classString, text }: SaleLabelProps) => {
  return (
    <p className={`flex h-6 max-w-fit items-center justify-center px-2 text-center text-[10px] ${classString}`}>
      <span className='text-nowrap text-center'>{text}</span>
    </p>
  );
};

export default SaleLabel;
