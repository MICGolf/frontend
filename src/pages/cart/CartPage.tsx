import { cartItemData } from '@/assets/dummys/cartItemData';

const CartPage = () => {
  return (
    <div className='mx-auto max-w-[1440px] pb-[120px] pt-[80px]'>
      <div>
        <div className='text-[40px] font-[700]'>장바구니</div>
      </div>
      <div className='flex gap-4'>
        <div className='p-5 font-sans'>
          <div className='grid grid-cols-[50px_100px_1fr_150px_150px_50px] items-center border-b border-gray-200 py-4 font-bold'>
            <div className='text-center'>
              <input type='checkbox' className='form-checkbox' />
            </div>
            <div className='col-span-2 text-xl'>상품정보</div>
            <div className='text-center text-xl'>상품금액</div>
            <div className='text-center text-xl'>선택</div>
          </div>

          {cartItemData.map((item) => (
            <div
              key={item.id}
              className='grid grid-cols-[50px_200px_1fr_150px_150px_50px] items-center border-b border-gray-100 py-5'
            >
              <div className='text-center'>
                <input type='checkbox' checked={item.checked} className='form-checkbox' />
              </div>

              <div className='h-[200px] w-[200px]'>
                <div className='h-full w-full border border-gray-200 bg-gray-100'></div>
              </div>

              <div className='px-5 text-xl'>
                <div className='mb-2 text-2xl'>{item.name}</div>
                <div className='text-gray-600'>
                  {item.color}&nbsp;&nbsp;{item.size}
                </div>
                <div className='text-gray-600'>{item.amount}</div>
              </div>

              <div className='text-center text-2xl font-bold'>{item.price.toLocaleString()} 원</div>

              <div className='flex flex-col gap-2 px-2'>
                <button className='border border-gray200 bg-white px-4 py-2 text-2xl hover:opacity-70'>
                  옵션 변경
                </button>
                <button className='bg-black px-4 py-2 text-2xl text-white hover:opacity-70'>바로 구매</button>
              </div>

              <button className='text-xl text-gray-400 hover:text-gray-600'>✕</button>
            </div>
          ))}
        </div>

        {/* 주문 section */}
        <div className='min-w-[386px]'>
          <div className='flex flex-col gap-2 border border-gray200 p-8'>
            <div className='flex flex-col gap-6 border-b border-gray200 p-6'>
              <div className='mb- text-left text-2xl'>총 상품 0개</div>
              <div className='flex flex-col gap-2'>
                <div className='flex justify-between'>
                  <span>상품합계</span>
                  <span>0원</span>
                </div>
                <div className='flex justify-between'>
                  <span>배송비</span>
                  <span>0원</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 p-6 text-right text-2xl'>
              <div>결제예상금액</div>
              <strong>0원</strong>
            </div>
            <div className='flex justify-center'>
              <button className='bg-black px-6 py-3 text-2xl text-white hover:opacity-70'>주문하기</button>
            </div>
          </div>
        </div>
      </div>
      {/* 버튼 section */}
      <div className='flex gap-2'>
        <button className='border border-gray200 p-2 text-gray700'>계속 쇼핑하기</button>
        <button className='border border-gray200 p-2 text-gray700'>선택 상품 삭제하기</button>
        <button className='border border-gray200 p-2 text-gray700'>장바구니 비우기</button>
      </div>
    </div>
  );
};

export default CartPage;
