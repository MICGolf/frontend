import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { bannerImage, Homeimages1, Homeimages2, promotionImage } from '@/assets/dummys/productListDatas';
import { BannerSwiper } from './components/BannerSwiper';
import logoWhite from '@/assets/imgs/logoWhite.svg';
import { useMobileScrollStore } from '@/config/store';
import { Section } from './components/Section';
import { PromotionSection } from './components/PromotionSection';

export default function HomePage() {
  const [showIntro, setShowIntro] = useState(false); // 애니메이션 실행 여부
  const { setIsMobileMode } = useMobileScrollStore();

  useEffect(() => {
    const isIntroShown = sessionStorage.getItem('introShown');

    if (!isIntroShown) {
      setShowIntro(true); // 애니메이션 실행
      setIsMobileMode(true);

      const timer = setTimeout(() => {
        setShowIntro(false); // 애니메이션 종료
        setIsMobileMode(false);
        sessionStorage.setItem('introShown', 'true'); // sessionStorage에 저장
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className='relative'>
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
                className='text-3xl font-bold text-white md:text-4xl lg:text-5xl'
              >
                Make It Count
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 배너 */}
      {!showIntro && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
          <BannerSwiper images={bannerImage} />
        </motion.div>
      )}

      {/* 컨텐츠 */}
      <div className='relative z-10 mt-[100vh] bg-white'>
        <Section title='Best Product' images={Homeimages2} />
        <PromotionSection image={promotionImage[0]} />
        <Section title="MD's Choice" images={Homeimages1} />
      </div>
    </div>
  );
}
