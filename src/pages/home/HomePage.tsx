import BannerSection from './components/BannerSection';
import Section from './components/Section';
import PromotionSection from './components/PromotionSection';
import { motion } from 'framer-motion';
import { Homeimages1, Homeimages2, promotionImage } from '@/assets/dummys/productListDatas';
// import { useQuery } from '@tanstack/react-query';
// import { homeApi } from '@/api';

const HomePage = () => {
  // const { data: bestProductData } = useQuery({
  //   queryKey: ['BestProduct'],
  //   queryFn: async () => {
  //     const response = await homeApi.getBestProductOrMdsChoice({ type: 'best' });
  //     return response.data;
  //   },
  // });

  // const { data: mdsChoiceData } = useQuery({
  //   queryKey: ['mdsChoiceData'],
  //   queryFn: async () => {
  //     const response = await homeApi.getBestProductOrMdsChoice({ type: 'md_pick' });
  //     return response.data;
  //   },
  // });
  console.log('메인 페이지 입장');

  return (
    <div className='relative'>
      {/* 배너 */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 1 }}>
        <BannerSection />
      </motion.div>

      {/* 컨텐츠 */}
      <div className='relative z-10 mt-[100vh] bg-white'>
        <Section title='Best Product' images={Homeimages2} />
        <PromotionSection image={promotionImage[0]} />
        <Section title="MD's Choice" images={Homeimages1} />
      </div>
    </div>
  );
};

export default HomePage;
