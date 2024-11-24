import { useEffect, useState } from 'react';
import { OptionState } from '../types';
import { ProductOption, ProductSize } from '@/api/type';

interface SizeBtnsProps {
  data: ProductOption[];
  selectedOption: OptionState;
  onSelect: (prevOption: OptionState) => void;
}

const SizeBtns = ({ data, selectedOption, onSelect }: SizeBtnsProps) => {
  const [selectedSizeName, setSelectedSizeName] = useState<string>('');
  const isColorSelected = !!selectedOption.selectedColor;

  // 선택한 컬러에 해당하는 사이즈 데이터 필터링
  const filteredSizes = isColorSelected
    ? data.find((option) => option.color === selectedOption.selectedColor?.color)?.sizes || []
    : [];

  const handleSizeChange = (size: ProductSize) => {
    const isSelected = selectedSizeName === size.size;
    setSelectedSizeName(isSelected ? '' : size.size);

    onSelect({
      ...selectedOption,
      selectedSize: isSelected ? null : size,
      amount: 1,
    });
  };

  useEffect(() => {
    setSelectedSizeName('');
  }, [selectedOption.selectedColor]); // 색상이 변경되면 사이즈 초기화

  return (
    <div className='flex flex-col w-full gap-2'>
      <h3 className='text-lg font-light md:text-2xl'>사이즈</h3>
      <div className='flex flex-wrap gap-2' role='radiogroup' aria-label='사이즈 선택'>
        {!isColorSelected && (
          <p className='h-[30px] w-full text-sm text-gray-400 md:h-[40px] md:text-base'>색상을 선택해주세요!</p>
        )}
        {isColorSelected &&
          filteredSizes &&
          filteredSizes.map((item) => (
            <label
              key={item.size}
              htmlFor={`${item.size.trim()}RadioButton`}
              className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center border-b border-black font-light transition-colors duration-300 hover:bg-black hover:text-white md:h-[40px] md:w-[40px] ${
                selectedSizeName === item.size ? 'bg-black text-white' : 'bg-white text-black'
              }`}
            >
              <input
                type='radio'
                id={`${item.size.trim()}RadioButton`}
                name={`${item.size.trim()}RadioButton`}
                value={item.size}
                checked={selectedSizeName.trim() === item.size.trim()}
                onChange={() => handleSizeChange(item)}
                className='sr-only'
                aria-label={`사이즈: ${item.size}`}
              />
              <span className='text-sm md:text-base'>{item.size}</span>
            </label>
          ))}
      </div>
    </div>
  );
};

export default SizeBtns;
