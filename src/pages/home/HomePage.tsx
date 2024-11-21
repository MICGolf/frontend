import BannerSection from './components/BannerSection';
import Section from './components/Section';
import PromotionSection from './components/PromotionSection';
import Intro from './components/Intro';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Homeimages1, Homeimages2, promotionImage } from '@/assets/dummys/productListDatas';
import { useMobileScrollStore } from '@/config/store';
import { useQuery } from '@tanstack/react-query';
import { homeApi } from '@/api';
import EventPopup from './components/EventPopup';
import { client } from '@/api/client';

const HomePage = () => {
  const [showIntro, setShowIntro] = useState(false); // 애니메이션 실행 여부
  const { setIsMobileMode } = useMobileScrollStore();

  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await client.get('products?page=1&page_size=10&sort=created_at&order=desc');
      console.log(data);
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const isIntroShown = sessionStorage.getItem('introShown');

    if (!isIntroShown) {
      setShowIntro(true); // 애니메이션 실행
      setIsMobileMode(true); // 스크롤 방지

      const timer = setTimeout(() => {
        setShowIntro(false); // 애니메이션 종료
        setIsMobileMode(false);
        sessionStorage.setItem('introShown', 'true'); // sessionStorage에 저장
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const { data: bestProductData } = useQuery({
    queryKey: ['BestProduct'],
    queryFn: async () => {
      const response = await homeApi.getBestProductOrMdsChoice({ type: 'best' });
      return response.data;
    },
  });
  console.log('bestProductData', bestProductData);

  const { data: mdsChoiceData } = useQuery({
    queryKey: ['BestProduct'],
    queryFn: async () => {
      const response = await homeApi.getBestProductOrMdsChoice({ type: 'md_pick' });
      return response.data;
    },
  });
  console.log('mdsChoiceData', mdsChoiceData);

  return (
    <div className='relative'>
      {/* 인트로 */}
      <Intro showIntro={showIntro} />

      {/* 배너 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
        <BannerSection />
      </motion.div>

      {/* 컨텐츠 */}
      <div className='relative z-10 mt-[100vh] bg-white'>
        <Section title='Best Product' images={Homeimages2} />
        <PromotionSection image={promotionImage[0]} />
        <Section title="MD's Choice" images={Homeimages1} />
        <EventPopup images={Homeimages1} />
      </div>
    </div>
  );
};

export default HomePage;
