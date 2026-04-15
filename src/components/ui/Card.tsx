import type { ReactNode } from 'react';

// 汎用カードコンテナ
export default function Card({ children, className = '', onClick }: { children: ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      className={`bg-bg-card rounded-xl p-4 ${onClick ? 'cursor-pointer active:scale-[0.98] transition-transform' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
