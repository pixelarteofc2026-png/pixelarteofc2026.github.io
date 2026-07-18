import React from 'react';

export const Logo: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizes = {
    sm: 'text-xl font-bold',
    md: 'text-2xl font-bold',
    lg: 'text-4xl font-bold',
  };

  return (
    <div className={`${sizes[size]} text-blue-600`}>
      PDV <span className="text-green-600">System</span>
    </div>
  );
};
