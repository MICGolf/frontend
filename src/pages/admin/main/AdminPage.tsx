import { useState } from 'react';
import { Order } from './components/Order';
import { Payment } from './components/Payment';
import { Product } from './components/Product';
import { ReviewAndQuestion } from './components/ReviewAndQuestion';
import { SaleGraph } from './components/SaleGraph';
import { UserConnection } from './components/UserConnection';
import { AdminData } from './type';

const AdminPage = () => {
  const [data, _setData] = useState<AdminData>({
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
      <Product product={data?.product} />
      <ReviewAndQuestion />
      <UserConnection />
      <SaleGraph />
      <Order order={data?.order} />
      <Payment />
    </div>
  );
};

export default AdminPage;
