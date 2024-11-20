import { client } from './client';

/**
 * 인자가 필요하다면 인자를 받고 api를 return 하세요
 * index.ts 에서 모든 API를 return 하고있으니
 * 여기서는 API 하나만 return 하면 됩니다.
 *
 * { productsApi, bannersApi, categoryApi, promotionApi, userApi, cartApi, orderApi }
 * 본인 API 위치에서 productsApi.예시(인자) 이런식으로 사용하세요
 * @param id
 * @returns
 */
export const 예시 = async (id: number) => {
  return client.get(`/API 주소 적으세요/${id}`);
};
