import { Link } from 'react-router-dom';
import CheckBox from './CheckBox';
import { SaleProvider } from '@/components/SaleProvider';
import SaleLabel from '@/components/SaleLabel';
import SalePrice from '@/components/SalePrice';
import GlobalCounterBtn from '@/components/GlobalCounterBtn';
import CloseIco from '@/assets/icons/CloseIco';
import { CartItemData } from '@/assets/dummys/types';
import { useMediaQuery } from 'react-responsive';
import BuyNowButton from './BuyNowButton';
import { SignUpModalType } from '@/hooks/useModalState/useModalState';

interface CartItemProps {
  data: CartItemData;
  selectedItems: string[];
  handleBuyNow: (itemId: string) => void;
  handleModalOpen: (type: SignUpModalType) => void;
  handleCartSelectToggle: (itemId: string) => void;
  handleUpdateCount: (id: string, newCount: number) => void;
  handleRemoveSingleItem: (itemId: string) => void;
}

const CartItem = ({
  data,
  selectedItems,
  handleBuyNow,
  handleCartSelectToggle,
  handleUpdateCount,
  handleRemoveSingleItem,
  handleModalOpen,
}: CartItemProps) => {
  const isChecked = selectedItems.includes(data.id);
  const isMobile = useMediaQuery({ maxWidth: 468 });
  const { discount, discountOption, price, originPrice, productId, name, id, image, size, color, stock } = data;

  return (
    <li className={`flex h-[150px] items-center ${isMobile ? 'gap-3' : 'gap-6'}`}>
      <div>
        <CheckBox handleCartSelectToggle={handleCartSelectToggle} itemId={id} isChecked={isChecked} />
      </div>

      <Link to={`/product/detail/${productId}`} className='h-full min-w-[100px] overflow-hidden md:min-w-[200px]'>
        <img
          src={image}
          alt={name}
          className='h-full w-full object-cover object-center transition-all duration-300 hover:scale-105'
        />
      </Link>

      {!isMobile && (
        <>
          <div className='flex h-full w-full flex-col justify-between'>
            <div className='flex flex-col'>
              <Link to={`/product/detail/${productId}`}>
                <h3 className='mb-1 cursor-pointer text-sm font-semibold md:text-lg'>{name}</h3>
              </Link>

              <p className='text-xs text-gray700'>
                [옵션: {color.name} / {size}]
              </p>
            </div>

            <SaleProvider discount={discount} discountOption={discountOption}>
              <SaleLabel />
            </SaleProvider>

            <SalePrice price={price} originPrice={originPrice} originalSize='sm' saleSize='md' />
          </div>
          <div className='flex h-full w-full flex-col items-end justify-center gap-2'>
            <GlobalCounterBtn
              data={data}
              stock={stock}
              handleUpdateCount={handleUpdateCount}
              size='m'
              isMobile={isMobile}
            />
            <BuyNowButton size='m' handleModalOpen={handleModalOpen} handleBuyNow={handleBuyNow} data={data} />
          </div>
          <button className='hidden h-full cursor-pointer xl:block' onClick={() => handleRemoveSingleItem(id)}>
            <CloseIco />
          </button>
        </>
      )}
      {isMobile && (
        <div className='flex h-full w-full flex-col justify-between'>
          <div className='flex h-full w-full flex-col gap-2'>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <Link to={`/product/detail/${productId}`}>
                  <h3 className='mb-1 cursor-pointer text-sm font-semibold md:text-lg'>{name}</h3>
                </Link>
                <p className='text-xs text-gray700'>
                  [옵션: {color.name} / {size}]
                </p>
              </div>
            </div>

            <SalePrice price={price} originPrice={originPrice} originalSize='xs' saleSize='md' flex='col' />
          </div>
          <div className='flex h-full w-full items-end justify-between gap-2'>
            <GlobalCounterBtn
              data={data}
              stock={stock}
              size='s'
              handleUpdateCount={handleUpdateCount}
              isMobile={isMobile}
            />
            <BuyNowButton size='s' handleModalOpen={handleModalOpen} handleBuyNow={handleBuyNow} data={data} />
          </div>
        </div>
      )}
    </li>
  );
};

export default CartItem;
