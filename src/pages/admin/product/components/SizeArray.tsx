import { useFieldArray, useForm, UseFormRegister } from 'react-hook-form';

const SizeArray = ({
  control,
  colorIndex,
  register,
  errors,
}: {
  control: any;
  colorIndex: number;
  register: UseFormRegister<any>;
  errors: any;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `colorOptions.${colorIndex}.sizes`,
  });

  return (
    <div>
      <h4 className='font-semibold'>사이즈 및 재고</h4>
      {fields.map((field, index) => (
        <div key={field.id} className='mb-2 flex gap-4'>
          <input
            type='text'
            placeholder='사이즈명'
            {...register(`colorOptions.${colorIndex}.sizes.${index}.sizeName`, {
              required: '사이즈명을 입력해주세요.',
            })}
            className='rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200'
          />
          <input
            type='number'
            placeholder='재고'
            {...register(`colorOptions.${colorIndex}.sizes.${index}.stock`, {
              required: '재고를 입력해주세요.',
              min: { value: 1, message: '재고는 1 이상이어야 합니다.' },
            })}
            className='rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200'
          />
          <button type='button' onClick={() => remove(index)} className='text-red-500 underline'>
            삭제
          </button>
        </div>
      ))}
      <button type='button' onClick={() => append({ sizeName: '', stock: '' })} className='text-indigo-500 underline'>
        사이즈 추가
      </button>
    </div>
  );
};

export default SizeArray;
