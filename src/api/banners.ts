import { client } from './client';

export const getBanners = async () => {
  return client.get('/banners');
};
