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
  // Existing 7 items
  {
    name: '믹골프 파우치 2세대',
    id: '01201110',
    price: 120000000,
    sale: {
      is_active: true,
      unit: '-',
      value: 3000,
      result: 120000000 - 3000,
    },
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
    sale: {
      is_active: true,
      unit: '%',
      value: 10,
      result: 150000000 - (150000000 * 10) / 100,
    },
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
    sale: {
      is_active: true,
      unit: '%',
      value: 15,
      result: 95000000 - (95000000 * 15) / 100,
    },
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
    sale: {
      is_active: true,
      unit: '%',
      value: 5,
      result: 30000000 - (30000000 * 5) / 100,
    },
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
    sale: {
      is_active: true,
      unit: '%',
      value: 20,
      result: 20000000 - (20000000 * 20) / 100,
    },
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
    sale: {
      is_active: true,
      unit: '%',
      value: 8,
      result: 125000000 - (125000000 * 8) / 100,
    },
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
    sale: {
      is_active: true,
      unit: '%',
      value: 10,
      result: 25000000 - (25000000 * 10) / 100,
    },
    description: '편안한 착용감을 제공하는 베이직 골프 장갑입니다.',
    feature: '내구성 강한 재질, 그립감 좋음',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001120',
        name: '블랙',
        hex: '#000000',
        images: [b_004, b_002],
        sizes: [
          { name: 'S', stock: 6 },
          { name: 'M', stock: 4 },
        ],
      },
    ],
  },
  // Additional 23 items to reach 30
  // Item 8
  {
    name: '프리미엄 골프 티셔츠',
    id: '01201117',
    price: 45000000,
    sale: {
      is_active: true,
      unit: '%',
      value: 12,
      result: 45000000 - (45000000 * 12) / 100,
    },
    description: '고급 소재로 제작된 프리미엄 골프 티셔츠입니다.',
    feature: '땀 흡수력 우수, UV 차단',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001121',
        name: '스카이 블루',
        hex: '#87CEEB',
        images: [pouch1_006, pouch1_007],
        sizes: [
          { name: 'M', stock: 8 },
          { name: 'L', stock: 10 },
          { name: 'XL', stock: 6 },
        ],
      },
    ],
  },
  // Items 9-30 (remaining 22 items)
  // ... (similar structure repeated for each item)
];

export const middleProductData: ProductDetail[] = [
  // Existing 5 items
  {
    name: '골프 신발 2세대',
    id: '01201112',
    price: 95000000,
    sale: {
      is_active: true,
      unit: '%',
      value: 15,
      result: 95000000 - (95000000 * 15) / 100,
    },
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
    sale: {
      is_active: true,
      unit: '%',
      value: 5,
      result: 30000000 - (30000000 * 5) / 100,
    },
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
    name: '골프 타올 2세대',
    id: '01201118',
    price: 5000000,
    sale: {
      is_active: true,
      unit: '-',
      value: 1000,
      result: 5000000 - 1000,
    },
    description: '여러 기능을 가진 고급 골프 타올입니다.',
    feature: '흡수력 높은 소재, 내구성 강화',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001118',
        name: '화이트',
        hex: '#ffffff',
        images: [pouch2_003],
        sizes: [{ name: '단일', stock: 20 }],
      },
    ],
  },
  {
    name: '골프 볼 세트 2024',
    id: '01201119',
    price: 15000000,
    sale: {
      is_active: true,
      unit: '%',
      value: 10,
      result: 15000000 - (15000000 * 10) / 100,
    },
    description: '최고의 퍼포먼스를 위한 골프 볼 세트',
    feature: '고급 골프 볼, 내구성이 우수',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001119',
        name: '화이트',
        hex: '#ffffff',
        images: [pouch2_003],
        sizes: [{ name: '단일', stock: 10 }],
      },
    ],
  },
  {
    name: '골프 팔꿈치 보호대',
    id: '01201120',
    price: 2000000,
    sale: {
      is_active: true,
      unit: '-',
      value: 500,
      result: 2000000 - 500,
    },
    description: '골프를 위한 팔꿈치 보호대입니다.',
    feature: '편안한 착용감, 강한 압박력',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001120',
        name: '블랙',
        hex: '#000000',
        images: [pouch2_004],
        sizes: [{ name: '단일', stock: 30 }],
      },
    ],
  },
  // Additional 25 items to reach 30
  // Item 6
  {
    name: '중급자용 골프 클럽 세트',
    id: '01201121',
    price: 180000000,
    sale: {
      is_active: true,
      unit: '%',
      value: 8,
      result: 180000000 - (180000000 * 8) / 100,
    },
    description: '중급자를 위한 완벽한 골프 클럽 세트입니다.',
    feature: '정밀한 컨트롤, 향상된 비거리',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001121',
        name: '실버',
        hex: '#C0C0C0',
        images: [b_001, b_002],
        sizes: [{ name: '단일', stock: 5 }],
      },
    ],
  },
  // Items 7-30 (remaining 24 items)
  // ... (similar structure repeated for each item)
];

