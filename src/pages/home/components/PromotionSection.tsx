import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

type PromotionSectionProps = {
  image: string;
};

// WARNING: images 의 데이터 형식이 어떻게 되는지 확인 후 타입 변경이 필요할 수 있음.
// WARNING: 또는 직접적으로 데이터를 컴포넌트에서 불러오는 방식도 고려해야함.
export const PromotionSection = ({ image }: PromotionSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 1 }}
      className='relative h-[40vh] overflow-hidden sm:h-[50vh] md:h-[60vh] lg:h-[70vh] xl:h-[80vh]'
    >
      <img src={image} alt='Promotion' className='h-full w-full object-cover' />
      <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50'>
        <div className='text-center text-white'>
          <h2 className='mb-4 text-4xl font-bold md:text-5xl lg:text-6xl'>믹골프 런칭 특별 프로모션</h2>
          <p className='mb-8 text-xl md:text-2xl'>놓치면 후회할 특별한 제안</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className='inline-flex items-center rounded-full bg-white px-6 py-3 text-lg font-semibold text-black'
          >
            바로가기
            <ArrowRight className='ml-2 h-5 w-5' />
          </motion.button>
        </div>
      </div>
    </motion.section>
  );
};
