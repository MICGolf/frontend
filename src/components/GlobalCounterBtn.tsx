import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CounterMessage from './CounterMessage';

interface CounterBtnProps {
  amount: number;
  count: number;
  setCount: (newCount: number) => void;
  maxCount: number;
}

const GlobalCounterBtn = ({ amount, count, setCount, maxCount }: CounterBtnProps) => {
  const [isMaxStock, setIsMaxStock] = useState<boolean>(false);

  useEffect(() => {
    if (count === maxCount) {
      setIsMaxStock(true);
    } else {
      setIsMaxStock(false);
    }
  }, [count, maxCount]);

  useEffect(() => {
    setCount(amount);
  }, []);

  const handleDecrease = () => {
    if (count > 1) {
      setCount(count - 1);
    } else {
      return;
    }
  };

  const handleIncrease = () => {
    if (!maxCount) return;
    if (count < maxCount) {
      setCount(count + 1);
    }
  };

  return (
    <div className='flex h-[40px] w-[130px]'>
      <div className='relative flex w-full items-center justify-around border border-gray200'>
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
              {count}
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

        <CounterMessage isOpen={isMaxStock} position={'col'} />
      </div>
    </div>
  );
};

export default GlobalCounterBtn;
