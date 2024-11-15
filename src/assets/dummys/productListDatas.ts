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

export const shopProductData: ProductDetail[] = [
  {
    name: '믹골프 파우치 2세대',
    id: '01201110',
    price: 120000000,
    description: '고급 골프 파우치로 편리하게 사용할 수 있습니다.',
    feature: '방수 재질, 다양한 수납공간 제공',
    timestamp: new Date().getTime(),
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
    description: '튼튼한 디자인의 최신 골프백입니다.',
    feature: '내구성 강화, 다수의 클럽 수납 가능',
    timestamp: new Date().getTime(),
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
    description: '편안한 착용감을 제공하는 고급 골프 신발입니다.',
    feature: '통기성 우수, 미끄럼 방지 기능 강화',
    timestamp: new Date().getTime(),
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
  {
    name: '고급 골프 장갑',
    id: '01201113',
    price: 30000000,
    description: '내구성이 강한 고급 골프 장갑입니다.',
    feature: '뛰어난 그립감, 신축성 있는 소재 사용',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001116',
        name: '클래식 화이트',
        hex: '#ffffff',
        images: [pouch1_001, pouch1_002],
        sizes: [
          { name: 'S', stock: 12 },
          { name: 'M', stock: 8 },
        ],
      },
    ],
  },
  {
    name: '경량 골프 모자',
    id: '01201114',
    price: 20000000,
    description: '편안한 착용감을 제공하는 경량 모자입니다.',
    feature: '통기성 우수, 햇빛 차단',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001117',
        name: '선샤인 옐로우',
        hex: '#ffd700',
        images: [pouch2_001, pouch2_002],
        sizes: [{ name: 'One Size', stock: 20 }],
      },
    ],
  },
  {
    name: '방수 골프 신발',
    id: '01201115',
    price: 125000000,
    description: '비오는 날에도 편하게 사용할 수 있는 방수 골프 신발입니다.',
    feature: '방수, 미끄럼 방지',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001118',
        name: '딥 블루',
        hex: '#00008b',
        images: [pouch1_004, pouch1_005],
        sizes: [
          { name: '8', stock: 5 },
          { name: '9', stock: 6 },
        ],
      },
      {
        id: '00001119',
        name: '잉글리시 그린',
        hex: '#004225',
        images: [pouch2_001, pouch2_002],
        sizes: [
          { name: '8', stock: 2 },
          { name: '9', stock: 3 },
        ],
      },
    ],
  },
  {
    name: '베이직 골프 장갑',
    id: '01201116',
    price: 25000000,
    description: '모든 골퍼에게 적합한 베이직 장갑입니다.',
    feature: '기본 기능 강화, 가성비 좋은 장갑',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001120',
        name: '네이비 블루',
        hex: '#000080',
        images: [pouch1_006, pouch1_007],
        sizes: [
          { name: 'S', stock: 10 },
          { name: 'M', stock: 12 },
          { name: 'L', stock: 7 },
        ],
      },
    ],
  },
  {
    name: '하이브리드 골프 클럽',
    id: '01201117',
    price: 320000000,
    description: '거리와 정확성을 모두 갖춘 하이브리드 클럽입니다.',
    feature: '특수 합금 소재, 정밀 샷 가능',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001121',
        name: '크롬 실버',
        hex: '#c0c0c0',
        images: [b_001, b_004],
        sizes: [{ name: 'One Size', stock: 8 }],
      },
    ],
  },
];

export const majorProductData: ProductDetail[] = [
  {
    name: '믹골프 파우치 2세대',
    id: '01201110',
    price: 120000000,
    description: '고급 골프 파우치로 편리하게 사용할 수 있습니다.',
    feature: '방수 재질, 다양한 수납공간 제공',
    timestamp: new Date().getTime(),
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
    ],
  },
  {
    name: '골프백 3세대',
    id: '01201111',
    price: 150000000,
    description: '튼튼한 디자인의 최신 골프백입니다.',
    feature: '내구성 강화, 다수의 클럽 수납 가능',
    timestamp: new Date().getTime(),
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
    ],
  },
];

export const middleProductData: ProductDetail[] = [
  {
    name: '골프 신발 2세대',
    id: '01201112',
    price: 95000000,
    description: '편안한 착용감을 제공하는 고급 골프 신발입니다.',
    feature: '통기성 우수, 미끄럼 방지 기능 강화',
    timestamp: new Date().getTime(),
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
    ],
  },
  {
    name: '고급 골프 장갑',
    id: '01201113',
    price: 30000000,
    description: '내구성이 강한 고급 골프 장갑입니다.',
    feature: '뛰어난 그립감, 신축성 있는 소재 사용',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001116',
        name: '클래식 화이트',
        hex: '#ffffff',
        images: [pouch1_001, pouch1_002],
        sizes: [
          { name: 'S', stock: 12 },
          { name: 'M', stock: 8 },
        ],
      },
    ],
  },
];
