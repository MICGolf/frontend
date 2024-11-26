import DefaultImg from '@/assets/imgs/logoText.svg';
import AddBannerOrPromotion from './components/AddBannerOrPromotion';
import { Banner } from './type';
import { PromotionDataList } from './components/PromotionDataList';

const bannerListArray: Banner[] = [
  {
    id: 1,
    title: 'PromotionPage',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/1',
    image: DefaultImg,
    isActive: true,
  },
  {
    id: 2,
    title: 'PromotionPage',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/2',
    image: DefaultImg,
    isActive: true,
  },
  {
    id: 3,
    title: 'PromotionPage',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/3',
    image: DefaultImg,
    isActive: true,
  },
];

export const PromotionPage = () => {
  return (
    <>
      <AddBannerOrPromotion location='promotion' />
      <PromotionDataList data={bannerListArray} />
    </>
  );
};

export default PromotionPage;
