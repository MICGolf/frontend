import { Link } from 'react-router-dom';
import CheckBox from './CheckBox';
import { SaleProvider } from '@/components/SaleProvider';
import SaleLabel from '@/components/SaleLabel';
import SalePrice from '@/components/SalePrice';
import GlobalCounterBtn from '@/components/GlobalCounterBtn';
import CloseIco from '@/assets/icons/CloseIco';
import { CartItemData2 } from '@/assets/dummys/types';

interface CartItemProps {
  data: CartItemData2;
  selectedItems: string[];
  handleCartSelectToggle: (itemId: string) => void;
  handleUpdateCount: (id: string, newCount: number) => void;
}

const CartItem = ({ data, selectedItems, handleCartSelectToggle, handleUpdateCount }: CartItemProps) => {
  const isChecked = selectedItems.includes(data.id);

  return (
    <li className='flex h-[150px] items-center gap-6'>
      <div>
        <CheckBox handleCartSelectToggle={handleCartSelectToggle} itemId={data.id} isChecked={isChecked} />
      </div>

      <Link to={`/shop/detail/${data.productId}`} className='h-full min-w-[100px] overflow-hidden md:min-w-[200px]'>
        <img
          src={data.image}
          alt={data.name}
          className='object-cover object-center w-full h-full transition-all duration-300 hover:scale-105'
        />
      </Link>

      <div className='flex flex-col justify-between w-full h-full'>
        <div className='flex flex-col'>
          <h3 className='mb-1 text-sm font-semibold md:text-lg'>{data.name}</h3>
          <p className='text-xs text-gray700'>
            [옵션: {data.color.name} / {data.size}]
          </p>
        </div>
        <SaleProvider data={data}>
          <SaleLabel />
        </SaleProvider>

        <SalePrice data={data} originalSize='sm' saleSize='md' />
      </div>
      <div className='flex flex-col items-end justify-center w-full h-full gap-2'>
        <GlobalCounterBtn data={data} maxCount={data.stock} handleUpdateCount={handleUpdateCount} />
        <button className='h-[40px] w-[130px] border border-primary bg-primary text-sm text-secondary transition-all duration-300 hover:bg-secondary hover:text-primary'>
          바로구매
        </button>
      </div>
      <button className='hidden h-full cursor-pointer xl:block'>
        <CloseIco />
      </button>
    </li>
  );
};

export default CartItem;
