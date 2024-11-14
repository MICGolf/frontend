import { useEffect, useState } from 'react';

interface TotalPriceProps {
  count: number;
  price: number;
}

const TotalPrice = ({ count, price }: TotalPriceProps) => {
  const [totalPrice, setTotalPrice] = useState(price);

  useEffect(() => {
    setTotalPrice(count * price);
  }, [count]);

  return (
    <div className='flex justify-between gap-2 py-6 border-y border-y-gray-400'>
      <h3 className='text-2xl font-medium'>총 금액</h3>
      <p className='text-2xl'>₩{totalPrice.toLocaleString()}</p>
    </div>
  );
};

export default TotalPrice;
