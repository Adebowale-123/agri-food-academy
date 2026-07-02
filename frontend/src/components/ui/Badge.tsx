import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'green' | 'accent' | 'blue' | 'orange' | 'red' | 'gray';
  className?: string;
}

const variants = {
  green: 'bg-primary-100 text-primary',
  accent: 'bg-accent-100 text-accent-dark',
  blue: 'bg-blue-100 text-blue-800',
  orange: 'bg-orange-100 text-orange-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-700',
};

export default function Badge({ children, variant = 'green', className = '' }: BadgeProps) {
  return (
    <span className={`badge ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
