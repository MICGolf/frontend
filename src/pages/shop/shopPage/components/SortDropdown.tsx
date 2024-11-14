import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const SortDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
    <div className='relative'>
      <label
        htmlFor='sort'
        className='flex items-center justify-end gap-1 cursor-pointer'
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>최신순</span>
        <ChevronDown className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        <input
          type='checkbox'
          name='sort'
          id='sort'
          className='appearance-none'
          checked={isOpen}
          onChange={() => setIsOpen((prev) => !prev)}
        />
      </label>

      <div
        ref={dropdownRef}
        className='absolute right-0 z-50 w-32 mt-2 overflow-hidden transition-all duration-300 ease-in-out bg-white border border-gray-300 shadow-lg'
        style={{ maxHeight: '0', opacity: '0' }}
      >
        <ul>
          <li className='px-4 py-2 cursor-pointer hover:bg-gray-100'>최신순</li>
          <li className='px-4 py-2 cursor-pointer hover:bg-gray-100'>가격 낮은순</li>
          <li className='px-4 py-2 cursor-pointer hover:bg-gray-100'>가격 높은순</li>
        </ul>
      </div>
    </div>
  );
};

export default SortDropdown;
