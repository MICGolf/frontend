import { Color } from '@/assets/dummys/types';
import { ColorBtnsProps } from '../detailPage/types';

const ColorBtns = ({ data, optionList, onSelect, setOptionList }: ColorBtnsProps) => {
  const handleClick = (color: Color) => {
    // optionList 배열안에 해당 조건에 일치하는 것이 하나라도 있으면 true
    const isAlreadySelected = optionList.some((item) => item.id === color.id);
    if (isAlreadySelected) {
      setOptionList((prev) => [...prev]);
    } else {
      setOptionList((prev) => [color, ...prev]);
    }

    onSelect(color);
  };

  return (
    <div className='flex flex-col gap-2'>
      <h3 className='text-2xl font-medium'>색상</h3>
      <ul className='flex gap-[7px]'>
        {data.map((color) => (
          <li key={color.id}>
            <button
              className={'h-7 w-7'}
              style={{ backgroundColor: color.hex }}
              aria-label={`색상: ${color}`}
              role='button'
              onClick={() => handleClick(color)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorBtns;
