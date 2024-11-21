interface LoadingSpinnerProps {
  size?: 's' | 'm' | 'l';
}

const LoadingSpinner = ({ size = 'm' }: LoadingSpinnerProps) => {
  const matchedSize = {
    s: 'w-4 h-4',
    m: 'w-8 h-8',
    l: 'w-14 h-14',
  };

  const sizeClass = matchedSize[size];

  return (
    <div className='flex h-full w-full items-center justify-center'>
      <div className={`relative flex ${sizeClass}`}>
        <div className='absolute inset-0 rounded-full border-2 border-gray-200'></div>
        <div className='absolute inset-0 animate-spin rounded-full border-2 border-gray-400 border-t-transparent'></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
