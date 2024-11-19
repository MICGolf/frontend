import CheckIco from '@/assets/icons/CheckIco';

interface CheckBoxProps {
  handleCartSelectToggle: (itemId: string) => void;
  itemId: string;
  isChecked: boolean; // 상위에서 체크 상태를 전달받음
}

const CheckBox = ({ handleCartSelectToggle, itemId, isChecked }: CheckBoxProps) => {
  const handleOnChange = () => {
    handleCartSelectToggle(itemId); // 체크 상태 변경 요청
  };

  return (
    <label
      htmlFor={`cartItem-${itemId}`}
      className={`flex h-4 w-4 cursor-pointer items-center justify-center border border-gray300 transition-colors duration-300 ${isChecked && 'bg-primary'}`}
    >
      <input
        type='checkbox'
        className='appearance-none'
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
