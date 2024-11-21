import BannerSection from './components/BannerSection';
import Section from './components/Section';
import PromotionSection from './components/PromotionSection';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Homeimages1, Homeimages2, promotionImage } from '@/assets/dummys/productListDatas';
import { useQuery } from '@tanstack/react-query';
import { homeApi } from '@/api';
import { client } from '@/api/client';

const HomePage = () => {
  useEffect(() => {
    const fetchApi = async () => {
      const { data } = await client.get('products?page=1&page_size=10&sort=created_at&order=desc');
      console.log(data);
    };
    fetchApi();
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
