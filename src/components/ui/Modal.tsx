import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

// ボトムシートモーダル
export default function Modal({ isOpen, onClose, title, children }: { isOpen: boolean; onClose: () => void; title: string; children: ReactNode }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-bg-secondary rounded-t-2xl max-h-[85dvh] flex flex-col animate-slide-up">
        <div className="flex items-center justify-between p-4 border-b border-border-primary shrink-0">
          <h2 className="font-bold text-lg">{title}</h2>
          <button onClick={onClose} className="p-1 text-text-secondary hover:text-text-primary">
            <X size={20} />
          </button>
        </div>
        <div className="overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}
