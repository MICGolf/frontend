import { client } from './client';

type BannersOrPromotionsType = {
  type: 'banner' | 'promotion';
};

export const getBannersOrPromotions = async ({ type }: BannersOrPromotionsType) => {
  return client.get('/banners', { params: { query: type } });
};

interface BannerFormData {
  title: string;
  sub_title: string;
  event_url: string;
  banner_type: string;
  is_active?: boolean;
  image_url: File;
}

export const postBannersOrPromotions = async (formData: BannerFormData) => {
  return client.post('/banners', { formData });
};

type PromotionOrMdsChoiceType = {
  type: 'best' | 'md_pick';
};

export const getBestProductOrMdsChoice = async ({ type }: PromotionOrMdsChoiceType) => {
  return client.get('/promotion-products', { params: { promotion_type: type } });
};
