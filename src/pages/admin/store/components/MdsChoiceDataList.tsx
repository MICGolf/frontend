import { Link } from 'react-router-dom';
import { Banner } from '../type';
import { useQuery } from '@tanstack/react-query';
import { homeApi } from '@/api';

type Props = {
  data: Banner[];
};

const TableHeadArray = [
  { className: 'w-2/12', title: '제목' },
  { className: 'w-2/12', title: '소제목' },
  { className: 'w-2/12', title: '링크' },
  { className: 'w-full', title: '이미지' },
  { className: 'w-2/12', title: '비노출/노출' },
  { className: 'w-2/12', title: '삭제/수정' },
];

export const MdsChoiceDataList = () => {
  const {
    data: mdsChoiceList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['mdsChoiceList'],
    queryFn: async () => {
      const response = await homeApi.getBestProductOrMdsChoice({ type: 'md_pick' });
      return response.data;
    },
  });

  if (isLoading || isError) return null;

  console.log(mdsChoiceList);

  return (
    <div className='rounded-lg bg-secondary px-5 py-6 text-base'>
      <p className='mb-4 border-black text-xl font-bold'>배너목록 총({mdsChoiceList.length}개)</p>
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
            {mdsChoiceList.map((item: any) => (
              <tr key={item.id}>
                <td className='w-2/12 border border-neutral-200 py-2'>{item.title}</td>
                <td className='w-2/12 border border-neutral-200 py-2'>{item.subTitle}</td>
                <td className='w-2/12 border border-neutral-200 py-2'>
                  <Link to={item.eventUrl} className='break-words border-b border-blue-700 text-blue-700'>
                    {item.eventUrl}
                  </Link>
                </td>
                <td className='w-full border border-neutral-200 py-2'>
                  <img src={item.image} alt={item.title} />
                </td>
                <td className='w-2/12 border border-neutral-200 py-2'>
                  <label className='flex justify-center'>
                    <input className='peer sr-only' value='' type='checkbox' />
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
                  <button type='button' onClick={() => {}} className='w-3/4 rounded-md bg-red-500 px-4 py-1 text-white'>
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
