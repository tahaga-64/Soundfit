import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Disc3, Pen, BookOpen } from 'lucide-react';
import { collaborations } from '@/data';
import TabBar from '@/components/ui/TabBar';
import PostCard from '@/components/ui/PostCard';
import GenreBadge from '@/components/ui/GenreBadge';

const tabs = ['すべて', 'DJマッチング', '歌詞コラボ', 'ZINE募集'];
const typeMap: Record<string, string> = { 'DJマッチング': 'dj_match', '歌詞コラボ': 'lyrics_collab', 'ZINE募集': 'zine_recruit' };
const typeIcons: Record<string, typeof Disc3> = { dj_match: Disc3, lyrics_collab: Pen, zine_recruit: BookOpen };
const typeLabels: Record<string, string> = { dj_match: 'DJマッチング', lyrics_collab: '歌詞コラボ', zine_recruit: 'ZINE/同人誌' };

export default function CollaboratePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('すべて');
  const filtered = filter === 'すべて' ? collaborations : collaborations.filter(c => c.type === typeMap[filter]);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">コラボ・創作</h2>
      </div>
      <TabBar tabs={tabs} activeTab={filter} onTabChange={setFilter} />
      <div className="space-y-3">
        {filtered.map(collab => {
          const Icon = typeIcons[collab.type];
          return (
            <PostCard key={collab.id} userId={collab.authorId} content={collab.content} timestamp={collab.createdAt} likes={collab.replies.reduce((s, r) => s + r.likes, 0)} repliesCount={collab.replies.length}>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="flex items-center gap-1 text-xs bg-bg-secondary px-2 py-1 rounded-full">
                  <Icon size={12} />{typeLabels[collab.type]}
                </span>
                <GenreBadge genre={collab.genre} />
              </div>
              <h3 className="font-bold text-sm">{collab.title}</h3>
            </PostCard>
          );
        })}
      </div>
    </div>
  );
}
