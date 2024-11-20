interface CheckIcoProps {
  color?: string;
  size?: string | number;
}

const CheckIco = ({ color = 'black', size = '21' }: CheckIcoProps) => {
  const iconSize = typeof size === 'number' ? size.toString() : size;
  return (
    <svg width={iconSize} height='auto' viewBox='0 0 21 17' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M20.8571 3.29171L18.4399 0.857422L7.14279 12.1546L2.71993 7.74885L0.285645 10.166L7.14279 17.006L20.8571 3.29171Z'
        fill={color}
      />
    </svg>
  );
};

export default CheckIco;
