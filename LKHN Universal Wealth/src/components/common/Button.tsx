import React from 'react';
import { ChevronRight } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'text';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  withArrow?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  className = '',
  disabled = false,
  withArrow = false,
}) => {
  const baseStyles = 'uppercase tracking-wider font-medium transition-opacity focus:outline-none';

  const variantStyles = {
    primary: 'bg-gray-800 hover:bg-gray-700 text-white',
    secondary: 'bg-transparent border border-gray-700 hover:border-gray-500 text-gray-300',
    text: 'text-white text-xs uppercase tracking-wider flex items-center opacity-70 hover:opacity-100',
  };

  const sizeStyles = {
    sm: 'text-xs py-1 px-3',
    md: 'text-xs py-2 px-4',
    lg: 'text-sm py-3 px-6',
  };

  const disabledStyles = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${variant !== 'text' ? sizeStyles[size] : ''} ${disabledStyles} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
      {withArrow && <ChevronRight size={14} className="ml-1" />}
    </button>
  );
};

export default Button;
