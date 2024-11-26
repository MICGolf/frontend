import DefaultImg from '@/assets/imgs/logoText.svg';
import { Banner } from './type';
import { MdsChoiceDataList } from './components/MdsChoiceDataList';
import AddBestItemOrMdsChoice from './components/AddBestItemOrMdsChoice';

const bannerListArray: Banner[] = [
  {
    id: 1,
    title: 'MdsChoicePage',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/1',
    image: DefaultImg,
    isActive: true,
  },
  {
    id: 2,
    title: 'MdsChoicePage',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/2',
    image: DefaultImg,
    isActive: true,
  },
  {
    id: 3,
    title: 'MdsChoicePage',
    subTitle: '놓치면 후회할 특별한 제안',
    eventUrl: 'http://localhost:5173/event/3',
    image: DefaultImg,
    isActive: true,
  },
];

export const MdsChoicePage = () => {
  return (
    <>
      <AddBestItemOrMdsChoice location='md_pick' />
      <MdsChoiceDataList data={bannerListArray} />
    </>
  );
};

export default MdsChoicePage;
