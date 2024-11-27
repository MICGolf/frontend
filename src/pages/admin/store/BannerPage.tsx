import BannerDataList from './components/BannerDataList';
import AddBannerOrPromotion from './components/AddBannerOrPromotion';

const BannerPage = () => {
  return (
    <>
      <AddBannerOrPromotion location='banner' />
      <BannerDataList />
    </>
  );
};

export default BannerPage;
