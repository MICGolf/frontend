import { ReactNode } from 'react';

export interface PaginationProps {
  total: number;
  page: number;
  setPage: (page: number) => void;
}

export interface SectionBoxProps {
  children: ReactNode;
  title: string;
  selectOptions?: boolean;
  border?: boolean;
  setPageLimit?: (limit: string) => void;
}

export interface CategoryData {
  id: number;
  name: string;
  parent_id: number;
  depth: number;
  created_at: string;
  updated_at: string;
}
