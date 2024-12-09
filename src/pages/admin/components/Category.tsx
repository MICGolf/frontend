import { categoryApi } from '@/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { CategoryData } from './type';
import CloseIco from '@/assets/icons/CloseIco';
import { useEffect, useState } from 'react';

export const Category = ({ onClose }: { onClose: () => void }) => {
  const methods = useForm();
  const queryClient = useQueryClient();
  const { register, watch, handleSubmit, setValue } = methods;
  const [isCategoryEdit, setIsCategoryEdit] = useState({ state: false, type: 'add' });
  const mainCategoryId = watch('mainCategoryList');
  const subCategoryId = watch('subCategoryList');
  const subSubCategoryId = watch('subSubCategoryList');
  const addCategoryName = watch('addCategoryName');
  const category_id = subSubCategoryId ? subSubCategoryId : subCategoryId ? subCategoryId : mainCategoryId;
  let parent_id = subCategoryId ? subCategoryId : mainCategoryId;
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const categoryData = (id: number) => {
    let category =
      productCategoryData?.find((cat: CategoryData) => cat.id === Number(id)) ||
      productSubCategoryData?.find((cat: CategoryData) => cat.id === Number(id)) ||
      productSubSubCategoryData?.find((cat: CategoryData) => cat.id === Number(id));
    setSelectedCategory(category || null);
  };
  useEffect(() => {
    categoryData(parent_id);
  }, [parent_id]);

  useEffect(() => {
    categoryData(category_id);
  }, [category_id]);

  const deleteMutation = useMutation({
    mutationFn: ({ id }: { id: number }) => categoryApi.deleteCategory(id),
    onSuccess: (_, variables) => {
      if (variables.id && variables.id === mainCategoryId) {
        console.log('1');
        queryClient.invalidateQueries({ queryKey: ['productSubCategory'] });
      }
      if (variables.id && variables.id === subCategoryId) {
        console.log('2');
        queryClient.invalidateQueries({ queryKey: ['productSubSubCategory', mainCategoryId] });
      }
      if (variables.id && variables.id === subSubCategoryId) {
        console.log('3');
        queryClient.invalidateQueries({ queryKey: ['productSubSubCategory', subCategoryId] });
      }
      alert('카테고리가 삭제되었습니다.');
      setIsCategoryEdit((prevState) => ({
        ...prevState,
        state: false,
      }));
    },
    onError: (error) => {
      console.error('삭제 실패:', error);
      alert('카테고리 삭제에 실패했습니다.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['productCategory'] });
    },
  });
  const putCategoryMutation = useMutation({
    mutationFn: ({ category_id, parent_id, name }: { category_id: number; parent_id: number; name: string }) =>
      categoryApi.putCategory(category_id, parent_id, name),
    onSuccess: (_, variables) => {
      if (!variables.parent_id) {
        queryClient.invalidateQueries({ queryKey: ['productCategory'] });
      }
      if (variables.parent_id && variables.parent_id === mainCategoryId) {
        queryClient.invalidateQueries({ queryKey: ['productSubCategory', mainCategoryId] });
      }
      if (variables.parent_id && variables.parent_id === subCategoryId) {
        queryClient.invalidateQueries({ queryKey: ['productSubSubCategory', subCategoryId] });
      }
      alert('카테고리가 변경되었습니다.');
      setValue('addCategoryName', '');
      setIsCategoryEdit((prevState) => ({
        ...prevState,
        state: false,
      }));
    },
    onError: (error) => {
      console.error('카테고리변경 실패:', error);
      alert('카테고리 변경에 실패했습니다.');
    },
  });
  const handleDelete = (category: CategoryData) => {
    if (window.confirm(`${category.name} 카테고리를 삭제하시겠습니까?`)) {
      deleteMutation.mutate({ id: category.id });
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

  const postCategoryMutation = useMutation({
    mutationFn: ({ parent_id, name }: { parent_id: number; name: string }) => categoryApi.postCategory(parent_id, name),
    onSuccess: (_, variables) => {
      if (!variables.parent_id) {
        queryClient.invalidateQueries({ queryKey: ['productCategory'] });
      }
      if (variables.parent_id && variables.parent_id === mainCategoryId) {
        queryClient.invalidateQueries({ queryKey: ['productSubCategory', mainCategoryId] });
      }
      if (variables.parent_id && variables.parent_id === subCategoryId) {
        queryClient.invalidateQueries({ queryKey: ['productSubSubCategory', subCategoryId] });
      }
      setValue('addCategoryName', '');
      setIsCategoryEdit((prevState) => ({
        ...prevState,
        state: false,
      }));
      alert('카테고리가 추가되었습니다.');
    },
    onError: (error) => {
      console.error('상태변경 실패:', error);
      alert('카테고리 추가 실패했습니다.');
    },
  });
  const onSubmit = (data: any) => {
    postCategoryMutation.mutate({ parent_id, name: data.addCategoryName });
  };
  //같은카테고리 요청할때 셍긱하기, 키를 동적으로 받기|  대분류 중분류 소분류 api 같은걸로 할 수 있기
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
                onClick={() => {
                  setValue('mainCategoryList', '');
                  setValue('subSubCategoryList', '');
                  setValue('subCategoryList', '');
                  setIsCategoryEdit({ state: true, type: 'add' });
                }}
              >
                추가
              </button>
            </p>
            {productCategoryData?.map((category: CategoryData) => (
              <label className='block cursor-pointer' key={category.id}>
                <input
                  type='radio'
                  value={category.id}
                  className='peer hidden'
                  name='mainCategoryList'
                  checked={watch('mainCategoryList') === category.id}
                  {...(register('mainCategoryList'),
                  {
                    onChange: (e) => {
                      setIsCategoryEdit((prevState) => ({
                        ...prevState,
                        state: false,
                      }));
                      setValue('mainCategoryList', e.target.value);
                      setValue('subCategoryList', '');
                      setValue('subSubCategoryList', '');
                    },
                  })}
                />
                <div
                  className='peer-checked:bg-blue-100'
                  onClick={() => {
                    setValue('mainCategoryList', category.id);
                  }}
                >
                  <div
                    key={category.id}
                    className='flex justify-between border-b border-neutral-200 px-2 py-1 group-checked/input:bg-neutral-200'
                  >
                    <p>{category.name}</p>
                    <div>
                      <button
                        className='mr-2 rounded-md border border-neutral-400 bg-white px-2 py-1 text-sm text-neutral-500'
                        type='button'
                        value={category.id}
                        onClick={() => {
                          parent_id = null;
                          setValue('mainCategoryList', category.id);
                          setIsCategoryEdit({ state: true, type: 'edit' });
                        }}
                      >
                        수정
                      </button>
                      <button
                        className='rounded-md border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-500'
                        type='button'
                        onClick={() => handleDelete(category)}
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
                  onClick={() => {
                    setValue('subSubCategoryList', '');
                    setValue('subCategoryList', '');
                    setIsCategoryEdit({ state: true, type: 'add' });
                  }}
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
                      type='radio'
                      name='subCategoryList'
                      value={category.id}
                      className='peer hidden'
                      checked={watch('subCategoryList') === category.id}
                      {...(register('subCategoryList'),
                      {
                        onChange: (e) => {
                          setValue('subCategoryList', e.target.value);
                          setValue('subSubCategoryList', '');
                          productSubCategoryrefetch();
                        },
                      })}
                    />
                    <div
                      className='peer-checked:bg-blue-100'
                      onClick={() => {
                        setValue('subCategoryList', category.id);
                      }}
                    >
                      <div
                        key={category.id}
                        className='flex justify-between border-b border-neutral-200 px-2 py-1 group-checked/input:bg-neutral-200'
                      >
                        <p>{category.name}</p>
                        <div>
                          <button
                            className='mr-2 rounded-md border border-neutral-400 bg-white px-2 py-1 text-sm text-neutral-500'
                            type='button'
                            value={category.id}
                            onClick={() => {
                              setValue('subCategoryList', category.id);
                              setIsCategoryEdit({ state: true, type: 'edit' });
                            }}
                          >
                            수정
                          </button>
                          <button
                            className='rounded-md border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-500'
                            type='button'
                            onClick={() => handleDelete(category)}
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
                  onClick={() => {
                    setValue('subSubCategoryList', '');
                    setIsCategoryEdit({ state: true, type: 'add' });
                  }}
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
                  <label className='block' key={category.id}>
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
                      checked={watch('subSubCategoryList') === category.id}
                    />
                    <div
                      className='peer-checked:bg-blue-100'
                      onClick={() => {
                        setValue('subSubCategoryList', category.id);
                      }}
                    >
                      <div
                        key={category.id}
                        className='flex justify-between border-b border-neutral-200 px-2 py-1 group-checked/input:bg-neutral-200'
                      >
                        <p>{category.name}</p>
                        <div>
                          <button
                            className='mr-2 rounded-md border border-neutral-400 bg-white px-2 py-1 text-sm text-neutral-500'
                            type='button'
                            value={category.id}
                            onClick={(e) => {
                              const buttonValue = (e.currentTarget as HTMLButtonElement).value;
                              setValue('subSubCategoryList', buttonValue);
                              setIsCategoryEdit({ state: true, type: 'edit' });
                            }}
                          >
                            수정
                          </button>
                          <button
                            className='rounded-md border border-red-400 bg-red-50 px-2 py-1 text-sm text-red-500'
                            type='button'
                            onClick={() => handleDelete(category)}
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
          {isCategoryEdit.state && (
            <>
              <table className='w-full'>
                <thead>
                  <p className='mb-2 mt-6 font-semibold text-neutral-800'>
                    {isCategoryEdit.type === 'add' ? '카테고리 추가' : '선택 카테고리 수정'}
                  </p>
                </thead>
                <tbody>
                  <tr>
                    <td className='bg-neutral-200 pl-2'>
                      카테고리명<span className='text-red-500'>*</span>
                    </td>
                    <td>
                      <div className='mx-2'>
                        <p className='text-sm text-neutral-500'>
                          {isCategoryEdit.type === 'add'
                            ? `상위 카테고리 : ${selectedCategory ? selectedCategory.name : '없음'}`
                            : `선택 카테고리 : ${selectedCategory?.name}`}
                        </p>
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
              {isCategoryEdit.type === 'add' ? (
                <button
                  type='submit'
                  className='mt-4 block w-full rounded-md bg-primary px-4 py-2 text-base text-white duration-300 ease-in-out hover:scale-105'
                >
                  저장
                </button>
              ) : (
                <button
                  type='button'
                  className='mt-4 block w-full rounded-md bg-primary px-4 py-2 text-base text-white duration-300 ease-in-out hover:scale-105'
                  onClick={() => {
                    const payload: { category_id: number; name: string; parent_id?: number } = {
                      category_id,
                      name: addCategoryName,
                    };
                    if (category_id !== parent_id) {
                      payload.parent_id = parent_id;
                    }

                    putCategoryMutation.mutate(payload as { category_id: number; parent_id: number; name: string });
                  }}
                >
                  수정
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
};

export default Category;
