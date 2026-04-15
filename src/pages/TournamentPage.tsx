import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Trophy, Swords } from 'lucide-react';
import { songs as allSongs } from '@/data';
import type { Song, Genre } from '@/types';
import Button from '@/components/ui/Button';
import { allGenres, genreDisplayNames } from '@/utils/genreHelpers';

type Phase = 'setup' | 'battle' | 'champion';

export default function TournamentPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('setup');
  const [selectedGenre, setSelectedGenre] = useState<Genre>('rock');
  const [round, setRound] = useState(0);
  const [matchIndex, setMatchIndex] = useState(0);
  const [winners, setWinners] = useState<Song[][]>([]);

  const roundNames = ['準々決勝', '準決勝', '決勝'];

  // トーナメント開始
  const startTournament = () => {
    const genreSongs = allSongs.filter(s => s.genre === selectedGenre);
    const shuffled = [...genreSongs].sort(() => Math.random() - 0.5).slice(0, 8);
    if (shuffled.length < 8) {
      // ジャンルの曲が足りない場合は他からも補充
      const others = allSongs.filter(s => s.genre !== selectedGenre).sort(() => Math.random() - 0.5);
      while (shuffled.length < 8 && others.length > 0) shuffled.push(others.pop()!);
    }
    setWinners([shuffled]);
    setRound(0);
    setMatchIndex(0);
    setPhase('battle');
  };

  // 現在の対戦カード
  const currentRoundSongs = winners[round] || [];
  const songA = currentRoundSongs[matchIndex * 2];
  const songB = currentRoundSongs[matchIndex * 2 + 1];

  // 勝者を選択
  const selectWinner = (winner: Song) => {
    const newWinners = [...winners];
    if (!newWinners[round + 1]) newWinners[round + 1] = [];
    newWinners[round + 1].push(winner);
    setWinners(newWinners);

    const matchesInRound = currentRoundSongs.length / 2;
    if (matchIndex + 1 < matchesInRound) {
      setMatchIndex(prev => prev + 1);
    } else {
      // ラウンド終了
      if (newWinners[round + 1].length === 1) {
        setPhase('champion');
      } else {
        setRound(prev => prev + 1);
        setMatchIndex(0);
      }
    }
  };

  const champion = phase === 'champion' ? winners[winners.length - 1]?.[0] : null;

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold flex items-center gap-2"><Trophy size={20} className="text-hiphop" />推し曲トーナメント</h2>
      </div>

      {phase === 'setup' && (
        <div className="space-y-6 py-4">
          <p className="text-sm text-text-secondary">ジャンルを選んで、8曲の頂上決戦を始めよう！</p>
          <div className="flex flex-wrap gap-2">
            {allGenres.map(g => (
              <button key={g} onClick={() => setSelectedGenre(g)} className={`px-4 py-2 rounded-full text-sm font-medium ${selectedGenre === g ? 'bg-hiphop text-black' : 'bg-bg-card text-text-secondary'}`}>
                {genreDisplayNames[g]}
              </button>
            ))}
          </div>
          <Button onClick={startTournament} className="w-full text-lg py-3">トーナメント開始！</Button>
        </div>
      )}

      {phase === 'battle' && songA && songB && (
        <div className="space-y-4">
          {/* ラウンド表示 */}
          <div className="text-center">
            <span className="bg-hiphop/20 text-hiphop text-sm font-bold px-4 py-1 rounded-full">{roundNames[round] || `ラウンド${round + 1}`}</span>
            <p className="text-xs text-text-secondary mt-1">マッチ {matchIndex + 1}/{currentRoundSongs.length / 2}</p>
          </div>

          {/* VS表示 */}
          <div className="flex items-stretch gap-3">
            <button onClick={() => selectWinner(songA)} className="flex-1 bg-bg-card rounded-xl p-4 text-center hover:ring-2 hover:ring-hiphop transition-all active:scale-95">
              <img src={songA.coverUrl} alt={songA.title} className="w-24 h-24 rounded-xl object-cover mx-auto mb-3" />
              <p className="font-bold text-sm truncate">{songA.title}</p>
              <p className="text-xs text-text-secondary">{songA.artist}</p>
            </button>
            <div className="flex items-center">
              <Swords size={24} className="text-hiphop" />
            </div>
            <button onClick={() => selectWinner(songB)} className="flex-1 bg-bg-card rounded-xl p-4 text-center hover:ring-2 hover:ring-hiphop transition-all active:scale-95">
              <img src={songB.coverUrl} alt={songB.title} className="w-24 h-24 rounded-xl object-cover mx-auto mb-3" />
              <p className="font-bold text-sm truncate">{songB.title}</p>
              <p className="text-xs text-text-secondary">{songB.artist}</p>
            </button>
          </div>

          {/* ブラケット表示 */}
          <div className="bg-bg-card rounded-xl p-4">
            <h3 className="text-xs font-bold text-text-secondary mb-2">トーナメント進行</h3>
            <div className="flex gap-4 overflow-x-auto text-xs">
              {winners.map((roundSongs, ri) => (
                <div key={ri} className="shrink-0 space-y-1">
                  <p className="text-text-secondary font-bold">{ri === 0 ? '1回戦' : roundNames[ri - 1]}</p>
                  {roundSongs.map(s => (
                    <p key={s.id} className="bg-bg-secondary px-2 py-1 rounded truncate max-w-[120px]">{s.title}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {phase === 'champion' && champion && (
        <div className="text-center space-y-6 py-8">
          <div className="text-6xl">🏆</div>
          <h3 className="text-2xl font-bold">チャンピオン決定！</h3>
          <img src={champion.coverUrl} alt={champion.title} className="w-40 h-40 rounded-xl object-cover mx-auto shadow-lg ring-4 ring-hiphop" />
          <div>
            <p className="text-xl font-bold">{champion.title}</p>
            <p className="text-text-secondary">{champion.artist}</p>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={startTournament}>もう一度</Button>
            <Button variant="secondary" onClick={() => setPhase('setup')}>ジャンル変更</Button>
          </div>
        </div>
      )}
    </div>
  );
}
