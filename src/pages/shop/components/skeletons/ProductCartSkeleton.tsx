import CardSkeletonUI from './CardSkeletonUI';

const skeletonArr = new Array(10).fill(null);

const ProductCartSkeleton = () => {
  return (
    <>
      {skeletonArr.map((_, idx) => (
        <CardSkeletonUI key={idx} />
      ))}
    </>
  );
};

export default ProductCartSkeleton;
