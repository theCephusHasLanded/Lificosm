import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`bg-black p-5 rounded-sm border border-gray-800 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
