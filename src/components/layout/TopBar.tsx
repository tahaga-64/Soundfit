import { Music2 } from 'lucide-react';

export default function TopBar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-lg mx-auto flex items-center justify-between h-14 px-4">
        <div className="flex items-center gap-2">
          <Music2 size={24} className="text-hiphop" />
          <h1 className="text-lg font-bold tracking-tight gradient-text bg-gradient-to-r from-hiphop via-edm to-visualkei">Soundfit</h1>
        </div>
      </div>
      <div className="h-[2px] gradient-line" />
    </header>
  );
}
