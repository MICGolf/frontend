interface ListHeaderProps<T> {
  HeaderListArray: { className: string; title: string }[];
  checkedList?: T[];
  setCheckedList?: (checkedList: T[]) => void;
  listArray?: T[];
}

const ListHeader = <T,>({ HeaderListArray, checkedList, setCheckedList, listArray }: ListHeaderProps<T>) => {
  const allChecked = checkedList?.length === listArray?.length;

  const toggleAllCheckboxes = () => {
    if (!listArray) return;
    if (allChecked && setCheckedList && listArray) {
      setCheckedList([]);
    } else if (listArray && setCheckedList) {
      setCheckedList(listArray);
    } else {
      return null;
    }
  };

  return (
    <div className='flex items-center self-stretch justify-between text-center border-b justify-items-center border-neutral-400 bg-neutral-100'>
      {HeaderListArray.map((item) => (
        <div key={item.title} className={`${item.className} py-2`}>
          {item.title === '체크박스' ? (
            <input type='checkbox' checked={allChecked} onChange={toggleAllCheckboxes} />
          ) : (
            item.title
          )}
        </div>
      ))}
    </div>
  );
};

export default ListHeader;
