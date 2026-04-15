import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Heart } from 'lucide-react';
import { threads, users } from '@/data';
import { useApp } from '@/contexts/AppContext';
import type { Reply } from '@/types';
import GenreBadge from '@/components/ui/GenreBadge';
import UserAvatar from '@/components/ui/UserAvatar';
import { formatRelativeTime } from '@/utils/formatters';

export default function ThreadDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useApp();
  const thread = threads.find(t => t.id === id);
  const [replies, setReplies] = useState<Reply[]>(thread?.replies || []);
  const [newReply, setNewReply] = useState('');

  if (!thread) return <p className="text-center py-8 text-text-secondary">スレッドが見つかりません</p>;

  const author = users.find(u => u.id === thread.authorId);

  const handleSubmit = () => {
    if (!newReply.trim()) return;
    const reply: Reply = { id: `r-new-${Date.now()}`, userId: currentUser.id, content: newReply, timestamp: new Date().toISOString(), likes: 0 };
    setReplies(prev => [...prev, reply]);
    setNewReply('');
  };

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-text-secondary text-sm hover:text-text-primary">
        <ArrowLeft size={16} />戻る
      </button>

      {/* スレッド本文 */}
      <div className="bg-bg-card rounded-xl p-4 space-y-3">
        <div className="flex items-center gap-2">
          <GenreBadge genre={thread.genre} size="md" />
          <div className="flex flex-wrap gap-1">{thread.tags.map(t => <span key={t} className="text-[10px] bg-bg-secondary px-2 py-0.5 rounded-full text-text-secondary">#{t}</span>)}</div>
        </div>
        <h1 className="text-lg font-bold">{thread.title}</h1>
        {author && (
          <div className="flex items-center gap-2">
            <UserAvatar src={author.avatar} name={author.name} size="sm" />
            <span className="text-sm">{author.name}</span>
            <span className="text-xs text-text-secondary">{formatRelativeTime(thread.createdAt)}</span>
          </div>
        )}
        <p className="text-sm leading-relaxed">{thread.content}</p>
      </div>

      {/* リプライ一覧 */}
      <h3 className="font-bold text-sm">{replies.length}件の返信</h3>
      <div className="space-y-3">
        {replies.map(reply => {
          const replyUser = users.find(u => u.id === reply.userId);
          return (
            <div key={reply.id} className="bg-bg-card rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                {replyUser && <UserAvatar src={replyUser.avatar} name={replyUser.name} size="sm" />}
                <span className="text-sm font-medium">{replyUser?.name}</span>
                <span className="text-[10px] text-text-secondary">{formatRelativeTime(reply.timestamp)}</span>
              </div>
              <p className="text-sm">{reply.content}</p>
              <button className="flex items-center gap-1 text-text-secondary text-xs hover:text-rnb"><Heart size={12} />{reply.likes}</button>
            </div>
          );
        })}
      </div>

      {/* 返信入力 */}
      <div className="flex gap-2">
        <input value={newReply} onChange={e => setNewReply(e.target.value)} placeholder="返信を入力..." onKeyDown={e => e.key === 'Enter' && handleSubmit()} className="flex-1 bg-bg-card rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-hiphop" />
        <button onClick={handleSubmit} disabled={!newReply.trim()} className="bg-hiphop text-black p-2 rounded-lg disabled:opacity-50"><Send size={18} /></button>
      </div>
    </div>
  );
}
