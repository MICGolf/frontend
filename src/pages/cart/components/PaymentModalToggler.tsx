interface PaymentModalTogglerProps {
  isOpen: boolean;
  setIsOpen: (state: boolean) => void;
}

const PaymentModalToggler = ({ isOpen, setIsOpen }: PaymentModalTogglerProps) => {
  const handleToggler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className='flex items-center justify-center w-full h-10 transition-colors duration-300 cursor-pointer bg-gray-50 hover:bg-gray-200'
        onClick={handleToggler}
      >
        <div className='h-[5px] w-[84px] rounded-full border bg-primary'></div>
      </button>
    </>
  );
};

export default PaymentModalToggler;
