import { useState } from 'react';
import logoWhite from '@/assets/imgs/logoWhite.svg';

interface UseDefaultImageReturn {
  isImageError: boolean;
  setDefaultImage: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  isImageLoading: boolean;
  setIsImageLoading: (prev: boolean) => void;
}

/**
 * img 로딩 중 실패하거나 로딩중일때 default이미지 설정해주는 훅
 * @returns isImageError, setDefaultImage
 */
const useDefaultImage = (): UseDefaultImageReturn => {
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  const setDefaultImage = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsImageError(true);
    event.currentTarget.src = logoWhite; // 경로 Optional
  };

  return { isImageError, setDefaultImage, isImageLoading, setIsImageLoading };
};

export default useDefaultImage;
