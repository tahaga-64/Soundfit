import { Link } from 'react-router-dom';
import { ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import { events, impressions, playlists, threads, buddyPosts, listings } from '@/data';
import GenreBadge from '@/components/ui/GenreBadge';
import UserAvatar from '@/components/ui/UserAvatar';
import { formatRelativeTime, formatPrice } from '@/utils/formatters';
import { users } from '@/data';
import { genreHexColors, genreBorderColors } from '@/utils/genreHelpers';

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return 'おはよう';
  if (hour >= 12 && hour < 18) return 'こんにちは';
  return 'おつかれさま';
}

export default function HomePage() {
  const { currentUser } = useApp();
  const greeting = getGreeting();

  return (
    <div className="space-y-8 py-4 animate-fade-in">
      {/* ウェルカム */}
      <div className="space-y-2">
        <h2 className="text-3xl font-extrabold leading-tight">
          {greeting}、
          <span className="gradient-text bg-gradient-to-r from-hiphop via-edm to-visualkei">{currentUser.name.split(' ')[1]}</span>
          さん
        </h2>
        <p className="text-sm text-text-secondary">今日も音楽を楽しもう</p>
      </div>

      {/* AIプレイリスト誘導 */}
      <Link to="/discover/ai-playlist" className="block relative overflow-hidden rounded-2xl p-[2px] hover:scale-[1.01] transition-transform">
        <div className="absolute inset-0 bg-gradient-to-r from-edm via-visualkei to-rnb animate-gradient rounded-2xl" />
        <div className="relative glass-strong rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-edm/30 to-visualkei/30 flex items-center justify-center animate-float">
              <Sparkles size={24} className="text-edm" />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">AIに今日の曲を聞いてみる</h3>
              <p className="text-xs text-text-secondary">気分を入力するだけでプレイリストを生成</p>
            </div>
            <ChevronRight size={20} className="text-text-secondary" />
          </div>
          {/* Sparkle decorations */}
          <div className="absolute top-2 right-12 w-2 h-2 bg-hiphop/40 rounded-full animate-float" style={{ animationDelay: '0.5s' }} />
          <div className="absolute bottom-3 right-24 w-1.5 h-1.5 bg-edm/40 rounded-full animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-4 right-32 w-1 h-1 bg-visualkei/40 rounded-full animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
      </Link>

      {/* 注目のライブ */}
      <FeedSection title="注目のライブ" to="/events">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
          {events.slice(0, 6).map(event => (
            <div
              key={event.id}
              className="shrink-0 w-36 glass rounded-2xl overflow-hidden border border-white/30 transition-transform hover:scale-[1.03]"
              style={{ boxShadow: `0 4px 20px ${genreHexColors[event.genre]}25` }}
            >
              <Link to={`/events/${event.id}`}>
                <div className="relative">
                  <img src={event.coverUrl} alt={event.artist} className="w-36 h-24 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[10px] font-bold truncate text-white">{event.artist}</p>
                  </div>
                </div>
              </Link>
              <div className="p-2">
                <Link to={`/artist/${encodeURIComponent(event.artist)}`} className="text-[10px] text-text-secondary truncate block hover:text-edm transition-colors font-medium">
                  {event.artist}
                </Link>
                <p className="text-[10px] text-text-secondary truncate">{event.venue}</p>
              </div>
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
              <div key={imp.id} className="glass rounded-2xl p-4 border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  {user && <UserAvatar src={user.avatar} name={user.name} size="sm" />}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate">{user?.name}</p>
                    <p className="text-[10px] text-text-secondary">{formatRelativeTime(imp.timestamp)}</p>
                  </div>
                  {event && <GenreBadge genre={event.genre} />}
                </div>
                <p className="text-sm line-clamp-2">{imp.content}</p>
              </div>
            );
          })}
        </div>
      </FeedSection>

      {/* 人気プレイリスト */}
      <FeedSection title="人気のプレイリスト" to="/discover/playlists">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
          {playlists.sort((a, b) => b.likes - a.likes).slice(0, 5).map(pl => (
            <Link
              key={pl.id}
              to={`/discover/playlists/${pl.id}`}
              className="shrink-0 w-32 group"
            >
              <div
                className="rounded-2xl overflow-hidden transition-transform group-hover:scale-[1.03]"
                style={{ boxShadow: `0 4px 24px ${genreHexColors[pl.genre]}30` }}
              >
                <img src={pl.coverUrl} alt={pl.title} className="w-32 h-32 object-cover" />
              </div>
              <p className="text-xs font-medium mt-2 truncate">{pl.title}</p>
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
              <Link
                key={thread.id}
                to={`/culture/threads/${thread.id}`}
                className={`block glass rounded-2xl p-4 border-l-4 ${genreBorderColors[thread.genre]} border border-white/30 hover:scale-[1.01] transition-transform`}
              >
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
            <Link key={item.id} to={`/marketplace/${item.id}`} className="shrink-0 w-32 group">
              <div className="relative rounded-2xl overflow-hidden transition-transform group-hover:scale-[1.03]">
                <img src={item.images[0]} alt={item.title} className="w-32 h-32 object-cover" />
                <div className="absolute top-2 right-2">
                  <span className="text-[10px] font-bold text-white px-2 py-1 rounded-full bg-gradient-to-r from-hiphop to-edm">
                    {formatPrice(item.price)}
                  </span>
                </div>
              </div>
              <p className="text-xs font-medium mt-2 truncate">{item.title}</p>
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
              <div key={post.id} className="glass rounded-2xl p-4 border border-white/30">
                <div className="flex items-center gap-2 mb-2">
                  {user && <UserAvatar src={user.avatar} name={user.name} size="sm" />}
                  <span className="text-xs font-medium">{user?.name}</span>
                  <GenreBadge genre={post.genre} />
                </div>
                <p className="text-sm font-medium">{post.eventName}</p>
                <p className="text-xs text-text-secondary line-clamp-2 mt-1">{post.content}</p>
              </div>
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
        <div className="relative">
          <h3 className="font-bold text-lg">{title}</h3>
          <div className="h-0.5 w-full bg-gradient-to-r from-hiphop via-edm to-transparent rounded-full mt-0.5" />
        </div>
        <Link to={to} className="text-xs font-semibold gradient-text bg-gradient-to-r from-edm to-visualkei hover:opacity-80 flex items-center gap-0.5 transition-opacity">
          すべて見る<ChevronRight size={14} />
        </Link>
      </div>
      {children}
    </section>
  );
}
