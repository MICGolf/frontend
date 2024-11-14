import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { useEffect } from 'react';
import { CounterBtnProps } from '../types';

const CounterBtn = ({ count, setCount, maxCount, setMaxCount, selectedSize, selectedColor }: CounterBtnProps) => {
  useEffect(() => {
    setCount(1);
    if (selectedSize) {
      setMaxCount(selectedSize.stock);
    }
  }, [selectedSize, selectedColor]);

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const handleIncrease = () => {
    if (!maxCount) return;
    if (count < maxCount) {
      setCount(count + 1);
    }
  };

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-2xl font-light'>수량</h3>
      {selectedColor && selectedSize ? (
        <div
          className='item-center flex h-[40px] w-[130px] justify-around border border-gray200'
          aria-live='polite'
          role='group'
          aria-labelledby='quantity-selection'
        >
          <button
            type='button'
            className='flex flex-1 items-center justify-center'
            aria-label='수량 감소'
            onClick={handleDecrease}
          >
            <img src={minus} alt='수량 감소 버튼' />
          </button>
          <span
            id='quantity-selection'
            className='text-item flex flex-1 items-center justify-center text-[16px] font-thin'
            aria-live='assertive'
          >
            {count}
          </span>
          <button
            type='button'
            className='flex flex-1 items-center justify-center'
            aria-label='수량 증가'
            onClick={handleIncrease}
          >
            <img src={plus} alt='수량 증가 버튼' />
          </button>
        </div>
      ) : (
        <p className='flex h-[40px] items-center text-gray-400'>사이즈를 선택해주세요!</p>
      )}
    </div>
  );
};

export default CounterBtn;
