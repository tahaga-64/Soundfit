import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, XCircle, Trophy } from 'lucide-react';
import { quizzes } from '@/data';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';

type Phase = 'start' | 'playing' | 'result';

export default function QuizPage() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<Phase>('start');
  const [questionIndex, setQuestionIndex] = useState(0);
  const [hintLevel, setHintLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(15);
  const [shuffled, setShuffled] = useState(quizzes);

  const currentQ = shuffled[questionIndex];
  const isCorrect = answered !== null && answered === currentQ?.correctIndex;
  const totalQuestions = 10;

  // シャッフルしてスタート
  const startQuiz = () => {
    const s = [...quizzes].sort(() => Math.random() - 0.5).slice(0, totalQuestions);
    setShuffled(s);
    setQuestionIndex(0);
    setScore(0);
    setHintLevel(0);
    setAnswered(null);
    setTimeLeft(15);
    setPhase('playing');
  };

  // タイマー
  useEffect(() => {
    if (phase !== 'playing' || answered !== null) return;
    if (timeLeft <= 0) { setAnswered(-1); return; }
    const t = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, phase, answered]);

  // 回答処理
  const handleAnswer = (index: number) => {
    if (answered !== null) return;
    setAnswered(index);
    if (index === currentQ.correctIndex) setScore(prev => prev + 1);
  };

  // 次の問題
  const nextQuestion = () => {
    if (questionIndex + 1 >= shuffled.length) { setPhase('result'); return; }
    setQuestionIndex(prev => prev + 1);
    setHintLevel(0);
    setAnswered(null);
    setTimeLeft(15);
  };

  // ヒント追加表示
  const showNextHint = () => {
    if (hintLevel < 2) setHintLevel(prev => prev + 1);
  };

  if (!currentQ && phase === 'playing') { setPhase('result'); }

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">イントロクイズ</h2>
      </div>

      {phase === 'start' && (
        <div className="text-center space-y-6 py-8">
          <div className="text-6xl">🎵</div>
          <h3 className="text-xl font-bold">ヒントから曲名を当てよう！</h3>
          <p className="text-sm text-text-secondary">3つのヒントを頼りに、15秒以内に曲名を当ててください</p>
          <Button onClick={startQuiz} className="text-lg px-8 py-3">スタート</Button>
        </div>
      )}

      {phase === 'playing' && currentQ && (
        <>
          {/* 進捗バー */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary">{questionIndex + 1}/{shuffled.length}</span>
            <div className="flex-1 h-1.5 bg-bg-card rounded-full overflow-hidden">
              <div className="h-full bg-hiphop rounded-full transition-all" style={{ width: `${((questionIndex + 1) / shuffled.length) * 100}%` }} />
            </div>
            <span className="text-sm font-bold">スコア: {score}</span>
          </div>

          {/* タイマー */}
          <div className="flex justify-center">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#242424" strokeWidth="3" />
                <circle cx="18" cy="18" r="16" fill="none" stroke={timeLeft > 5 ? '#FFD700' : '#DC2626'} strokeWidth="3" strokeDasharray="100" strokeDashoffset={100 - (timeLeft / 15) * 100} strokeLinecap="round" className="transition-all duration-1000" />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center font-bold text-lg ${timeLeft <= 5 ? 'text-rock' : ''}`}>{timeLeft}</span>
            </div>
          </div>

          {/* ヒント */}
          <Card>
            <h3 className="text-sm font-bold mb-3">ヒント</h3>
            <div className="space-y-2">
              {currentQ.hints.slice(0, hintLevel + 1).map((hint, i) => (
                <p key={i} className="text-sm bg-bg-secondary rounded-lg px-3 py-2">💡 {hint}</p>
              ))}
            </div>
            {hintLevel < 2 && answered === null && (
              <button onClick={showNextHint} className="text-xs text-edm mt-2 hover:underline">次のヒントを見る</button>
            )}
          </Card>

          {/* 選択肢 */}
          <div className="grid grid-cols-1 gap-2">
            {currentQ.options.map((opt, i) => {
              let btnClass = 'bg-bg-card text-text-primary hover:bg-border-primary';
              if (answered !== null) {
                if (i === currentQ.correctIndex) btnClass = 'bg-green-600/20 text-green-400 border border-green-600';
                else if (i === answered && !isCorrect) btnClass = 'bg-red-600/20 text-red-400 border border-red-600';
                else btnClass = 'bg-bg-card text-text-secondary opacity-50';
              }
              return (
                <button key={i} onClick={() => handleAnswer(i)} disabled={answered !== null} className={`p-3 rounded-xl text-sm font-medium transition-all ${btnClass}`}>
                  {answered !== null && i === currentQ.correctIndex && <CheckCircle2 size={16} className="inline mr-2" />}
                  {answered !== null && i === answered && !isCorrect && i !== currentQ.correctIndex && <XCircle size={16} className="inline mr-2" />}
                  {opt}
                </button>
              );
            })}
          </div>

          {answered !== null && (
            <div className="text-center">
              <p className={`font-bold ${isCorrect ? 'text-green-400' : 'text-rock'}`}>
                {answered === -1 ? '⏰ 時間切れ！' : isCorrect ? '🎉 正解！' : '❌ 残念！'}
              </p>
              <Button onClick={nextQuestion} className="mt-3">
                {questionIndex + 1 >= shuffled.length ? '結果を見る' : '次の問題'}
              </Button>
            </div>
          )}
        </>
      )}

      {phase === 'result' && (
        <div className="text-center space-y-6 py-8">
          <Trophy size={64} className="mx-auto text-hiphop" />
          <h3 className="text-2xl font-bold">結果発表</h3>
          <p className="text-4xl font-bold text-hiphop">{score} / {shuffled.length}</p>
          <p className="text-text-secondary">{score >= 8 ? '🎉 音楽マスター！' : score >= 5 ? '👍 なかなかの腕前！' : '💪 もっと聴き込もう！'}</p>
          <div className="flex gap-3 justify-center">
            <Button onClick={startQuiz}>もう一度</Button>
            <Button variant="secondary" onClick={() => navigate('/games')}>ゲーム一覧に戻る</Button>
          </div>
        </div>
      )}
    </div>
  );
}
