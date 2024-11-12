import Button from '@/components/Button';
import ListHeader from '../../ui/ListHeader';
import { SectionBox } from '../../ui/SectionBox';
import DefaultImg from '@/assets/imgs/logoText.svg';
import Toggle from '@/components/Toggle';
import { Banner } from '../type';
import { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ListHeaderArray = [
  { className: 'w-1/12', title: '순서' },
  { className: 'w-4/12', title: '제목' },
  { className: 'w-full', title: '이미지' },
  { className: 'w-2/12', title: '삭제' },
  { className: 'w-2/12', title: 'off/on' },
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

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(banners);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setBanners(items);
  };

  return (
    <SectionBox title={`배너목록 총(${bannerList}개)`}>
      <div className='px-5'>
        <ListHeader HeaderListArray={ListHeaderArray} />
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='banners'>
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {banners.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='flex items-center justify-stretch justify-items-center self-stretch border-b border-neutral-200 py-3 text-center'
                      >
                        <div className='flex w-1/12 items-center justify-center'>
                          <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 -960 960 960' width='24px'>
                            <path d='M120-120v-80h720v80H120Zm0-320v-80h720v80H120Zm0-320v-80h720v80H120Z' />
                          </svg>
                        </div>
                        <div className='w-4/12'>{item.title}</div>
                        <div className='w-full'>
                          <img src={item.image} alt='banner' />
                        </div>
                        <div className='flex w-2/12 items-center justify-center'>
                          <Button title='삭제' onClick={() => {}} color='bg-red-500' className='w-3/4' />
                        </div>
                        <div className='flex w-2/12 items-center justify-center'>
                          <Toggle isEnabled={item.isActive} onToggle={() => handleToggle(item.id)(!item.isActive)} />
                        </div>
                        <div className='flex w-2/12 items-center justify-center'>
                          <Button title='수정' onClick={() => {}} color='bg-blue-500' className='w-3/4' />
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </SectionBox>
  );
};

export default BannerList;
