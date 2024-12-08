import { SectionBoxProps } from './type';
import { useSearchParams } from 'react-router-dom';

export const SectionBox = ({
  children,
  title,
  selectOptions = false,
  border = true,
  pageLimit,
  setPageLimit,
}: SectionBoxProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className='mt-5 rounded-lg bg-white py-6 text-base'>
      <div className={`flex justify-between ${border ? 'border-b-[1px] border-neutral-200' : ''} mb-4`}>
        <p className='mb-4 px-5 pb-4 text-xl font-bold'>{title}</p>
        <div className='px-5'>
          {selectOptions && (
            <>
              <select
                name='pageLimit'
                defaultValue={pageLimit}
                id='pageLimit'
                className='mr-4 w-20 rounded-md border border-neutral-200 px-1 py-1 text-sm'
                onChange={(e) => {
                  const value = e.target.value;
                  if (setPageLimit) {
                    setPageLimit(Number(value));
                    localStorage.setItem('pageListLimit', value);
                    const currentParams = new URLSearchParams(searchParams);
                    currentParams.set('page_size', value);
                    setSearchParams(currentParams);
                  }
                }}
              >
                <option value='10'>10</option>
                <option value='30'>30</option>
                <option value='50'>50</option>
                <option value='100'>100</option>
              </select>
              <select name='sort' id='sort' className='w-20 rounded-md border border-neutral-200 px-1 py-1 text-sm'>
                <option value='created_at'>등록일</option>
              </select>
            </>
          )}
        </div>
      </div>

      {children}
    </div>
  );
};
