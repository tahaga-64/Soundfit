import type { Genre } from '@/types';

// ジャンルの表示名マッピング
export const genreDisplayNames: Record<Genre, string> = {
  hiphop: 'ヒップホップ',
  rock: 'ロック',
  visualkei: 'V系',
  citypop: 'シティポップ',
  edm: 'EDM',
  jazz: 'ジャズ',
  rnb: 'R&B',
  punk: 'パンク',
};

// ジャンルのTailwindカラークラス
export const genreColors: Record<Genre, string> = {
  hiphop: 'text-hiphop',
  rock: 'text-rock',
  visualkei: 'text-visualkei',
  citypop: 'text-citypop',
  edm: 'text-edm',
  jazz: 'text-jazz',
  rnb: 'text-rnb',
  punk: 'text-punk',
};

export const genreBgColors: Record<Genre, string> = {
  hiphop: 'bg-hiphop',
  rock: 'bg-rock',
  visualkei: 'bg-visualkei',
  citypop: 'bg-citypop',
  edm: 'bg-edm',
  jazz: 'bg-jazz',
  rnb: 'bg-rnb',
  punk: 'bg-punk',
};

export const genreBorderColors: Record<Genre, string> = {
  hiphop: 'border-hiphop',
  rock: 'border-rock',
  visualkei: 'border-visualkei',
  citypop: 'border-citypop',
  edm: 'border-edm',
  jazz: 'border-jazz',
  rnb: 'border-rnb',
  punk: 'border-punk',
};

// ジャンルのHEXカラー値
export const genreHexColors: Record<Genre, string> = {
  hiphop: '#FFD700',
  rock: '#DC2626',
  visualkei: '#7C3AED',
  citypop: '#F9A8D4',
  edm: '#3B82F6',
  jazz: '#F59E0B',
  rnb: '#EC4899',
  punk: '#22C55E',
};

// 全ジャンルリスト
export const allGenres: Genre[] = ['hiphop', 'rock', 'visualkei', 'citypop', 'edm', 'jazz', 'rnb', 'punk'];
