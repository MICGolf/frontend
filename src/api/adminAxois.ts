import { client } from './client';

export const getAdminProduct = async () => {
  return client
    .get(`/api/v1/product`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const postAdminProduct = async () => {
  return client
    .post(`/api/v1/product`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const patchAdminProduct = async (productId: number) => {
  return client
    .post(
      `/api/v1/product/
      ${productId}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const deleteAdminProduct = async (productId: number) => {
  return client
    .delete(
      `/api/v1/product/
      ${productId}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
