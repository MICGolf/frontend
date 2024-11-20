import { useEffect, useState } from 'react';
import { Order } from './components/Order';
import { Payment } from './components/Payment';
import { Product } from './components/Product';
import { ReviewAndQuestion } from './components/ReviewAndQuestion';
import { SaleGraph } from './components/SaleGraph';
import { UserConnection } from './components/UserConnection';
import { getAdminMain } from '@/api/adminAxois';

const AdminPage = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => {
    (async () => {
      try {
        const { data } = await getAdminMain();
        setData(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);
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
