import { client } from './client';

export const getCategory = async (params: any) => {
  return client
    .get(`category`, { params: params })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
