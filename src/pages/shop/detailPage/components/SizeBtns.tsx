import { useEffect, useState } from 'react';
import { SizeBtnsProps } from '../types';
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
    <div className='flex w-full flex-col gap-2'>
      <h3 className='text-lg font-light md:text-2xl'>사이즈</h3>
      <ul className='flex flex-wrap gap-2'>
        {data ? (
          data.sizes?.map((size, idx) => (
            <li key={idx}>
              <button
                type='button'
                onClick={() => handleSizeChange(size)}
                className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center border-b border-black font-light transition-colors duration-300 hover:bg-black hover:text-white md:h-[40px] md:w-[40px] ${
                  selectedSize === size.name ? 'bg-black text-white' : 'bg-white text-black'
                }`}
                aria-label={`사이즈: ${size.name}`}
              >
                <span className='text-sm md:text-base'>{size.name}</span>
              </button>
            </li>
          ))
        ) : (
          <p className='flex h-[10px] w-full items-center text-sm text-gray-400 md:text-base'>색상을 선택해주세요!</p>
        )}
        {}
      </ul>
    </div>
  );
};

export default SizeBtns;
