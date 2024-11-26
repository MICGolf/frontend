import { client } from './client';

type BannersOrPromotionsType = {
  type: 'banner' | 'promotion';
};

export const getBannersOrPromotions = async ({ type }: BannersOrPromotionsType) => {
  return client.get('/banners', { params: { type } });
};

type BannerFormData = {
  title: string;
  redirect_url: string;
  banner_type: string;
  is_active: boolean;
  image: File;
};

export const postBannersOrPromotions = async (formData: BannerFormData) => {
  return client.post('/banners', { formData });
};

type PromotionOrMdsChoiceType = {
  type: 'best' | 'md_pick';
};

export const getBestProductOrMdsChoice = async ({ type }: PromotionOrMdsChoiceType) => {
  return client.get('/promotion-products', { params: { promotion_type: type } });
};
