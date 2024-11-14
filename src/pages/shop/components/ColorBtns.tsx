import { useState } from 'react';
import { ColorBtnsProps } from '../detailPage/types';
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
    <div className='flex flex-col gap-2'>
      <h3 className='text-2xl font-light'>색상</h3>
      <ul className='flex gap-[7px]'>
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
