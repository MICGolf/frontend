import { useEffect, useState } from 'react';
import logoWhite from '@/assets/imgs/logoWhite.svg';

interface UseDefaultImageReturn {
  isImageError: boolean;
  handleOnError: (event: React.SyntheticEvent<HTMLImageElement>) => void;
  isImageLoading: boolean;
  handleOnLoad: () => void;
}

/**
 * img 로딩 중 실패하거나 로딩중일때 default이미지 설정해주는 훅
 * @returns isImageError, setDefaultImage
 */
const useDefaultImage = (validation: boolean): UseDefaultImageReturn => {
  const [isImageError, setIsImageError] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  // 만약 이미지URL이 존재하지 않는 경우 => 로딩상태 false => DefaultImage 컴포넌트가 렌더링 됨.
  useEffect(() => {
    if (!validation) {
      setIsImageLoading(false);
    }
  }, [validation]);

  const setDefaultImage = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsImageError(true);
    event.currentTarget.src = logoWhite; // 경로 Optional
  };

  const handleOnError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    setIsImageLoading(false);
    setDefaultImage(event);
  };

  const handleOnLoad = () => {
    setIsImageLoading(false);
  };

  return { isImageError, handleOnError, handleOnLoad, isImageLoading };
};

export default useDefaultImage;
