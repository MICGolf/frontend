import AddBannerOrPromotion from './components/AddBannerOrPromotion';
import PromotionDataList from './components/PromotionDataList';

const PromotionPage = () => {
  return (
    <>
      <AddBannerOrPromotion location='promotion' />
      <PromotionDataList />
    </>
  );
};

export default PromotionPage;
