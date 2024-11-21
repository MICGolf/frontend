import { client } from './client';

export const getCategory = async (page?: number, limit?: number, parent_id?: any) => {
  return client.get('/category', { params: { page, limit, parent_id } });
};
