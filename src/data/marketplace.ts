import type { MarketplaceListing } from '@/types';

// モックフリマデータ
export const listings: MarketplaceListing[] = [
  {
    id: 'listing-1', sellerId: 'user-2', title: 'the GazettE LIVE TOUR Tシャツ 2025',
    description: 'the GazettEの2025年ツアーTシャツです。Lサイズ。1回着用後洗濯済み。タグ付き。',
    price: 5500, images: ['https://picsum.photos/seed/listing1a/400/400', 'https://picsum.photos/seed/listing1b/400/400'],
    category: 'clothing', genre: 'visualkei', status: 'available', createdAt: '2026-03-20T10:00:00Z',
  },
  {
    id: 'listing-2', sellerId: 'user-4', title: '竹内まりや「VARIETY」アナログ盤',
    description: 'オリジナル盤。盤面に軽いスレあるけど再生に問題なし。ジャケットは美品。',
    price: 12000, images: ['https://picsum.photos/seed/listing2a/400/400'],
    category: 'vinyl', genre: 'citypop', status: 'available', createdAt: '2026-03-18T14:00:00Z',
  },
  {
    id: 'listing-3', sellerId: 'user-7', title: 'Hi-STANDARD AIR JAM 2024 タオル',
    description: 'AIR JAM 2024のオフィシャルタオル。未使用品。コレクション整理のため出品。',
    price: 3000, images: ['https://picsum.photos/seed/listing3a/400/400'],
    category: 'goods', genre: 'punk', status: 'available', createdAt: '2026-03-15T09:00:00Z',
  },
  {
    id: 'listing-4', sellerId: 'user-3', title: 'King Gnu CEREMONY ツアーパーカー',
    description: 'CEREMONYツアーのパーカー。Mサイズ。数回着用、状態良好。',
    price: 7000, images: ['https://picsum.photos/seed/listing4a/400/400', 'https://picsum.photos/seed/listing4b/400/400'],
    category: 'clothing', genre: 'rock', status: 'available', createdAt: '2026-03-12T16:00:00Z',
  },
  {
    id: 'listing-5', sellerId: 'user-5', title: 'Perfume COSMIC EXPLORER Blu-ray',
    description: 'COSMIC EXPLORERツアーのBlu-ray。特典映像付き。ケースに若干傷あり。',
    price: 4500, images: ['https://picsum.photos/seed/listing5a/400/400'],
    category: 'goods', genre: 'edm', status: 'sold', createdAt: '2026-03-10T11:00:00Z',
  },
  {
    id: 'listing-6', sellerId: 'user-9', title: 'ZORN「LIFE STORY」CD サイン入り',
    description: 'ZORN直筆サイン入りCD。ライブ会場で購入。証明書はありませんが本物です。',
    price: 15000, images: ['https://picsum.photos/seed/listing6a/400/400'],
    category: 'goods', genre: 'hiphop', status: 'available', createdAt: '2026-03-08T20:00:00Z',
  },
  {
    id: 'listing-7', sellerId: 'user-10', title: 'X JAPAN Tシャツ ヴィンテージ 1997年',
    description: '1997年のLAST LIVE関連Tシャツ。ヴィンテージ品。色褪せあるが味になってます。',
    price: 25000, images: ['https://picsum.photos/seed/listing7a/400/400', 'https://picsum.photos/seed/listing7b/400/400'],
    category: 'clothing', genre: 'visualkei', status: 'available', createdAt: '2026-03-05T13:00:00Z',
  },
  {
    id: 'listing-8', sellerId: 'user-6', title: '宇多田ヒカル First Love レコード',
    description: 'First Loveのアナログ盤。限定プレスで希少。盤面・ジャケットともに美品。',
    price: 18000, images: ['https://picsum.photos/seed/listing8a/400/400'],
    category: 'vinyl', genre: 'rnb', status: 'available', createdAt: '2026-03-03T15:00:00Z',
  },
  {
    id: 'listing-9', sellerId: 'user-11', title: 'SUMMER SONIC 2025 チケット（1日券）',
    description: '※来年のではなく2025年の未使用チケット。コレクション用にどうぞ。',
    price: 500, images: ['https://picsum.photos/seed/listing9a/400/400'],
    category: 'ticket', genre: 'rock', status: 'available', createdAt: '2026-02-28T10:00:00Z',
  },
  {
    id: 'listing-10', sellerId: 'user-8', title: '上原ひろみ ライブDVD 3本セット',
    description: 'Spiral, Place To Be, Aliveの3公演DVD。字幕付き。まとめ売りのみ。',
    price: 8000, images: ['https://picsum.photos/seed/listing10a/400/400'],
    category: 'goods', genre: 'jazz', status: 'available', createdAt: '2026-02-25T12:00:00Z',
  },
  {
    id: 'listing-11', sellerId: 'user-1', title: 'Creepy Nuts ライブパーカー',
    description: '2024年ツアーグッズのパーカー。XLサイズ。新品未使用。サイズ合わず出品。',
    price: 6500, images: ['https://picsum.photos/seed/listing11a/400/400'],
    category: 'clothing', genre: 'hiphop', status: 'available', createdAt: '2026-02-20T18:00:00Z',
  },
  {
    id: 'listing-12', sellerId: 'user-4', title: '山下達郎 RIDE ON TIME アナログ盤',
    description: 'オリジナルプレス盤。レア。盤面キレイ。帯付き完品。',
    price: 28000, images: ['https://picsum.photos/seed/listing12a/400/400'],
    category: 'vinyl', genre: 'citypop', status: 'sold', createdAt: '2026-02-18T09:00:00Z',
  },
];
