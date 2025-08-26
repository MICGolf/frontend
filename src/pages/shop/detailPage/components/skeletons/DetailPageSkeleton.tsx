import { useMediaQuery } from 'react-responsive';
import DetailImageSkeleton from './ImageOnLoadSkeleton';
import { AnimatePresence, motion } from 'framer-motion';
import MobileModalToggler from '../MobileModalToggler';
import { useState } from 'react';
import OptionSelectBoxSkeleton from './OptionSelectBoxSkeleton';
import TextContentSkeleton from './TextContentSkeleton';
import LoadingSpinner from '@/components/LoadingSpinner';

const DetailPageSkeleton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const shouldResponsive = useMediaQuery({ maxWidth: 767 });
  const handleOnClose = () => {
    setIsOpen(false);
  };
  const detailBoxes = [
    {
      id: 1,
      title: '제품 설명',
    },
    {
      id: 2,
      title: '제품 특징',
    },
    {
      id: 3,
      title: '환불 정책',
    },
  ];
  return (
    <>
      <section className='flex min-h-screen flex-col transition-all duration-300 ease-in-out md:flex-row'>
        <div className='flex w-full flex-col gap-[2px] transition-all duration-300 ease-in-out md:w-1/2'>
          <DetailImageSkeleton />
        </div>
        {shouldResponsive ? (
          <AnimatePresence>
            <motion.div
              key='optionSelectBoxContainer'
              initial={{ y: '100%' }}
              animate={{ y: isOpen ? 0 : '70%' }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', stiffness: 500, damping: 35 }}
              className='fixed bottom-0 left-0 z-50 w-full bg-secondary'
            >
              <MobileModalToggler isOpen={isOpen} setIsOpen={setIsOpen} />
              <div className='h-[40px] w-full border border-gray300 bg-white px-4 py-10'>
                <LoadingSpinner size='s' />
              </div>
            </motion.div>
            {isOpen && (
              <motion.div
                key='backdrop'
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className='fixed inset-0 z-10 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm'
                onClick={handleOnClose}
              />
            )}
          </AnimatePresence>
        ) : (
          <div className='sticky top-0 flex h-[100vh] w-1/2 flex-col overflow-auto border-l border-primary bg-white px-[50px] pb-[50px] pt-[150px] transition-all duration-300 ease-in-out md:border-l'>
            <OptionSelectBoxSkeleton />
          </div>
        )}
      </section>
      <section className='mx-[25px] my-[24px] flex flex-col xl:mx-[130px] xl:my-[96px]'>
        {detailBoxes.map((item) => (
          <div key={item.id} className='flex flex-col border-t border-t-gray500 py-[38px]'>
            <div className='flex flex-col gap-4 xl:flex-row xl:justify-between'>
              <h3 className='flex-1 text-xl font-semibold md:text-4xl'>{item.title}</h3>
              <div className='flex flex-1 flex-col'>
                <TextContentSkeleton />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export default DetailPageSkeleton;
