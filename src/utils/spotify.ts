// Spotify Web API ユーティリティ
// Client Credentials Flow でアクセストークンを取得し、各種APIを呼び出す

// --- 型定義 ---
export interface SpotifyArtist {
  id: string;
  name: string;
  images: { url: string; width: number; height: number }[];
  genres: string[];
  followers: { total: number };
  popularity: number;
  external_urls: { spotify: string };
  uri: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: { id: string; name: string; external_urls: { spotify: string } }[];
  album: {
    id: string;
    name: string;
    images: { url: string; width: number; height: number }[];
    release_date: string;
    external_urls: { spotify: string };
  };
  duration_ms: number;
  preview_url: string | null;
  external_urls: { spotify: string };
  uri: string;
  popularity: number;
}

export interface SpotifySearchResult {
  artists?: { items: SpotifyArtist[] };
  tracks?: { items: SpotifyTrack[] };
}

// --- トークン管理 ---
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

// Client Credentials Flow でアクセストークン取得
async function getAccessToken(): Promise<string> {
  // キャッシュが有効ならそのまま返す
  if (cachedToken && Date.now() < tokenExpiresAt) {
    return cachedToken;
  }

  const response = await fetch('/api/spotify/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: 'grant_type=client_credentials',
  });

  if (!response.ok) {
    throw new Error(`Spotifyトークン取得に失敗: ${response.status}`);
  }

  const data = await response.json();
  cachedToken = data.access_token;
  // 有効期限の少し前にリフレッシュ
  tokenExpiresAt = Date.now() + (data.expires_in - 60) * 1000;
  return cachedToken!;
}

// 認証付きAPI呼び出しヘルパー
async function spotifyFetch<T>(endpoint: string): Promise<T> {
  const token = await getAccessToken();
  const response = await fetch(`/api/spotify${endpoint}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error(`Spotify API エラー: ${response.status}`);
  }

  return response.json();
}

// --- 公開API ---

// アーティストを検索
export async function searchArtist(query: string): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch<SpotifySearchResult>(
    `/search?q=${encodeURIComponent(query)}&type=artist&market=JP&limit=5`
  );
  return data.artists?.items || [];
}

// アーティスト情報を取得
export async function getArtist(artistId: string): Promise<SpotifyArtist> {
  return spotifyFetch<SpotifyArtist>(`/artists/${artistId}`);
}

// アーティストのトップトラック取得
export async function getArtistTopTracks(artistId: string): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<{ tracks: SpotifyTrack[] }>(
    `/artists/${artistId}/top-tracks?market=JP`
  );
  return data.tracks;
}

// アーティストの関連アーティスト取得
export async function getRelatedArtists(artistId: string): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch<{ artists: SpotifyArtist[] }>(
    `/artists/${artistId}/related-artists`
  );
  return data.artists.slice(0, 8);
}

// トラックを検索
export async function searchTrack(query: string): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<SpotifySearchResult>(
    `/search?q=${encodeURIComponent(query)}&type=track&market=JP&limit=10`
  );
  return data.tracks?.items || [];
}

// 複数アーティストをまとめて取得
export async function getArtists(artistIds: string[]): Promise<SpotifyArtist[]> {
  if (artistIds.length === 0) return [];
  const data = await spotifyFetch<{ artists: SpotifyArtist[] }>(
    `/artists?ids=${artistIds.join(',')}`
  );
  return data.artists;
}

// Spotifyの曲URLを生成
export function getSpotifyTrackUrl(trackId: string): string {
  return `https://open.spotify.com/track/${trackId}`;
}

// SpotifyのアーティストURLを生成
export function getSpotifyArtistUrl(artistId: string): string {
  return `https://open.spotify.com/artist/${artistId}`;
}

// Spotify埋め込みURLを生成
export function getSpotifyEmbedUrl(type: 'track' | 'artist' | 'album', id: string): string {
  return `https://open.spotify.com/embed/${type}/${id}?theme=0`;
}

// ミリ秒を「m:ss」形式にフォーマット
export function formatDuration(ms: number): string {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
