type Product = {
  id: number;
  image: string;
  name: string;
  price: number;
};

export type HistoryType = {
  date: string;
  products: Product[];
};
