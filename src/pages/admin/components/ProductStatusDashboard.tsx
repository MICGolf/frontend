const ProductStatusDashboard = ({ productStatusArray }: { productStatusArray: { title: string; count: number }[] }) => {
  return (
    <ul className='flex w-full justify-center gap-11 rounded-lg bg-white px-8 py-5'>
      {productStatusArray?.map((productStatus) => {
        return (
          <li
            key={productStatus.title}
            className='flex flex-col items-center justify-center text-xl font-semibold text-neutral-400'
          >
            {productStatus.title}
            <p className='mt-2 text-2xl text-neutral-900'>
              <span>{productStatus.count}</span>
              <span className='ml-1 text-xl'>건</span>
            </p>
          </li>
        );
      })}
    </ul>
  );
};

export default ProductStatusDashboard;
