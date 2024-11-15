type ButtonProps = {
  type?: 'button' | 'submit';
  title: string;
  onClick?: () => void;
  className?: string;
  color?: string;
};

const Button = ({ type = 'button', title, onClick, className, color = 'bg-primary text-white' }: ButtonProps) => {
  return (
    <button
      type={type}
      className={`${color} block rounded-md px-4 py-2 text-base duration-300 ease-in-out hover:scale-105 ${className}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

export default Button;
