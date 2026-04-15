import type { ReactNode, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md';
}

// 汎用ボタン
export default function Button({ children, variant = 'primary', size = 'md', className = '', ...props }: ButtonProps) {
  const base = 'font-semibold rounded-lg transition-all active:scale-95 disabled:opacity-50';
  const sizeClass = size === 'sm' ? 'text-xs px-3 py-1.5' : 'text-sm px-4 py-2.5';
  const variantClass = {
    primary: 'bg-hiphop text-black hover:opacity-90',
    secondary: 'bg-bg-card text-text-primary border border-border-primary hover:bg-border-primary',
    ghost: 'text-text-secondary hover:text-text-primary',
  }[variant];

  return (
    <button className={`${base} ${sizeClass} ${variantClass} ${className}`} {...props}>
      {children}
    </button>
  );
}
