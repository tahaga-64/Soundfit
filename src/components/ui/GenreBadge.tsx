import type { Genre } from '@/types';
import { genreDisplayNames, genreBgColors } from '@/utils/genreHelpers';

// ジャンル表示バッジ
export default function GenreBadge({ genre, size = 'sm' }: { genre: Genre; size?: 'sm' | 'md' }) {
  const sizeClass = size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-xs px-3 py-1';
  return (
    <span className={`${genreBgColors[genre]} text-black font-semibold rounded-full ${sizeClass} shadow-sm shadow-current/25 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/30 before:via-transparent before:to-transparent before:rounded-full`}>
      {genreDisplayNames[genre]}
    </span>
  );
}
