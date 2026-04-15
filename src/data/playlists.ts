import type { Playlist } from '@/types';

// モックプレイリストデータ
export const playlists: Playlist[] = [
  {
    id: 'pl-1', title: '深夜のヒップホップ', description: '夜更かしの夜に聴きたいジャパニーズHIPHOP',
    creatorId: 'user-1', songIds: ['song-1', 'song-2', 'song-5', 'song-6', 'song-8'],
    genre: 'hiphop', likes: 128, coverUrl: 'https://picsum.photos/seed/pl1/300/300',
  },
  {
    id: 'pl-2', title: '邦ロック名曲選', description: '邦ロック入門にぴったりの名曲たち',
    creatorId: 'user-3', songIds: ['song-9', 'song-10', 'song-11', 'song-13', 'song-14'],
    genre: 'rock', likes: 256, coverUrl: 'https://picsum.photos/seed/pl2/300/300',
  },
  {
    id: 'pl-3', title: 'V系入門〜美しき闇の世界〜', description: 'V系初心者におすすめの入門プレイリスト',
    creatorId: 'user-2', songIds: ['song-17', 'song-19', 'song-21', 'song-23'],
    genre: 'visualkei', likes: 89, coverUrl: 'https://picsum.photos/seed/pl3/300/300',
  },
  {
    id: 'pl-4', title: 'シティポップでドライブ', description: '夕暮れの湾岸をドライブするときに',
    creatorId: 'user-4', songIds: ['song-24', 'song-25', 'song-27', 'song-28', 'song-29'],
    genre: 'citypop', likes: 342, coverUrl: 'https://picsum.photos/seed/pl4/300/300',
  },
  {
    id: 'pl-5', title: 'テクノポップパーティー', description: 'Perfume中心のパーティーミックス',
    creatorId: 'user-5', songIds: ['song-31', 'song-32', 'song-33', 'song-36', 'song-37'],
    genre: 'edm', likes: 178, coverUrl: 'https://picsum.photos/seed/pl5/300/300',
  },
  {
    id: 'pl-6', title: 'ジャズでまったり', description: '仕事終わりにリラックスするためのジャズ',
    creatorId: 'user-8', songIds: ['song-38', 'song-39', 'song-41', 'song-42', 'song-43'],
    genre: 'jazz', likes: 67, coverUrl: 'https://picsum.photos/seed/pl6/300/300',
  },
  {
    id: 'pl-7', title: 'エモーショナルR&B', description: '心に沁みるR&Bバラード集',
    creatorId: 'user-6', songIds: ['song-44', 'song-45', 'song-46', 'song-47', 'song-49'],
    genre: 'rnb', likes: 198, coverUrl: 'https://picsum.photos/seed/pl7/300/300',
  },
  {
    id: 'pl-8', title: 'パンクで目覚めろ！', description: '朝一番に聴きたいパンクロック',
    creatorId: 'user-7', songIds: ['song-51', 'song-52', 'song-53', 'song-55', 'song-56'],
    genre: 'punk', likes: 145, coverUrl: 'https://picsum.photos/seed/pl8/300/300',
  },
  {
    id: 'pl-9', title: '令和ヒップホップ最前線', description: '今聴くべきジャパニーズHIPHOP',
    creatorId: 'user-9', songIds: ['song-3', 'song-4', 'song-7'],
    genre: 'hiphop', likes: 312, coverUrl: 'https://picsum.photos/seed/pl9/300/300',
  },
  {
    id: 'pl-10', title: '夏フェスアンセム', description: 'フェスで盛り上がること間違いなしの曲たち',
    creatorId: 'user-11', songIds: ['song-11', 'song-13', 'song-52', 'song-55', 'song-58'],
    genre: 'rock', likes: 423, coverUrl: 'https://picsum.photos/seed/pl10/300/300',
  },
];
