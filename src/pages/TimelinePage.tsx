import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
import type { TimelineEntry } from '@/types';
import { songs } from '@/data';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import SongRow from '@/components/ui/SongRow';

// 初期データ
const initialEntries: TimelineEntry[] = [
  { id: 'te-1', age: 10, songId: 'song-13', note: '初めてBUMP OF CHICKENを聴いた。天体観測で音楽の世界が広がった。' },
  { id: 'te-2', age: 14, songId: 'song-19', note: 'X JAPANの紅を聴いて衝撃を受けた。ロックってかっこいい。' },
  { id: 'te-3', age: 17, songId: 'song-1', note: 'ZORNに出会ってヒップホップにハマった。リアルな歌詞が刺さった。' },
  { id: 'te-4', age: 20, songId: 'song-24', note: 'Plastic Loveを知ってシティポップの沼に落ちた。' },
  { id: 'te-5', age: 23, songId: 'song-9', note: 'King Gnuの白日。邦ロックの新時代を感じた。' },
];

export default function TimelinePage() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<TimelineEntry[]>(initialEntries);
  const [showAdd, setShowAdd] = useState(false);
  const [newAge, setNewAge] = useState(18);
  const [newSongId, setNewSongId] = useState('');
  const [newNote, setNewNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const sorted = [...entries].sort((a, b) => a.age - b.age);
  const filteredSongs = songs.filter(s => s.title.includes(searchQuery) || s.artist.includes(searchQuery));

  const handleAdd = () => {
    if (!newSongId || !newNote.trim()) return;
    setEntries(prev => [...prev, { id: `te-${Date.now()}`, age: newAge, songId: newSongId, note: newNote }]);
    setShowAdd(false);
    setNewAge(18);
    setNewSongId('');
    setNewNote('');
    setSearchQuery('');
  };

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
          <h2 className="text-xl font-bold">音楽年表</h2>
        </div>
        <Button size="sm" onClick={() => setShowAdd(true)}><Plus size={14} className="inline mr-1" />追加</Button>
      </div>

      <p className="text-sm text-text-secondary">あの曲と出会ったのは何歳？自分だけの音楽年表を作ろう</p>

      {/* タイムライン */}
      <div className="relative pl-8">
        {/* 縦ライン */}
        <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-border-primary" />
        <div className="space-y-6">
          {sorted.map(entry => {
            const song = songs.find(s => s.id === entry.songId);
            return (
              <div key={entry.id} className="relative">
                {/* ドット */}
                <div className="absolute -left-5 top-3 w-3 h-3 bg-hiphop rounded-full ring-4 ring-bg-primary" />
                <div className="bg-bg-card rounded-xl p-4 space-y-2">
                  <span className="text-hiphop font-bold text-sm">{entry.age}歳</span>
                  {song && <SongRow song={song} />}
                  <p className="text-sm text-text-secondary">{entry.note}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 追加モーダル */}
      <Modal isOpen={showAdd} onClose={() => setShowAdd(false)} title="音楽年表に追加">
        <div className="space-y-4">
          <div>
            <label className="text-xs text-text-secondary block mb-1">何歳のとき？</label>
            <input type="number" value={newAge} onChange={e => setNewAge(Number(e.target.value))} min={0} max={100} className="w-full bg-bg-card rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-hiphop" />
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1">曲を選択</label>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="曲名・アーティスト名で検索" className="w-full bg-bg-card rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-hiphop mb-2" />
            <div className="max-h-40 overflow-y-auto space-y-1">
              {filteredSongs.slice(0, 10).map(s => (
                <button key={s.id} onClick={() => { setNewSongId(s.id); setSearchQuery(s.title); }} className={`w-full text-left p-2 rounded-lg text-sm ${newSongId === s.id ? 'bg-hiphop/20 text-hiphop' : 'hover:bg-bg-card'}`}>
                  {s.title} - {s.artist}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-xs text-text-secondary block mb-1">思い出メモ</label>
            <textarea value={newNote} onChange={e => setNewNote(e.target.value)} rows={3} placeholder="この曲との思い出を書こう..." className="w-full bg-bg-card rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-hiphop resize-none" />
          </div>
          <Button onClick={handleAdd} className="w-full" disabled={!newSongId || !newNote.trim()}>追加</Button>
        </div>
      </Modal>
    </div>
  );
}
