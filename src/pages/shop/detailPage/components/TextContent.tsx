import TextContentSkeleton from './skeletons/TextContentSkeleton';

const TextContent = ({ content = '내용을 입력해주세요', isLoading }: { content: string; isLoading: boolean }) => {
  return <>{isLoading ? <TextContentSkeleton /> : <p className='flex-1 text-sm md:text-lg'>{content}</p>}</>;
};

export default TextContent;
