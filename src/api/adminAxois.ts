import { client } from './client';

export const getAdminMain = async () => {
  return await client
    .get(`/api/v1/product`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const postAdminMain = async () => {
  return await client
    .post(`/api/v1/product`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const patchAdminMain = async (productId: number) => {
  return await client
    .post(
      `/api/v1/product/
      ${productId}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};

export const deleteAdminMain = async (productId: number) => {
  return await client
    .delete(
      `/api/v1/product/
      ${productId}`
    )
    .then((response) => response.data)
    .catch((error) => {
      console.log(error);
    });
};
