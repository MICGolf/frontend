import CheckIco from '@/assets/icons/CheckIco';
import { useState } from 'react';

const CheckBox = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  return (
    <label htmlFor='cartItem' className='flex h-4 w-4 cursor-pointer items-center justify-center border border-gray300'>
      <input
        type='checkbox'
        className='appearance-none'
        name='cartItem'
        id='cartItem'
        checked={isChecked}
        onChange={(e) => setIsChecked(e.target.checked)}
      />
      <span className={isChecked ? 'block' : 'hidden'}>
        <CheckIco size={10} />
      </span>
    </label>
  );
};

export default CheckBox;
