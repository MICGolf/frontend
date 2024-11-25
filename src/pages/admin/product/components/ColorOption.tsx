import { useFieldArray, UseFormRegister, Control } from 'react-hook-form';

interface ColorOptionProps {
  colorIndex: number;
  control: Control<any>;
  register: UseFormRegister<any>;
  errors: any;
  inputStyle: string;
  onRemoveColorOption: (index: number) => void;
}

export const ColorOption = ({
  colorIndex,
  control,
  register,
  errors,
  inputStyle,
  onRemoveColorOption,
}: ColorOptionProps) => {
  const {
    fields: sizeFields,
    append: appendSize,
    remove: removeSize,
  } = useFieldArray({
    control,
    name: `colorOptions.${colorIndex}.sizes`,
  });

  const onAddSize = () => appendSize({ sizeName: '', stock: '' });
  const onRemoveSize = (index: number) => removeSize(index);

  return (
    <div className='flex gap-10'>
      {/* Option Header */}
      <div className='mb-4 flex items-center justify-between'>
        <h3 className='text-lg font-semibold'>옵션 {colorIndex + 1}</h3>
        <button type='button' onClick={() => onRemoveColorOption(colorIndex)} className='text-red-500'>
          옵션 삭제
        </button>
      </div>

      {/* Option Details */}
      <div className='w-[40%]'>
        <div className='grid grid-cols-4'>
          <div className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>
            <p>컬러</p>
          </div>
          <div className='col-span-3'>
            <div className='flex items-center gap-4'>
              <div className='flex-1'>
                <input
                  type='text'
                  placeholder='컬러명'
                  {...register(`colorOptions.${colorIndex}.colorName`, {
                    required: '컬러명을 입력해주세요',
                  })}
                  className={inputStyle}
                />
                {errors.colorOptions?.[colorIndex]?.colorName && (
                  <p className='text-sm text-red-500'>{errors.colorOptions[colorIndex]?.colorName?.message}</p>
                )}
              </div>
              <div className='flex-1'>
                <input
                  type='text'
                  placeholder='Hex 코드'
                  {...register(`colorOptions.${colorIndex}.hexCode`, {
                    required: 'Hex 코드를 입력해주세요',
                  })}
                  className={inputStyle}
                />
                {errors.colorOptions?.[colorIndex]?.hexCode && (
                  <p className='text-sm text-red-500'>{errors.colorOptions[colorIndex]?.hexCode?.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sizes */}
        <div>
          <div className='mt-4 flex items-center text-base font-semibold text-neutral-500'>
            <p>사이즈 및 재고</p>
          </div>
          {sizeFields.map((field, index) => (
            <div key={field.id} className='flex items-center gap-4'>
              <div className='flex-1'>
                <input
                  type='text'
                  placeholder='사이즈 명'
                  {...register(`colorOptions.${colorIndex}.sizes.${index}.sizeName`, {
                    required: '사이즈 명을 입력해주세요',
                  })}
                  className={inputStyle}
                />
                {errors.colorOptions?.[colorIndex]?.sizes?.[index]?.sizeName && (
                  <p className='text-sm text-red-500'>
                    {errors.colorOptions[colorIndex]?.sizes?.[index]?.sizeName?.message}
                  </p>
                )}
              </div>
              <div className='flex-1'>
                <input
                  type='number'
                  placeholder='재고 수량'
                  {...register(`colorOptions.${colorIndex}.sizes.${index}.stock`, {
                    required: '재고 수량을 입력해주세요.',
                    min: { value: 1, message: '재고 수량은 1 이상이어야 합니다.' },
                  })}
                  className={inputStyle}
                />
                {errors.colorOptions?.[colorIndex]?.sizes?.[index]?.stock && (
                  <p className='text-sm text-red-500'>
                    {errors.colorOptions[colorIndex]?.sizes?.[index]?.stock?.message}
                  </p>
                )}
              </div>
              <button type='button' onClick={() => onRemoveSize(index)} className='text-red-500'>
                삭제
              </button>
            </div>
          ))}
          <div className='mt-2 text-right text-sm font-light text-gray-500'>
            <button type='button' onClick={onAddSize} className='text-blue-500 underline hover:text-blue-700'>
              사이즈 추가 +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
