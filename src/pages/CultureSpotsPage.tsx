import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Star } from 'lucide-react';
import { spots } from '@/data';
import Card from '@/components/ui/Card';
import GenreBadge from '@/components/ui/GenreBadge';

export default function CultureSpotsPage() {
  const navigate = useNavigate();
  const sacredSpots = spots.filter(s => s.isSacred);
  const nearbySpots = spots.filter(s => !s.isSacred);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">聖地スポット</h2>
      </div>

      {/* 聖地マップ風表示 */}
      <div className="relative bg-bg-card rounded-xl p-4 h-48 overflow-hidden">
        <p className="text-xs text-text-secondary mb-2">東京エリア</p>
        <div className="relative w-full h-full">
          {sacredSpots.map(spot => {
            const x = ((spot.lng - 139.66) / 0.12) * 100;
            const y = ((35.72 - spot.lat) / 0.08) * 100;
            return (
              <div key={spot.id} className="absolute group" style={{ left: `${Math.min(90, Math.max(5, x))}%`, top: `${Math.min(85, Math.max(5, y))}%` }}>
                <div className="w-3 h-3 bg-hiphop rounded-full animate-pulse cursor-pointer" />
                <div className="hidden group-hover:block absolute bottom-5 left-1/2 -translate-x-1/2 bg-bg-secondary px-2 py-1 rounded text-[10px] whitespace-nowrap z-10">{spot.name}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 聖地一覧 */}
      <h3 className="font-bold flex items-center gap-2"><Star size={16} className="text-hiphop" />聖地</h3>
      <div className="space-y-3">
        {sacredSpots.map(spot => (
          <Card key={spot.id}>
            <div className="flex gap-3">
              <img src={spot.imageUrl} alt={spot.name} className="w-24 h-20 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-sm">{spot.name}</h3>
                  <GenreBadge genre={spot.genre} />
                </div>
                <p className="text-xs text-text-secondary flex items-center gap-1"><MapPin size={12} />{spot.address}</p>
                <p className="text-xs text-text-secondary line-clamp-2">{spot.description}</p>
                {spot.relatedArtists && spot.relatedArtists.length > 0 && (
                  <div className="flex gap-1 flex-wrap">
                    {spot.relatedArtists.map(a => <span key={a} className="text-[10px] bg-bg-secondary px-2 py-0.5 rounded-full">{a}</span>)}
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* 周辺スポット */}
      <h3 className="font-bold">周辺スポット</h3>
      <div className="space-y-3">
        {nearbySpots.map(spot => (
          <Card key={spot.id}>
            <div className="flex gap-3">
              <img src={spot.imageUrl} alt={spot.name} className="w-20 h-16 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0 space-y-1">
                <h3 className="font-bold text-sm">{spot.name}</h3>
                <p className="text-xs text-text-secondary">{spot.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
