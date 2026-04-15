import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { listings, users } from '@/data';
import TabBar from '@/components/ui/TabBar';
import GenreBadge from '@/components/ui/GenreBadge';
import { formatPrice } from '@/utils/formatters';

const categoryTabs = ['すべて', 'グッズ', '古着', 'レコード', 'チケット', 'その他'];
const categoryMap: Record<string, string> = { 'グッズ': 'goods', '古着': 'clothing', 'レコード': 'vinyl', 'チケット': 'ticket', 'その他': 'other' };

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('すべて');
  const filtered = filter === 'すべて' ? listings : listings.filter(l => l.category === categoryMap[filter]);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">フリマ</h2>
      </div>
      <TabBar tabs={categoryTabs} activeTab={filter} onTabChange={setFilter} />
      <div className="grid grid-cols-2 gap-3">
        {filtered.map(item => {
          const seller = users.find(u => u.id === item.sellerId);
          return (
            <Link key={item.id} to={`/marketplace/${item.id}`} className="bg-bg-card rounded-xl overflow-hidden hover:ring-1 hover:ring-border-primary transition-all">
              <div className="relative">
                <img src={item.images[0]} alt={item.title} className="w-full aspect-square object-cover" />
                {item.status === 'sold' && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                    <span className="bg-rock text-white text-xs font-bold px-3 py-1 rounded-full">SOLD</span>
                  </div>
                )}
              </div>
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-medium truncate">{item.title}</h3>
                <p className="text-sm font-bold text-hiphop">{formatPrice(item.price)}</p>
                <div className="flex items-center justify-between">
                  <GenreBadge genre={item.genre} />
                  <span className="text-[10px] text-text-secondary">{seller?.name}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
