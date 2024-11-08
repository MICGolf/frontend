import { DetailData } from '@/assets/dummys/types';
import React from 'react';

export interface ProductDetailsProps {
  data: DetailData;
}

export interface ProductDetailViewProps extends ProductDetailsProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
