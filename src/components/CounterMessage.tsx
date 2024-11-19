import { AnimatePresence, motion } from 'framer-motion';

const CounterMessage = ({ isOpen, position = 'row' }: { isOpen: boolean; position: 'row' | 'col' }) => {
  const pos = position === 'row' ? '-right-[120px]' : '-top-[40px]';
  return (
    <AnimatePresence mode='wait'>
      {isOpen && (
        <motion.span
          key='message'
          initial={{ opacity: 0, scale: 0.8, x: 40 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
            transition: {
              type: 'spring',
              damping: 18,
              stiffness: 300,
              duration: 0.3,
            },
          }}
          exit={{
            opacity: 0,
            scale: 0.95,
            x: 20,
            transition: {
              type: 'spring',
              damping: 18,
              stiffness: 300,
              duration: 0.3,
            },
          }}
          className={`absolute ${pos} bg-error px-2 py-1 text-center text-[12px] text-secondary`}
        >
          최대수량입니다.
        </motion.span>
      )}
    </AnimatePresence>
  );
};

export default CounterMessage;
