import TextContentSkeleton from './skeletons/TextContentSkeleton';

const TextContent = ({ content = '내용을 입력해주세요', isFetching }: { content: string; isFetching: boolean }) => {
  return <>{isFetching ? <TextContentSkeleton /> : <p className='flex-1 text-sm md:text-lg'>{content}</p>}</>;
};

export default TextContent;
