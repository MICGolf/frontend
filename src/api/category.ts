import { client } from './client';

export const getCategory = (parent_id?: number, page?: number, limit?: number) => {
  const params: any = {};
  if (page !== undefined) params.page = page;
  if (limit !== undefined) params.limit = limit;
  if (parent_id !== undefined) params.parent_id = parent_id;
  return client.get('/category', { params });
};

export const postCategory = (parent_id?: number, name?: string) => {
  const params: any = {};
  if (name !== undefined) params.name = name;
  if (parent_id !== undefined) params.parent_id = parent_id;

  return client.post('/category', params);
};
export const putCategory = async (category_id: number, parent_id?: number, name?: string) => {
  const params: any = {};
  if (parent_id !== undefined) params.parent_id = parent_id;
  if (name !== undefined) params.name = name;

  return client
    .put(`category/${category_id}`, params)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const deleteCategory = async (params: number) => {
  return client
    .delete(`category/${params}`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};
