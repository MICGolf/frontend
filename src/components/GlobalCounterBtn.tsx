import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CounterMessage from './CounterMessage';
import { CartItemData2 } from '@/assets/dummys/types';

interface CounterBtnProps {
  data: CartItemData2;
  maxCount: number;
  handleUpdateCount: (id: string, newCount: number) => void;
}

const GlobalCounterBtn = ({ data, maxCount, handleUpdateCount }: CounterBtnProps) => {
  const [isMaxStock, setIsMaxStock] = useState<boolean>(false);
  const [count, setCount] = useState(data.amount || 1);

  useEffect(() => {
    if (count === maxCount) {
      setIsMaxStock(true);
    } else {
      setIsMaxStock(false);
    }
  }, [count, maxCount]);

  const handleDecrease = () => {
    if (count > 1) {
      const newCount = count - 1;
      setCount(newCount);
      handleUpdateCount(data.id, newCount);
    } else {
      return;
    }
  };

  const handleIncrease = () => {
    if (!maxCount) return;
    if (count < maxCount) {
      const newCount = count + 1;
      setCount(newCount);
      handleUpdateCount(data.id, newCount);
    }
  };

  return (
    <div className='flex h-[40px] w-[130px]'>
      <div className='relative flex items-center justify-around w-full border border-gray200'>
        <button
          type='button'
          className='flex items-center justify-center flex-1 w-full h-full transition-all duration-300 hover:bg-gray-100 active:bg-gray-100'
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
          className='flex items-center justify-center flex-1 w-full h-full transition-all duration-300 hover:bg-gray-100 active:bg-gray-100'
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
