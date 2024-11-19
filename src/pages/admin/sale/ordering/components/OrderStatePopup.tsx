import DeliveryCompony from './DeliveryCompony';

const OrderStatePopup = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className='overflow-hidden'>
      <div onClick={onClose} className='absolute left-0 top-0 flex h-full w-full bg-black/50' />
      <div className='absolute left-1/2 top-1/2 m-auto w-2/3 translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-4'>
        <h4 className='text-xl font-semibold'>주문번호 : 낭러ㅗㅁ니ㅓㅇ리</h4>
        <div className='mt-4 rounded-lg border border-neutral-200 p-4'>
          <p className='text-base font-semibold text-neutral-700'>배송정보</p>
          <div className='mt-2 text-base'>
            <DeliveryCompony />
          </div>
          <div className='mt-2 text-base'>
            <table className='w-full table-fixed'>
              <thead className='border-b border-neutral-200 bg-neutral-100'>
                <tr>
                  <th className='py-2'>주문번호</th>
                  <th className='py-2'>상품주문번호</th>
                  <th className='py-2'>발주상태</th>
                </tr>
              </thead>
              <tbody className='text-center text-base'>
                <tr className='border-b border-neutral-200'>
                  <td className='py-2'>1234567890</td>
                  <td className='py-2'>1234567890</td>
                  <td className='py-2'>미발주</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className='flex justify-end gap-4'>
          <button
            onClick={onClose}
            className='hover: mt-5 w-full rounded-md border border-neutral-200 py-2 duration-300 ease-in-out hover:scale-105 hover:bg-neutral-200'
          >
            닫기
          </button>
          <button
            onClick={onClose}
            className='mt-5 w-full rounded-md bg-primary py-2 text-white duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
          >
            등록
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderStatePopup;
