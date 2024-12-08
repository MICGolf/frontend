import { client } from './client';

// export const getOrderSearch = async (params?: any) => {
//   return client
//     .get(`order/search`, { params: params })
//     .then((response) => response)
//     .catch((error) => {
//       console.log(error);
//     });
// };
export const getOrderSearch = async (params?: any) => {
  console.log(params);
  return client
    .get(`order/search`, { params: params })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
