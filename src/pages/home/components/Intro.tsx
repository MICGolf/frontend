import { AnimatePresence, motion } from 'framer-motion';
import logoWhite from '@/assets/imgs/logoWhite.svg';

type IntroProps = {
  showIntro: boolean;
};

const Intro = ({ showIntro }: IntroProps) => {
  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className='fixed inset-0 z-[100] flex items-center justify-center bg-black'
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            className='flex flex-col items-center space-y-4'
          >
            <img src={logoWhite} alt='믹골프 로고' className='w-64 md:w-80' />
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className='text-3xl font-light text-white md:text-4xl lg:text-5xl'
            >
              Make It Count
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Intro;
