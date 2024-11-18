import ListHeader from '../../components/ListHeader';
import { SectionBox } from '../../components/SectionBox';
import DefaultImg from '@/assets/imgs/logoText.svg';
import { Banner } from '../type';
import { useState } from 'react';

const ListHeaderArray = [
  { className: 'w-4/12', title: '제목' },
  { className: 'w-full', title: '이미지' },
  { className: 'w-2/12', title: '삭제' },
  { className: 'w-2/12', title: '비노출/노출' },
  { className: 'w-2/12', title: '수정' },
];

const bannerListArray = [
  { id: 1, title: '배너1', image: DefaultImg, isActive: false },
  { id: 2, title: '배너2', image: DefaultImg, isActive: false },
  { id: 3, title: '배너3', image: DefaultImg, isActive: true },
];

const BannerList = () => {
  const [banners, setBanners] = useState<Banner[]>(bannerListArray);
  const bannerList = 1;
  const handleToggle = (id: number) => (value: boolean) => {
    setBanners((prev) => prev.map((banner) => (banner.id === id ? { ...banner, isActive: value } : banner)));
  };

  return (
    <SectionBox title={`배너목록 총(${bannerList}개)`}>
      <div className='px-5'>
        <ListHeader HeaderListArray={ListHeaderArray} />
        <div>
          {banners.map((item) => (
            <div className='flex items-center self-stretch py-3 text-center border-b justify-stretch justify-items-center border-neutral-200'>
              <div className='w-4/12'>{item.title}</div>
              <div className='w-full'>
                <img src={item.image} alt='banner' />
              </div>
              <div className='flex items-center justify-center w-2/12'>
                <button
                  type='button'
                  onClick={() => {}}
                  className='block w-3/4 px-4 py-2 text-base text-white duration-300 ease-in-out bg-red-500 rounded-md hover:scale-105'
                >
                  삭제
                </button>
              </div>
              <label className='inline-flex items-center justify-center w-2/12 h-6 cursor-pointer'>
                <input
                  className='sr-only peer'
                  value=''
                  type='checkbox'
                  checked={item.isActive}
                  onChange={() => handleToggle(item.id)(!item.isActive)}
                />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700"></div>
              </label>
              <div className='flex items-center justify-center w-2/12'>
                <button
                  type='button'
                  onClick={() => {}}
                  className='block w-3/4 px-4 py-2 text-base text-white duration-300 ease-in-out bg-blue-500 rounded-md hover:scale-105'
                >
                  수정
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionBox>
  );
};

export default BannerList;
