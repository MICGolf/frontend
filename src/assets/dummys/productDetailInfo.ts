import b_001 from '@/assets/imgs/b_001.jpg';
import b_002 from '@/assets/imgs/b_002.jpg';
import b_004 from '@/assets/imgs/b_004.jpg';
import pouch1_001 from '@/assets/imgs/pouch1_001.jpg';
import pouch1_002 from '@/assets/imgs/pouch1_002.jpg';
import pouch1_003 from '@/assets/imgs/pouch1_003.jpg';
import pouch1_004 from '@/assets/imgs/pouch1_004.jpg';
import pouch1_005 from '@/assets/imgs/pouch1_005.jpg';
import pouch1_006 from '@/assets/imgs/pouch1_006.jpg';
import pouch1_007 from '@/assets/imgs/pouch1_007.jpg';
import pouch2_001 from '@/assets/imgs/pouch2_001.jpg';
import pouch2_002 from '@/assets/imgs/pouch2_002.jpg';
import pouch2_003 from '@/assets/imgs/pouch2_003.jpg';
import pouch2_004 from '@/assets/imgs/pouch2_004.jpg';
import pouch2_005 from '@/assets/imgs/pouch2_005.jpg';
import pouch2_006 from '@/assets/imgs/pouch2_006.jpg';
import pouch2_007 from '@/assets/imgs/pouch2_007.jpg';

export const productDetailData = {
  name: '믹골프 파우치 2세대',
  id: '01201110',
  price: 120000000,
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna. Pellentesque sit amet sapien fringilla, mattis ligula consectetur, ultrices mauris. Maecenas vitae mattis tellus. Nullam quis imperdiet augue. Vestibulum auctor ornare leo, non suscipit magna interdum eu. Curabitur pellentesque nibh nibh, at maximus ante fermentum sit amet. Pellentesque commodo lacus at sodales sodales. Quisque sagittis orci ut diam condimentum, vel euismod erat placerat. In iaculis arcu eros, ',
  feature: '제품 특징입니다',
  colors: [
    {
      id: '00001110',
      name: '해저드 블랙',
      hex: '#000000',
      images: [pouch1_001, pouch1_002, pouch1_003, pouch1_004, pouch1_005, pouch1_006, pouch1_007],
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
      images: [pouch2_001, pouch2_002, pouch2_003, pouch2_004, pouch2_005, pouch2_006, pouch2_007],
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
      id: '00001112',
      name: '아이언실버',
      hex: '#ececec',
      images: [b_001, b_002, b_004],
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
  ],
};
