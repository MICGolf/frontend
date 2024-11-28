import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

type SectionProps = {
  title: string;
  images: string[];
};

// WARNING: images 의 데이터 형식이 어떻게 되는지 확인 후 타입 변경이 필요할 수 있음.
// WARNING: 또는 직접적으로 데이터를 컴포넌트에서 불러오는 방식도 고려해야함.
const Section = ({ title, images }: SectionProps) => {
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
      className='mx-auto max-w-[1920px] px-6 py-16 md:px-12 md:py-24 lg:px-[130px] lg:py-32'
    >
      <motion.h2 variants={itemVariant} className='mb-8 text-2xl font-bold md:text-3xl lg:text-4xl'>
        {title}
      </motion.h2>
      <motion.div variants={itemVariant}>
        <div className='relative mx-auto w-full'>
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            slidesPerGroup={1}
            spaceBetween={70}
            navigation
            pagination={{
              clickable: true,
              el: '.swiper-pagination',
              bulletClass: 'swiper-pagination-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active',
              renderBullet: (_, className) => {
                return `
                <button 
                  class="${className} relative focus:outline-none !my-6 !py-4 !bg-transparent !m-0 w-full"
                >
                  <div class="h-[2px] w-full transition-all duration-300 bg-black">
                  </div>
                </button>
                `;
              },
            }}
            breakpoints={{
              1024: {
                slidesPerView: 2,
                slidesPerGroup: 2,
              },
              1280: {
                slidesPerView: 3,
                slidesPerGroup: 3,
              },
              1560: {
                slidesPerView: 4,
                slidesPerGroup: 4,
              },
            }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className='flex h-[600px] items-center justify-center bg-gray-100'>
                  <img src={image} alt={`Slide ${index}`} className='h-full w-full object-cover' />
                </div>
              </SwiperSlide>
            ))}
            {/* 점 버튼을 출력할 컨테이너 */}
            <div className='swiper-pagination relative flex w-full !py-6'></div>
          </Swiper>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Section;
