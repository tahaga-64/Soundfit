import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Headphones } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    const err = login(email.trim().toLowerCase(), password);
    if (err) {
      setError(err);
    } else {
      navigate('/', { replace: true });
    }
  };

  const canSubmit = email.trim().length > 0 && password.length >= 4;

  return (
    <div
      className="min-h-dvh flex flex-col animate-fade-in relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 50%, rgba(255,215,0,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 90%, rgba(124,58,237,0.2) 0%, transparent 50%),
          linear-gradient(135deg, #FAFBFC 0%, #F0F2F5 100%)
        `,
        backgroundSize: '200% 200%',
        animation: 'mesh-shift 12s ease-in-out infinite',
      }}
    >
      {/* Floating accent circles */}
      <div
        className="absolute w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: '#FFD700',
          top: '-10%',
          right: '-10%',
          animation: 'blob-drift 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-56 h-56 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: '#3B82F6',
          bottom: '-5%',
          left: '-10%',
          animation: 'blob-drift 12s ease-in-out infinite 2s',
        }}
      />
      <div
        className="absolute w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: '#7C3AED',
          top: '40%',
          left: '70%',
          animation: 'blob-drift 14s ease-in-out infinite 4s',
        }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-4 relative z-10">
        <button onClick={() => navigate('/welcome')} className="text-text-secondary hover:text-text-primary transition-colors">
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm font-medium">ログイン</span>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 flex flex-col justify-center max-w-sm mx-auto w-full relative z-10">
        <div
          className="glass-strong rounded-3xl p-8 border border-white/50"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.3)' }}
        >
          <div className="text-center mb-8">
            <div
              className="w-16 h-16 bg-gradient-to-br from-hiphop via-edm to-visualkei rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow"
            >
              <Headphones size={32} className="text-white drop-shadow-md" />
            </div>
            <h2 className="text-2xl font-bold">おかえりなさい</h2>
            <p className="text-sm text-text-secondary mt-1">音楽仲間が待ってます</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs text-text-secondary block mb-1.5 font-medium">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50 border border-white/40 focus:border-hiphop/30 transition-all"
                onKeyDown={e => e.key === 'Enter' && canSubmit && handleLogin()}
              />
            </div>
            <div>
              <label className="text-xs text-text-secondary block mb-1.5 font-medium">パスワード</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50 border border-white/40 focus:border-hiphop/30 transition-all"
                onKeyDown={e => e.key === 'Enter' && canSubmit && handleLogin()}
              />
            </div>

            {error && <p className="text-rock text-xs text-center">{error}</p>}

            <button
              onClick={handleLogin}
              disabled={!canSubmit}
              className="w-full text-black font-bold py-3.5 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed animate-gradient"
              style={{
                backgroundImage: 'linear-gradient(135deg, #FFD700, #F59E0B, #3B82F6, #7C3AED)',
                backgroundSize: '200% 200%',
                boxShadow: canSubmit
                  ? '0 0 20px rgba(255,215,0,0.35), 0 0 40px rgba(59,130,246,0.15)'
                  : 'none',
              }}
            >
              ログイン
            </button>
          </div>

          <p className="text-xs text-text-secondary text-center mt-6">
            アカウントをお持ちでないですか？{' '}
            <Link to="/signup" className="text-edm hover:underline font-semibold">
              新規登録
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
