import { useQuery } from '@tanstack/react-query';
import SaleFilter from './components/SaleFilter';
import SaleList from './components/SaleList';
import { orderApi } from '@/api';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export const SaleSearch = () => {
  const [page, setPage] = useState(1);
  const [pageLimit, setPageLimit] = useState<number>(10);
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    data: orderSearchData,
    isPending,
    error,
    refetch,
  } = useQuery({
    queryKey: ['orderSearch', searchParams.toString(), pageLimit],
    queryFn: async () => {
      const response = await orderApi.getOrderSearch(searchParams);
      if (!response) return null;
      return response.data;
    },
  });
  console.log('orderSearchData', orderSearchData);

  useEffect(() => {
    refetch();
  }, [pageLimit, refetch]);
  return (
    <>
      <SaleFilter setSearchParams={setSearchParams} onSubmit={() => refetch()} pageLimit={pageLimit} />
      <SaleList
        page={page}
        setPage={setPage}
        orderSearchData={orderSearchData}
        isPending={isPending}
        error={error}
        pageLimit={pageLimit}
        setPageLimit={setPageLimit}
        setSearchParams={setSearchParams}
        searchParams={searchParams}
      />
    </>
  );
};

export default SaleSearch;
