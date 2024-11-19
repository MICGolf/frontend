export type OrderingListType = {
  id: number;
  orderNumber: string;
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
