const TextContent = ({ content = '내용을 입력해주세요' }: { content: string }) => {
  return <p className='flex-1 text-lg'>{content}</p>;
};

export default TextContent;
