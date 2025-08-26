import { MajorCategory } from './types';

export const shopCategoryData: MajorCategory[] = [
  {
    id: 1,
    majorCategory: 'Outstand',
    middleCategories: [
      {
        id: 1,
        category: 'Best',
      },
      {
        id: 2,
        category: 'Promotion',
      },
      {
        id: 3,
        category: 'New',
      },
    ],
  },
  {
    id: 2,
    majorCategory: 'Bag',
    middleCategories: [
      { id: 1, category: '1st Gen' },
      {
        id: 2,
        category: '2st Gen',
      },
    ],
  },
];

export const eventCategoryData: MajorCategory[] = [
  {
    id: 1,
    majorCategory: '이벤트1',
    middleCategories: [
      {
        id: 1,
        category: '뭐적을까',
      },
      {
        id: 2,
        category: '잘모르겠다',
      },
      {
        id: 3,
        category: '그러하다',
      },
    ],
  },
  {
    id: 2,
    majorCategory: '이벤트2',
    middleCategories: [
      { id: 1, category: '뭐적지진짜' },
      {
        id: 2,
        category: '배고프다',
      },
    ],
  },
];

export const noticeCategoryData: MajorCategory[] = [
  {
    id: 1,
    majorCategory: '11월 공지',
    middleCategories: [
      {
        id: 1,
        category: '그러하다',
      },
      {
        id: 2,
        category: '모르겠다',
      },
      {
        id: 3,
        category: '너무어렵다',
      },
    ],
  },
  {
    id: 2,
    majorCategory: '12월 공지',
    middleCategories: [
      { id: 1, category: '뭐적지' },
      {
        id: 2,
        category: '배고파요',
      },
    ],
  },
];
