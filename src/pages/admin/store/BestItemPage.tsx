import BestItemDataList from './components/BestItemDataList';
import AddBestItemOrMdsChoice from './components/AddBestItemOrMdsChoice';

const BestItemPage = () => {
  return (
    <>
      <AddBestItemOrMdsChoice location='best' />
      <BestItemDataList />
    </>
  );
};

export default BestItemPage;
