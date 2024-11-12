import { client } from '@/api/client';
import { cartItemData } from '@/assets/dummys/cartItemData';
import { CartItemData } from '@/assets/dummys/types';
import { useUserStore } from '@/config/store';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

const CartPage = () => {
  // INFO: 사용자 정보 전역상태
  const { user } = useUserStore();
  const queryClient = useQueryClient();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [isAllChecked, setIsAllChecked] = useState<boolean>(false);

  // INFO: 비회원 사용자 기준 장바구니 데이터 가져오기
  const getGuestCartItems = () => {
    const guestCartItems = localStorage.getItem('cartItems');
    return guestCartItems ? JSON.parse(guestCartItems) : [];
  };

  // INFO: 회원 사용자 기준 장바구니 데이터 가져오기
  const { data = [] } = useQuery<CartItemData[]>({
    queryKey: ['cartItems', user?.id],
    queryFn: async () => {
      const response = await client.get(`/api/v1/cart/${user?.id}`);
      return response.data.cartItems || [];
    },
    enabled: Boolean(user),
    initialData: getGuestCartItems(),
  });
  console.log(data);

  // INFO: 비회원 사용자 장바구니 데이터를 회원 사용자 장바구니 데이터로 이전
  useEffect(() => {
    const initializeCartItems = async () => {
      if (user) {
        const guestCartItems = getGuestCartItems();
        if (guestCartItems.length > 0) {
          try {
            const response = await client.post(`/api/v1/cart/${user.id}`, { cartItems: guestCartItems });
            if (response.status === 200) {
              localStorage.removeItem('cartItems');
              queryClient.invalidateQueries({ queryKey: ['cartItems', user.id] });
            }
          } catch (err) {
            console.error(err);
          }
        }
      } else {
      }
    };
    initializeCartItems();
  }, []);

  // INFO: 전체 선택 체크박스 트리거
  useEffect(() => {
    setIsAllChecked(cartItemData.length > 0 && selectedItems.length === cartItemData.length);
  }, [selectedItems, cartItemData]);

  // INFO: 선택된 상품 토글
  const handleToggle = (itemId: number) => {
    setSelectedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]));
  };

  // INFO: 전체 선택 체크박스 토글
  const handleToggleAll = () => {
    if (isAllChecked) {
      setSelectedItems([]);
    } else {
      setSelectedItems(cartItemData.map((item) => item.id));
    }
    setIsAllChecked((prev) => !prev);
  };

  // 선택된 아이템의 총 가격 계산
  const totalPrice = useMemo(() => {
    return selectedItems.reduce((acc, id) => {
      const item = cartItemData.find((item) => item.id === id);
      return acc + (item ? item.price : 0);
    }, 0);
  }, [selectedItems, cartItemData]);

  // 배송비 계산 (변수 형태로 선언)
  const totalDeliveryFee = useMemo(() => {
    if (selectedItems.length === 0) {
      return 0;
    }
    return totalPrice > 100000 ? 0 : 2500;
  }, [selectedItems, totalPrice]);

  return (
    <div className='mx-auto max-w-[1660px] pb-[120px] pt-[80px]'>
      <div>
        <div className='text-4xl font-[700]'>장바구니</div>
      </div>
      <div className='flex gap-4'>
        <div className='p-5 font-sans'>
          <div className='grid grid-cols-[50px_200px_1fr_220px_220px_50px] items-center border-y border-gray-200 py-4 font-bold'>
            <div>
              <label className='flex cursor-pointer items-center'>
                <input type='checkbox' className='hidden' onChange={handleToggleAll} checked={isAllChecked} />
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-sm border-2 ${isAllChecked ? 'bg-black' : 'bg-white'}`}
                >
                  {isAllChecked && (
                    <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  )}
                </span>
              </label>
            </div>
            <div className='col-span-2 text-center text-xl'>상품정보</div>
            <div className='text-center text-xl'>상품금액</div>
            <div className='text-center text-xl'>선택</div>
          </div>

          {/* FIX: cartItemData => data로 변경 예정 */}
          {cartItemData.map((item) => (
            <div
              key={item.id}
              className='grid grid-cols-[50px_200px_1fr_220px_220px_50px] items-center border-b border-gray-100 py-5'
            >
              <div className='text-center'>
                <label
                  className={`flex h-8 w-8 items-center justify-center rounded-sm border-2 ${selectedItems.includes(item.id) ? 'bg-black' : 'bg-white'}`}
                >
                  <input
                    type='checkbox'
                    className='hidden'
                    onChange={() => handleToggle(item.id)}
                    checked={selectedItems.includes(item.id)}
                  />
                  {selectedItems.includes(item.id) && (
                    <svg className='h-5 w-5 text-white' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                    </svg>
                  )}
                </label>
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

              <div className='flex flex-col items-center gap-2 px-2'>
                <div>
                  <button className='border border-gray200 bg-white px-6 py-3 text-2xl hover:opacity-70'>
                    옵션 변경
                  </button>
                </div>
                <div>
                  <button className='bg-black px-6 py-3 text-2xl text-white hover:opacity-70'>바로 구매</button>
                </div>
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
                  <span>{totalPrice.toLocaleString()}원</span>
                </div>
                <div className='flex justify-between'>
                  <span>배송비</span>
                  <span>{totalDeliveryFee.toLocaleString()}원</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-2 p-6 text-right text-2xl'>
              <div>결제예상금액</div>
              <strong>{(totalPrice + totalDeliveryFee).toLocaleString()}원</strong>
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
