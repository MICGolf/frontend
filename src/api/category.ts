import { client } from './client';

export const getCategory = (parent_id?: number, page?: number, limit?: number) => {
  const params: any = {};
  if (page !== undefined) params.page = page;
  if (limit !== undefined) params.limit = limit;
  if (parent_id !== undefined) params.parent_id = parent_id;

  return client.get('/category', { params });
};
