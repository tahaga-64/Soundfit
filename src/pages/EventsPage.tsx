import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Music } from 'lucide-react';
import { events, impressions, buddyPosts, spots } from '@/data';
import TabBar from '@/components/ui/TabBar';
import PostCard from '@/components/ui/PostCard';
import GenreBadge from '@/components/ui/GenreBadge';
import { formatDate } from '@/utils/formatters';
import { genreBorderColors } from '@/utils/genreHelpers';

const tabs = ['セットリスト', 'ライブ感想', '仲間募集', '周辺スポット'];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const navigate = useNavigate();

  return (
    <div className="space-y-5 py-4 animate-fade-in">
      <div className="space-y-1">
        <h2 className="text-3xl font-extrabold gradient-text bg-gradient-to-r from-rock via-hiphop to-edm leading-tight">
          ライブ・イベント
        </h2>
        <p className="text-sm text-text-secondary">最新のライブ情報をチェック</p>
      </div>

      <div className="sticky top-0 z-10 -mx-4 px-4 py-2 glass-strong">
        <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {activeTab === 'セットリスト' && (
        <div className="space-y-3">
          {events.filter(e => e.setlist.length > 0).map(event => (
            <div
              key={event.id}
              className={`glass rounded-2xl p-4 border-l-4 ${genreBorderColors[event.genre]} border border-white/30 cursor-pointer active:scale-[0.98] transition-transform hover:scale-[1.01]`}
              onClick={() => navigate(`/events/${event.id}`)}
            >
              <div className="flex gap-3">
                <div className="relative shrink-0 w-20 h-20 rounded-xl overflow-hidden">
                  <img src={event.coverUrl} alt={event.artist} className="w-20 h-20 object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm truncate">{event.artist}</h3>
                    <GenreBadge genre={event.genre} />
                  </div>
                  <p className="text-xs text-text-secondary flex items-center gap-1"><MapPin size={12} />{event.venue}</p>
                  <p className="text-xs text-text-secondary flex items-center gap-1"><Calendar size={12} />{formatDate(event.date)}</p>
                  <p className="text-xs text-text-secondary flex items-center gap-1"><Music size={12} />{event.setlist.length}曲</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'ライブ感想' && (
        <div className="space-y-3">
          {impressions.map(imp => {
            const event = events.find(e => e.id === imp.eventId);
            return (
              <PostCard key={imp.id} userId={imp.userId} content={imp.content} timestamp={imp.timestamp} tags={event ? [`${event.artist} @ ${event.venue}`] : []} likes={Math.floor(Math.random() * 50) + 5} repliesCount={Math.floor(Math.random() * 10)}>
                {imp.photos.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                    {imp.photos.map((p, i) => <img key={i} src={p} alt="" className="w-32 h-24 rounded-lg object-cover shrink-0" />)}
                  </div>
                )}
              </PostCard>
            );
          })}
        </div>
      )}

      {activeTab === '仲間募集' && (
        <div className="space-y-3">
          {buddyPosts.map(post => (
            <PostCard key={post.id} userId={post.userId} content={post.content} timestamp={post.replies[0]?.timestamp || '2026-04-01T00:00:00Z'} tags={[post.eventName, formatDate(post.date)]} likes={post.replies.reduce((s, r) => s + r.likes, 0)} repliesCount={post.replies.length}>
              <GenreBadge genre={post.genre} size="md" />
            </PostCard>
          ))}
        </div>
      )}

      {activeTab === '周辺スポット' && (
        <div className="space-y-3">
          {spots.filter(s => !s.isSacred).map(spot => (
            <div key={spot.id} className="glass rounded-2xl p-4 border border-white/30">
              <div className="flex gap-3">
                <img src={spot.imageUrl} alt={spot.name} className="w-20 h-20 rounded-xl object-cover shrink-0" />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm">{spot.name}</h3>
                    <span className="text-[10px] font-semibold text-white px-2 py-0.5 rounded-full bg-gradient-to-r from-edm to-visualkei">
                      {spot.type === 'cafe' ? 'カフェ' : spot.type === 'bar' ? 'バー' : 'レコードショップ'}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary flex items-center gap-1"><MapPin size={12} />{spot.address}</p>
                  <p className="text-xs text-text-secondary line-clamp-2">{spot.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
