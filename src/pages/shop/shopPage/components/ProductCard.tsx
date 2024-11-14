import { Link } from 'react-router-dom';

interface ProductCardProps  {
  product: {
    id: string;
    name: string;
    price: number;
    colors: { images: string[]; hex: string }[];
  };
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, name, price, colors } = product;
  const productImage = colors[0].images[0]; // 첫 번째 색상과 첫 번째 이미지를 가져옴.

  return (
    <Link to={`/shop/detail/${id}`} className='block h-full'>
      <div className='flex flex-col h-full'>
        <div className='relative w-full overflow-hidden pt-[133%]'>
          <img
            src={productImage}
            alt={name}
            className='absolute top-0 left-0 object-cover w-full h-full transition-transform duration-300 hover:scale-105'
          />
        </div>
        <div className='flex flex-col justify-between flex-grow py-4'>
          <h3 className='mb-2 text-lg font-semibold'>{name}</h3>
          <p className='text-gray-600'>₩ {price.toLocaleString()}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
