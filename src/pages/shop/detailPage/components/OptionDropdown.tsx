import { AdditionalOption } from '@/assets/dummys/types';
import { ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface OptionDropdownProps {
  options: AdditionalOption[];
  placeholder: string;
  onSelect: any;
}

const OptionDropdown = ({ options, placeholder, onSelect }: OptionDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option: AdditionalOption) => {
    setSelectedOption(option.name);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className='relative flex w-full max-w-[518px] flex-col gap-2' ref={dropdownRef}>
      <h3 className='text-2xl font-medium'>추가옵션</h3>
      <button
        className='flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500'
        onClick={handleToggle}
        aria-haspopup='listbox'
        aria-expanded={isOpen}
      >
        <span className='block truncate'>{selectedOption || placeholder}</span>
        <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isOpen ? 'rotate-180 transform' : ''}`} />
      </button>
      {isOpen && (
        <ul
          className='absolute z-10 w-full py-1 mt-1 overflow-auto bg-white shadow-lg top-full max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'
          role='listbox'
        >
          {options.map((option) => (
            <li
              key={option.id}
              className={`relative cursor-default select-none py-2 pl-3 pr-9 hover:bg-blue-100 ${
                selectedOption === option.name ? 'bg-blue-200' : ''
              }`}
              role='option'
              aria-selected={selectedOption === option.name}
              onClick={() => handleSelect(option)}
            >
              <span className='block truncate'>{`${option.name} / +${option.extra_cost}원`}</span>
              {selectedOption === option.name && (
                <span className='absolute inset-y-0 right-0 flex items-center pr-4 text-blue-600'>
                  <svg className='w-5 h-5' viewBox='0 0 20 20' fill='currentColor'>
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OptionDropdown;
