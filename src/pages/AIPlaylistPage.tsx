import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import type { AISuggestion } from '@/types';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { generateAIPlaylist } from '@/utils/anthropic';
import { allGenres, genreDisplayNames } from '@/utils/genreHelpers';
import { getSpotifySearchUrl } from '@/utils/spotify';

export default function AIPlaylistPage() {
  const navigate = useNavigate();
  const [mood, setMood] = useState('');
  const [genre, setGenre] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<AISuggestion[]>([]);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!mood.trim()) return;
    setLoading(true);
    setError('');
    setSuggestions([]);
    try {
      const result = await generateAIPlaylist(mood, genre || undefined);
      setSuggestions(result);
    } catch (e) {
      setError('AIプレイリストの生成に失敗しました。APIキーの設定を確認してください。');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold flex items-center gap-2"><Sparkles size={20} className="text-edm" />AIプレイリスト</h2>
      </div>

      <Card>
        <p className="text-sm text-text-secondary mb-3">今の気分を入力すると、AIがおすすめの曲を提案します</p>
        <textarea
          value={mood}
          onChange={e => setMood(e.target.value)}
          placeholder="例: 夜のドライブで聴きたい曲、雨の日にまったりしたい..."
          rows={3}
          className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-edm resize-none mb-3"
        />
        <div className="flex flex-wrap gap-2 mb-3">
          <button onClick={() => setGenre('')} className={`text-xs px-3 py-1 rounded-full ${!genre ? 'bg-edm text-black' : 'bg-bg-secondary text-text-secondary'}`}>ジャンル指定なし</button>
          {allGenres.map(g => (
            <button key={g} onClick={() => setGenre(genreDisplayNames[g])} className={`text-xs px-3 py-1 rounded-full ${genre === genreDisplayNames[g] ? 'bg-edm text-black' : 'bg-bg-secondary text-text-secondary'}`}>
              {genreDisplayNames[g]}
            </button>
          ))}
        </div>
        <Button onClick={handleGenerate} disabled={loading || !mood.trim()} className="w-full">
          {loading ? <Loader2 size={16} className="inline animate-spin mr-1" /> : <Sparkles size={16} className="inline mr-1" />}
          {loading ? '生成中...' : '今日のプレイリストを生成'}
        </Button>
      </Card>

      {error && (
        <div className="text-center space-y-2">
          <p className="text-sm text-rock">{error}</p>
          <Link to="/settings" className="text-xs text-hiphop hover:underline">設定画面でAPIキーを確認 →</Link>
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-bold">あなたにおすすめの5曲</h3>
          {suggestions.map((s, i) => (
            <Card key={i}>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-edm">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm">{s.title}</h4>
                  <Link to={`/artist/${encodeURIComponent(s.artist)}`} className="text-xs text-text-secondary hover:text-[#1DB954] transition-colors">{s.artist}</Link>
                  <p className="text-xs text-text-secondary mt-1">{s.reason}</p>
                  <a
                    href={getSpotifySearchUrl(`${s.title} ${s.artist}`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[10px] text-[#1DB954] hover:underline mt-1"
                  >
                    Spotifyで聴く →
                  </a>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
