import { MdsChoiceDataList } from './components/MdsChoiceDataList';
import AddBestItemOrMdsChoice from './components/AddBestItemOrMdsChoice';

export const MdsChoicePage = () => {
  return (
    <>
      <AddBestItemOrMdsChoice location='md_pick' />
      <MdsChoiceDataList />
    </>
  );
};

export default MdsChoicePage;
