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

export interface UserData {
  name: string;
  email: string;
}

export interface CartItemData {
  id: number;
  name: string;
  color: string;
  size: string;
  amount: number;
  price: number;
  checked: boolean;
}
