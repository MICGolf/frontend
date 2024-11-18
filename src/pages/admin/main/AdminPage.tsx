import { Order } from './components/Order';
import { Payment } from './components/Payment';
import { Product } from './components/Product';
import { ReviewAndQuestion } from './components/ReviewAndQuestion';
import { SaleGraph } from './components/SaleGraph';
import { UserConnection } from './components/UserConnection';

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
