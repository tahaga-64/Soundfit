// ジャンル型定義
export type Genre =
  | 'hiphop' | 'rock' | 'visualkei' | 'citypop' | 'edm' | 'jazz' | 'rnb' | 'punk'
  | 'jpop' | 'kpop' | 'metal' | 'indie' | 'shoegaze' | 'postrock' | 'mathrock'
  | 'idol' | 'anisong' | 'vocaloid' | 'enka' | 'classical' | 'ambient'
  | 'reggae' | 'soul' | 'funk' | 'trap' | 'lofi' | 'house' | 'techno'
  | 'blues' | 'folk' | 'latin' | 'ska' | 'hardcore' | 'emo';

// ユーザー
export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  genres: Genre[];
  favoriteArtists: string[];
  followers: string[];
  following: string[];
  badges: Badge[];
}

// 楽曲
export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: Genre;
  year: number;
  coverUrl: string;
  votes?: number;
  spotifyTrackId?: string;
  spotifyArtistId?: string;
}

// プレイリスト
export interface Playlist {
  id: string;
  title: string;
  description: string;
  creatorId: string;
  songIds: string[];
  genre: Genre;
  likes: number;
  coverUrl: string;
}

// ライブイベント
export interface LiveEvent {
  id: string;
  artist: string;
  spotifyArtistId?: string;
  venue: string;
  date: string;
  genre: Genre;
  setlist: string[];
  coverUrl: string;
}

// ライブ感想
export interface LiveImpression {
  id: string;
  userId: string;
  eventId: string;
  content: string;
  photos: string[];
  timestamp: string;
}

// フェス仲間募集
export interface FestivalBuddyPost {
  id: string;
  userId: string;
  eventName: string;
  date: string;
  content: string;
  genre: Genre;
  replies: Reply[];
}

// 周辺スポット
export interface NearbySpot {
  id: string;
  name: string;
  type: 'cafe' | 'bar' | 'record_shop' | 'livehouse';
  address: string;
  lat: number;
  lng: number;
  genre: Genre;
  description: string;
  imageUrl: string;
  relatedArtists?: string[];
  isSacred?: boolean;
}

// ディスカッションスレッド
export interface DiscussionThread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  genre: Genre;
  tags: string[];
  replies: Reply[];
  createdAt: string;
}

// 返信
export interface Reply {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
}

// クイズ問題
export interface QuizQuestion {
  id: string;
  songId: string;
  hints: string[];
  options: string[];
  correctIndex: number;
}

// バッジ
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  genre?: Genre;
}

// トーナメント
export interface TournamentMatch {
  songA: string;
  songB: string;
  winner?: string;
}

// 音楽タイムラインエントリー
export interface TimelineEntry {
  id: string;
  age: number;
  songId: string;
  note: string;
}

// フリマ出品
export interface MarketplaceListing {
  id: string;
  sellerId: string;
  title: string;
  description: string;
  price: number;
  images: string[];
  category: 'goods' | 'clothing' | 'vinyl' | 'ticket' | 'other';
  genre: Genre;
  status: 'available' | 'sold';
  createdAt: string;
}

// コラボ投稿
export interface CollaborationPost {
  id: string;
  type: 'dj_match' | 'lyrics_collab' | 'zine_recruit';
  authorId: string;
  title: string;
  content: string;
  genre: Genre;
  replies: Reply[];
  createdAt: string;
}

// AIプレイリスト提案
export interface AISuggestion {
  title: string;
  artist: string;
  reason: string;
}

// ギャラリー写真
export interface GalleryPhoto {
  id: string;
  url: string;
  eventId?: string;
  artist: string;
  caption: string;
  userId: string;
  timestamp: string;
}

// ユーザー投稿（Instagram風）
export interface UserPost {
  id: string;
  userId: string;
  imageUrl: string;
  caption: string;
  tags: string[];
  likes: number;
  comments: { userId: string; text: string; timestamp: string }[];
  timestamp: string;
}

// 隠れた名曲投稿
export interface HiddenGemPost {
  id: string;
  userId: string;
  songId: string;
  comment: string;
  timestamp: string;
  likes: number;
}
