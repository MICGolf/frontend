import ProductFilter from './components/ProductFilter';
import ProductStatusDashboard from '../components/ProductStatusDashboard';
import ProductList from './components/ProductList';
import QuantitPopup from './components/QuantitPopup';
import { useEffect, useState } from 'react';

const productStatusArray = [
  { title: '전체', count: 0 },
  { title: '판매중', count: 0 },
  { title: '품절', count: 0 },
  { title: '판매중지', count: 0 },
];

const ProductSearch = () => {
  const [isOpen, setIsOpen] = useState(false);

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
  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <ProductFilter />
      <ProductList handleShowPopup={() => setIsOpen(true)} />
      {isOpen && <QuantitPopup onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProductSearch;
