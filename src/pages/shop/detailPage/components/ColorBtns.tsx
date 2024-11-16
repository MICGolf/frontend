import { useState } from 'react';
import { ColorBtnsProps } from '../types';
import { Color } from '@/assets/dummys/types';

const ColorBtns = ({ data, onSelect, onChange }: ColorBtnsProps) => {
  const [selectedColorId, setSelectedColorId] = useState<string | null>(null);

  const handleColorChange = (color: Color) => {
    if (selectedColorId === color.id) {
      setSelectedColorId(null);
      onSelect(null);
    } else {
      setSelectedColorId(color.id);
      onSelect(color);
    }
    onChange(color.images);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='flex w-full flex-col gap-2 md:border-none'>
      <h3 className='text-lg font-light md:text-2xl'>색상</h3>
      <ul className='flex flex-wrap gap-[7px]'>
        {data.map((color) => (
          <li
            key={color.id}
            className={`flex items-center justify-center border ${selectedColorId === color.id ? 'border-primary' : 'border-transparent'} p-[1px]`}
          >
            <button
              type='button'
              onClick={() => handleColorChange(color)}
              className={`h-7 w-7 border border-gray-300`}
              style={{ backgroundColor: color.hex }}
              aria-label={`색상: ${color.name}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorBtns;
