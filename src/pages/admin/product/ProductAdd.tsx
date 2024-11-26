import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import arrowDropDown from '@/assets/icons/arrowDropDown.svg';
import arrowDropUp from '@/assets/icons/arrowDropUp.svg';
import setting from '@/assets/icons/setting.svg';
import { useEffect, useState } from 'react';
import { ImageCarousel } from './components/ImageCarousel';
import { Category } from '@/pages/admin/components/Category';
import { categoryApi, productsApi } from '@/api';
import { CategoryData } from '../components/type';
import { ColorOption } from './components/ColorOption';
import SizeArray from './components/SizeArray';

interface Size {
  sizeName: string;
  stock: string;
}

export interface ImageFile {
  file: File | null;
  previewUrl?: string;
}

interface ColorOption {
  colorName: string;
  hexCode: string;
  sizes: Size[];
  images: ImageFile[];
}

interface ProductFormData {
  productCode: string;
  productName: string;
  productPrice: number;
  discountPrice: number;
  discountOption: 'amount' | 'percent';
  subCategory: string;
  subSubCategory: string;
  mainCategory: string;
  description: string;
  features: string;
  colorOptions: ColorOption[];
}

const ProductAdd = () => {
  const [showCategory, setShowCategory] = useState(false);
  const methods = useForm<ProductFormData>({
    defaultValues: {
      discountOption: 'amount',
    },
  });
  const {
    handleSubmit,
    register,
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const [isOpen, setIsOpen] = useState(false);

  const {
    fields: colorFields,
    append: appendColorOption,
    remove: removeColorOption,
    update: updateColorOption,
  } = useFieldArray({
    control,
    name: 'colorOptions',
  });

  const handleAddOption = () => {
    appendColorOption({
      colorName: '',
      hexCode: '',
      sizes: [{ sizeName: '', stock: '' }],
      images: [],
    });
  };

  const handleRemoveOption = (index: number) => {
    removeColorOption(index);
  };

  const handleAddImage = (file: File, colorIndex: number) => {
    const imageUrl = URL.createObjectURL(file);

    const updateImages = [
      ...colorFields[colorIndex].images,
      {
        file,
        previewUrl: imageUrl,
      },
    ];
    updateColorOption(colorIndex, { ...colorFields[colorIndex], images: updateImages });
  };

  const handleRemoveImage = (imageIndex: number, colorIndex: number) => {
    const updatedImages = [...colorFields[colorIndex].images];
    updatedImages.splice(imageIndex, 1);
    updateColorOption(colorIndex, { ...colorFields[colorIndex], images: updatedImages });
  };

  const productPrice = watch('productPrice', 0);
  const discountPrice = watch('discountPrice', 0);
  const discountOption = watch('discountOption', 'amount');

  const calcurateSalePrice = (productPrice: number, discountPrice: number, discountOption: string) => {
    if (discountOption === 'amount') {
      return productPrice - discountPrice;
    }
    return productPrice - productPrice * (discountPrice / 100);
  };

  const salePrice = Math.floor(calcurateSalePrice(productPrice, discountPrice, discountOption));

  const inputStyle =
    'mt-4 w-full border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300';

  useEffect(() => {
    if (showCategory) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showCategory]);

  type CategoryWithChildren = CategoryData & {
    subCategories?: CategoryWithChildren[];
  };

  const [categories, setCategories] = useState<CategoryWithChildren[]>([]);

  const fetchCategories = async () => {
    const mainResponse = await categoryApi.getCategory();
    const mainCategories: CategoryData[] = mainResponse.data;

    const categoriesWithChildren = await Promise.all(
      mainCategories.map(async (mainCategory) => {
        const subResponse = await categoryApi.getCategory(mainCategory.id);
        const subCategories: CategoryData[] = subResponse.data;

        const subCategoriesWithChildren = await Promise.all(
          subCategories.map(async (subCategory) => {
            const subSubResponse = await categoryApi.getCategory(subCategory.id);
            const subSubCategories: CategoryData[] = subSubResponse.data;

            return { ...subCategory, subCategories: subSubCategories };
          })
        );

        return { ...mainCategory, subCategories: subCategoriesWithChildren };
      })
    );

    setCategories(categoriesWithChildren);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const mainCategory = watch('mainCategory');
  const subCategory = watch('subCategory');

  // 선택된 대분류에 따른 중분류 옵션
  const subCategories = categories.find((cate) => cate.id === Number(mainCategory))?.subCategories || [];

  // 선택된 중분류에 따른 소분류 옵션
  const subSubCategories = subCategories.find((subCate) => subCate.id === Number(subCategory))?.subCategories || [];

  // 대분류 변경 시 하위 카테고리 초기화
  useEffect(() => {
    setValue('subCategory', '');
    setValue('subSubCategory', '');
  }, [mainCategory]);

  // 중분류 변경 시 소분류 초기화
  useEffect(() => {
    setValue('subSubCategory', '');
  }, [subCategory]);

  const handlePostProducts = async (data: ProductFormData) => {
    // 가장 하위 카테고리 ID를 추출
    const selectedCategoryId = data.subSubCategory // 소분류 ID가 존재하면 사용
      ? Number(data.subSubCategory)
      : data.subCategory // 중분류 ID가 존재하면 사용
        ? Number(data.subCategory)
        : Number(data.mainCategory); // 대분류 ID가 존재하면 사용

    const image_mapping = data.colorOptions.reduce((mapping: { [key: string]: string[] }, colorOpt) => {
      const imageNames: string[] = [];
      colorOpt.images.forEach((image) => {
        if (image.file) {
          imageNames.push(image.file.name);
        }
      });
      mapping[colorOpt.hexCode] = imageNames;
      return mapping;
    }, {});

    const requestPayload = {
      category_id: selectedCategoryId,
      product: {
        name: data.productName,
        price: Math.floor(calcurateSalePrice(data.productPrice, data.discountPrice, data.discountOption)),
        discount: data.discountPrice,
        discount_option: data.discountOption,
        origin_price: data.productPrice,
        description: data.description,
        detail: data.features,
        product_code: data.productCode,
      },
      options: data.colorOptions.map((colorOpt) => ({
        color: colorOpt.colorName,
        color_code: colorOpt.hexCode,
        sizes: colorOpt.sizes.map((size) => ({
          size: size.sizeName,
          stock: size.stock,
        })),
      })),
      image_mapping,
    };

    console.log('request', requestPayload);

    // `files`만 담을 FormData 생성
    const formData = new FormData();

    // 파일 추가
    data.colorOptions.forEach((colorOpt) => {
      colorOpt.images.forEach((image) => {
        if (image.file) {
          const uniqueFileName = image.file.name;
          formData.append('files', new File([image.file], uniqueFileName, { type: image.file.type }));
        }
      });
    });

    // `request`를 FormData로 추가
    formData.append('request', JSON.stringify(requestPayload));

    // 서버에 POST 요청
    try {
      const response = await productsApi.createProduct(formData);
      console.log('등록 성공:', response.data);
    } catch (error) {
      console.error('등록 실패:', error);
    }
  };

  return (
    <div>
      {showCategory && <Category onClose={() => setShowCategory(false)} />}
      <FormProvider {...methods}>
        <form className='mt-6 w-full' onSubmit={handleSubmit(handlePostProducts)}>
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
                    className={`${inputStyle}`}
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
                  {...register('mainCategory', { required: '대분류를 선택해주세요' })}
                  className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                  style={{
                    backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
                  }}
                  onClick={(prev) => setIsOpen(!prev)}
                  defaultValue=''
                >
                  <option value='' disabled>
                    대분류
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                <select
                  {...register('subCategory')}
                  className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                  style={{
                    backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
                  }}
                  onClick={(prev) => setIsOpen(!prev)}
                  defaultValue=''
                  disabled={!mainCategory}
                >
                  <option value='' disabled>
                    중분류
                  </option>
                  {subCategories.map((subCategory) => (
                    <option key={subCategory.id} value={subCategory.id}>
                      {subCategory.name}
                    </option>
                  ))}
                </select>
                <select
                  {...register('subSubCategory')}
                  className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                  style={{
                    backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
                  }}
                  onClick={(prev) => setIsOpen(!prev)}
                  defaultValue=''
                  disabled={!subCategory}
                >
                  <option value='' disabled>
                    소분류
                  </option>
                  {subSubCategories.map((subSubCategory) => (
                    <option key={subSubCategory.id} value={subSubCategory.id}>
                      {subSubCategory.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className='col-span-1 flex items-center justify-center whitespace-nowrap'>
                <div onClick={() => setShowCategory((prev) => !prev)} className='ml-10 mt-4 flex items-center gap-2'>
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
                      className={`${inputStyle}`}
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
              <textarea
                {...register('description', { required: '제품 설명을 입력해주세요' })}
                className='mt-4 h-[200px] w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
              />
            </div>
            <div className='mb-10'>
              <div className='mb-4 flex items-center text-base font-semibold text-neutral-800'>
                <p>제품특징</p>
              </div>
              <textarea
                {...register('features', { required: '제품 특징을 입력해주세요' })}
                className='mt-4 h-[200px] w-full rounded-md border-[1px] border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300'
              />
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
                    className={`${inputStyle}`}
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
                  className={`${inputStyle}`}
                />
              </div>
              <div className='col-span-1 flex items-center gap-4'>
                <select
                  {...register('discountOption')}
                  className={`mt-4 w-full appearance-none rounded-md border border-neutral-300 bg-[length:36px_36px] bg-[center_right_1rem] bg-no-repeat px-3 py-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                  style={{
                    backgroundImage: `url(${isOpen ? arrowDropUp : arrowDropDown})`,
                  }}
                  onClick={(prev) => setIsOpen(!prev)}
                >
                  <option value='amount'>원</option>
                  <option value='percent'>%</option>
                </select>
              </div>
              <div className='col-span-1 mt-4 flex items-center text-base font-semibold text-neutral-500'>
                <p>판매가</p>
              </div>
              <div className='col-span-6 mt-4 flex items-center text-base font-semibold text-neutral-500'>
                <p>{salePrice.toLocaleString()}원</p>
              </div>
            </div>
          </div>

          {/* section 4 */}
          <div className='space-y-4'>
            {colorFields.map((field, colorIndex) => (
              <div key={field.id} className='space-y-4 rounded-lg border bg-gray-50 p-4'>
                <h3 className='font-semibold'>옵션 {colorIndex + 1}</h3>

                {/* 컬러명 */}
                <input
                  type='text'
                  placeholder='컬러명'
                  {...register(`colorOptions.${colorIndex}.colorName`, { required: '컬러명을 입력해주세요.' })}
                  className='block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200'
                />
                {errors.colorOptions?.[colorIndex]?.colorName && (
                  <p className='text-sm text-red-500'>{errors.colorOptions[colorIndex].colorName?.message}</p>
                )}

                {/* 헥스코드 */}
                <input
                  type='text'
                  placeholder='Hex 코드'
                  {...register(`colorOptions.${colorIndex}.hexCode`, { required: 'Hex 코드를 입력해주세요.' })}
                  className='block w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-indigo-200'
                />
                {errors.colorOptions?.[colorIndex]?.hexCode && (
                  <p className='text-sm text-red-500'>{errors.colorOptions[colorIndex].hexCode?.message}</p>
                )}

                {/* 사이즈 추가 */}
                <SizeArray control={control} colorIndex={colorIndex} register={register} errors={errors} />

                {/* 이미지 업로드 */}
                <ImageCarousel
                  images={field.images || []}
                  onAddImage={(file) => handleAddImage(file, colorIndex)}
                  onRemoveImage={(imageIndex) => handleRemoveImage(imageIndex, colorIndex)}
                  maxImages={6}
                />

                <button
                  type='button'
                  onClick={() => handleRemoveOption(colorIndex)}
                  className='text-sm text-red-500 underline'
                >
                  옵션 삭제
                </button>
              </div>
            ))}

            <button type='button' onClick={handleAddOption} className='rounded-lg bg-indigo-500 px-4 py-2 text-white'>
              옵션 추가
            </button>
          </div>

          <button type='submit' className='rounded-md bg-black px-4 py-2 text-white'>
            등록
          </button>
        </form>
      </FormProvider>
    </div>
  );
};

export default ProductAdd;
