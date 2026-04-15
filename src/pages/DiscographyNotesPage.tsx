import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, ChevronRight } from 'lucide-react';
import { songs } from '@/data';
import GenreBadge from '@/components/ui/GenreBadge';

export default function DiscographyNotesPage() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [expandedArtist, setExpandedArtist] = useState<string | null>(null);

  // アーティスト別にグループ化
  const artists = Array.from(new Set(songs.map(s => s.artist)));
  const byArtist = artists.map(artist => ({
    artist,
    songs: songs.filter(s => s.artist === artist),
    genre: songs.find(s => s.artist === artist)!.genre,
  }));

  const toggleArtist = (artist: string) => {
    setExpandedArtist(prev => prev === artist ? null : artist);
  };

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">ディスコグラフィーメモ</h2>
      </div>
      <p className="text-sm text-text-secondary">アーティストの曲に個人的なメモを残せます</p>

      <div className="space-y-2">
        {byArtist.map(({ artist, songs: artistSongs, genre }) => (
          <div key={artist} className="bg-bg-card rounded-xl overflow-hidden">
            <button onClick={() => toggleArtist(artist)} className="w-full flex items-center gap-3 p-4 hover:bg-border-primary transition-colors">
              {expandedArtist === artist ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              <span className="font-bold text-sm flex-1 text-left">{artist}</span>
              <GenreBadge genre={genre} />
              <span className="text-xs text-text-secondary">{artistSongs.length}曲</span>
            </button>
            {expandedArtist === artist && (
              <div className="border-t border-border-primary px-4 pb-4 space-y-3">
                {artistSongs.map(song => (
                  <div key={song.id} className="pt-3">
                    <div className="flex items-center gap-2 mb-1">
                      <img src={song.coverUrl} alt={song.title} className="w-8 h-8 rounded object-cover" />
                      <div>
                        <p className="text-sm font-medium">{song.title}</p>
                        <p className="text-[10px] text-text-secondary">{song.album} ({song.year})</p>
                      </div>
                    </div>
                    <textarea
                      value={notes[song.id] || ''}
                      onChange={e => setNotes(prev => ({ ...prev, [song.id]: e.target.value }))}
                      placeholder="この曲へのメモ..."
                      rows={2}
                      className="w-full bg-bg-secondary rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-hiphop resize-none mt-1"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
