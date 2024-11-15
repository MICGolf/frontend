import { SortMode } from '@/hooks/useSort';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface SortDropdownProps {
  currentSort: string;
  setCurrentSort: (value: SortMode) => void;
}

const sortModes = [
  { id: 1, mode: '최신순' },
  { id: 2, mode: '가격 낮은순' },
  { id: 3, mode: '가격 높은순' },
];

const SortDropdown = ({ currentSort, setCurrentSort }: SortDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value as SortMode;
    setCurrentSort(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        labelRef.current &&
        !labelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownRef.current) {
      if (isOpen) {
        dropdownRef.current.style.maxHeight = `${dropdownRef.current.scrollHeight}px`;
        dropdownRef.current.style.opacity = '1';
      } else {
        dropdownRef.current.style.maxHeight = '0';
        dropdownRef.current.style.opacity = '0';
      }
    }
  }, [isOpen]);

  return (
    <div className='relative flex items-center justify-end'>
      <label ref={labelRef} htmlFor='sort' className='flex gap-1 cursor-pointer'>
        <input
          type='checkbox'
          id='sort'
          className='appearance-none'
          checked={isOpen}
          onChange={() => setIsOpen((prev) => !prev)}
        />
        <span>{currentSort}</span>
        <ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </label>

      <div
        ref={dropdownRef}
        className='absolute right-0 top-[20px] z-50 mt-2 w-32 overflow-hidden border border-gray-300 bg-white shadow-lg transition-all duration-300 ease-in-out'
        style={{ maxHeight: '0', opacity: '0' }}
      >
        <ul>
          {sortModes.map((item) => (
            <li key={item.id}>
              <button
                className='w-full px-4 py-2 cursor-pointer text-start hover:bg-gray-100'
                onClick={handleClick}
                value={item.mode}
              >
                {item.mode}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SortDropdown;
