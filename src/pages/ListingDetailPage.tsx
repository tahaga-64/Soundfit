import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { listings, users } from '@/data';
import Button from '@/components/ui/Button';
import GenreBadge from '@/components/ui/GenreBadge';
import UserAvatar from '@/components/ui/UserAvatar';
import { formatPrice, formatDate } from '@/utils/formatters';

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id);
  const [imgIndex, setImgIndex] = useState(0);

  if (!listing) return <p className="text-center py-8 text-text-secondary">出品が見つかりません</p>;

  const seller = users.find(u => u.id === listing.sellerId);

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-text-secondary text-sm hover:text-text-primary">
        <ArrowLeft size={16} />戻る
      </button>

      {/* 画像カルーセル */}
      <div className="relative">
        <img src={listing.images[imgIndex]} alt={listing.title} className="w-full aspect-square rounded-xl object-cover" />
        {listing.images.length > 1 && (
          <>
            <button onClick={() => setImgIndex(prev => Math.max(0, prev - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full"><ChevronLeft size={20} /></button>
            <button onClick={() => setImgIndex(prev => Math.min(listing.images.length - 1, prev + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 p-1 rounded-full"><ChevronRight size={20} /></button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {listing.images.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i === imgIndex ? 'bg-white' : 'bg-white/40'}`} />)}
            </div>
          </>
        )}
        {listing.status === 'sold' && (
          <div className="absolute top-3 right-3 bg-rock text-white text-xs font-bold px-3 py-1 rounded-full">SOLD</div>
        )}
      </div>

      <div className="space-y-3">
        <h1 className="text-xl font-bold">{listing.title}</h1>
        <p className="text-2xl font-bold text-hiphop">{formatPrice(listing.price)}</p>
        <div className="flex items-center gap-2">
          <GenreBadge genre={listing.genre} size="md" />
          <span className="text-xs text-text-secondary">出品日: {formatDate(listing.createdAt)}</span>
        </div>
        <p className="text-sm leading-relaxed">{listing.description}</p>
      </div>

      {/* 出品者情報 */}
      {seller && (
        <Link to={`/profile/${seller.id}`} className="flex items-center gap-3 bg-bg-card rounded-xl p-4">
          <UserAvatar src={seller.avatar} name={seller.name} size="md" />
          <div className="flex-1">
            <p className="font-medium text-sm">{seller.name}</p>
            <p className="text-xs text-text-secondary">{seller.bio.slice(0, 40)}...</p>
          </div>
        </Link>
      )}

      {listing.status === 'available' && (
        <Button className="w-full">出品者に連絡する</Button>
      )}
    </div>
  );
}
