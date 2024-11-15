import { FormProvider, useForm } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import setting from '@/assets/icons/setting.svg';
import { useState } from 'react';

type Size = {
  sizeName: string;
  stock: string;
};

interface ProductFormData {
  colorName: string;
  hexCode: string;
  mainCategory: string;
  productCode: string;
  productName: string;
  productPrice: number;
  discountPrice: number;
  sizes: Size[];
  subCategory: string;
  subSubCategory: string;
}

const ProductAdd = () => {
  const methods = useForm<ProductFormData>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = methods;
  const [isOpen, setIsOpen] = useState(false);
  const [sizes, setSizes] = useState<Size[]>([{ sizeName: '', stock: '' }]);

  const handlePostProduct = (data: any) => console.log(data);

  const handleAddSizeClick = () => {
    setSizes([...sizes, { sizeName: '', stock: '' }]);
  };

  return (
    <FormProvider {...methods}>
      <form className='mt-6 w-full' onSubmit={handleSubmit(handlePostProduct)}>
        {/* section 1 */}
        <div className='mb-10 rounded-lg bg-white px-8 py-5 shadow-md'>
          <div className='grid w-2/3 grid-cols-7'>
            {/* stop 1 */}
            <div className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>
              <p>상품명</p>
            </div>
            <div className='col-span-5'>
              <div className='flex items-center gap-4'>
                <input
                  type='text'
                  placeholder='상품명'
                  {...register('productName', { required: '상품명을 입력해주세요' })}
                  className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
                />
              </div>
              <p className='text-sm text-red-500'>{errors.productName?.message}</p>
            </div>
            <div className='col-span-1'></div>

            {/* stop 2 */}
            <div className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>
              <p>판매상태</p>
            </div>
            <div className='col-span-5 flex items-center gap-4'>
              <select
                {...register('mainCategory')}
                className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                style={{
                  backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
                }}
                onClick={(prev) => setIsOpen(!prev)}
              >
                <option value='대분류1'>대분류1</option>
                <option value='대분류2'>대분류2</option>
                <option value='대분류3'>대분류3</option>
              </select>
              <select
                {...register('subCategory')}
                className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                style={{
                  backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
                }}
                onClick={(prev) => setIsOpen(!prev)}
              >
                <option value='중분류1'>중분류1</option>
                <option value='중분류2'>중분류2</option>
                <option value='중분류3'>중분류3</option>
              </select>
              <select
                {...register('subSubCategory')}
                className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                style={{
                  backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
                }}
                onClick={(prev) => setIsOpen(!prev)}
              >
                <option value='소분류1'>소분류1</option>
                <option value='소분류2'>소분류2</option>
                <option value='소분류3'>소분류3</option>
              </select>
            </div>
            <div className='col-span-1 flex items-center justify-center whitespace-nowrap'>
              <div onClick={() => alert('카테고리 관리 모달 출력')} className='ml-10 mt-4 flex items-center gap-2'>
                <img src={setting} alt='세팅 이미지' />
                <span>카테고리 관리</span>
              </div>
            </div>

            {/* stop 3 */}
            <div className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>
              <p>상품 코드</p>
            </div>
            <div className='col-span-5'>
              <div className='flex items-center gap-4'>
                <div className='flex-1'>
                  <input
                    type='text'
                    placeholder='상품 코드'
                    {...register('productCode', { required: '상품코드를 입력해주세요' })}
                    className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
                  />
                  <p className='text-sm text-red-500'>{errors.productCode?.message}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* section 2 */}
        <div className='mb-10 rounded-lg bg-white px-8 py-5 shadow-md'>
          <div className='mb-10'>
            <div className='mb-4 flex items-center text-base font-semibold text-neutral-800'>
              <p>제품설명</p>
            </div>
            <textarea name='' id='' className='h-[200px] w-full border border-gray-200' />
          </div>
          <div className='mb-10'>
            <div className='mb-4 flex items-center text-base font-semibold text-neutral-800'>
              <p>제품특징</p>
            </div>
            <textarea name='' id='' className='h-[200px] w-full border border-gray-200' />
          </div>
        </div>

        {/* section 3 */}
        <div className='mb-10 rounded-lg bg-white px-8 py-5 shadow-md'>
          <div className='grid w-1/2 grid-cols-7'>
            <div className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>
              <p>상품가</p>
            </div>
            <div className='col-span-6'>
              <div className='flex items-center gap-4'>
                <input
                  type='number'
                  placeholder='상품가'
                  {...register('productPrice', { required: '상품가를 입력해주세요' })}
                  className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
                />
              </div>
              <p className='text-sm text-red-500'>{errors.productPrice?.message}</p>
            </div>
            <div className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>
              <p>할인</p>
            </div>
            <div className='col-span-5 flex items-center'>
              <input
                type='number'
                placeholder='할인가격'
                {...register('discountPrice', { required: '할인할 가격을 입력해주세요' })}
                className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
              />
            </div>
            <div className='col-span-1 flex items-center gap-4'>
              <select
                {...register('mainCategory')}
                className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                style={{
                  backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
                }}
                onClick={(prev) => setIsOpen(!prev)}
              >
                <option value='won'>원</option>
                <option value='percent'>%</option>
              </select>
            </div>
            <div className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>
              <p>판매가</p>
            </div>
            <div className='col-span-6 mt-4 flex items-center text-base font-semibold text-neutral-500'>
              <p>300,000원</p>
            </div>
          </div>
        </div>

        {/* section 4 */}
        <div className='mb-10 rounded-lg bg-white px-8 py-5 shadow-md'>
          <div className='mb-10'>
            <div className='mb-4 flex items-center text-base font-semibold text-neutral-800'>
              <p>옵션</p>
            </div>
          </div>

          <div className='flex gap-10'>
            {/* section left */}
            <div className='w-[60%] border border-red-400'>
              <img src='' alt='' />
            </div>

            {/* section right */}
            <div className='w-[40%] border border-blue-400'>
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
                        {...register('colorName', { required: '컬러명을 입력해주세요' })}
                        className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
                      />
                      <p className='text-sm text-red-500'>{errors.colorName?.message}</p>
                    </div>
                    <div className='flex-1'>
                      <input
                        type='text'
                        placeholder='Hex 코드'
                        {...register('hexCode', { required: 'Hex 코드를 입력해주세요' })}
                        className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
                      />
                      <p className='text-sm text-red-500'>{errors.hexCode?.message}</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className='mt-4 flex items-center text-base font-semibold text-neutral-500'>
                  <p>사이즈 및 재고</p>
                </div>
                {sizes.map((_, index) => (
                  <div key={index}>
                    <div className='flex items-center gap-4'>
                      <div className='flex-1'>
                        <input
                          type='text'
                          placeholder='사이즈 명'
                          {...register(`sizes.${index}.sizeName`, { required: '사이즈 명을 입력해주세요' })}
                          className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
                        />
                        <p className='text-sm text-red-500'>{errors.sizes && errors.sizes[index]?.sizeName?.message}</p>
                      </div>
                      <div className='flex-1'>
                        <input
                          type='number'
                          placeholder='재고 수량'
                          {...register(`sizes.${index}.stock`, {
                            required: '재고 수량을 입력해주세요.',
                            min: { value: 1, message: '재고 수량은 1 이상이어야 합니다.' },
                          })}
                          className='mt-4 w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
                        />
                        <p className='text-sm text-red-500'>{errors.sizes && errors.sizes[index]?.stock?.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <div className='mt-2 text-right text-sm font-light text-gray-500'>
                  <span onClick={handleAddSizeClick} className='cursor-pointer py-4'>
                    사이즈 추가 +
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button type='submit' className='rounded-md bg-black px-4 py-2 text-white'>
          submit
        </button>
      </form>
    </FormProvider>
  );
};

export default ProductAdd;
