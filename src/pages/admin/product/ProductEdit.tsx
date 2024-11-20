import ProductFilter from './components/ProductFilter';
import ProductStatusDashboard from '../components/ProductStatusDashboard';
import ProductList from './components/ProductList';
import QuantitPopup from './components/QuantitPopup';
import { useState } from 'react';

const productStatusArray = [
  { title: '전체', count: 0 },
  { title: '판매중', count: 0 },
  { title: '품절', count: 0 },
  { title: '판매중지', count: 0 },
];

const ProductEdit = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ProductStatusDashboard productStatusArray={productStatusArray} />
      <ProductFilter />
      <ProductList handleShowPopup={() => setIsOpen(true)} />
      {isOpen && <QuantitPopup onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ProductEdit;
