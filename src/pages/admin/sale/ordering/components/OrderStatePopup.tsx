import DeliveryCompony from './DeliveryCompony';
import { OrderingListType } from '../type';
import { useForm, FormProvider } from 'react-hook-form';

const OrderStatePopup = ({ onClose, checkedList }: { onClose: () => void; checkedList: OrderingListType[] }) => {
  const orderNumber = [...new Set(checkedList.map((item) => item.order_number))];
  const methods = useForm();
  const { handleSubmit } = methods;
  const handlerSubmit = (data: any) => console.log(data);

  return (
    <div className='fixed left-0 top-0 flex h-full w-full items-center justify-center'>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(handlerSubmit)} className='z-10 w-2/3 overflow-hidden rounded-lg bg-white p-4'>
          <h4 className='text-xl font-semibold'>주문번호 : {orderNumber.join(', ')}</h4>
          {orderNumber.length > 1 ? <p>주문번호가 2건 이상입니다. 확인해주세요.</p> : ''}
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
                  {checkedList.map((item) => (
                    <tr key={item.id} className='border-b border-neutral-200'>
                      <td className='py-2'>{item.order_number}</td>
                      <td className='py-2'>{item.productOrderNumber}</td>
                      <td className='py-2'>{item.orderDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='flex justify-end gap-4'>
            <button
              type='button'
              onClick={onClose}
              className='hover: mt-5 w-full rounded-md border border-neutral-200 py-2 duration-300 ease-in-out hover:scale-105 hover:bg-neutral-200'
            >
              닫기
            </button>
            <button
              type='submit'
              className='mt-5 w-full rounded-md bg-primary py-2 text-white duration-300 ease-in-out hover:scale-105 hover:bg-black hover:text-white'
            >
              등록
            </button>
          </div>
        </form>
        <div onClick={onClose} className='absolute h-full w-full bg-black/50' />
      </FormProvider>
    </div>
  );
};

export default OrderStatePopup;
