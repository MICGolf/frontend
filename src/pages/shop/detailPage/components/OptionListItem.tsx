// FIXME: 언제 사용할지 모름
// import { StockItem } from '@/assets/dummys/types';
// import Counter from './CounterBtn';
// import { useEffect, useState } from 'react';

// interface CounterProps {
//   stock: StockItem[];
//   colorName: string;
//   colorId: string;
//   price: number;
//   setCount?: (count: number) => void;
// }

// const OptionListItem = ({ stock, colorId, colorName, price }: CounterProps) => {
//   const [count, setCount] = useState(1);
//   const [itemPrice, setItemPrice] = useState(price);
//   const currentStock = stock.find((item) => item.id === colorId);
//   const maxCount = currentStock?.quantity;

//   useEffect(() => {
//     setItemPrice(count * price);
//   }, [count]);

//   return (
//     <div className='flex items-center justify-between gap-2 bg-gray-100 px-2 py-4'>
//       <h3 className='text-sm font-medium'>{colorName}</h3>
//       <div className='flex gap-6'>
//         <Counter count={count} maxCount={maxCount} setCount={setCount} />
//         <p>{`${itemPrice.toLocaleString()}원`}</p>
//       </div>
//     </div>
//   );
// };

// export default OptionListItem;
