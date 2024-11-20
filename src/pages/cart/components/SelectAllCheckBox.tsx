import { CartItemData2 } from '@/assets/dummys/types';
import CheckIco from '@/assets/icons/CheckIco';
import { useEffect, useState } from 'react';

interface SelectAllCheckBoxProps {
  handleSelectAll: () => void;
  isChecked: boolean;
  cartItemArr: CartItemData2[];
}

const SelectAllCheckBox = ({ handleSelectAll, isChecked, cartItemArr }: SelectAllCheckBoxProps) => {
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    // 카트 아이템이 비어있으면 체크박스를 비활성화
    if (cartItemArr.length === 0) {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [cartItemArr]);

  return (
    <label
      htmlFor='select-all'
      className={`flex h-4 w-4 items-center justify-center border transition-colors duration-300 ${isDisabled ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer'} ${isChecked && !isDisabled ? 'bg-primary' : 'bg-white'}`}
    >
      <input
        type='checkbox'
        id='select-all'
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleSelectAll}
        className='appearance-none'
      />
      {!isDisabled && isChecked && <CheckIco size={10} color='white' />}
    </label>
  );
};

export default SelectAllCheckBox;
