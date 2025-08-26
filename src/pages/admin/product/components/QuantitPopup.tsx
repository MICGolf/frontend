import { useState } from 'react';
import { Sizes } from '../type';

const QuantitPopup = ({ onClose, quantitPopupData }: { onClose: () => void; quantitPopupData: any }) => {
  const [color, setColor] = useState(quantitPopupData.options[0] || null);
  return (
    <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center'>
      <div onClick={onClose} className='absolute h-full w-full bg-black/50' />
      <div className='z-10 w-2/3 rounded-lg bg-white p-4'>
        <h4 className='text-xl font-semibold'>{quantitPopupData?.product.name}</h4>
        <ul className='mt-4'>
          {quantitPopupData.options.map((data: any) => {
            if (quantitPopupData.options.length === 0) return;
            return (
              <li
                key={data.id}
                className={`inline-block cursor-pointer rounded-md px-4 py-2 ${color.color === data.color ? 'text-bold bg-primary text-white' : ''}`}
              >
                <button type='button' onClick={() => setColor(data)}>
                  {data.color}
                </button>
              </li>
            );
          })}
        </ul>
        <div className='mt-4 rounded-lg border border-neutral-200 p-4'>
          <p className='text-base font-semibold text-neutral-700'>색상정보</p>
          <p className='mt-2 text-base'>
            <span className='mr-2 text-sm font-semibold text-neutral-500'>이름</span>
            {(color && color.color) || '-'}
          </p>
          <p className='mt-2 flex items-center text-base'>
            <span className='mr-2 text-sm font-semibold text-neutral-500'>코드</span>
            {color?.color_code ? (
              <span
                style={{ backgroundColor: color?.color_code || 'white' }}
                className='mr-1 inline-block w-fit rounded-md px-2 py-2'
              />
            ) : undefined}

            {(color && color.color_code) || '-'}
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
                {quantitPopupData.options.length === 0 ? (
                  <tr className='py-2 text-center'>
                    <td className='py-2'>-</td>
                    <td className='py-2'>-</td>
                  </tr>
                ) : (
                  quantitPopupData?.options[0].sizes.map((size: Sizes) => {
                    return (
                      <tr className='border-b border-neutral-200' key={size.size}>
                        <td className='py-2'>{size.size}</td>
                        <td className='py-2'>{size.stock}</td>
                      </tr>
                    );
                  })
                )}
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
