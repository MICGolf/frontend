import { useState, useEffect } from 'react';
import { OptionState } from '../types';
import { ProductOption } from '@/api/type';

interface ColorBtnsProps {
  data: ProductOption[];
  selectedOption: OptionState;
  onSelect: (prevOption: OptionState) => void;
}

const ColorBtns = ({ data, selectedOption, onSelect }: ColorBtnsProps) => {
  const [selectedColorName, setSelectedColorName] = useState<string>('');

  // 컬러 radio 버튼 초기값 세팅
  useEffect(() => {
    setSelectedColorName(selectedOption.selectedColor?.color || '');
  }, [selectedOption.selectedColor]);

  const handleColorChange = (item: ProductOption) => {
    const isSelected = selectedColorName.trim() === item.color.trim();
    setSelectedColorName(isSelected ? '' : item.color);
    // 컬러가 변경될 때 사이즈와 수량 초기화
    onSelect({
      ...selectedOption,
      optionData: isSelected ? null : item,
      selectedColor: isSelected ? null : { color: item.color, color_code: item.color_code },
      selectedSize: null, // 사이즈 초기화
      amount: 1,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='flex flex-col w-full gap-2 md:border-none'>
      <h3 className='text-lg font-light md:text-2xl'>색상</h3>
      <div className='flex flex-wrap gap-[7px]' role='radiogroup' aria-label='색상 선택'>
        {data.map((item) => (
          <label
            key={item.color}
            htmlFor={`${item.color.trim()}RadioButton`}
            className={`flex items-center justify-center border ${
              selectedColorName.trim() === item.color.trim() ? 'border-primary' : 'border-transparent'
            } cursor-pointer p-[1px]`}
          >
            <input
              type='radio'
              id={`${item.color.trim()}RadioButton`}
              name={`${item.color.trim()}RadioButton`}
              value={item.color}
              checked={selectedColorName.trim() === item.color.trim()}
              onChange={() => handleColorChange(item)}
              className='sr-only'
              aria-label={`색상: ${item.color}`}
            />
            <span
              className={`block h-5 w-5 border border-gray-300 md:h-7 md:w-7`}
              style={{ backgroundColor: item.color_code }}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default ColorBtns;
