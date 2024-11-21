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
    setIsDisabled(cartItemArr.length === 0);
  }, [cartItemArr]);

  return (
    <div className='relative inline-block'>
      <input
        type='checkbox'
        id='select-all'
        checked={isChecked}
        disabled={isDisabled}
        onChange={handleSelectAll}
        className='peer sr-only'
      />
      <label
        htmlFor='select-all'
        className={`flex h-4 w-4 items-center justify-center border border-gray300 transition-colors duration-300 ${isDisabled ? 'cursor-not-allowed bg-gray-300' : 'cursor-pointer bg-white peer-checked:bg-primary'} `}
      >
        {!isDisabled && isChecked && <CheckIco size={10} color='white' />}
      </label>
    </div>
  );
};

export default SelectAllCheckBox;
