import Checkbox from '@/components/checkbox/Checkbox';

const ListHeader = ({
  HeaderListArray,
  checkedList,
  setCheckedList,
  listArray,
}: {
  HeaderListArray: { className: string; title: string }[];
  checkedList: { id: number; productNumber: string }[];
  setCheckedList: (checkedList: { id: number; productNumber: string }[]) => void;
  listArray: { id: number; productNumber: string }[];
}) => {
  const allChecked = checkedList.length === listArray.length; // 전체 선택 여부

  const toggleAllCheckboxes = () => {
    if (allChecked) {
      setCheckedList([]);
    } else {
      setCheckedList(listArray.map((item) => ({ id: item.id, productNumber: item.productNumber }))); // 전체 선택
    }
  };
  return (
    <div className='flex items-center justify-stretch justify-items-center self-stretch border-b border-neutral-400 bg-neutral-100 text-center'>
      {HeaderListArray.map((item) => (
        <div key={item.title} className={`${item.className} py-2`}>
          {item.title === '체크박스' ? (
            <Checkbox disabled={false} checked={allChecked} onChange={() => toggleAllCheckboxes()} />
          ) : (
            item.title
          )}
        </div>
      ))}
    </div>
  );
};

export default ListHeader;
