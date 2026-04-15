import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { threads } from '@/data';
import TabBar from '@/components/ui/TabBar';
import PostCard from '@/components/ui/PostCard';
import GenreBadge from '@/components/ui/GenreBadge';
import { genreDisplayNames, allGenres } from '@/utils/genreHelpers';

export default function ThreadListPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('すべて');
  const tabs = ['すべて', ...allGenres.map(g => genreDisplayNames[g])];
  const filtered = filter === 'すべて' ? threads : threads.filter(t => genreDisplayNames[t.genre] === filter);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">カルチャートーク</h2>
      </div>
      <TabBar tabs={tabs} activeTab={filter} onTabChange={setFilter} />
      <div className="space-y-3">
        {filtered.map(thread => (
          <Link key={thread.id} to={`/culture/threads/${thread.id}`} className="block">
            <PostCard userId={thread.authorId} content={thread.content} timestamp={thread.createdAt} tags={thread.tags} likes={thread.replies.reduce((s, r) => s + r.likes, 0)} repliesCount={thread.replies.length}>
              <div className="flex items-center gap-2">
                <GenreBadge genre={thread.genre} />
                <h3 className="text-sm font-bold truncate flex-1">{thread.title}</h3>
              </div>
            </PostCard>
          </Link>
        ))}
      </div>
    </div>
  );
}
