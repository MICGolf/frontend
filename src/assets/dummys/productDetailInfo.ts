import pouch from '@/assets/imgs/pouch.svg';
import b_001 from '@/assets/imgs/b_001.jpg';
import b_002 from '@/assets/imgs/b_002.jpg';
import b_004 from '@/assets/imgs/b_004.jpg';
import b_005 from '@/assets/imgs/b_005.jpg';
import b_011 from '@/assets/imgs/b_011.jpg';
import b_012 from '@/assets/imgs/b_012.jpg';

export const productDetailData = {
  name: '믹골프 파우치 2세대',
  id: '01201110',
  price: 120000000,
  description: '설명글입니다.설명글입니다.',
  colors: [
    {
      id: '00001110',
      name: '해저드 블랙',
      hex: '#000000',
      images: [
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
        pouch,
      ],
      sizes: [
        {
          name: 'XS',
          stock: 5,
        },
        {
          name: 'S',
          stock: 4,
        },
        {
          name: 'M',
          stock: 6,
        },
      ],
    },
    {
      id: '00001111',
      name: '레드와인',
      hex: '#ff0000',
      images: [b_001, b_002],
      sizes: [
        {
          name: 'XS',
          stock: 5,
        },
        {
          name: 'S',
          stock: 4,
        },
      ],
    },
    {
      id: '00001100',
      name: '아이언실버',
      hex: '#cdcdcd',
      images: [b_004, b_005],
      sizes: [
        {
          name: 'XS',
          stock: 5,
        },
        {
          name: 'S',
          stock: 4,
        },
        {
          name: 'M',
          stock: 6,
        },
        {
          name: 'L',
          stock: 6,
        },
      ],
    },
    {
      id: '00001101',
      name: '화이트',
      hex: '#f2f2f2',
      images: [b_011, b_012],
      sizes: [
        {
          name: 'XS',
          stock: 5,
        },
        {
          name: 'S',
          stock: 4,
        },
        {
          name: 'M',
          stock: 6,
        },
      ],
    },
  ],
};
