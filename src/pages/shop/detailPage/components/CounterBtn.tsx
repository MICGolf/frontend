import minus from '@/assets/icons/minus.svg';
import plus from '@/assets/icons/plus.svg';
import { AnimatePresence, motion } from 'framer-motion';
import CounterMessage from '@/components/CounterMessage';
import { OptionState } from '../types';
import { useEffect, useState } from 'react';

interface CounterBtnProps {
  selectedOption: OptionState;
  isSoldOut: boolean;
  onSelect: (updatedOption: OptionState) => void;
}

const CounterBtn = ({ selectedOption, isSoldOut, onSelect }: CounterBtnProps) => {
  const [count, setCount] = useState<number>(1);
  const maxCount = selectedOption.selectedSize?.stock ?? 0; // 최대 수량
  const isSizeSelected = selectedOption.selectedSize !== null;
  const isMaxStock = count >= maxCount;

  const handleDecrease = () => {
    if (count > 1) {
      onSelect({
        ...selectedOption,
        amount: count - 1,
      });
    }
  };

  const handleIncrease = () => {
    if (!isMaxStock) {
      onSelect({
        ...selectedOption,
        amount: count + 1,
      });
    }
  };

  useEffect(() => {
    onSelect({
      ...selectedOption,
      amount: 1,
    });
  }, [selectedOption.selectedSize, selectedOption.selectedColor]);

  useEffect(() => {
    if (!selectedOption.amount) {
      setCount(0);
    } else {
      setCount(selectedOption.amount);
    }
  }, [selectedOption.amount]);

  return (
    <div className='relative flex flex-col justify-center w-full gap-2 md:justify-start'>
      <h3 className='text-lg font-light md:text-2xl'>수량</h3>
      {!isSizeSelected && (
        <p className='flex h-[30px] w-full items-center text-sm text-gray-400 md:h-[40px] md:text-base'>
          사이즈를 선택해주세요!
        </p>
      )}
      {isSizeSelected && (
        <div className='flex w-full'>
          <div className='relative flex h-[30px] w-[100px] items-center justify-around border border-gray-200 md:h-[40px] md:w-[130px]'>
            {/* 수량 감소 버튼 */}
            <button
              type='button'
              className='flex items-center justify-center flex-1 w-full h-full transition-all duration-300 hover:bg-gray-100 active:bg-gray-100'
              aria-label='수량 감소'
              onClick={handleDecrease}
              disabled={count <= 1}
            >
              <img src={minus} alt='수량 감소 버튼' />
            </button>

            {/* 수량 표시 */}
            <div className='relative flex h-[24px] flex-1 items-center justify-center overflow-hidden text-[16px] font-thin'>
              <AnimatePresence mode='popLayout'>
                <motion.span
                  key={count}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className='absolute bg-transparent cursor-default'
                >
                  {isSoldOut ? 0 : count}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* 수량 증가 버튼 */}
            <button
              type='button'
              className='flex items-center justify-center flex-1 w-full h-full transition-all duration-300 hover:bg-gray-100 active:bg-gray-100'
              aria-label='수량 증가'
              onClick={handleIncrease}
              disabled={isMaxStock}
            >
              <img src={plus} alt='수량 증가 버튼' />
            </button>

            {/* 최대 수량 메시지 */}
            <CounterMessage isOpen={isMaxStock} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CounterBtn;
