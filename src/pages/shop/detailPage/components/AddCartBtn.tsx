const AddCartBtn = () => {
  return (
    <button
      type='button'
      className='flex w-full flex-1 items-center justify-center border border-primary bg-primary px-[15px] py-[8px] font-light text-secondary transition-colors duration-700 hover:bg-white hover:text-primary md:px-[30px] md:py-[10px]'
      aria-label='장바구니에 상품 추가'
    >
      <span className='text-lg md:text-2xl'>장바구니 추가하기</span>
    </button>
  );
};

export default AddCartBtn;
