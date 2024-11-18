interface MobileDropdownBtn {
  setIsOpen: (state: string) => void;
}

const MobileDropdownBtn = ({ setIsOpen }: MobileDropdownBtn) => {
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 체크박스 상태 변경에 따른 추가 로직
    if (e.target.checked) {
      setIsOpen('open'); // 드롭다운 열기 상태
    } else {
      setIsOpen(''); // 드롭다운 닫기 상태
    }
  };

  return (
    <div className='absolute left-0 top-0 flex h-10 w-full transition-colors duration-300 hover:bg-gray-100'>
      <label htmlFor='mobileDropdown' className='flex w-full cursor-pointer items-center justify-center'>
        <div className='h-[5px] w-[84px] rounded-full border bg-primary'></div>
        <input
          type='checkbox'
          name='mobileDropdown'
          id='mobileDropdown'
          className='appearance-none'
          defaultChecked={false}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
};

export default MobileDropdownBtn;
