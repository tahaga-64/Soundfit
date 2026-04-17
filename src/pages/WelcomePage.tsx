import { Link } from 'react-router-dom';
import { Music, Users, Sparkles, Headphones } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col items-center justify-center px-6 animate-fade-in">
      {/* ロゴ・ブランド */}
      <div className="text-center space-y-4 mb-12">
        <div className="w-20 h-20 bg-gradient-to-br from-hiphop via-edm to-visualkei rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Headphones size={40} className="text-white" />
        </div>
        <h1 className="text-4xl font-black tracking-tight">Soundfit</h1>
        <p className="text-text-secondary text-sm max-w-xs mx-auto leading-relaxed">
          音楽カルチャーで繋がる、新感覚SNS
        </p>
      </div>

      {/* 特徴 */}
      <div className="space-y-3 w-full max-w-xs mb-10">
        <Feature icon={<Music size={18} className="text-hiphop" />} text="好きなジャンル・アーティストで繋がる" />
        <Feature icon={<Users size={18} className="text-edm" />} text="ライブ仲間を見つけて一緒に参戦" />
        <Feature icon={<Sparkles size={18} className="text-visualkei" />} text="AIがあなたにぴったりの曲を提案" />
      </div>

      {/* ボタン */}
      <div className="w-full max-w-xs space-y-3">
        <Link
          to="/signup"
          className="block w-full text-center bg-hiphop text-black font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-opacity active:scale-95"
        >
          アカウントを作成
        </Link>
        <Link
          to="/login"
          className="block w-full text-center bg-bg-card text-text-primary font-semibold py-3 rounded-xl text-sm border border-border-primary hover:bg-border-primary transition-colors active:scale-95"
        >
          ログイン
        </Link>
      </div>

      <p className="text-[10px] text-text-secondary mt-8">
        Soundfit v1.0 — 音楽で繋がる世界へ
      </p>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 bg-bg-card rounded-xl px-4 py-3">
      {icon}
      <span className="text-xs text-text-secondary">{text}</span>
    </div>
  );
}
