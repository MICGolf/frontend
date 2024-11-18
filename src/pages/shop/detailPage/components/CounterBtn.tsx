import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { useEffect, useState } from 'react';
import { CounterBtnProps } from '../types';
import { AnimatePresence, motion } from 'framer-motion';
import CounterMessage from './CounterMessage';

const CounterBtn = ({
  count,
  setCount,
  maxCount,
  setMaxCount,
  selectedSize,
  selectedColor,
  isSoldOut,
}: CounterBtnProps) => {
  const [isMaxStock, setIsMaxStock] = useState<boolean>(false);

  useEffect(() => {
    if (count === maxCount) {
      setIsMaxStock(true);
    } else {
      setIsMaxStock(false);
    }
  }, [count, maxCount]);

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
    <div className='relative flex w-full flex-col justify-center gap-2 md:justify-start'>
      <h3 className='text-lg font-light md:text-2xl'>수량</h3>
      {selectedColor && selectedSize ? (
        <div className='flex w-full'>
          <div className='relative flex h-[40px] w-[130px] items-center justify-around border border-gray200'>
            <button
              type='button'
              className='flex h-full w-full flex-1 items-center justify-center transition-all duration-300 hover:bg-gray-100 active:bg-gray-100'
              aria-label='수량 감소'
              onClick={handleDecrease}
            >
              <img src={minus} alt='수량 감소 버튼' />
            </button>

            <p className='relative flex h-[24px] flex-1 items-center justify-center overflow-hidden text-[16px] font-thin'>
              <AnimatePresence mode='popLayout'>
                <motion.span
                  key={count}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`absolute cursor-default bg-transparent`}
                >
                  {isSoldOut ? 0 : count}
                </motion.span>
              </AnimatePresence>
            </p>

            <button
              type='button'
              className='flex h-full w-full flex-1 items-center justify-center transition-all duration-300 hover:bg-gray-100 active:bg-gray-100'
              aria-label='수량 증가'
              onClick={handleIncrease}
            >
              <img src={plus} alt='수량 증가 버튼' />
            </button>

            <CounterMessage isOpen={isMaxStock} />
          </div>
        </div>
      ) : (
        <p className='flex h-[40px] w-full items-center text-sm text-gray-400 md:text-base'>사이즈를 선택해주세요!</p>
      )}
    </div>
  );
};

export default CounterBtn;
