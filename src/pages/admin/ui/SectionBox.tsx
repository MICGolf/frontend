import { ReactNode } from 'react';

export const SectionBox = ({ children, title }: { children: ReactNode; title: string }) => {
  return (
    <div className='rounded-lg bg-white py-6 text-base'>
      <p className='mb-4 border-b-[1px] border-black px-5 pb-4 text-xl font-bold'>{title}</p>
      {children}
    </div>
  );
};
