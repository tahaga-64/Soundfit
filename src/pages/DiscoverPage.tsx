import { Link } from 'react-router-dom';
import { ListMusic, BarChart3, Gem, Sparkles, MapPin, MessageSquare, Camera, ShoppingBag, Users } from 'lucide-react';

// 発見ハブの各セクションリンク
const sections = [
  { to: '/discover/playlists', icon: ListMusic, label: 'プレイリスト', desc: 'みんなのプレイリスト', color: 'text-hiphop' },
  { to: '/discover/rankings', icon: BarChart3, label: 'ランキング', desc: 'カルチャー別人気曲', color: 'text-rock' },
  { to: '/discover/hidden-gems', icon: Gem, label: '隠れた名曲', desc: '知る人ぞ知る名曲', color: 'text-visualkei' },
  { to: '/discover/ai-playlist', icon: Sparkles, label: 'AIプレイリスト', desc: '気分で曲を提案', color: 'text-edm' },
  { to: '/culture/spots', icon: MapPin, label: '聖地スポット', desc: '音楽カルチャーの聖地', color: 'text-citypop' },
  { to: '/culture/threads', icon: MessageSquare, label: 'カルチャートーク', desc: '音楽を語ろう', color: 'text-jazz' },
  { to: '/culture/gallery', icon: Camera, label: 'ギャラリー', desc: 'ライブ写真アーカイブ', color: 'text-rnb' },
  { to: '/marketplace', icon: ShoppingBag, label: 'フリマ', desc: 'グッズ売買', color: 'text-punk' },
  { to: '/collaborate', icon: Users, label: 'コラボ', desc: 'DJ・創作仲間を探す', color: 'text-hiphop' },
];

export default function DiscoverPage() {
  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <h2 className="text-xl font-bold">発見</h2>
      <div className="grid grid-cols-1 gap-3">
        {sections.map(({ to, icon: Icon, label, desc, color }) => (
          <Link key={to} to={to} className="bg-bg-card rounded-xl p-4 flex items-center gap-4 hover:bg-border-primary transition-colors active:scale-[0.98]">
            <div className={`w-12 h-12 rounded-xl bg-bg-secondary flex items-center justify-center ${color}`}>
              <Icon size={24} />
            </div>
            <div>
              <h3 className="font-bold text-sm">{label}</h3>
              <p className="text-xs text-text-secondary">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
