import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight, Heart, Share2, Shield, Truck, Eye, UserCheck, CreditCard, Store, Headphones, Lock } from 'lucide-react';
import { listings, users } from '@/data';
import type { ItemCondition, ShippingMethod } from '@/types';
import Button from '@/components/ui/Button';
import GenreBadge from '@/components/ui/GenreBadge';
import UserAvatar from '@/components/ui/UserAvatar';
import Modal from '@/components/ui/Modal';
import { formatPrice, formatDate } from '@/utils/formatters';

const conditionLabels: Record<ItemCondition, string> = {
  new: '新品・未使用', like_new: '未使用に近い', good: '目立った傷や汚れなし',
  fair: 'やや傷や汚れあり', poor: '傷や汚れあり', bad: '全体的に状態が悪い',
};

const shippingMethodLabels: Record<ShippingMethod, string> = {
  soundfit_easy: 'らくらくSoundfit便', soundfit_yu: 'ゆうゆうSoundfit便',
  standard_mail: '普通郵便', click_post: 'クリックポスト',
};

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id);
  const [imgIndex, setImgIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const [showPurchase, setShowPurchase] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('credit');

  if (!listing) return <p className="text-center py-8 text-text-secondary">出品が見つかりません</p>;

  const seller = users.find(u => u.id === listing.sellerId);
  const likeCount = listing.likes + (liked ? 1 : 0);

  const handlePurchase = () => {
    alert('購入が完了しました！（デモ）\n\n出品者に通知が送信されます。');
    setShowPurchase(false);
  };

  return (
    <div className="animate-fade-in -mx-4 -mt-4 pb-24">
      {/* 画像カルーセル */}
      <div className="relative bg-bg-secondary">
        <button onClick={() => navigate(-1)} className="absolute top-3 left-3 z-10 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-colors">
          <ArrowLeft size={18} />
        </button>
        <img src={listing.images[imgIndex]} alt={listing.title} className="w-full aspect-square object-cover" />
        {listing.images.length > 1 && (
          <>
            <button onClick={() => setImgIndex(prev => Math.max(0, prev - 1))} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow"><ChevronLeft size={20} /></button>
            <button onClick={() => setImgIndex(prev => Math.min(listing.images.length - 1, prev + 1))} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1.5 rounded-full shadow"><ChevronRight size={20} /></button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {listing.images.map((_, i) => <div key={i} className={`w-2 h-2 rounded-full ${i === imgIndex ? 'bg-text-primary' : 'bg-text-primary/30'}`} />)}
            </div>
          </>
        )}
        {listing.status === 'sold' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-text-primary text-white text-lg font-bold px-8 py-2 rounded -rotate-12">SOLD OUT</span>
          </div>
        )}
      </div>

      <div className="px-4 space-y-4 pt-4">
        {/* 価格 + アクション */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold">{formatPrice(listing.price)}</p>
            {listing.shippingPayer === 'seller' ? (
              <span className="text-xs text-rock font-medium">送料込み（税込）</span>
            ) : (
              <span className="text-xs text-text-secondary">+ 送料 {formatPrice(listing.shippingCost)}（税込）</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setLiked(!liked)} className="flex flex-col items-center gap-0.5">
              <Heart size={22} className={liked ? 'text-rock fill-rock' : 'text-text-secondary'} />
              <span className="text-[10px] text-text-secondary">{likeCount}</span>
            </button>
            <button onClick={() => alert('共有リンクをコピーしました（デモ）')} className="flex flex-col items-center gap-0.5">
              <Share2 size={20} className="text-text-secondary" />
              <span className="text-[10px] text-text-secondary">共有</span>
            </button>
          </div>
        </div>

        {/* タイトル + ジャンル */}
        <div className="space-y-2">
          <h1 className="text-lg font-bold leading-tight">{listing.title}</h1>
          <div className="flex items-center gap-2 text-xs text-text-secondary">
            <GenreBadge genre={listing.genre} size="md" />
            <span className="flex items-center gap-1"><Eye size={12} />{listing.views}</span>
            <span>{formatDate(listing.createdAt)}</span>
          </div>
        </div>

        {/* 商品情報テーブル */}
        <div className="bg-bg-card border border-border-primary rounded-xl overflow-hidden shadow-sm">
          <h3 className="text-xs font-bold px-4 py-2.5 bg-bg-secondary border-b border-border-primary">商品の情報</h3>
          <div className="divide-y divide-border-primary">
            <InfoRow label="商品の状態" value={conditionLabels[listing.condition]} />
            <InfoRow label="配送料の負担" value={listing.shippingPayer === 'seller' ? '送料込み（出品者負担）' : '着払い（購入者負担）'} />
            <InfoRow label="配送の方法" value={shippingMethodLabels[listing.shippingMethod]} />
            <InfoRow label="匿名配送" value={listing.isAnonymousShipping ? '対応' : '非対応'} highlight={listing.isAnonymousShipping} />
            <InfoRow label="カテゴリー" value={{ goods: 'グッズ', clothing: '古着', vinyl: 'レコード', ticket: 'チケット', other: 'その他' }[listing.category]} />
          </div>
        </div>

        {/* 商品の説明 */}
        <div className="space-y-2">
          <h3 className="text-sm font-bold">商品の説明</h3>
          <p className="text-sm leading-relaxed whitespace-pre-line">{listing.description}</p>
        </div>

        {/* 出品者情報 */}
        {seller && (
          <Link to={`/profile/${seller.id}`} className="flex items-center gap-3 bg-bg-card border border-border-primary rounded-xl p-4 shadow-sm hover:shadow transition-shadow">
            <UserAvatar src={seller.avatar} name={seller.name} size="md" />
            <div className="flex-1">
              <p className="font-medium text-sm">{seller.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span key={i} className="text-hiphop text-xs">★</span>
                  ))}
                </div>
                <span className="text-[10px] text-text-secondary">5.0（{Math.floor(Math.random() * 50 + 10)}件）</span>
              </div>
              <p className="text-xs text-text-secondary mt-1">{seller.bio.slice(0, 50)}...</p>
            </div>
            <UserCheck size={16} className="text-text-secondary" />
          </Link>
        )}

        {/* 安心・安全への取り組み */}
        <div className="bg-bg-card border border-border-primary rounded-xl p-4 shadow-sm space-y-3">
          <h3 className="text-sm font-bold flex items-center gap-2"><Shield size={16} className="text-edm" />安心・安全への取り組み</h3>
          <div className="space-y-2.5">
            <SafetyItem icon={<CreditCard size={14} />} title="Soundfitあんしん決済" desc="お金は一旦Soundfitがお預かり。届いた商品を確認してから出品者に支払われます。" />
            {listing.isAnonymousShipping && (
              <SafetyItem icon={<Lock size={14} />} title="匿名配送対応" desc="お互いの住所・名前を伝えずに取引できます。プライバシーを保護します。" />
            )}
            <SafetyItem icon={<Headphones size={14} />} title="24時間カスタマーサポート" desc="トラブルが発生した場合、専任スタッフが対応します。" />
            <SafetyItem icon={<Truck size={14} />} title="配送補償" desc="配送中の紛失・破損はSoundfitが補償します。" />
          </div>
        </div>
      </div>

      {/* 購入バー（固定） */}
      {listing.status === 'available' ? (
        <div className="fixed bottom-16 left-0 right-0 bg-bg-card border-t border-border-primary px-4 py-3 z-40">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <div className="flex-1">
              <p className="text-lg font-bold">{formatPrice(listing.price)}</p>
              {listing.shippingPayer === 'seller' && <p className="text-[10px] text-rock">送料込み</p>}
            </div>
            <Button className="!px-8 !py-3" onClick={() => setShowPurchase(true)}>購入手続きへ</Button>
          </div>
        </div>
      ) : (
        <div className="fixed bottom-16 left-0 right-0 bg-bg-secondary border-t border-border-primary px-4 py-3 z-40">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-sm font-bold text-text-secondary">この商品は売り切れです</p>
          </div>
        </div>
      )}

      {/* 購入確認モーダル */}
      <Modal isOpen={showPurchase} onClose={() => setShowPurchase(false)} title="購入手続き">
        <div className="space-y-5">
          {/* 商品サマリー */}
          <div className="flex gap-3 bg-bg-secondary rounded-xl p-3">
            <img src={listing.images[0]} alt="" className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{listing.title}</p>
              <p className="text-lg font-bold mt-1">{formatPrice(listing.price)}</p>
            </div>
          </div>

          {/* 支払い方法 */}
          <div>
            <h4 className="text-xs font-bold mb-2">支払い方法</h4>
            <div className="space-y-2">
              <PaymentOption id="credit" icon={<CreditCard size={16} />} label="クレジットカード" sublabel="Visa, Mastercard, JCB" selected={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} />
              <PaymentOption id="convenience" icon={<Store size={16} />} label="コンビニ払い" sublabel="ローソン, ファミマ, セブン" selected={paymentMethod === 'convenience'} onChange={() => setPaymentMethod('convenience')} />
              <PaymentOption id="points" icon={<span className="text-hiphop font-bold text-xs">P</span>} label="Soundfitポイント" sublabel="0pt 利用可能" selected={paymentMethod === 'points'} onChange={() => setPaymentMethod('points')} />
            </div>
          </div>

          {/* 配送先 */}
          <div>
            <h4 className="text-xs font-bold mb-2">配送先</h4>
            <div className="bg-bg-secondary rounded-xl p-3 text-sm">
              <p className="text-text-secondary">〒100-0001</p>
              <p>東京都千代田区千代田1-1</p>
              <p className="text-text-secondary text-xs mt-1">※デモ用のダミー住所です</p>
            </div>
          </div>

          {/* 合計 */}
          <div className="border-t border-border-primary pt-3 space-y-1.5">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">商品代金</span>
              <span>{formatPrice(listing.price)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">送料</span>
              <span>{listing.shippingPayer === 'seller' ? '¥0' : formatPrice(listing.shippingCost)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold pt-1.5 border-t border-border-primary">
              <span>支払い金額</span>
              <span className="text-lg">{formatPrice(listing.price + (listing.shippingPayer === 'buyer' ? listing.shippingCost : 0))}</span>
            </div>
          </div>

          {/* 注意事項 */}
          <p className="text-[10px] text-text-secondary leading-relaxed">
            購入手続きを完了すると、Soundfit利用規約に同意したものとみなされます。
            お支払い金額はSoundfitがお預かりし、商品到着後に出品者に支払われます（あんしん決済）。
          </p>

          <Button className="w-full !py-3" onClick={handlePurchase}>購入を確定する</Button>
        </div>
      </Modal>
    </div>
  );
}

function InfoRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="text-xs text-text-secondary">{label}</span>
      <span className={`text-xs font-medium ${highlight ? 'text-edm' : ''}`}>{value}</span>
    </div>
  );
}

function SafetyItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-edm/10 flex items-center justify-center text-edm shrink-0">{icon}</div>
      <div>
        <p className="text-xs font-bold">{title}</p>
        <p className="text-[10px] text-text-secondary leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function PaymentOption({ id, icon, label, sublabel, selected, onChange }: { id: string; icon: React.ReactNode; label: string; sublabel: string; selected: boolean; onChange: () => void }) {
  return (
    <button onClick={onChange} className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition-all text-left ${selected ? 'border-hiphop bg-hiphop/5' : 'border-border-primary hover:border-text-secondary'}`}>
      <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${selected ? 'border-hiphop' : 'border-border-primary'}`}>
        {selected && <div className="w-2 h-2 rounded-full bg-hiphop" />}
      </div>
      <div className="w-8 h-8 rounded-lg bg-bg-secondary flex items-center justify-center">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-[10px] text-text-secondary">{sublabel}</p>
      </div>
    </button>
  );
}
