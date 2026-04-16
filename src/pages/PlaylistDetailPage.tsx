import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { playlists, songs, users } from '@/data';
import { getSpotifyArtistUrl } from '@/data/spotifyIds';
import GenreBadge from '@/components/ui/GenreBadge';
import SongRow from '@/components/ui/SongRow';
import UserAvatar from '@/components/ui/UserAvatar';
import { SpotifyOpenButton } from '@/components/ui/SpotifyButton';
import { formatNumber } from '@/utils/formatters';

export default function PlaylistDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const playlist = playlists.find(p => p.id === id);

  if (!playlist) return <p className="text-center py-8 text-text-secondary">プレイリストが見つかりません</p>;

  const creator = users.find(u => u.id === playlist.creatorId);
  const playlistSongs = playlist.songIds.map(sid => songs.find(s => s.id === sid)).filter(Boolean);
  const firstSong = playlistSongs[0];

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-text-secondary text-sm hover:text-text-primary">
        <ArrowLeft size={16} />戻る
      </button>
      <div className="text-center space-y-3">
        <img src={playlist.coverUrl} alt={playlist.title} className="w-40 h-40 rounded-xl object-cover mx-auto shadow-lg" />
        <h1 className="text-xl font-bold">{playlist.title}</h1>
        <p className="text-sm text-text-secondary">{playlist.description}</p>
        <div className="flex items-center justify-center gap-3">
          <GenreBadge genre={playlist.genre} size="md" />
          <span className="text-xs text-text-secondary flex items-center gap-1"><Heart size={12} />{formatNumber(playlist.likes)}</span>
        </div>
        {creator && (
          <div className="flex items-center justify-center gap-2">
            <UserAvatar src={creator.avatar} name={creator.name} size="sm" />
            <span className="text-sm">{creator.name}</span>
          </div>
        )}
        {firstSong && (
          <div className="pt-1">
            <SpotifyOpenButton url={getSpotifyArtistUrl(firstSong.artist)} label="Spotifyで聴く" />
          </div>
        )}
      </div>
      <div className="bg-bg-card rounded-xl p-4">
        <h3 className="font-bold text-sm mb-2">{playlistSongs.length}曲</h3>
        <div className="divide-y divide-border-primary">
          {playlistSongs.map((song, i) => song && <SongRow key={song.id} song={song} rank={i + 1} />)}
        </div>
      </div>
    </div>
  );
}
