import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  register: UseFormRegister<any>;
  type: string;
  registerOptions?: RegisterOptions;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  error?: string;
}

export const Input = ({ label, name, register, registerOptions, error, onChange, type, maxLength }: InputProps) => {
  const { onChange: registerOnChange, ...registerRest } = register(name, registerOptions);

  const inputStyle = `peer w-full border border-neutral-300 px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary`;

  const FloatinglabelStyle =
    'absolute left-3 -top-3 bg-white px-1 text-sm text-gray-600 transition-all peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-3 peer-focus:text-sm peer-focus:text-gray-600';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      return onChange(event);
    }

    return registerOnChange(event);
  };

  return (
    <div className='relative w-full'>
      <input
        id={name}
        type={type}
        placeholder={label}
        maxLength={maxLength}
        className={inputStyle}
        {...registerRest}
        onChange={handleChange}
      />
      <label htmlFor={name} className={FloatinglabelStyle}>
        {label}
      </label>
      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
};
