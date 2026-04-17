import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Key, Music, Save, Check, LogOut, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// localStorageキー
const SPOTIFY_CLIENT_ID_KEY = 'soundfit_spotify_client_id';
const SPOTIFY_CLIENT_SECRET_KEY = 'soundfit_spotify_client_secret';
const ANTHROPIC_API_KEY_KEY = 'soundfit_anthropic_api_key';

// API設定の取得ヘルパー（外部からも使用可能）
export function getStoredSpotifyCredentials() {
  return {
    clientId: localStorage.getItem(SPOTIFY_CLIENT_ID_KEY) || '',
    clientSecret: localStorage.getItem(SPOTIFY_CLIENT_SECRET_KEY) || '',
  };
}

export function getStoredAnthropicKey() {
  return localStorage.getItem(ANTHROPIC_API_KEY_KEY) || '';
}

export default function SettingsPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // Spotify設定
  const [spotifyClientId, setSpotifyClientId] = useState('');
  const [spotifyClientSecret, setSpotifyClientSecret] = useState('');
  // Anthropic設定
  const [anthropicKey, setAnthropicKey] = useState('');
  // 保存フィードバック
  const [saved, setSaved] = useState(false);

  // 起動時にlocalStorageから復元
  useEffect(() => {
    setSpotifyClientId(localStorage.getItem(SPOTIFY_CLIENT_ID_KEY) || '');
    setSpotifyClientSecret(localStorage.getItem(SPOTIFY_CLIENT_SECRET_KEY) || '');
    setAnthropicKey(localStorage.getItem(ANTHROPIC_API_KEY_KEY) || '');
  }, []);

  const handleSave = () => {
    localStorage.setItem(SPOTIFY_CLIENT_ID_KEY, spotifyClientId.trim());
    localStorage.setItem(SPOTIFY_CLIENT_SECRET_KEY, spotifyClientSecret.trim());
    localStorage.setItem(ANTHROPIC_API_KEY_KEY, anthropicKey.trim());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    logout();
    navigate('/welcome', { replace: true });
  };

  return (
    <div className="space-y-6 py-4 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-text-secondary text-sm hover:text-text-primary">
        <ArrowLeft size={16} />戻る
      </button>

      <h1 className="text-xl font-bold">設定</h1>

      {/* Spotify API設定 */}
      <section className="bg-bg-card rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#1DB954]/20 rounded-lg flex items-center justify-center">
            <Music size={16} className="text-[#1DB954]" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Spotify API</h3>
            <p className="text-[10px] text-text-secondary">アーティスト情報・楽曲検索に使用</p>
          </div>
        </div>

        <div>
          <label className="text-xs text-text-secondary block mb-1.5">Client ID</label>
          <input
            value={spotifyClientId}
            onChange={e => setSpotifyClientId(e.target.value)}
            placeholder="your_spotify_client_id"
            className="w-full bg-bg-secondary rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#1DB954] font-mono placeholder:text-text-secondary/40"
          />
        </div>

        <div>
          <label className="text-xs text-text-secondary block mb-1.5">Client Secret</label>
          <input
            type="password"
            value={spotifyClientSecret}
            onChange={e => setSpotifyClientSecret(e.target.value)}
            placeholder="your_spotify_client_secret"
            className="w-full bg-bg-secondary rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-[#1DB954] font-mono placeholder:text-text-secondary/40"
          />
        </div>

        <p className="text-[10px] text-text-secondary leading-relaxed">
          Spotify Developer Dashboardから取得できます。
          <a href="https://developer.spotify.com/dashboard" target="_blank" rel="noopener noreferrer" className="text-[#1DB954] hover:underline inline-flex items-center gap-0.5 ml-1">
            Dashboard <ExternalLink size={10} />
          </a>
        </p>
      </section>

      {/* Anthropic API設定 */}
      <section className="bg-bg-card rounded-xl p-4 space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-edm/20 rounded-lg flex items-center justify-center">
            <Key size={16} className="text-edm" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Anthropic API</h3>
            <p className="text-[10px] text-text-secondary">AIプレイリスト提案に使用</p>
          </div>
        </div>

        <div>
          <label className="text-xs text-text-secondary block mb-1.5">API Key</label>
          <input
            type="password"
            value={anthropicKey}
            onChange={e => setAnthropicKey(e.target.value)}
            placeholder="sk-ant-..."
            className="w-full bg-bg-secondary rounded-lg px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-edm font-mono placeholder:text-text-secondary/40"
          />
        </div>

        <p className="text-[10px] text-text-secondary leading-relaxed">
          Anthropic Consoleから取得できます。
          <a href="https://console.anthropic.com/" target="_blank" rel="noopener noreferrer" className="text-edm hover:underline inline-flex items-center gap-0.5 ml-1">
            Console <ExternalLink size={10} />
          </a>
        </p>
      </section>

      {/* 保存ボタン */}
      <button
        onClick={handleSave}
        className={`w-full font-bold py-3 rounded-xl text-sm transition-all active:scale-95 flex items-center justify-center gap-2 ${
          saved
            ? 'bg-punk/20 text-punk'
            : 'bg-hiphop text-black hover:opacity-90'
        }`}
      >
        {saved ? <><Check size={16} />保存しました</> : <><Save size={16} />設定を保存</>}
      </button>

      {/* ログアウト */}
      <button
        onClick={handleLogout}
        className="w-full bg-bg-card text-rock font-semibold py-3 rounded-xl text-sm border border-border-primary hover:bg-rock/10 transition-colors active:scale-95 flex items-center justify-center gap-2"
      >
        <LogOut size={16} />
        ログアウト
      </button>
    </div>
  );
}
