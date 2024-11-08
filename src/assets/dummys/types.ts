type Images = {
  id: number;
  image: string;
  name: string;
};

export interface DetailData {
  name: string;
  description: string;
  feature: string;
  price: number;
  count: number;
  colors: string[];
  images: Images[];
}
