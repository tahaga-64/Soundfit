import { Music2 } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/95 backdrop-blur-sm border-b border-border-primary">
      <div className="max-w-lg mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <Music2 size={24} className="text-hiphop" />
          <h1 className="text-lg font-bold tracking-tight">Soundfit</h1>
        </div>
      </div>
    </header>
  );
}
