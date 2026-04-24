import type { ReactNode } from 'react';

// 汎用カードコンテナ
export default function Card({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      className={`glass rounded-xl p-4 shadow-sm border border-border-primary gradient-border-left hover:shadow-md hover:shadow-hiphop/10 transition-shadow ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
