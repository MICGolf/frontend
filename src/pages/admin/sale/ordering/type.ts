export type OrderingListType = {
  id: number;
  order_number: string;
  productOrderNumber: string;
  orderDate: string;
  orderStatus: string;
  depositDueDate: string;
};

export type DeliveryCompanyType = {
  Name: string;
  Code: string;
  International: boolean;
};
