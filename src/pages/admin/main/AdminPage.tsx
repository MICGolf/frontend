import { useEffect, useState } from 'react';
import { Order } from './components/Order';
import { Payment } from './components/Payment';
import { Product } from './components/Product';
import { ReviewAndQuestion } from './components/ReviewAndQuestion';
import { SaleGraph } from './components/SaleGraph';
import { UserConnection } from './components/UserConnection';
import { adminApi } from '@/api';
import { OrderType, ProductType } from './type';

interface AdminData {
  order: OrderType;
  product: ProductType;
}

const AdminPage = () => {
  const [data, setData] = useState<AdminData>({
    order: {
      waiting: 0,
      newOrder: 0,
    },
    product: {
      sale: 0,
      soldOut: 0,
    },
  });

  return (
    <div className='grid grid-cols-2 gap-8'>
      <Order order={data?.order} />
      <Payment />
      <SaleGraph />
      <UserConnection />
      <Product product={data?.product} />
      <ReviewAndQuestion />
    </div>
  );
};

export default AdminPage;
