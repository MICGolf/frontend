import { ChevronLeft, ChevronRight, Plus, X } from 'lucide-react';
import { useRef } from 'react';
import { ImageFile } from '../ProductAdd';

interface ImageCarouselProps {
  images: ImageFile[];
  onAddImage: (image: File) => void;
  onRemoveImage: (index: number) => void;
  maxImages?: number;
}

export const ImageCarousel = ({ images = [], onAddImage, onRemoveImage, maxImages = 6 }: ImageCarouselProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('event.target.files', event.target.files);
    if (file) {
      onAddImage(file);
    }
  };

  return (
    <div className='relative w-full'>
      {/* Image Container */}
      <div
        ref={scrollContainerRef}
        className='flex gap-4 overflow-x-auto pb-4 scrollbar-hide'
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Existing Images */}
        {images.map((image, index) => (
          <div key={index} className='relative flex-none'>
            <div className='group relative h-[200px] w-[200px] overflow-hidden rounded-lg border border-neutral-200'>
              <img src={image.previewUrl} alt={`Product image ${index + 1}`} className='h-full w-full object-cover' />
              <button
                onClick={() => onRemoveImage(index)}
                className='absolute right-2 top-2 rounded-full bg-white/80 p-1 opacity-0 transition-opacity group-hover:opacity-100'
              >
                <X className='h-4 w-4 text-neutral-600' />
              </button>
            </div>
          </div>
        ))}

        {/* Add Image Button */}
        {images.length < maxImages && (
          <div className='flex-none'>
            <button
              onClick={() => fileInputRef.current?.click()}
              className='flex h-[200px] w-[200px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-neutral-300 bg-neutral-50 text-neutral-500 hover:bg-neutral-100'
            >
              <Plus className='h-6 w-6' />
              <span className='text-sm'>이미지 추가</span>
            </button>
            <input
              type='file'
              accept='image/*'
              onChange={handleFileChange}
              style={{ display: 'none' }}
              ref={fileInputRef} // 추가: 파일 입력을 감추고 버튼으로 트리거
            />
          </div>
        )}
      </div>

      {/* Scroll Buttons */}
      {images.length > 0 && (
        <>
          <button
            onClick={() => scroll('left')}
            className='absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-neutral-50'
          >
            <ChevronLeft className='h-5 w-5 text-neutral-600' />
          </button>
          <button
            onClick={() => scroll('right')}
            className='absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md hover:bg-neutral-50'
          >
            <ChevronRight className='h-5 w-5 text-neutral-600' />
          </button>
        </>
      )}
    </div>
  );
};
