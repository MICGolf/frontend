import pouch from '@/assets/imgs/pouch.svg';
import b_001 from '@/assets/imgs/b_001.jpg';
import b_002 from '@/assets/imgs/b_002.jpg';
import b_004 from '@/assets/imgs/b_004.jpg';
import b_005 from '@/assets/imgs/b_005.jpg';
import b_011 from '@/assets/imgs/b_011.jpg';
import b_012 from '@/assets/imgs/b_012.jpg';

export const productDetailInfo = {
  id: 'micgolf_pouch',
  name: '믹골프 파우치',
  description: '골프 용품을 편리하게 보관할 수 있는 고급 파우치입니다.',
  brand: '믹골프',
  categories: ['골프용품', '파우치', '액세서리'],
  price: {
    currency: 'KRW',
    original: 12000,
    discounted: 12000,
  },
  discount: {
    percentage: 0,
    amount: 0,
  },
  colors: [
    {
      id: 'black_000',
      name: '하운드 블랙',
      hex: '#000000',
      images: [pouch, pouch],
    },
    {
      id: 'white_000',
      name: '화이트',
      hex: '#f2f2f2',
      images: [b_001, b_002],
    },
    {
      id: 'silver_000',
      name: '아이언실버',
      hex: '#cdcdcd',
      images: [b_004, b_005],
    },
    {
      id: 'red_000',
      name: '레드',
      hex: '#ff0000',
      images: [b_011, b_012],
    },
  ],
  sizes: ['ONE SIZE'],
  stock: [
    { id: 'black_000', size: 'ONE SIZE', status: '판매중', quantity: 5 },
    { id: 'white_000', size: 'ONE SIZE', status: '판매중', quantity: 2 },
    { id: 'silver_000', size: 'ONE SIZE', status: '판매중', quantity: 3 },
    { id: 'red_000', size: 'ONE SIZE', status: '품절', quantity: 0 },
  ],
  rating: {
    average: 4,
    reviews_count: 2000,
  },
  reviews: [
    {
      review_id: 1,
      user: { id: 'rlawlsahek3', name: '김진모' },
      rating: 5,
      title: '품질 좋네요',
      body: '구매해보고 실착해보니 품질이 너무 좋아서 깜짝 놀랬어요. 다음 신상도 기대됩니다.',
      date: '2024-11-05T00:00:00Z',
    },
    {
      review_id: 2,
      user: { id: 'tlsalsgur', name: '신민혁' },
      rating: 4,
      title: '품질 직이네',
      body: '구매해보고 실착해보니 품질 직여서 화들짝 놀래가 자빠졌음. 다음 신상도 기대됨.',
      date: '2024-11-06T00:00:00Z',
    },
    {
      review_id: 3,
      user: { id: 'gksrltjs', name: '한기선' },
      rating: 5,
      title: '품질 좋네요',
      body: '이번 주 동해 놀러갈 때 들고갈 예정입니다. 품질 굿!',
      date: '2024-11-07T00:00:00Z',
    },
  ],
  tags: ['골프', '파우치', '액세서리'],
  shipping: {
    method: '일반배송',
    cost: 2500,
    freeAbove: 50000,
  },
};
