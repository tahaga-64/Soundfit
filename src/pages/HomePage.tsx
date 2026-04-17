import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { events, impressions, playlists, threads, buddyPosts, listings } from '@/data';
import Card from '@/components/ui/Card';
import GenreBadge from '@/components/ui/GenreBadge';
import UserAvatar from '@/components/ui/UserAvatar';
import { formatRelativeTime, formatPrice } from '@/utils/formatters';
import { users } from '@/data';

export default function HomePage() {
  const { currentUser } = useApp();

  return (
    <div className="space-y-6 py-4 animate-fade-in">
      {/* ウェルカム */}
      <div className="space-y-1">
        <h2 className="text-xl font-bold">おかえり、{currentUser.name.split(' ')[1]}さん</h2>
        <p className="text-sm text-text-secondary">今日も音楽を楽しもう</p>
      </div>

      {/* AIプレイリスト誘導 */}
      <Link to="/discover/ai-playlist" className="block bg-gradient-to-r from-edm/20 to-visualkei/20 rounded-xl p-4 hover:opacity-90 transition-opacity">
        <div className="flex items-center gap-3">
          <Sparkles size={24} className="text-edm" />
          <div>
            <h3 className="font-bold text-sm">AIに今日の曲を聞いてみる</h3>
            <p className="text-xs text-text-secondary">気分を入力するだけでプレイリストを生成</p>
          </div>
          <ChevronRight size={20} className="text-text-secondary ml-auto" />
        </div>
      </Link>

      {/* 注目のライブ */}
      <FeedSection title="注目のライブ" to="/events">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
          {events.slice(0, 6).map(event => (
            <div key={event.id} className="shrink-0 w-36">
              <Link to={`/events/${event.id}`}>
                <div className="relative">
                  <img src={event.coverUrl} alt={event.artist} className="w-36 h-24 rounded-xl object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[10px] font-bold truncate">{event.artist}</p>
                  </div>
                </div>
              </Link>
              <Link to={`/artist/${encodeURIComponent(event.artist)}`} className="text-[10px] text-text-secondary mt-1 truncate block hover:text-[#1DB954] transition-colors">
                {event.artist}
              </Link>
              <p className="text-[10px] text-text-secondary truncate">{event.venue}</p>
            </div>
          ))}
        </div>
      </FeedSection>

      {/* 最新の感想 */}
      <FeedSection title="最新のライブ感想" to="/events">
        <div className="space-y-3">
          {impressions.slice(0, 3).map(imp => {
            const user = users.find(u => u.id === imp.userId);
            const event = events.find(e => e.id === imp.eventId);
            return (
              <Card key={imp.id}>
                <div className="flex items-center gap-2 mb-2">
                  {user && <UserAvatar src={user.avatar} name={user.name} size="sm" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{user?.name}</p>
                    <p className="text-[10px] text-text-secondary">{formatRelativeTime(imp.timestamp)}</p>
                  </div>
                  {event && <GenreBadge genre={event.genre} />}
                </div>
                <p className="text-sm line-clamp-2">{imp.content}</p>
              </Card>
            );
          })}
        </div>
      </FeedSection>

      {/* 人気プレイリスト */}
      <FeedSection title="人気のプレイリスト" to="/discover/playlists">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
          {playlists.sort((a, b) => b.likes - a.likes).slice(0, 5).map(pl => (
            <Link key={pl.id} to={`/discover/playlists/${pl.id}`} className="shrink-0 w-32">
              <img src={pl.coverUrl} alt={pl.title} className="w-32 h-32 rounded-xl object-cover" />
              <p className="text-xs font-medium mt-1 truncate">{pl.title}</p>
              <p className="text-[10px] text-text-secondary">{pl.likes} いいね</p>
            </Link>
          ))}
        </div>
      </FeedSection>

      {/* ホットなスレッド */}
      <FeedSection title="話題のトーク" to="/culture/threads">
        <div className="space-y-2">
          {threads.slice(0, 3).map(thread => {
            const author = users.find(u => u.id === thread.authorId);
            return (
              <Link key={thread.id} to={`/culture/threads/${thread.id}`} className="block bg-bg-card rounded-xl p-3 hover:bg-border-primary transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <GenreBadge genre={thread.genre} />
                  <span className="text-xs text-text-secondary">{thread.replies.length}件の返信</span>
                </div>
                <p className="text-sm font-medium truncate">{thread.title}</p>
                <p className="text-xs text-text-secondary mt-1">by {author?.name}</p>
              </Link>
            );
          })}
        </div>
      </FeedSection>

      {/* フリマ新着 */}
      <FeedSection title="フリマ新着" to="/marketplace">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
          {listings.filter(l => l.status === 'available').slice(0, 5).map(item => (
            <Link key={item.id} to={`/marketplace/${item.id}`} className="shrink-0 w-32">
              <img src={item.images[0]} alt={item.title} className="w-32 h-32 rounded-xl object-cover" />
              <p className="text-xs font-medium mt-1 truncate">{item.title}</p>
              <p className="text-xs text-hiphop font-bold">{formatPrice(item.price)}</p>
            </Link>
          ))}
        </div>
      </FeedSection>

      {/* 仲間募集 */}
      <FeedSection title="フェス仲間募集" to="/events">
        <div className="space-y-2">
          {buddyPosts.slice(0, 3).map(post => {
            const user = users.find(u => u.id === post.userId);
            return (
              <Card key={post.id}>
                <div className="flex items-center gap-2 mb-2">
                  {user && <UserAvatar src={user.avatar} name={user.name} size="sm" />}
                  <span className="text-xs font-medium">{user?.name}</span>
                  <GenreBadge genre={post.genre} />
                </div>
                <p className="text-sm font-medium">{post.eventName}</p>
                <p className="text-xs text-text-secondary line-clamp-2 mt-1">{post.content}</p>
              </Card>
            );
          })}
        </div>
      </FeedSection>
    </div>
  );
}

// 横スクロールフィードセクション
function FeedSection({ title, to, children }: { title: string; to: string; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold">{title}</h3>
        <Link to={to} className="text-xs text-text-secondary hover:text-text-primary flex items-center gap-0.5">
          すべて見る<ChevronRight size={14} />
        </Link>
      </div>
      {children}
    </section>
  );
}
