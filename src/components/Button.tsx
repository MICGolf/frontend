const Button = ({
  title,
  onClick,
  className,
  color = 'bg-primary',
}: {
  title: string;
  onClick: () => void;
  className?: string;
  color?: string;
}) => {
  return (
    <button
      className={`${color} block rounded-md px-4 py-2 text-base text-white duration-300 ease-in-out hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
