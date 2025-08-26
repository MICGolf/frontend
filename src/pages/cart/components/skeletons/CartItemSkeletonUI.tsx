const CartItemSkeletonUI = () => {
  return (
    <li className='flex h-[150px] items-center gap-6'>
      <div className='relative h-full min-w-[100px] overflow-hidden bg-gray-200 md:min-w-[200px]'>
        <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
      </div>

      <div className='flex h-full w-full flex-col justify-between'>
        <div className='flex flex-col gap-2'>
          <div className='relative h-6 w-3/4 overflow-hidden bg-gray-200'>
            <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
          <div className='relative h-4 w-1/2 overflow-hidden bg-gray-200'>
            <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
        </div>
        <div className='flex flex-col gap-2'>
          <div className='relative h-5 w-1/4 overflow-hidden bg-gray-200'>
            <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
          <div className='relative h-6 w-1/3 overflow-hidden bg-gray-200'>
            <div className='animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200'></div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItemSkeletonUI;
