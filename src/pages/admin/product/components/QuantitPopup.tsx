import { useState } from 'react';

const colors = ['red', 'yellow', 'green', 'blue', 'purple'];

const QuantitPopup = ({ onClose }: { onClose: () => void }) => {
  const [color, setColor] = useState('red');
  return (
    <div className='overflow-hidden'>
      <div onClick={onClose} className='absolute left-0 top-0 flex h-full w-full bg-black/50' />
      <div className='absolute left-1/2 top-1/2 m-auto w-2/3 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4'>
        <h4 className='text-xl font-semibold'>상품이름</h4>
        <ul className='mt-4'>
          {colors.map((colorInfo) => {
            return (
              <li
                key={colorInfo}
                className={`inline-block cursor-pointer rounded-md px-4 py-2 ${color === colorInfo ? 'text-bold bg-primary text-white' : ''}`}
              >
                <a onClick={() => setColor(colorInfo)}>{colorInfo}</a>
              </li>
            );
          })}
        </ul>
        <div className='mt-4 rounded-lg border border-neutral-200 p-4'>
          <p className='text-base font-semibold text-neutral-700'>색상정보</p>
          <p className='mt-2 text-base'>
            <span className='mr-2 text-sm font-semibold text-neutral-500'>이름</span>
            {color}
          </p>
          <p className='mt-2 text-base'>
            <span className='mr-2 text-sm font-semibold text-neutral-500'>코드</span>
            {color}
          </p>
          <p className='mt-5 text-base font-semibold text-neutral-700'>사이즈 및 재고</p>
          <div className='mt-2 text-base'>
            <table className='w-full table-fixed'>
              <thead className='border-b border-neutral-200 bg-neutral-100'>
                <tr>
                  <th className='py-2'>사이즈</th>
                  <th className='py-2'>재고</th>
                </tr>
              </thead>
              <tbody className='text-center text-lg'>
                <tr className='border-b border-neutral-200'>
                  <td className='py-2'>S</td>
                  <td className='py-2'>100</td>
                </tr>
                <tr className='border-b border-neutral-200'>
                  <td className='py-2'>M</td>
                  <td className='py-2'>100</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <button onClick={onClose} className='mt-5 w-full rounded-md bg-primary py-2 text-white'>
          닫기
        </button>
      </div>
    </div>
  );
};

export default QuantitPopup;
