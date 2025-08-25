import React from 'react';

import { cn } from '@/helpers';

import { PropsType } from './types';

const Button: React.FC<PropsType> = ({
  type,
  variant,
  className,
  handleClick,
  disabled = false,
  children,
}) => {
  return (
    <button
      type={type}
      onClick={handleClick}
      disabled={disabled}
      className={cn(
        'btn text-white px-4 py-0 font-normal rounded-sm hover:opacity-85 transition',
        className,
        {
          'btn-primary bg-red-500 border-red-500 shadow-none':
            variant === 'primary',
          'btn-secondary bg-transparent border-white shadow-none':
            variant === 'secondary',
        },
      )}
    >
      {children}
    </button>
  );
};

export default Button;
