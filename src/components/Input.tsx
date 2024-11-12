import { ChangeHandler } from 'react-hook-form';
// 푸시 테스트
interface FormRegister {
  name: string;
  ref: React.Ref<any>;
  onChange?: ChangeHandler;
  onBlur?: ChangeHandler;
}
export interface InputTextProps {
  label?: string;
  type: 'text' | 'email' | 'password';
  defaultValue?: string;
  placeholder?: string;
  formRegister?: FormRegister;
}

export const Input = ({ label, type, defaultValue, placeholder, formRegister }: InputTextProps) => {
  return (
    <label className='w-full text-black'>
      <div>{label}</div>
      <input
        type={type}
        defaultValue={defaultValue}
        placeholder={placeholder}
        {...formRegister}
        className='mt-4 w-full rounded-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
      />
    </label>
  );
};
