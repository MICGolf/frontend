import CheckIco from '@/assets/icons/CheckIco';

interface CheckBoxProps {
  handleCartSelectToggle: (itemId: string) => void;
  itemId: string;
  isChecked: boolean;
}

const CheckBox = ({ handleCartSelectToggle, itemId, isChecked }: CheckBoxProps) => {
  const handleOnChange = () => {
    handleCartSelectToggle(itemId);
  };

  return (
    <label
      htmlFor={`cartItem-${itemId}`}
      className={`flex h-4 w-4 cursor-pointer items-center justify-center border border-gray300 transition-colors duration-300 ${isChecked && 'bg-primary'}`}
    >
      <input
        type='checkbox'
        className='appearance-none focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        name={`cartItem-${itemId}`}
        id={`cartItem-${itemId}`}
        checked={isChecked}
        onChange={handleOnChange}
      />
      <span className={isChecked ? 'block' : 'hidden'}>
        <CheckIco size={10} color='white' />
      </span>
    </label>
  );
};

export default CheckBox;
