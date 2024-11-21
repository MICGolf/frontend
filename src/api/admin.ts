import { client } from './client';

export const getAdminProducts = async (params: any) => {
  return client
    .get(`products`, { params: params })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const deleteProduct = async (params: number) => {
  return client
    .delete(`products/${params}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
