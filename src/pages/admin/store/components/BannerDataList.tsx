import { Link } from 'react-router-dom';
import { Banner } from '../type';
import { useMutation, useQuery } from '@tanstack/react-query';
import { homeApi } from '@/api';
import { client } from '@/api/client';

const TableHeadArray = [
  { className: 'w-2/12', title: '제목' },
  { className: 'w-2/12', title: '소제목' },
  { className: 'w-2/12', title: '링크' },
  { className: 'w-full', title: '이미지' },
  { className: 'w-2/12', title: '비노출/노출' },
  { className: 'w-2/12', title: '삭제/수정' },
];

export const BannerDataList = () => {
  const {
    data: bannerList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['bannerList'],
    queryFn: async () => {
      const response = await homeApi.getBannersOrPromotions({ type: 'banner' });
      return response.data;
    },
  });

  const toggleMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await client.patch(`/banners/${id}/toggle`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('data:', data);
      alert('성공적으로 변경되었습니다.');
    },
    onError: (error) => {
      console.log(error);
      alert('오류가 발생했습니다.');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await client.delete(`/banners/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('data:', data);
      alert('성공적으로 삭제되었습니다.');
    },
    onError: (error) => {
      console.log(error);
      alert('삭제에 실패했습니다.');
    },
  });

  if (isLoading) return null;
  if (isError) return null;

  console.log(bannerList.items);

  return (
    <div className='rounded-lg bg-secondary px-5 py-6 text-base'>
      <p className='mb-4 border-black text-xl font-bold'>배너목록 총({bannerList.length}개)</p>
      <div>
        <table className='w-full table-fixed border border-neutral-200 px-5 text-center'>
          <thead>
            <tr className='bg-gray-100 font-bold'>
              {TableHeadArray.map((th, i) => (
                <th key={i} className={`${th.className} border border-neutral-200 py-2`}>
                  {th.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bannerList.items.map((item: Banner) => (
              <tr key={item.id} className=''>
                <td className='w-2/12 border border-neutral-200 py-2'>{item.title}</td>
                <td className='w-2/12 border border-neutral-200 py-2'>{item.sub_title}</td>
                <td className='w-2/12 border border-neutral-200 py-2'>
                  <Link to={item.event_url} className='break-words border-b border-blue-700 text-blue-700'>
                    {item.event_url}
                  </Link>
                </td>
                <td className='w-full border border-neutral-200 py-2'>
                  <img src={item.image_url} alt={item.title} />
                </td>
                <td className='w-2/12 border border-neutral-200 py-2'>
                  <label className='flex justify-center'>
                    <input
                      className='peer sr-only'
                      value=''
                      type='checkbox'
                      onChange={() => toggleMutation.mutate(item.id)}
                    />
                    <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
                  </label>
                </td>
                <td className='w-2/12 border border-neutral-200 py-2'>
                  <button
                    type='button'
                    onClick={() => {}}
                    className='mb-2 w-3/4 rounded-md bg-blue-500 px-4 py-1 text-white'
                  >
                    수정
                  </button>
                  <button
                    type='button'
                    onClick={() => deleteMutation.mutate(item.id)}
                    className='w-3/4 rounded-md bg-red-500 px-4 py-1 text-white'
                  >
                    삭제
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
