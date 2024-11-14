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
import { ProductDetail } from './types';

export const productListData: ProductDetail[] = [
  {
    name: '믹골프 파우치 2세대',
    id: '01201110',
    price: 120000000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    feature: '제품 특징입니다',
    colors: [
      {
        id: '00001110',
        name: '해저드 블랙',
        hex: '#000000',
        images: [pouch1_001, pouch1_002, pouch1_003, pouch1_004, pouch1_005, pouch1_006, pouch1_007],
        sizes: [
          { name: 'XS', stock: 5 },
          { name: 'S', stock: 4 },
          { name: 'M', stock: 6 },
        ],
      },
      {
        id: '00001111',
        name: '레드와인',
        hex: '#ff0000',
        images: [pouch2_001, pouch2_002, pouch2_003, pouch2_004, pouch2_005, pouch2_006, pouch2_007],
        sizes: [
          { name: 'XS', stock: 5 },
          { name: 'S', stock: 4 },
        ],
      },
    ],
  },
  {
    name: '골프백 3세대',
    id: '01201111',
    price: 150000000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    feature: '최신 디자인 골프백',
    colors: [
      {
        id: '00001112',
        name: '블루',
        hex: '#0000ff',
        images: [pouch1_001, pouch1_002, pouch1_003],
        sizes: [
          { name: 'M', stock: 3 },
          { name: 'L', stock: 4 },
        ],
      },
      {
        id: '00001113',
        name: '그린',
        hex: '#008000',
        images: [b_001, b_002],
        sizes: [
          { name: 'M', stock: 4 },
          { name: 'L', stock: 6 },
        ],
      },
    ],
  },
  {
    name: '골프 신발 2세대',
    id: '01201112',
    price: 95000000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    feature: '편안한 착용감의 골프 신발',
    colors: [
      {
        id: '00001114',
        name: '화이트',
        hex: '#ffffff',
        images: [pouch2_001, pouch2_002],
        sizes: [
          { name: '8', stock: 7 },
          { name: '9', stock: 5 },
        ],
      },
      {
        id: '00001115',
        name: '블랙',
        hex: '#000000',
        images: [b_004, b_002],
        sizes: [
          { name: '8', stock: 3 },
          { name: '9', stock: 4 },
        ],
      },
    ],
  },
];

export const majorCategoryData: ProductDetail[] = [
  {
    name: '믹골프 파우치 2세대',
    id: '01201110',
    price: 120000000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    feature: '제품 특징입니다',
    colors: [
      {
        id: '00001110',
        name: '해저드 블랙',
        hex: '#000000',
        images: [pouch1_001, pouch1_002, pouch1_003, pouch1_004, pouch1_005, pouch1_006, pouch1_007],
        sizes: [
          { name: 'XS', stock: 5 },
          { name: 'S', stock: 4 },
          { name: 'M', stock: 6 },
        ],
      },
      {
        id: '00001111',
        name: '레드와인',
        hex: '#ff0000',
        images: [pouch2_001, pouch2_002, pouch2_003, pouch2_004, pouch2_005, pouch2_006, pouch2_007],
        sizes: [
          { name: 'XS', stock: 5 },
          { name: 'S', stock: 4 },
        ],
      },
    ],
  },
  {
    name: '골프백 3세대',
    id: '01201111',
    price: 150000000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    feature: '최신 디자인 골프백',
    colors: [
      {
        id: '00001112',
        name: '블루',
        hex: '#0000ff',
        images: [pouch1_001, pouch1_002, pouch1_003],
        sizes: [
          { name: 'M', stock: 3 },
          { name: 'L', stock: 4 },
        ],
      },
      {
        id: '00001113',
        name: '그린',
        hex: '#008000',
        images: [b_001, b_002],
        sizes: [
          { name: 'M', stock: 4 },
          { name: 'L', stock: 6 },
        ],
      },
    ],
  },
  {
    name: '골프 신발 2세대',
    id: '01201112',
    price: 95000000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    feature: '편안한 착용감의 골프 신발',
    colors: [
      {
        id: '00001114',
        name: '화이트',
        hex: '#ffffff',
        images: [pouch2_001, pouch2_002],
        sizes: [
          { name: '8', stock: 7 },
          { name: '9', stock: 5 },
        ],
      },
      {
        id: '00001115',
        name: '블랙',
        hex: '#000000',
        images: [b_004, b_002],
        sizes: [
          { name: '8', stock: 3 },
          { name: '9', stock: 4 },
        ],
      },
    ],
  },
];

export const middleCategoryData: ProductDetail[] = [
  {
    name: '믹골프 파우치 2세대',
    id: '01201110',
    price: 120000000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    feature: '제품 특징입니다',
    colors: [
      {
        id: '00001110',
        name: '해저드 블랙',
        hex: '#000000',
        images: [pouch1_001, pouch1_002, pouch1_003, pouch1_004, pouch1_005, pouch1_006, pouch1_007],
        sizes: [
          { name: 'XS', stock: 5 },
          { name: 'S', stock: 4 },
          { name: 'M', stock: 6 },
        ],
      },
      {
        id: '00001111',
        name: '레드와인',
        hex: '#ff0000',
        images: [pouch2_001, pouch2_002, pouch2_003, pouch2_004, pouch2_005, pouch2_006, pouch2_007],
        sizes: [
          { name: 'XS', stock: 5 },
          { name: 'S', stock: 4 },
        ],
      },
    ],
  },
  {
    name: '골프백 3세대',
    id: '01201111',
    price: 150000000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    feature: '최신 디자인 골프백',
    colors: [
      {
        id: '00001112',
        name: '블루',
        hex: '#0000ff',
        images: [pouch1_001, pouch1_002, pouch1_003],
        sizes: [
          { name: 'M', stock: 3 },
          { name: 'L', stock: 4 },
        ],
      },
      {
        id: '00001113',
        name: '그린',
        hex: '#008000',
        images: [b_001, b_002],
        sizes: [
          { name: 'M', stock: 4 },
          { name: 'L', stock: 6 },
        ],
      },
    ],
  },
  {
    name: '골프 신발 2세대',
    id: '01201112',
    price: 95000000,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna...',
    feature: '편안한 착용감의 골프 신발',
    colors: [
      {
        id: '00001114',
        name: '화이트',
        hex: '#ffffff',
        images: [pouch2_001, pouch2_002],
        sizes: [
          { name: '8', stock: 7 },
          { name: '9', stock: 5 },
        ],
      },
      {
        id: '00001115',
        name: '블랙',
        hex: '#000000',
        images: [b_004, b_002],
        sizes: [
          { name: '8', stock: 3 },
          { name: '9', stock: 4 },
        ],
      },
    ],
  },
];
