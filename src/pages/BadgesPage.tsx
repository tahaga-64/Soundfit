import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { badges } from '@/data';
import { useApp } from '@/contexts/AppContext';
import GenreBadge from '@/components/ui/GenreBadge';

export default function BadgesPage() {
  const navigate = useNavigate();
  const { currentUser } = useApp();

  // デモ用：ユーザーのジャンルに関連するバッジは獲得済みとする
  const earnedBadgeIds = badges.filter(b => b.genre && currentUser.genres.includes(b.genre)).map(b => b.id);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">バッジコレクション</h2>
      </div>
      <p className="text-sm text-text-secondary">{earnedBadgeIds.length}/{badges.length} 獲得</p>
      <div className="grid grid-cols-2 gap-3">
        {badges.map(badge => {
          const earned = earnedBadgeIds.includes(badge.id);
          return (
            <div key={badge.id} className={`bg-bg-card rounded-xl p-4 text-center space-y-2 transition-all ${earned ? '' : 'opacity-40 grayscale'}`}>
              <span className="text-4xl block">{badge.icon}</span>
              <h3 className="font-bold text-sm">{badge.name}</h3>
              <p className="text-[10px] text-text-secondary">{badge.description}</p>
              {badge.genre && <GenreBadge genre={badge.genre} />}
              {earned && <span className="text-[10px] text-green-400 block">✓ 獲得済み</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
}
