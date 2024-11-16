import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { useEffect } from 'react';
import { CounterBtnProps } from '../types';

const CounterBtn = ({
  count,
  setCount,
  maxCount,
  setMaxCount,
  selectedSize,
  selectedColor,
  isSoldOut,
}: CounterBtnProps) => {
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
    <div className='relative flex flex-col justify-center w-full gap-2 md:justify-start'>
      <h3 className='text-lg font-light md:text-2xl'>수량</h3>
      {selectedColor && selectedSize ? (
        <div className='flex w-full'>
          <div
            className='item-center flex h-[40px] w-[130px] justify-around border border-gray200'
            aria-live='polite'
            role='group'
            aria-labelledby='quantity-selection'
          >
            <button
              type='button'
              className='flex items-center justify-center flex-1'
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
              {isSoldOut ? 0 : count}
            </span>
            <button
              type='button'
              className='flex items-center justify-center flex-1'
              aria-label='수량 증가'
              onClick={handleIncrease}
            >
              <img src={plus} alt='수량 증가 버튼' />
            </button>
          </div>
        </div>
      ) : (
        <p className='flex h-[40px] w-full items-center text-sm text-gray-400 md:text-base'>사이즈를 선택해주세요!</p>
      )}
    </div>
  );
};

export default CounterBtn;
