import { client } from './client';

export const getPageType = async (pageType: string) => {
  return client
    .get(`order/page/${pageType}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
export const getOrderSearch = async (params?: any) => {
  return client
    .get(`order/search`, { params: params })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
export const getOrderStatistics = async () => {
  return client
    .get(`order/statistics`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
export const postOrderPurchase = async (
  order_id: number,
  purchase_number: number,
  purchase_date: string,
  status: string
) => {
  const params: any = {};
  if (order_id !== undefined) params.order_id = order_id;
  if (purchase_number !== undefined) params.purchase_number = purchase_number;
  if (purchase_date !== undefined) params.purchase_date = purchase_date;
  if (status !== undefined) params.status = status;
  return client
    .post(`order/purchase`)
    .then((response) => response, params)
    .catch((error) => {
      console.log(error);
    });
};
