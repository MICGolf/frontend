import { useEffect, useState } from 'react';
import { SizeBtnsProps } from '../detailPage/types';
import { Size } from '@/assets/dummys/types';

const SizeBtns = ({ data, onSelect }: SizeBtnsProps) => {
  const [selectedSize, setSelectedSize] = useState('');

  const handleSizeChange = (size: Size) => {
    if (selectedSize === size.name) {
      // 동일한 사이즈를 클릭하면 선택 해제
      setSelectedSize('');
      onSelect(null); // 선택 해제 시 null 전달
    } else {
      // 다른 사이즈를 클릭하면 선택 설정
      setSelectedSize(size.name);
      onSelect(size);
    }
  };

  useEffect(() => {
    setSelectedSize('');
  }, [data]);

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-2xl font-light'>사이즈</h3>
      <ul className='flex gap-[10px]'>
        {data ? (
          data.sizes?.map((size, idx) => (
            <li key={idx}>
              <button
                type='button'
                onClick={() => handleSizeChange(size)}
                className={`flex h-[40px] w-[40px] cursor-pointer items-center justify-center border-b border-black font-light ${
                  selectedSize === size.name ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                aria-label={`사이즈: ${size.name}`}
              >
                {size.name}
              </button>
            </li>
          ))
        ) : (
          <p className='flex h-[40px] items-center text-gray-400'>색상을 선택해주세요!</p>
        )}
        {}
      </ul>
    </div>
  );
};

export default SizeBtns;
