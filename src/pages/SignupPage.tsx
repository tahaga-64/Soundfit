import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Headphones } from 'lucide-react';
import { useAuth, type SignupData } from '@/contexts/AuthContext';
import type { Genre } from '@/types';
import { allGenres, genreDisplayNames, genreBgColors } from '@/utils/genreHelpers';

const AVATAR_SEEDS = ['Felix', 'Aneka', 'Milo', 'Luna', 'Kai', 'Sora', 'Hana', 'Riku', 'Yui', 'Ren', 'Akira', 'Nao'];

export default function SignupPage() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(0);
  const [error, setError] = useState('');

  // フォームデータ
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatarSeed, setAvatarSeed] = useState(AVATAR_SEEDS[0]);
  const [bio, setBio] = useState('');
  const [genres, setGenres] = useState<Genre[]>([]);
  const [artistInput, setArtistInput] = useState('');

  const toggleGenre = (g: Genre) => {
    setGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  const steps = [
    { title: '基本情報', subtitle: 'あなたのことを教えてください' },
    { title: 'アバター', subtitle: 'プロフィール画像を選んでください' },
    { title: '好きなジャンル', subtitle: '1つ以上選んでください' },
    { title: '自己紹介', subtitle: '音楽仲間に向けてひとこと' },
  ];

  const canNext = () => {
    switch (step) {
      case 0: return name.trim().length > 0 && email.trim().length > 0 && password.length >= 4;
      case 1: return true;
      case 2: return genres.length > 0;
      case 3: return true;
      default: return false;
    }
  };

  const handleNext = () => {
    setError('');
    if (step < steps.length - 1) {
      setStep(s => s + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    const data: SignupData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
      bio: bio.trim() || `${genreDisplayNames[genres[0]] || '音楽'}が好きです`,
      genres,
      favoriteArtists: artistInput.split(/[,、]/).map(a => a.trim()).filter(Boolean),
      avatarSeed,
    };
    signup(data);
    navigate('/', { replace: true });
  };

  const isFinalStep = step === steps.length - 1;

  return (
    <div
      className="min-h-dvh flex flex-col animate-fade-in relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse at 20% 40%, rgba(255,215,0,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 20%, rgba(59,130,246,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 90%, rgba(124,58,237,0.2) 0%, transparent 50%),
          radial-gradient(ellipse at 10% 80%, rgba(236,72,153,0.15) 0%, transparent 40%),
          linear-gradient(135deg, #FAFBFC 0%, #F0F2F5 100%)
        `,
        backgroundSize: '200% 200%',
        animation: 'mesh-shift 12s ease-in-out infinite',
      }}
    >
      {/* Floating accent circles */}
      <div
        className="absolute w-60 h-60 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: '#FFD700',
          top: '-8%',
          left: '-10%',
          animation: 'blob-drift 10s ease-in-out infinite',
        }}
      />
      <div
        className="absolute w-52 h-52 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: '#3B82F6',
          bottom: '5%',
          right: '-8%',
          animation: 'blob-drift 12s ease-in-out infinite 2s',
        }}
      />
      <div
        className="absolute w-44 h-44 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{
          background: '#EC4899',
          top: '50%',
          left: '70%',
          animation: 'blob-drift 14s ease-in-out infinite 4s',
        }}
      />

      {/* Header with progress bar */}
      <div className="flex items-center gap-3 px-4 py-4 relative z-10">
        <button
          onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/welcome')}
          className="text-text-secondary hover:text-text-primary transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className="h-1.5 flex-1 rounded-full transition-all duration-500 overflow-hidden"
                style={{
                  background: i <= step
                    ? 'linear-gradient(90deg, #FFD700, #3B82F6, #7C3AED)'
                    : 'rgba(255,255,255,0.5)',
                  backgroundSize: '200% 100%',
                  animation: i <= step ? 'gradient-x 4s ease-in-out infinite' : 'none',
                  boxShadow: i <= step ? '0 0 8px rgba(255,215,0,0.3)' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6 flex flex-col relative z-10">
        <div
          className="glass-strong rounded-3xl p-6 border border-white/50 flex-1 flex flex-col transition-all duration-300"
          style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(255,255,255,0.3)' }}
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold">{steps[step].title}</h2>
            <p className="text-sm text-text-secondary mt-1">{steps[step].subtitle}</p>
          </div>

          <div className="flex-1">
            {/* Step 0: 基本情報 */}
            {step === 0 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-text-secondary block mb-1.5 font-medium">表示名</label>
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="田中 ユウキ"
                    className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50 border border-white/40 focus:border-hiphop/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-secondary block mb-1.5 font-medium">メールアドレス</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50 border border-white/40 focus:border-hiphop/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-secondary block mb-1.5 font-medium">パスワード（4文字以上）</label>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50 border border-white/40 focus:border-hiphop/30 transition-all"
                  />
                </div>
              </div>
            )}

            {/* Step 1: アバター */}
            {step === 1 && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div
                    className="rounded-full p-1"
                    style={{
                      background: 'linear-gradient(135deg, #FFD700, #3B82F6, #7C3AED)',
                      boxShadow: '0 0 25px rgba(255,215,0,0.3), 0 0 50px rgba(124,58,237,0.15)',
                    }}
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                      alt="avatar"
                      className="w-24 h-24 rounded-full bg-white"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {AVATAR_SEEDS.map(seed => (
                    <button
                      key={seed}
                      onClick={() => setAvatarSeed(seed)}
                      className="rounded-full p-0.5 transition-all duration-300"
                      style={{
                        background: avatarSeed === seed
                          ? 'linear-gradient(135deg, #FFD700, #3B82F6, #7C3AED)'
                          : 'transparent',
                        boxShadow: avatarSeed === seed
                          ? '0 0 15px rgba(255,215,0,0.35), 0 0 30px rgba(124,58,237,0.15)'
                          : 'none',
                        transform: avatarSeed === seed ? 'scale(1.1)' : 'scale(1)',
                        opacity: avatarSeed === seed ? 1 : 0.6,
                      }}
                    >
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                        alt={seed}
                        className="w-full rounded-full bg-white"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: ジャンル選択 */}
            {step === 2 && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {allGenres.map(g => {
                    const isSelected = genres.includes(g);
                    return (
                      <button
                        key={g}
                        onClick={() => toggleGenre(g)}
                        className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 border ${
                          isSelected
                            ? `${genreBgColors[g]} text-black border-transparent`
                            : 'glass text-text-secondary border-white/40 hover:border-white/70'
                        }`}
                        style={{
                          boxShadow: isSelected
                            ? '0 0 15px rgba(0,0,0,0.1), 0 0 30px rgba(0,0,0,0.05)'
                            : 'none',
                          transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                        }}
                      >
                        {genreDisplayNames[g]}
                        {isSelected && <Check size={14} className="inline ml-1.5" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: 自己紹介 + 好きなアーティスト */}
            {step === 3 && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-text-secondary block mb-1.5 font-medium">自己紹介（任意）</label>
                  <textarea
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={3}
                    placeholder="音楽の好みや自分のことを書いてみよう..."
                    className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 resize-none placeholder:text-text-secondary/50 border border-white/40 focus:border-hiphop/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-text-secondary block mb-1.5 font-medium">好きなアーティスト（カンマ区切り・任意）</label>
                  <input
                    value={artistInput}
                    onChange={e => setArtistInput(e.target.value)}
                    placeholder="King Gnu, ZORN, 宇多田ヒカル..."
                    className="w-full glass rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50 border border-white/40 focus:border-hiphop/30 transition-all"
                  />
                </div>
              </div>
            )}
          </div>

          {error && <p className="text-rock text-xs text-center mb-3">{error}</p>}

          {/* Next button */}
          <button
            onClick={handleNext}
            disabled={!canNext()}
            className={`w-full text-black font-bold py-3.5 rounded-xl text-sm transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4 animate-gradient ${
              isFinalStep ? 'animate-pulse-glow' : ''
            }`}
            style={{
              backgroundImage: 'linear-gradient(135deg, #FFD700, #F59E0B, #3B82F6, #7C3AED)',
              backgroundSize: '200% 200%',
              boxShadow: canNext()
                ? isFinalStep
                  ? '0 0 25px rgba(255,215,0,0.5), 0 0 50px rgba(59,130,246,0.25)'
                  : '0 0 20px rgba(255,215,0,0.35), 0 0 40px rgba(59,130,246,0.15)'
                : 'none',
            }}
          >
            {isFinalStep ? (
              <><Headphones size={16} />Soundfitを始める</>
            ) : (
              <>次へ<ArrowRight size={16} /></>
            )}
          </button>

          {step === 0 && (
            <p className="text-xs text-text-secondary text-center mt-4">
              すでにアカウントをお持ちですか？{' '}
              <Link to="/login" className="text-edm hover:underline font-semibold">
                ログイン
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
