import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { playlists, users } from '@/data';

import TabBar from '@/components/ui/TabBar';
import GenreBadge from '@/components/ui/GenreBadge';
import { genreDisplayNames, allGenres } from '@/utils/genreHelpers';
import { formatNumber } from '@/utils/formatters';

export default function PlaylistListPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('すべて');
  const tabs = ['すべて', ...allGenres.map(g => genreDisplayNames[g])];
  const filtered = filter === 'すべて'
    ? playlists
    : playlists.filter(p => genreDisplayNames[p.genre] === filter);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">プレイリスト</h2>
      </div>
      <TabBar tabs={tabs} activeTab={filter} onTabChange={setFilter} />
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(pl => {
          const creator = users.find(u => u.id === pl.creatorId);
          return (
            <Link key={pl.id} to={`/discover/playlists/${pl.id}`} className="bg-bg-card rounded-xl overflow-hidden hover:ring-1 hover:ring-border-primary transition-all">
              <img src={pl.coverUrl} alt={pl.title} className="w-full aspect-square object-cover" />
              <div className="p-3 space-y-1">
                <h3 className="font-bold text-sm truncate">{pl.title}</h3>
                <p className="text-xs text-text-secondary truncate">{creator?.name}</p>
                <div className="flex items-center justify-between">
                  <GenreBadge genre={pl.genre} />
                  <span className="text-xs text-text-secondary flex items-center gap-1"><Heart size={10} />{formatNumber(pl.likes)}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
