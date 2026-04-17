import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Users, Music, Disc3, Calendar, MapPin, ExternalLink, Loader2 } from 'lucide-react';
import { songs, events } from '@/data';
import { getSpotifyArtistUrl } from '@/data/spotifyIds';
import { searchArtist, getArtistTopTracks, hasSpotifyCredentials, type SpotifyArtist, type SpotifyTrack } from '@/utils/spotify';
import { SpotifyOpenButton, SpotifyLink } from '@/components/ui/SpotifyButton';
import GenreBadge from '@/components/ui/GenreBadge';
import SongRow from '@/components/ui/SongRow';
import Card from '@/components/ui/Card';
import { formatDate } from '@/utils/formatters';

export default function ArtistPage() {
  const { artistName } = useParams();
  const navigate = useNavigate();
  const decodedName = artistName || '';

  const [spotifyArtist, setSpotifyArtist] = useState<SpotifyArtist | null>(null);
  const [topTracks, setTopTracks] = useState<SpotifyTrack[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const artistSongs = songs.filter(s => s.artist === decodedName);
  const artistEvents = events.filter(e => e.artist === decodedName);
  const mainGenre = artistSongs.length > 0 ? artistSongs[0].genre : artistEvents.length > 0 ? artistEvents[0].genre : undefined;

  useEffect(() => {
    if (!decodedName || !hasSpotifyCredentials()) return;

    let cancelled = false;
    setLoading(true);

    (async () => {
      try {
        const results = await searchArtist(decodedName);
        if (cancelled) return;
        if (results.length > 0) {
          const artist = results[0];
          setSpotifyArtist(artist);
          const tracks = await getArtistTopTracks(artist.id);
          if (!cancelled) setTopTracks(tracks.slice(0, 5));
        }
      } catch {
        if (!cancelled) setApiError(true);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true; };
  }, [decodedName]);

  const spotifyUrl = spotifyArtist?.external_urls.spotify || getSpotifyArtistUrl(decodedName);
  const artistImage = spotifyArtist?.images?.[0]?.url;

  if (!decodedName) {
    return <p className="text-center py-8 text-text-secondary">アーティストが見つかりません</p>;
  }

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-text-secondary text-sm hover:text-text-primary">
        <ArrowLeft size={16} />戻る
      </button>

      <div className="text-center space-y-3">
        <div className="w-28 h-28 rounded-full mx-auto bg-bg-card flex items-center justify-center overflow-hidden shadow-md">
          {artistImage ? (
            <img src={artistImage} alt={decodedName} className="w-full h-full object-cover" />
          ) : (
            <img
              src={`https://picsum.photos/seed/${encodeURIComponent(decodedName)}/200/200`}
              alt={decodedName}
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
        </div>
        <h1 className="text-2xl font-bold">{decodedName}</h1>
        {spotifyArtist && (
          <p className="text-xs text-text-secondary">
            {spotifyArtist.followers.total.toLocaleString()} フォロワー
          </p>
        )}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {mainGenre && <GenreBadge genre={mainGenre} size="md" />}
          <SpotifyLink url={spotifyUrl} size={20} />
        </div>

        <div>
          <SpotifyOpenButton url={spotifyUrl} />
        </div>

        {loading && (
          <p className="text-xs text-text-secondary flex items-center justify-center gap-1">
            <Loader2 size={12} className="animate-spin" /> Spotify情報を取得中...
          </p>
        )}
      </div>

      {/* Spotify 埋め込みプレイヤー（API経由でIDが取得できた場合のみ） */}
      {spotifyArtist?.id && (
        <Card>
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Music size={16} className="text-[#1DB954]" />Spotifyで聴く
          </h3>
          <iframe
            src={`https://open.spotify.com/embed/artist/${spotifyArtist.id}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl"
            title={`${decodedName} on Spotify`}
          />
        </Card>
      )}

      {topTracks.length > 0 && (
        <Card>
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2">
            <Music size={16} />人気の楽曲（Spotify）
          </h3>
          <div className="space-y-2">
            {topTracks.map((track, i) => (
              <a
                key={track.id}
                href={track.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 py-1.5 hover:bg-bg-secondary rounded-lg px-1 transition-colors"
              >
                <span className="text-text-secondary font-bold text-sm w-5 text-center">{i + 1}</span>
                {track.album.images[2] && (
                  <img src={track.album.images[2].url} alt="" className="w-10 h-10 rounded object-cover shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{track.name}</p>
                  <p className="text-xs text-text-secondary truncate">{track.album.name}</p>
                </div>
                <ExternalLink size={12} className="text-text-secondary shrink-0" />
              </a>
            ))}
          </div>
        </Card>
      )}

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

      {!hasSpotifyCredentials() && (
        <Card>
          <div className="text-center py-4 space-y-2">
            <Users size={24} className="mx-auto text-text-secondary" />
            <p className="text-sm text-text-secondary">Spotify APIを設定するとアーティスト情報が表示されます</p>
            <Link to="/settings" className="text-xs text-hiphop hover:underline">設定画面へ →</Link>
          </div>
        </Card>
      )}

      {apiError && (
        <p className="text-xs text-text-secondary text-center">Spotify API接続に失敗しました。設定を確認してください。</p>
      )}
    </div>
  );
}
