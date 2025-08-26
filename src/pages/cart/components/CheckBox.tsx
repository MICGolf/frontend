import CheckIco from '@/assets/icons/CheckIco';

interface CheckBoxProps {
  handleCartSelectToggle: (itemId: number) => void;
  itemId: number;
  isChecked: boolean;
}

const CheckBox = ({ handleCartSelectToggle, itemId, isChecked }: CheckBoxProps) => {
  const handleOnChange = () => {
    handleCartSelectToggle(itemId);
  };

  return (
    <div className='relative inline-block'>
      <input
        type='checkbox'
        className='sr-only peer'
        name={`cartItem-${itemId}`}
        id={`cartItem-${itemId}`}
        checked={isChecked}
        onChange={handleOnChange}
      />
      <label
        htmlFor={`cartItem-${itemId}`}
        className={`flex h-4 w-4 cursor-pointer items-center justify-center border border-gray300 transition-colors duration-300 peer-checked:bg-primary`}
      >
        {isChecked && <CheckIco size={10} color='white' />}
      </label>
    </div>
  );
};

export default CheckBox;
