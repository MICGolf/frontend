interface FormRegister {
  name: string;
}
export interface InputProps {
  label?: string;
  type: 'text' | 'email' | 'password' | 'file';
  placeholder?: string;
  register?: FormRegister;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
export const Input = ({ className, label, type, placeholder, register, onChange }: InputProps) => {
  return (
    <label className={`w-full text-black`}>
      <div>{label}</div>
      <input
        type={type}
        accept={type === 'file' ? 'image/*' : undefined}
        placeholder={placeholder}
        {...register}
        onChange={onChange}
        className={`mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300 ${className}`}
      />
    </label>
  );
};
