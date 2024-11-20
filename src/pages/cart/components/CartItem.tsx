import { Link } from 'react-router-dom';
import CheckBox from './CheckBox';
import { SaleProvider } from '@/components/SaleProvider';
import SaleLabel from '@/components/SaleLabel';
import SalePrice from '@/components/SalePrice';
import GlobalCounterBtn from '@/components/GlobalCounterBtn';
import CloseIco from '@/assets/icons/CloseIco';
import { CartItemData2 } from '@/assets/dummys/types';
import { useMediaQuery } from 'react-responsive';
import BuyNowButton from './BuyNowButton';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';

interface CartItemProps {
  data: CartItemData2;
  selectedItems: string[];
  handleModalOpen: (type: SignUpModalType) => void;
  handleCartSelectToggle: (itemId: string) => void;
  handleUpdateCount: (id: string, newCount: number) => void;
  handleRemoveSingleItem: (itemId: string) => void;
}

const CartItem = ({
  data,
  selectedItems,
  handleCartSelectToggle,
  handleUpdateCount,
  handleRemoveSingleItem,
  handleModalOpen,
}: CartItemProps) => {
  const isChecked = selectedItems.includes(data.id);
  const isMobile = useMediaQuery({ maxWidth: 468 });

  return (
    <li className={`flex h-[150px] items-center ${isMobile ? 'gap-3' : 'gap-6'}`}>
      <div>
        <CheckBox handleCartSelectToggle={handleCartSelectToggle} itemId={data.id} isChecked={isChecked} />
      </div>

      <Link to={`/shop/detail/${data.productId}`} className='h-full min-w-[100px] overflow-hidden md:min-w-[200px]'>
        <img
          src={data.image}
          alt={data.name}
          className='h-full w-full object-cover object-center transition-all duration-300 hover:scale-105'
        />
      </Link>

      {!isMobile && (
        <>
          <div className='flex h-full w-full flex-col justify-between'>
            <div className='flex flex-col'>
              <Link to={`/shop/detail/${data.productId}`}>
                <h3 className='mb-1 cursor-pointer text-sm font-semibold md:text-lg'>{data.name}</h3>
              </Link>

              <p className='text-xs text-gray700'>
                [옵션: {data.color.name} / {data.size}]
              </p>
            </div>

            <SaleProvider data={data}>
              <SaleLabel />
            </SaleProvider>

            <SalePrice data={data} originalSize='sm' saleSize='md' />
          </div>
          <div className='flex h-full w-full flex-col items-end justify-center gap-2'>
            <GlobalCounterBtn
              data={data}
              maxCount={data.stock}
              handleUpdateCount={handleUpdateCount}
              size='m'
              isMobile={isMobile}
            />
            <BuyNowButton
              size='m'
              handleModalOpen={handleModalOpen}
              handleCartSelectToggle={handleCartSelectToggle}
              data={data}
            />
          </div>
          <button className='hidden h-full cursor-pointer xl:block' onClick={() => handleRemoveSingleItem(data.id)}>
            <CloseIco />
          </button>
        </>
      )}
      {isMobile && (
        <div className='flex h-full w-full flex-col justify-between'>
          <div className='flex h-full w-full flex-col gap-2'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <Link to={`/shop/detail/${data.productId}`}>
                  <h3 className='mb-1 cursor-pointer text-sm font-semibold md:text-lg'>{data.name}</h3>
                </Link>
                <p className='text-xs text-gray700'>
                  [옵션: {data.color.name} / {data.size}]
                </p>
              </div>
            </div>

            <SalePrice data={data} originalSize='xs' saleSize='md' flex='col' />
          </div>
          <div className='flex h-full w-full items-end justify-between gap-2'>
            <GlobalCounterBtn
              data={data}
              maxCount={data.stock}
              size='s'
              handleUpdateCount={handleUpdateCount}
              isMobile={isMobile}
            />
            <BuyNowButton
              size='s'
              handleModalOpen={handleModalOpen}
              handleCartSelectToggle={handleCartSelectToggle}
              data={data}
            />
          </div>
        </div>
      )}
    </li>
  );
};

export default CartItem;
