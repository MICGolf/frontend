type Product = {
  id: number;
  image: string;
  name: string;
  origin_price: number;
};

export type HistoryType = {
  date: string;
  products: Product[];
};
