import type { ReactNode } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { users } from '@/data';
import UserAvatar from './UserAvatar';
import { formatRelativeTime } from '@/utils/formatters';

interface PostCardProps {
  userId: string;
  content: string;
  timestamp: string;
  tags?: string[];
  likes?: number;
  repliesCount?: number;
  children?: ReactNode;
  onLike?: () => void;
  onClick?: () => void;
}

// 汎用投稿カード（感想、スレッド、コラボ等で共通利用）
export default function PostCard({ userId, content, timestamp, tags, likes = 0, repliesCount = 0, children, onLike, onClick }: PostCardProps) {
  const user = users.find(u => u.id === userId);
  if (!user) return null;

  return (
    <div className="bg-bg-card rounded-xl p-4 space-y-3" onClick={onClick}>
      {/* ヘッダー */}
      <div className="flex items-center gap-3">
        <UserAvatar src={user.avatar} name={user.name} size="sm" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{user.name}</p>
          <p className="text-[10px] text-text-secondary">{formatRelativeTime(timestamp)}</p>
        </div>
      </div>
      {/* 本文 */}
      <p className="text-sm leading-relaxed">{content}</p>
      {/* タグ */}
      {tags && tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {tags.map(tag => (
            <span key={tag} className="text-[10px] bg-bg-secondary px-2 py-0.5 rounded-full text-text-secondary">#{tag}</span>
          ))}
        </div>
      )}
      {/* 子要素（写真、埋め込み等） */}
      {children}
      {/* アクション */}
      <div className="flex items-center gap-4 pt-1">
        <button onClick={(e) => { e.stopPropagation(); onLike?.(); }} className="flex items-center gap-1 text-text-secondary hover:text-rnb text-xs transition-colors">
          <Heart size={14} /> <span>{likes}</span>
        </button>
        <span className="flex items-center gap-1 text-text-secondary text-xs">
          <MessageCircle size={14} /> <span>{repliesCount}</span>
        </span>
      </div>
    </div>
  );
}
