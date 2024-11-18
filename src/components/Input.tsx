import { InputHTMLAttributes } from 'react';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  type: string;
  register: UseFormRegister<any>;
  registerOptions?: RegisterOptions;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
  error?: string;
  className?: string;
}

/**
 * react-hook-form과 함께 사용할 수 있는 Floating Label Input 컴포넌트
 *
 * @component
 * @example
 * ```jsx
 * <Input
 *  label='이메일'
 *  name="email"
 *  type="email"
 *  register={register}
 *  registerOptions={{ required: '이메일을 입력해주세요' }}
 *  error={errors.email?.message}
 * />
 * ```
 *
 * @param {Object} props - 컴포넌트의 props
 * @param {string} props.label - input의 라벨 텍스트
 * @param {string} props.name - input 필드의 이름
 * @param {string} props.type - input 필드의 타입 (기본값은 'text')
 * @param {UseFormRegister<any>} props.register - react-hook-form의 register 함수
 * @param {RegisterOptions} props.registerOptions - react-hook-form의 register 함수의 옵션
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - input 필드의 onChange 이벤트 핸들러
 * @param {number} props.maxLength - input 필드의 최대 길이
 * @param {string} props.error - input 필드의 에러 메시지
 * @param {string} props.className - 추가적인 CSS 클래스 (tailwindcss)
 * @returns
 */
export const Input = ({
  className,
  label,
  name,
  register,
  registerOptions,
  error,
  onChange,
  type = 'text',
  maxLength,
}: InputProps) => {
  const { onChange: registerOnChange, ...registerRest } = register(name, registerOptions);

  const inputStyle = `${className} peer w-full border border-neutral-300 px-4 py-3 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary`;

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
