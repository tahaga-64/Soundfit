import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Music, Disc3, Calendar, MapPin, ExternalLink } from 'lucide-react';
import { songs, events } from '@/data';
import { getSpotifyArtistId } from '@/data/spotifyIds';
import { SpotifyOpenButton, SpotifyLink } from '@/components/ui/SpotifyButton';
import GenreBadge from '@/components/ui/GenreBadge';
import SongRow from '@/components/ui/SongRow';
import Card from '@/components/ui/Card';
import { formatDate } from '@/utils/formatters';

export default function ArtistPage() {
  const { artistName } = useParams();
  const navigate = useNavigate();
  const [embedError, setEmbedError] = useState(false);

  // React Router v6 は URL パラメータを自動デコードする
  const decodedName = artistName || '';
  const spotifyId = getSpotifyArtistId(decodedName);
  const spotifyUrl = spotifyId ? `https://open.spotify.com/artist/${spotifyId}` : undefined;

  // このアーティストの楽曲を取得
  const artistSongs = songs.filter(s => s.artist === decodedName);
  // このアーティストのイベントを取得
  const artistEvents = events.filter(e => e.artist === decodedName);
  // メインジャンルを判定
  const mainGenre = artistSongs.length > 0 ? artistSongs[0].genre : artistEvents.length > 0 ? artistEvents[0].genre : undefined;

  if (!decodedName) {
    return <p className="text-center py-8 text-text-secondary">アーティストが見つかりません</p>;
  }

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-text-secondary text-sm hover:text-text-primary">
        <ArrowLeft size={16} />戻る
      </button>

      {/* アーティストヘッダー */}
      <div className="text-center space-y-3">
        <div className="w-28 h-28 rounded-full mx-auto bg-bg-card flex items-center justify-center overflow-hidden">
          <img
            src={`https://picsum.photos/seed/${encodeURIComponent(decodedName)}/200/200`}
            alt={decodedName}
            className="w-full h-full object-cover"
            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
          />
        </div>
        <h1 className="text-2xl font-bold">{decodedName}</h1>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {mainGenre && <GenreBadge genre={mainGenre} size="md" />}
          {spotifyUrl && <SpotifyLink url={spotifyUrl} size={20} />}
        </div>
        {spotifyUrl && (
          <div>
            <SpotifyOpenButton url={spotifyUrl} />
          </div>
        )}
      </div>

      {/* Spotify 埋め込みプレイヤー */}
      {spotifyId && !embedError && (
        <Card>
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Music size={16} className="text-[#1DB954]" />Spotifyで聴く
          </h3>
          <iframe
            src={`https://open.spotify.com/embed/artist/${spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
            title={`${decodedName} on Spotify`}
            onError={() => setEmbedError(true)}
          />
        </Card>
      )}

      {/* 埋め込みエラー時のフォールバック */}
      {spotifyId && embedError && (
        <Card>
          <div className="text-center py-4 space-y-3">
            <p className="text-sm text-text-secondary">Spotifyプレイヤーを読み込めませんでした</p>
            <a
              href={spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#1DB954] text-sm hover:underline"
            >
              Spotifyアプリで開く <ExternalLink size={14} />
            </a>
          </div>
        </Card>
      )}

      {/* アプリ内の楽曲 */}
      {artistSongs.length > 0 && (
        <Card>
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Disc3 size={16} />Soundfit内の楽曲 ({artistSongs.length})
          </h3>
          <div className="divide-y divide-border-primary">
            {artistSongs.map((song, i) => (
              <SongRow key={song.id} song={song} rank={i + 1} />
            ))}
          </div>
        </Card>
      )}

      {/* 関連ライブ */}
      {artistEvents.length > 0 && (
        <Card>
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Calendar size={16} />ライブ情報
          </h3>
          <div className="space-y-3">
            {artistEvents.map(event => (
              <Link
                key={event.id}
                to={`/events/${event.id}`}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg-secondary transition-colors"
              >
                <img src={event.coverUrl} alt={event.artist} className="w-14 h-10 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{event.venue}</p>
                  <p className="text-xs text-text-secondary flex items-center gap-1">
                    <MapPin size={10} />{formatDate(event.date)}
                  </p>
                </div>
                <GenreBadge genre={event.genre} />
              </Link>
            ))}
          </div>
        </Card>
      )}

      {/* Spotify IDがない場合 */}
      {!spotifyId && (
        <Card>
          <div className="text-center py-4 space-y-2">
            <Users size={24} className="mx-auto text-text-secondary" />
            <p className="text-sm text-text-secondary">
              このアーティストのSpotify連携は未設定です
            </p>
            <p className="text-xs text-text-secondary">
              設定画面からSpotify APIを設定すると、より多くの情報が表示されます
            </p>
            <Link to="/settings" className="text-xs text-hiphop hover:underline">
              設定画面へ →
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}
