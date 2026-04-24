import { Link } from 'react-router-dom';
import { Music, Users, Sparkles, Headphones } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div
      className="min-h-dvh flex flex-col items-center justify-center px-6 animate-fade-in relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 15% 30%, rgba(255,215,0,0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 85% 15%, rgba(59,130,246,0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 85%, rgba(124,58,237,0.35) 0%, transparent 50%),
          radial-gradient(ellipse at 10% 90%, rgba(236,72,153,0.25) 0%, transparent 45%),
          radial-gradient(ellipse at 90% 70%, rgba(34,197,94,0.2) 0%, transparent 40%),
          linear-gradient(135deg, #FAFBFC 0%, #F0F2F5 100%)
        `,
        backgroundSize: '200% 200%',
        animation: 'mesh-shift 12s ease-in-out infinite',
      }}
    >
      {/* Floating decorative blobs */}
      <div
        className="absolute w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
        style={{
          background: '#FFD700',
          top: '-5%',
          left: '-10%',
          animation: 'blob-drift 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-64 h-64 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: '#3B82F6',
          top: '10%',
          right: '-8%',
          animation: 'blob-drift 12s ease-in-out infinite 2s',
        }}
      />
      <div
        className="absolute w-56 h-56 rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{
          background: '#7C3AED',
          bottom: '5%',
          left: '15%',
          animation: 'blob-drift 14s ease-in-out infinite 4s',
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: '#EC4899',
          bottom: '20%',
          right: '5%',
          animation: 'blob-drift 11s ease-in-out infinite 1s',
        }}
      />
      <div
        className="absolute w-40 h-40 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: '#DC2626',
          top: '45%',
          left: '60%',
          animation: 'blob-drift 13s ease-in-out infinite 3s',
        }}
      />
      <div
        className="absolute w-36 h-36 rounded-full opacity-15 blur-2xl pointer-events-none"
        style={{
          background: '#22C55E',
          top: '60%',
          left: '-5%',
          animation: 'blob-drift 9s ease-in-out infinite 5s',
        }}
      />

      {/* Logo and branding */}
      <div className="text-center space-y-5 mb-12 relative z-10">
        <div
          className="w-24 h-24 bg-gradient-to-br from-hiphop via-edm to-visualkei rounded-3xl flex items-center justify-center mx-auto shadow-2xl animate-float animate-pulse-glow"
        >
          <Headphones size={48} className="text-white drop-shadow-lg" />
        </div>
        <h1
          className="text-5xl font-black tracking-tight gradient-text"
          style={{
            backgroundImage: 'linear-gradient(135deg, #FFD700 0%, #3B82F6 50%, #7C3AED 100%)',
            backgroundSize: '200% 200%',
            animation: 'gradient-x 6s ease-in-out infinite',
          }}
        >
          Soundfit
        </h1>
        <p className="text-text-secondary text-sm max-w-xs mx-auto leading-relaxed font-medium">
          音楽カルチャーで繋がる、新感覚SNS
        </p>
      </div>

      {/* Features */}
      <div className="space-y-3 w-full max-w-xs mb-10 relative z-10">
        <Feature
          icon={<Music size={18} className="text-hiphop" />}
          text="好きなジャンル・アーティストで繋がる"
        />
        <Feature
          icon={<Users size={18} className="text-edm" />}
          text="ライブ仲間を見つけて一緒に参戦"
        />
        <Feature
          icon={<Sparkles size={18} className="text-visualkei" />}
          text="AIがあなたにぴったりの曲を提案"
        />
      </div>

      {/* CTA Buttons */}
      <div className="w-full max-w-xs space-y-3 relative z-10">
        <Link
          to="/signup"
          className="block w-full text-center text-black font-bold py-3.5 rounded-2xl text-sm transition-all active:scale-95 animate-gradient"
          style={{
            backgroundImage: 'linear-gradient(135deg, #FFD700, #F59E0B, #3B82F6, #7C3AED)',
            backgroundSize: '200% 200%',
            boxShadow: '0 0 25px rgba(255,215,0,0.4), 0 0 50px rgba(59,130,246,0.2)',
          }}
        >
          アカウントを作成
        </Link>
        <Link
          to="/login"
          className="block w-full text-center glass text-text-primary font-semibold py-3.5 rounded-2xl text-sm border border-white/50 hover:border-white/80 transition-all active:scale-95"
          style={{
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          }}
        >
          ログイン
        </Link>
      </div>

      <p className="text-[10px] text-text-secondary mt-8 relative z-10">
        Soundfit v1.0 — 音楽で繋がる世界へ
      </p>
    </div>
  );
}

function Feature({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div
      className="flex items-center gap-3 glass rounded-2xl px-4 py-3.5 border border-white/40 transition-all hover:border-white/70"
      style={{ boxShadow: '0 4px 15px rgba(0,0,0,0.04)' }}
    >
      {icon}
      <span className="text-xs text-text-secondary font-medium">{text}</span>
    </div>
  );
}
