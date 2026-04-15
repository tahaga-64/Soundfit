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
    <div className="min-h-dvh bg-bg-primary flex flex-col animate-fade-in">
      {/* ヘッダー */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => navigate('/welcome')} className="text-text-secondary hover:text-text-primary">
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm font-medium">ログイン</span>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 px-6 flex flex-col justify-center max-w-sm mx-auto w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-hiphop via-edm to-visualkei rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Headphones size={32} className="text-black" />
          </div>
          <h2 className="text-2xl font-bold">おかえりなさい</h2>
          <p className="text-sm text-text-secondary mt-1">音楽仲間が待ってます</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary block mb-1.5">メールアドレス</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-bg-card rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50"
              onKeyDown={e => e.key === 'Enter' && canSubmit && handleLogin()}
            />
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1.5">パスワード</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-bg-card rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50"
              onKeyDown={e => e.key === 'Enter' && canSubmit && handleLogin()}
            />
          </div>

          {error && <p className="text-rock text-xs text-center">{error}</p>}

          <button
            onClick={handleLogin}
            disabled={!canSubmit}
            className="w-full bg-hiphop text-black font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            ログイン
          </button>
        </div>

        <p className="text-xs text-text-secondary text-center mt-6">
          アカウントをお持ちでないですか？ <Link to="/signup" className="text-hiphop hover:underline">新規登録</Link>
        </p>
      </div>
    </div>
  );
}
