import { Order } from './ui/Order';
import { Payment } from './ui/Payment';

const AdminPage = () => {
  return (
    <div className='grid grid-cols-2 gap-8'>
      <Order />
      <Payment />
    </div>
  );
};

export default AdminPage;
