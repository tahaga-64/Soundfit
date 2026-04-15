import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp } from 'lucide-react';
import { songs as allSongs } from '@/data';
import TabBar from '@/components/ui/TabBar';
import { genreDisplayNames, allGenres, genreHexColors } from '@/utils/genreHelpers';

export default function RankingsPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('すべて');
  const [votedSongs, setVotedSongs] = useState<Set<string>>(new Set());
  const [localVotes, setLocalVotes] = useState<Record<string, number>>({});
  const tabs = ['すべて', ...allGenres.map(g => genreDisplayNames[g])];

  // フィルタリングとソート
  const filtered = (filter === 'すべて' ? allSongs : allSongs.filter(s => genreDisplayNames[s.genre] === filter))
    .map(s => ({ ...s, votes: (s.votes || 0) + (localVotes[s.id] || 0) }))
    .sort((a, b) => (b.votes || 0) - (a.votes || 0))
    .slice(0, 15);

  const maxVotes = Math.max(...filtered.map(s => s.votes || 1));

  const handleVote = (songId: string) => {
    if (votedSongs.has(songId)) return;
    setVotedSongs(prev => new Set(prev).add(songId));
    setLocalVotes(prev => ({ ...prev, [songId]: (prev[songId] || 0) + 1 }));
  };

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">みんなの好きな曲ランキング</h2>
      </div>
      <TabBar tabs={tabs} activeTab={filter} onTabChange={setFilter} />
      <div className="space-y-2">
        {filtered.map((song, i) => (
          <div key={song.id} className="bg-bg-card rounded-xl p-3">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-lg font-bold text-text-secondary w-8 text-center">{i + 1}</span>
              <img src={song.coverUrl} alt={song.title} className="w-10 h-10 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{song.title}</p>
                <p className="text-xs text-text-secondary">{song.artist}</p>
              </div>
              <button onClick={() => handleVote(song.id)} disabled={votedSongs.has(song.id)} className={`flex items-center gap-1 text-xs px-2 py-1 rounded-full transition-colors ${votedSongs.has(song.id) ? 'bg-hiphop/20 text-hiphop' : 'bg-bg-secondary text-text-secondary hover:text-text-primary'}`}>
                <ThumbsUp size={12} />{song.votes}
              </button>
            </div>
            {/* 棒グラフ */}
            <div className="ml-11 h-2 bg-bg-secondary rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-500" style={{ width: `${((song.votes || 0) / maxVotes) * 100}%`, backgroundColor: genreHexColors[song.genre] }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
