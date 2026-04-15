import { Link } from 'react-router-dom';
import { HelpCircle, Trophy, Award } from 'lucide-react';

const games = [
  { to: '/games/quiz', icon: HelpCircle, label: 'イントロクイズ', desc: 'ヒントから曲名を当てよう！', color: 'text-rock', bg: 'from-rock/20 to-transparent' },
  { to: '/games/tournament', icon: Trophy, label: '推し曲トーナメント', desc: '好きな曲の頂上決戦！', color: 'text-hiphop', bg: 'from-hiphop/20 to-transparent' },
  { to: '/games/badges', icon: Award, label: 'バッジコレクション', desc: '集めたバッジを確認', color: 'text-visualkei', bg: 'from-visualkei/20 to-transparent' },
];

export default function GamesPage() {
  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <h2 className="text-xl font-bold">ゲーム・チャレンジ</h2>
      <div className="space-y-4">
        {games.map(({ to, icon: Icon, label, desc, color, bg }) => (
          <Link key={to} to={to} className={`block bg-gradient-to-r ${bg} bg-bg-card rounded-xl p-6 hover:scale-[1.02] transition-transform active:scale-[0.98]`}>
            <Icon size={40} className={color} />
            <h3 className="text-lg font-bold mt-3">{label}</h3>
            <p className="text-sm text-text-secondary mt-1">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
