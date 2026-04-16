import { Link } from 'react-router-dom';
import type { Song } from '@/types';
import { getSpotifyArtistUrl } from '@/data/spotifyIds';
import { SpotifyLink } from './SpotifyButton';
import GenreBadge from './GenreBadge';

// 楽曲1行表示コンポーネント
export default function SongRow({ song, rank, action }: { song: Song; rank?: number; action?: React.ReactNode }) {
  const spotifyUrl = getSpotifyArtistUrl(song.artist);

  return (
    <div className="flex items-center gap-3 py-2">
      {rank && <span className="text-text-secondary font-bold text-sm w-6 text-center">{rank}</span>}
      <img src={song.coverUrl} alt={song.title} className="w-11 h-11 rounded-lg object-cover bg-bg-card shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate">{song.title}</p>
        <Link to={`/artist/${encodeURIComponent(song.artist)}`} className="text-xs text-text-secondary truncate hover:text-[#1DB954] transition-colors block">
          {song.artist}
        </Link>
      </div>
      <SpotifyLink url={spotifyUrl} size={16} />
      <GenreBadge genre={song.genre} />
      {action}
    </div>
  );
}
