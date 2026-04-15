import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Music } from 'lucide-react';
import { events, impressions } from '@/data';
import { getSpotifyArtistId } from '@/data/spotifyIds';
import GenreBadge from '@/components/ui/GenreBadge';
import { SpotifyOpenButton } from '@/components/ui/SpotifyButton';
import PostCard from '@/components/ui/PostCard';
import { formatDate } from '@/utils/formatters';

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const event = events.find(e => e.id === id);

  if (!event) return <p className="text-center py-8 text-text-secondary">イベントが見つかりません</p>;

  const eventImpressions = impressions.filter(i => i.eventId === event.id);
  const spotifyId = getSpotifyArtistId(event.artist);
  const spotifyUrl = spotifyId ? `https://open.spotify.com/artist/${spotifyId}` : undefined;

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-text-secondary text-sm hover:text-text-primary">
        <ArrowLeft size={16} />戻る
      </button>

      {/* イベントヘッダー */}
      <div className="relative">
        <img src={event.coverUrl} alt={event.artist} className="w-full h-48 rounded-xl object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent rounded-xl" />
        <div className="absolute bottom-4 left-4 right-4">
          <GenreBadge genre={event.genre} size="md" />
          <Link to={`/artist/${encodeURIComponent(event.artist)}`} className="text-2xl font-bold mt-2 block hover:text-[#1DB954] transition-colors">
            {event.artist}
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-text-secondary">
        <span className="flex items-center gap-1"><MapPin size={14} />{event.venue}</span>
        <span className="flex items-center gap-1"><Calendar size={14} />{formatDate(event.date)}</span>
        {spotifyUrl && <SpotifyOpenButton url={spotifyUrl} label="Spotify" />}
      </div>

      {/* セットリスト */}
      {event.setlist.length > 0 && (
        <div className="bg-bg-card rounded-xl p-4">
          <h3 className="font-bold text-sm mb-3 flex items-center gap-2"><Music size={16} />セットリスト</h3>
          <ol className="space-y-2">
            {event.setlist.map((song, i) => (
              <li key={i} className="flex items-center gap-3 text-sm">
                <span className="text-text-secondary font-mono w-6 text-right">{i + 1}.</span>
                <span>{song}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* 感想 */}
      <h3 className="font-bold">ライブ感想 ({eventImpressions.length}件)</h3>
      <div className="space-y-3">
        {eventImpressions.length === 0 && <p className="text-text-secondary text-sm">まだ感想がありません</p>}
        {eventImpressions.map(imp => (
          <PostCard key={imp.id} userId={imp.userId} content={imp.content} timestamp={imp.timestamp} likes={Math.floor(Math.random() * 30)} repliesCount={0}>
            {imp.photos.length > 0 && (
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {imp.photos.map((p, i) => <img key={i} src={p} alt="" className="w-32 h-24 rounded-lg object-cover shrink-0" />)}
              </div>
            )}
          </PostCard>
        ))}
      </div>
    </div>
  );
}
