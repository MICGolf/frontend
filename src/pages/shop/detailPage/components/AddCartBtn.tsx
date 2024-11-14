const AddCartBtn = () => {
  return (
    <button
      type='submit'
      className='flex w-full flex-1 items-center justify-center border border-primary bg-primary px-[30px] py-[10px] text-2xl font-light text-secondary transition-colors duration-700 hover:bg-transparent hover:text-primary'
      aria-label='장바구니에 상품 추가'
    >
      장바구니 추가하기
    </button>
  );
};

export default AddCartBtn;
