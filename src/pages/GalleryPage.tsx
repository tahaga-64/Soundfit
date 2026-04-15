import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, X } from 'lucide-react';
import { galleryPhotos } from '@/data';

export default function GalleryPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const selectedPhoto = galleryPhotos.find(p => p.id === selected);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <div className="flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-text-secondary hover:text-text-primary"><ArrowLeft size={20} /></button>
        <h2 className="text-xl font-bold">ライブ写真ギャラリー</h2>
      </div>
      {/* マスンリーグリッド */}
      <div className="columns-2 gap-3 space-y-3">
        {galleryPhotos.map(photo => (
          <div key={photo.id} className="break-inside-avoid cursor-pointer group" onClick={() => setSelected(photo.id)}>
            <div className="relative overflow-hidden rounded-xl">
              <img src={photo.url} alt={photo.caption} className="w-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-2 left-2 right-2">
                  <p className="text-[10px] font-bold">{photo.artist}</p>
                  <p className="text-[10px] text-text-secondary">{photo.caption}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* フルスクリーンビュー */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center animate-fade-in" onClick={() => setSelected(null)}>
          <button onClick={() => setSelected(null)} className="absolute top-4 right-4 text-white z-10"><X size={24} /></button>
          <div className="max-w-lg w-full p-4" onClick={e => e.stopPropagation()}>
            <img src={selectedPhoto.url} alt={selectedPhoto.caption} className="w-full rounded-xl" />
            <div className="mt-3">
              <p className="font-bold">{selectedPhoto.artist}</p>
              <p className="text-sm text-text-secondary">{selectedPhoto.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
