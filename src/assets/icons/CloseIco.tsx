interface CloseIcoProps {
  size?: number | string;
  color?: string;
}

const CloseIco = ({ size = '16', color = 'black' }: CloseIcoProps) => {
  const iconSize = typeof size === 'number' ? size.toString() : size;

  return (
    <svg width={iconSize} height={iconSize} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M14.576 15.728L8 9.152L1.424 15.728L0.272 14.552L6.824 8L0.272 1.448L1.448 0.271999L8 6.824L14.576 0.271999L15.728 1.424L9.152 8L15.728 14.552L14.576 15.728Z'
        fill={color}
      />
    </svg>
  );
};

export default CloseIco;
