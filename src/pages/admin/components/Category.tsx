import { categoryApi } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { CategoryData } from './type';
import CloseIco from '@/assets/icons/CloseIco';
import { useState } from 'react';

export const Category = ({ onClose }: { onClose: () => void }) => {
  const methods = useForm();
  const queryClient = useQueryClient();
  const { register, watch, handleSubmit, setValue } = methods;
  const [isCategoryEdit, setIsCategoryEdit] = useState(false);
  const mainCategoryId = watch('mainCategoryList');
  const subCategoryId = watch('subCategoryList');
  const subSubCategoryId = watch('subSubCategoryList');
  const parent_id = subSubCategoryId ? subSubCategoryId : subCategoryId ? subCategoryId : mainCategoryId;
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);

  const handleCategoryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = productCategoryData.find((cat) => cat.id === parent_id);
    setSelectedCategory(category || null);
  };
  const deleteMutation = useMutation({
    mutationFn: (id: number) => categoryApi.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CategoryDeleteData'] });
      alert('카테고리가 삭제되었습니다.');
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('카테고리 삭제에 실패했습니다.');
    },
  });

  const handleDelete = (id: number) => {
    if (window.confirm('정말로 카테고리를 삭제하시겠습니까?')) {
      deleteMutation.mutate(id);
    }
  };
  const { data: productCategoryData } = useQuery({
    queryKey: ['productCategory'],
    queryFn: async () => {
      const response = await categoryApi.getCategory();
      if (!response) return null;
      return response.data;
    },
  });
  const { data: productSubCategoryData, refetch: productSubCategoryrefetch } = useQuery({
    queryKey: ['productSubCategory', mainCategoryId],
    queryFn: async () => {
      if (!mainCategoryId) return null;
      const response = await categoryApi.getCategory(mainCategoryId);
      if (!response) return null;
      return response?.data || [];
    },
    enabled: !!mainCategoryId,
  });
  const { data: productSubSubCategoryData, refetch: productSubSubCategoryrefetch } = useQuery({
    queryKey: ['productSubSubCategory', subCategoryId],
    queryFn: async () => {
      if (!subCategoryId) return null;
      const response = await categoryApi.getCategory(subCategoryId);
      if (!response) return null;
      return response?.data || [];
    },
    enabled: !!mainCategoryId && !!subCategoryId,
  });
  const patchStatusMutation = useMutation({
    mutationFn: ({ parent_id, name }: { parent_id: number; name: string }) => categoryApi.postCategory(parent_id, name),
    onSuccess: () => {
      alert('카테고리가 추가되었습니다.');
    },
    onError: (error) => {
      console.error('상태변경 실패:', error);
      alert('카테고리 추가 실패했습니다.');
    },
  });
  const onSubmit = (data: any) => {
    patchStatusMutation.mutate({ parent_id, name: data.addCategoryName });
  };
  return (
    <div className='fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center'>
      <div onClick={onClose} className='absolute h-full w-full bg-black/50' />
      <form className='z-50 w-2/3 rounded-lg bg-white p-4' onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center justify-between'>
          <h4 className='text-l font-bold'>상품 카테고리</h4>
          <button type='button' onClick={onClose} className='p-2 duration-300 ease-in-out hover:scale-105'>
            <CloseIco size={16} />
          </button>
        </div>

        <div className='mt-2 grid grid-cols-3 border'>
          <div className=''>
            <p className='h-14 bg-neutral-200 p-3 text-center font-semibold text-neutral-800'>
              대분류
              <button
                type='button'
                className='ml-2 rounded-md border bg-neutral-700 px-2 py-1 text-sm font-semibold text-white'
                onClick={() => setIsCategoryEdit(true)}
              >
                추가
              </button>
            </p>
            {productCategoryData?.map((category: CategoryData) => (
              <label className='block cursor-pointer' key={category.id}>
                <input
                  {...(register('mainCategoryList'),
                  {
                    onChange: (e) => {
                      setValue('subCategoryList', '');
                      setValue('subSubCategoryList', '');
                      setValue('mainCategoryList', e.target.value);
                    },
                  })}
                  type='radio'
                  name='mainCategoryList'
                  value={category.id}
                  className='peer hidden'
                />
                <div className='peer-checked:bg-blue-100'>
                  <div
                    key={category.id}
                    className='flex justify-between border-b border-neutral-200 px-2 py-1 group-checked/input:bg-neutral-200'
                  >
                    <p>{category.name}</p>
                    <div>
                      <button
                        className='mr-2 rounded-md border border-neutral-400 bg-white px-2 py-1 text-sm text-neutral-500'
                        type='button'
                      >
                        수정
                      </button>
                      <button
                        className='rounded-md border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-500'
                        type='button'
                        onClick={() => handleDelete(category.id)}
                      >
                        삭제
                      </button>
                    </div>
                  </div>
                </div>
              </label>
            ))}
          </div>
          <div className=''>
            <p className='h-14 bg-neutral-200 p-3 text-center font-semibold text-neutral-800'>
              중분류
              {mainCategoryId && (
                <button
                  type='button'
                  className='ml-2 rounded-md border bg-neutral-700 px-2 py-1 text-sm font-semibold text-white'
                  onClick={() => setIsCategoryEdit(true)}
                >
                  추가
                </button>
              )}
            </p>
            {productSubCategoryData ? (
              productSubCategoryData.length === 0 ? (
                <div className='my-4 flex w-full content-center justify-center text-sm text-neutral-400'>
                  하위카테고리가 없습니다.
                </div>
              ) : (
                productSubCategoryData?.map((category: CategoryData) => (
                  <label className='block cursor-pointer' key={category.id}>
                    <input
                      {...(register('subCategoryList'),
                      {
                        onChange: (e) => {
                          setValue('subCategoryList', e.target.value);
                          setValue('subSubCategoryList', '');
                          productSubCategoryrefetch();
                        },
                      })}
                      type='radio'
                      name='subCategoryList'
                      value={category.id}
                      className='peer hidden'
                    />
                    <div className='peer-checked:bg-blue-100'>
                      <div
                        key={category.id}
                        className='flex justify-between border-b border-neutral-200 px-2 py-1 group-checked/input:bg-neutral-200'
                      >
                        <p>{category.name}</p>
                        <div>
                          <button
                            className='mr-2 rounded-md border border-neutral-400 bg-white px-2 py-1 text-sm text-neutral-500'
                            type='button'
                          >
                            수정
                          </button>
                          <button
                            className='rounded-md border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-500'
                            type='button'
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </label>
                ))
              )
            ) : (
              <div className='my-4 flex w-full content-center justify-center text-sm text-neutral-400'>
                상위 메뉴를 먼저 선택해주세요.
              </div>
            )}
          </div>
          <div className=''>
            <p className='h-14 bg-neutral-200 p-3 text-center font-semibold text-neutral-800'>
              소분류
              {subCategoryId && (
                <button
                  type='button'
                  className='ml-2 rounded-md border bg-neutral-700 px-2 py-1 text-sm font-semibold text-white'
                >
                  추가
                </button>
              )}
            </p>
            {productSubSubCategoryData ? (
              productSubSubCategoryData.length === 0 ? (
                <div className='my-4 flex w-full content-center justify-center text-sm text-neutral-400'>
                  하위카테고리가 없습니다.
                </div>
              ) : (
                productSubSubCategoryData?.map((category: CategoryData) => (
                  <label className='block cursor-pointer' key={category.id}>
                    <input
                      {...(register('subSubCategoryList'),
                      {
                        onChange: (e) => {
                          setValue('subSubCategoryList', e.target.value);
                          productSubSubCategoryrefetch();
                        },
                      })}
                      type='radio'
                      name='subSubCategoryList'
                      value={category.id}
                      className='peer hidden'
                    />
                    <div className='peer-checked:bg-blue-100'>
                      <div
                        key={category.id}
                        className='flex justify-between border-b border-neutral-200 px-2 py-1 group-checked/input:bg-neutral-200'
                      >
                        <p>{category.name}</p>
                        <div>
                          <button
                            className='mr-2 rounded-md border border-neutral-400 bg-white px-2 py-1 text-sm text-neutral-500'
                            type='button'
                          >
                            수정
                          </button>
                          <button
                            className='rounded-md border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-500'
                            type='button'
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  </label>
                ))
              )
            ) : (
              <div className='my-4 flex w-full content-center justify-center text-sm text-neutral-400'>
                상위 메뉴를 먼저 선택해주세요.
              </div>
            )}
          </div>
        </div>
        <div>
          {isCategoryEdit && (
            <>
              <table className='w-full'>
                <thead>
                  <p className='mb-2 mt-6 font-semibold text-neutral-800'>선택 카테고리 설정</p>
                </thead>
                <tbody>
                  <tr>
                    <td className='bg-neutral-200 pl-2'>
                      카테고리명<span className='text-red-500'>*</span>
                    </td>
                    <td>
                      <div className='mx-2'>
                        <p className='text-sm text-neutral-500'>상위 카테고리 : {parent_id} </p>
                        <input
                          {...register('addCategoryName')}
                          type='text'
                          placeholder='카테고리명'
                          className='mt-2 w-full rounded-md border-2 border-gray-300 p-2'
                        />
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button
                type='submit'
                className='mt-4 block w-full rounded-md bg-primary px-4 py-2 text-base text-white duration-300 ease-in-out hover:scale-105'
              >
                저장
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Category;
