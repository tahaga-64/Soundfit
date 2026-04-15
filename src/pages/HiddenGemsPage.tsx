import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { hiddenGems, songs } from '@/data';
import PostCard from '@/components/ui/PostCard';
import SongRow from '@/components/ui/SongRow';

export default function HiddenGemsPage() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">隠れた名曲</h2>
      </div>
      <p className="text-sm text-text-secondary">みんなが推す、知る人ぞ知る名曲たち</p>
      <div className="space-y-3">
        {hiddenGems.map(gem => {
          const song = songs.find(s => s.id === gem.songId);
          return (
            <PostCard key={gem.id} userId={gem.userId} content={gem.comment} timestamp={gem.timestamp} likes={gem.likes} repliesCount={0}>
              {song && <div className="bg-bg-secondary rounded-lg p-2 -mx-1"><SongRow song={song} /></div>}
            </PostCard>
          );
        })}
      </div>
    </div>
  );
}
