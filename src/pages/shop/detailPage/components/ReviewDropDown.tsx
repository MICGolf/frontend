import dropDownIco from '@/assets/icons/dropDownIco.svg';

const ReviewDropdown = () => {
  return (
    <button className='w-full border-gray-300 p-2'>
      <span className='flex items-center justify-end gap-1'>
        ★★★★☆ (2000) <img className='object-contain' src={dropDownIco} alt='' />
      </span>
    </button>
  );
};

export default ReviewDropdown;
