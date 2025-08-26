import CardSkeletonUI from './CardSkeletonUI';

const skeletonArr = new Array(4).fill(null);

const ProductCardSkeleton = () => {
  return (
    <>
      {skeletonArr.map((_, idx) => (
        <CardSkeletonUI key={idx} />
      ))}
    </>
  );
};

export default ProductCardSkeleton;
