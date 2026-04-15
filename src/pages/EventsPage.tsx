import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Music } from 'lucide-react';
import { events, impressions, buddyPosts, spots } from '@/data';
import TabBar from '@/components/ui/TabBar';
import Card from '@/components/ui/Card';
import PostCard from '@/components/ui/PostCard';
import GenreBadge from '@/components/ui/GenreBadge';
import { formatDate } from '@/utils/formatters';

const tabs = ['セットリスト', 'ライブ感想', '仲間募集', '周辺スポット'];

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const navigate = useNavigate();

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <h2 className="text-xl font-bold">ライブ・イベント</h2>
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'セットリスト' && (
        <div className="space-y-3">
          {events.filter(e => e.setlist.length > 0).map(event => (
            <Card key={event.id} onClick={() => navigate(`/events/${event.id}`)}>
              <div className="flex gap-3">
                <img src={event.coverUrl} alt={event.artist} className="w-20 h-20 rounded-lg object-cover shrink-0" />
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
            </Card>
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
            <Card key={spot.id}>
              <div className="flex gap-3">
                <img src={spot.imageUrl} alt={spot.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm">{spot.name}</h3>
                    <span className="text-[10px] bg-bg-secondary px-2 py-0.5 rounded-full text-text-secondary">{spot.type === 'cafe' ? 'カフェ' : spot.type === 'bar' ? 'バー' : 'レコードショップ'}</span>
                  </div>
                  <p className="text-xs text-text-secondary flex items-center gap-1"><MapPin size={12} />{spot.address}</p>
                  <p className="text-xs text-text-secondary line-clamp-2">{spot.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
