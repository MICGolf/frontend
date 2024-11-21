import CartItemSkeletonUI from './CartItemSkeletonUI';

const skeletonArr = [1, 2, 3, 4];

const CartItemSkeleton = () => {
  return (
    <>
      {skeletonArr.map((_, idx) => (
        <CartItemSkeletonUI key={idx} />
      ))}
    </>
  );
};

export default CartItemSkeleton;
