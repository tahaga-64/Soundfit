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

  return (
    <div className="min-h-dvh bg-bg-primary flex flex-col animate-fade-in">
      {/* ヘッダー */}
      <div className="flex items-center gap-3 px-4 py-4">
        <button onClick={() => step > 0 ? setStep(s => s - 1) : navigate('/welcome')} className="text-text-secondary hover:text-text-primary">
          <ArrowLeft size={20} />
        </button>
        <div className="flex-1">
          <div className="flex gap-1">
            {steps.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-colors ${i <= step ? 'bg-hiphop' : 'bg-bg-card'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* コンテンツ */}
      <div className="flex-1 px-6 pb-6 flex flex-col">
        <div className="mb-6">
          <h2 className="text-xl font-bold">{steps[step].title}</h2>
          <p className="text-sm text-text-secondary mt-1">{steps[step].subtitle}</p>
        </div>

        <div className="flex-1">
          {/* Step 0: 基本情報 */}
          {step === 0 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-text-secondary block mb-1.5">表示名</label>
                <input
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="田中 ユウキ"
                  className="w-full bg-bg-card rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50"
                />
              </div>
              <div>
                <label className="text-xs text-text-secondary block mb-1.5">メールアドレス</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-bg-card rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50"
                />
              </div>
              <div>
                <label className="text-xs text-text-secondary block mb-1.5">パスワード（4文字以上）</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-bg-card rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50"
                />
              </div>
            </div>
          )}

          {/* Step 1: アバター */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`}
                  alt="avatar"
                  className="w-24 h-24 rounded-full bg-bg-card"
                />
              </div>
              <div className="grid grid-cols-4 gap-3">
                {AVATAR_SEEDS.map(seed => (
                  <button
                    key={seed}
                    onClick={() => setAvatarSeed(seed)}
                    className={`rounded-full p-1 transition-all ${avatarSeed === seed ? 'ring-2 ring-hiphop scale-110' : 'opacity-60 hover:opacity-100'}`}
                  >
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}`}
                      alt={seed}
                      className="w-full rounded-full bg-bg-card"
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
                {allGenres.map(g => (
                  <button
                    key={g}
                    onClick={() => toggleGenre(g)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      genres.includes(g)
                        ? `${genreBgColors[g]} text-black scale-105`
                        : 'bg-bg-card text-text-secondary hover:bg-border-primary'
                    }`}
                  >
                    {genreDisplayNames[g]}
                    {genres.includes(g) && <Check size={14} className="inline ml-1.5" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: 自己紹介 + 好きなアーティスト */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="text-xs text-text-secondary block mb-1.5">自己紹介（任意）</label>
                <textarea
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows={3}
                  placeholder="音楽の好みや自分のことを書いてみよう..."
                  className="w-full bg-bg-card rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 resize-none placeholder:text-text-secondary/50"
                />
              </div>
              <div>
                <label className="text-xs text-text-secondary block mb-1.5">好きなアーティスト（カンマ区切り・任意）</label>
                <input
                  value={artistInput}
                  onChange={e => setArtistInput(e.target.value)}
                  placeholder="King Gnu, ZORN, 宇多田ヒカル..."
                  className="w-full bg-bg-card rounded-xl px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-hiphop/50 placeholder:text-text-secondary/50"
                />
              </div>
            </div>
          )}
        </div>

        {error && <p className="text-rock text-xs text-center mb-3">{error}</p>}

        {/* 次へボタン */}
        <button
          onClick={handleNext}
          disabled={!canNext()}
          className="w-full bg-hiphop text-black font-bold py-3.5 rounded-xl text-sm hover:opacity-90 transition-all active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-4"
        >
          {step === steps.length - 1 ? (
            <><Headphones size={16} />Soundfitを始める</>
          ) : (
            <>次へ<ArrowRight size={16} /></>
          )}
        </button>

        {step === 0 && (
          <p className="text-xs text-text-secondary text-center mt-4">
            すでにアカウントをお持ちですか？ <Link to="/login" className="text-hiphop hover:underline">ログイン</Link>
          </p>
        )}
      </div>
    </div>
  );
}
