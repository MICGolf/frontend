import { ChangeHandler } from 'react-hook-form';
// 푸시 테스트
interface FormRegister {
  name: string;
  onBlur?: ChangeHandler;
}
export interface InputProps {
  label?: string;
  type: 'text' | 'email' | 'password' | 'file';
  defaultValue?: string;
  placeholder?: string;
  formRegister?: FormRegister;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = ({ className, label, type, defaultValue, placeholder, formRegister, onChange }: InputProps) => {
  return (
    <label className={`w-full text-black`}>
      <div>{label}</div>
      <input
        type={type}
        accept={type === 'file' ? 'image/*' : ''}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...formRegister}
        onChange={onChange}
        className={`mt-4 w-full rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300 ${className}`}
      />
    </label>
  );
};
