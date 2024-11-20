import DefaultImg from '@/assets/imgs/logoText.svg';
import { BannerDataList } from './components/BannerDataList';
import { AddData } from './components/AddData';
import { Banner } from './type';

const bannerListArray: Banner[] = [
  {
    id: 1,
    title: '믹골프 런칭 특별 프로모션',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/1',
    image: DefaultImg,
    isActive: true,
  },
  {
    id: 2,
    title: '믹골프 런칭 특별 프로모션',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/2',
    image: DefaultImg,
    isActive: true,
  },
  {
    id: 3,
    title: '믹골프 런칭 특별 프로모션',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/3',
    image: DefaultImg,
    isActive: true,
  },
];

export const BannerPage = () => {
  return (
    <>
      <AddData />
      <BannerDataList data={bannerListArray} />
    </>
  );
};
