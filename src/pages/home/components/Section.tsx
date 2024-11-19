import { motion } from 'framer-motion';
import { MultipleSwiper } from './MultipleSwiper';

type SectionProps = {
  title: string;
  images: string[];
};

// WARNING: images 의 데이터 형식이 어떻게 되는지 확인 후 타입 변경이 필요할 수 있음.
// WARNING: 또는 직접적으로 데이터를 컴포넌트에서 불러오는 방식도 고려해야함.
export const Section = ({ title, images }: SectionProps) => {
  const sectionVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      variants={sectionVariant}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, amount: 0.3 }}
      className='px-6 py-16 md:px-12 md:py-24 lg:px-16 lg:py-32'
    >
      <motion.h2 variants={itemVariant} className='mb-8 text-4xl font-bold md:text-5xl lg:text-6xl'>
        {title}
      </motion.h2>
      <motion.div variants={itemVariant}>
        <MultipleSwiper images={images} />
      </motion.div>
    </motion.section>
  );
};