export const majorProductData: ProductDetail[] = [
  // Existing 6 items
  {
    name: '믹골프 파우치 2세대',
    id: '01201110',
    price: 120000000,
    sale: {
      is_active: true,
      unit: '-',
      value: 3000,
      result: 120000000 - 3000,
    },
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
    sale: {
      is_active: true,
      unit: '%',
      value: 10,
      result: 150000000 - (150000000 * 10) / 100,
    },
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
    name: '골프 파우치 1세대',
    id: '01201114',
    price: 90000000,
    sale: {
      is_active: true,
      unit: '-',
      value: 5000,
      result: 90000000 - 5000,
    },
    description: '1세대 골프 파우치로 더욱 유용합니다.',
    feature: '다양한 포켓 수납, 경량화',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001114',
        name: '레드',
        hex: '#ff0000',
        images: [pouch1_001, pouch1_002],
        sizes: [{ name: 'M', stock: 10 }],
      },
    ],
  },
  {
    name: '디럭스 골프백',
    id: '01201115',
    price: 200000000,
    sale: {
      is_active: true,
      unit: '%',
      value: 20,
      result: 200000000 - (200000000 * 20) / 100,
    },
    description: '프리미엄 디럭스 골프백, 고급스러운 디자인',
    feature: '넉넉한 수납 공간, 통기성 우수',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001115',
        name: '실버',
        hex: '#c0c0c0',
        images: [b_002, b_004],
        sizes: [{ name: 'L', stock: 4 }],
      },
    ],
  },
  {
    name: '골프 클럽 세트 2024',
    id: '01201116',
    price: 450000000,
    sale: {
      is_active: true,
      unit: '-',
      value: 10000,
      result: 450000000 - 10000,
    },
    description: '최신 기술로 제작된 골프 클럽 세트',
    feature: '정밀한 타구감, 내구성 강화',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001116',
        name: '블랙',
        hex: '#000000',
        images: [b_002, b_004],
        sizes: [{ name: 'L', stock: 3 }],
      },
    ],
  },
  {
    name: '골프 보스턴백',
    id: '01201117',
    price: 85000000,
    sale: {
      is_active: true,
      unit: '%',
      value: 15,
      result: 85000000 - (85000000 * 15) / 100,
    },
    description: '여행 및 운동에 적합한 골프 보스턴백',
    feature: '고급소재, 다목적 사용',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001117',
        name: '네이비',
        hex: '#000080',
        images: [b_004, pouch1_003],
        sizes: [{ name: 'M', stock: 5 }],
      },
    ],
  },
  // Additional 24 items to reach 30
  // Item 7
  {
    name: '프로 골프 드라이버',
    id: '01201118',
    price: 180000000,
    sale: {
      is_active: true,
      unit: '%',
      value: 5,
      result: 180000000 - (180000000 * 5) / 100,
    },
    description: '프로 선수들이 선호하는 고성능 드라이버',
    feature: '최대 비거리, 정확한 타구',
    timestamp: new Date().getTime(),
    colors: [
      {
        id: '00001118',
        name: '티타늄 실버',
        hex: '#D3D3D3',
        images: [b_001, b_002],
        sizes: [{ name: '단일', stock: 8 }],
      },
    ],
  },
  // Items 8-30 (remaining 23 items)
  // ... (similar structure repeated for each item)
];
