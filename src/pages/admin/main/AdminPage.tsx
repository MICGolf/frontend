import { Order } from './ui/Order';
import { Payment } from './ui/Payment';
import { Product } from './ui/Product';
import { ReviewAndQuestion } from './ui/ReviewAndQuestion';
import { SaleGraph } from './ui/SaleGraph';
import { UserConnection } from './ui/UserConnection';

const AdminPage = () => {
  return (
    <div className='grid grid-cols-2 gap-8'>
      <Order />
      <Payment />
      <SaleGraph />
      <UserConnection />
      <Product />
      <ReviewAndQuestion />
    </div>
  );
};

export default AdminPage;
