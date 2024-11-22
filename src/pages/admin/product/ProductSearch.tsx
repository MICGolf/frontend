import ProductFilter from './components/ProductFilter';
import ProductStatusDashboard from '../components/ProductStatusDashboard';
import ProductList from './components/ProductList';
import QuantitPopup from './components/QuantitPopup';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { adminApi } from '@/api';
const productStatusArray = [
  { title: '전체', count: 0 },
  { title: '판매중', count: 0 },
  { title: '품절', count: 0 },
  { title: '판매중지', count: 0 },
];

const ProductSearch = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [quantitPopupData, setQuantitPopupData] = useState();
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(localStorage.getItem('pageListLimit') || '100');
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const {
    data: productFilterData,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['productFilter', searchParams.toString(), pageLimit],
    queryFn: async () => {
      const response = await adminApi.getAdminProducts(searchParams);
      if (!response) return null;
      console.log(response.data);
      return response.data;
    },
  });

  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <ProductFilter setSearchParams={setSearchParams} onSubmit={() => refetch()} />
      <ProductList
        page={page}
        setPage={setPage}
        handleShowPopup={() => setIsOpen(true)}
        productListArray={productFilterData}
        isPending={isPending}
        error={error}
        setPageLimit={setPageLimit}
        setQuantitPopupData={setQuantitPopupData}
      />
      {isOpen && quantitPopupData && (
        <QuantitPopup onClose={() => setIsOpen(false)} quantitPopupData={quantitPopupData} />
      )}
    </>
  );
};

export default ProductSearch;
