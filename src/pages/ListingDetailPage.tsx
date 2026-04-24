import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ArrowLeft, ChevronLeft, ChevronRight, Heart, Share2, Eye,
  Shield, Truck, MessageCircle, CheckCircle
} from 'lucide-react';
import { listings, users } from '@/data';
import type { ItemCondition, ShippingMethod } from '@/types';
import GenreBadge from '@/components/ui/GenreBadge';
import UserAvatar from '@/components/ui/UserAvatar';
import Modal from '@/components/ui/Modal';
import { formatPrice, formatDate } from '@/utils/formatters';

const conditionLabels: Record<ItemCondition, string> = {
  new: '新品・未使用',
  like_new: '未使用に近い',
  good: '目立った傷や汚れなし',
  fair: 'やや傷や汚れあり',
  poor: '傷や汚れあり',
  bad: '全体的に状態が悪い',
};

const shippingMethodLabels: Record<ShippingMethod, string> = {
  soundfit_easy: 'らくらくSoundfit便',
  soundfit_yu: 'ゆうゆうSoundfit便',
  standard_mail: '普通郵便',
  click_post: 'クリックポスト',
};

const paymentMethods = [
  { id: 'convenience', label: 'コンビニ払い', icon: '🏪' },
  { id: 'credit', label: 'クレジットカード', icon: '💳' },
  { id: 'points', label: 'Soundfitポイント', icon: '🎵' },
];

export default function ListingDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listing = listings.find(l => l.id === id);
  const [imgIndex, setImgIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('credit');

  if (!listing) {
    return (
      <div className="min-h-screen bg-[#FAFBFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm text-[#6B7280]">出品が見つかりません</p>
          <button onClick={() => navigate(-1)} className="mt-3 text-sm text-[#EF4444] hover:underline">
            戻る
          </button>
        </div>
      </div>
    );
  }

  const seller = users.find(u => u.id === listing.sellerId);
  const actualLikeCount = listing.likes + likeCount;

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: listing.title, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('リンクをコピーしました');
    }
  };

  const handlePurchase = () => {
    alert('購入が完了しました！（デモ）\nお支払い方法: ' + paymentMethods.find(p => p.id === selectedPayment)?.label);
    setShowPurchaseModal(false);
  };

  const prevImage = () => setImgIndex(prev => Math.max(0, prev - 1));
  const nextImage = () => setImgIndex(prev => Math.min(listing.images.length - 1, prev + 1));

  return (
    <div className="min-h-screen bg-[#FAFBFC] animate-fade-in">
      {/* Header bar */}
      <div className="sticky top-0 z-30 bg-[#FFFFFF] border-b border-[#E5E7EB]">
        <div className="flex items-center justify-between px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm font-medium text-[#1A1A2E]">商品詳細</span>
          <button onClick={handleShare} className="text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Image carousel */}
      <div className="relative bg-[#FFFFFF]">
        <img
          src={listing.images[imgIndex]}
          alt={listing.title}
          className="w-full aspect-square object-cover"
        />

        {/* Carousel arrows */}
        {listing.images.length > 1 && (
          <>
            {imgIndex > 0 && (
              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FFFFFF]/90 border border-[#E5E7EB] rounded-full flex items-center justify-center text-[#1A1A2E] shadow-sm hover:bg-[#FFFFFF] transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
            )}
            {imgIndex < listing.images.length - 1 && (
              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#FFFFFF]/90 border border-[#E5E7EB] rounded-full flex items-center justify-center text-[#1A1A2E] shadow-sm hover:bg-[#FFFFFF] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            )}

            {/* Dots */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {listing.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setImgIndex(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === imgIndex ? 'bg-[#1A1A2E]' : 'bg-[#1A1A2E]/25'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Image counter */}
        {listing.images.length > 1 && (
          <div className="absolute top-3 right-3 bg-black/50 text-white text-[10px] px-2 py-0.5 rounded-full">
            {imgIndex + 1}/{listing.images.length}
          </div>
        )}

        {/* SOLD overlay */}
        {listing.status === 'sold' && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="bg-[#1A1A2E] text-white text-xl font-bold px-8 py-2.5 rounded -rotate-12">
              SOLD
            </span>
          </div>
        )}
      </div>

      {/* Price + actions bar */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-2xl font-bold text-[#1A1A2E]">{formatPrice(listing.price)}</p>
            <p className="text-[10px] text-[#6B7280] mt-0.5">
              {listing.shippingPayer === 'seller' ? '税込（送料込み）' : '税込（送料別）'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Like button */}
            <button
              onClick={handleLike}
              className={`flex flex-col items-center gap-0.5 transition-colors ${
                isLiked ? 'text-[#EF4444]' : 'text-[#6B7280]'
              }`}
            >
              <Heart size={22} fill={isLiked ? '#EF4444' : 'none'} />
              <span className="text-[10px]">{actualLikeCount}</span>
            </button>

            {/* Views */}
            <div className="flex flex-col items-center gap-0.5 text-[#6B7280]">
              <Eye size={22} />
              <span className="text-[10px]">{listing.views}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Title + genre + date */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 py-4 space-y-2.5">
        <h1 className="text-base font-bold text-[#1A1A2E] leading-snug">{listing.title}</h1>
        <div className="flex items-center gap-2">
          <GenreBadge genre={listing.genre} size="md" />
          <span className="text-xs text-[#6B7280]">{formatDate(listing.createdAt)}</span>
        </div>
      </div>

      {/* Sold message */}
      {listing.status === 'sold' && (
        <div className="bg-[#FEF2F2] border-b border-[#E5E7EB] px-4 py-3">
          <p className="text-sm text-[#EF4444] font-semibold text-center">
            この商品は売り切れです
          </p>
        </div>
      )}

      {/* Condition + shipping info section */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 py-4 space-y-3">
        <h3 className="text-xs font-bold text-[#1A1A2E]">商品の情報</h3>

        {/* Info rows */}
        <div className="divide-y divide-[#E5E7EB]">
          {/* Condition */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs text-[#6B7280]">商品の状態</span>
            <span className="text-xs font-medium text-[#1A1A2E]">{conditionLabels[listing.condition]}</span>
          </div>

          {/* Shipping payer */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs text-[#6B7280]">配送料の負担</span>
            <span className={`text-xs font-medium ${
              listing.shippingPayer === 'seller' ? 'text-[#EF4444]' : 'text-[#1A1A2E]'
            }`}>
              {listing.shippingPayer === 'seller' ? '送料込み（出品者負担）' : '着払い（購入者負担）'}
            </span>
          </div>

          {/* Shipping method */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs text-[#6B7280]">配送の方法</span>
            <span className="text-xs font-medium text-[#1A1A2E]">{shippingMethodLabels[listing.shippingMethod]}</span>
          </div>

          {/* Anonymous shipping */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs text-[#6B7280]">匿名配送</span>
            <span className={`text-xs font-medium ${
              listing.isAnonymousShipping ? 'text-[#EF4444]' : 'text-[#6B7280]'
            }`}>
              {listing.isAnonymousShipping ? '対応' : '非対応'}
            </span>
          </div>

          {/* Shipping cost */}
          <div className="flex items-center justify-between py-2.5">
            <span className="text-xs text-[#6B7280]">配送料</span>
            <span className="text-xs font-medium text-[#1A1A2E]">
              {listing.shippingPayer === 'seller' ? '送料込み' : formatPrice(listing.shippingCost)}
            </span>
          </div>
        </div>
      </div>

      {/* Description section */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 py-4 space-y-2.5">
        <h3 className="text-xs font-bold text-[#1A1A2E]">商品の説明</h3>
        <p className="text-sm text-[#1A1A2E] leading-relaxed whitespace-pre-wrap">
          {listing.description}
        </p>
      </div>

      {/* Seller info card */}
      {seller && (
        <div className="bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 py-4">
          <h3 className="text-xs font-bold text-[#1A1A2E] mb-3">出品者</h3>
          <Link
            to={`/profile/${seller.id}`}
            className="flex items-center gap-3 group"
          >
            <UserAvatar src={seller.avatar} name={seller.name} size="md" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1A1A2E] group-hover:text-[#EF4444] transition-colors">
                {seller.name}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                {/* Ratings-style display */}
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(star => (
                    <span key={star} className={`text-xs ${star <= 4 ? 'text-[#FBBF24]' : 'text-[#E5E7EB]'}`}>
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-[10px] text-[#6B7280]">
                  {seller.followers.length}フォロワー
                </span>
              </div>
              <p className="text-[10px] text-[#6B7280] mt-0.5 truncate">{seller.bio}</p>
            </div>
            <ChevronRight size={16} className="text-[#E5E7EB] shrink-0" />
          </Link>
        </div>
      )}

      {/* Trust & safety section */}
      <div className="bg-[#FFFFFF] border-b border-[#E5E7EB] px-4 py-4 space-y-3">
        <h3 className="text-xs font-bold text-[#1A1A2E]">安心・安全への取り組み</h3>

        <div className="space-y-3">
          {/* Escrow payment */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#FAFBFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center shrink-0">
              <Shield size={16} className="text-[#EF4444]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1A2E]">Soundfitあんしん決済</p>
              <p className="text-[10px] text-[#6B7280] leading-relaxed mt-0.5">
                お金は一旦Soundfitがお預かり。届いた商品を確認してから出品者に振り込まれるので安心です。
              </p>
            </div>
          </div>

          {/* Anonymous shipping */}
          {listing.isAnonymousShipping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-[#FAFBFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center shrink-0">
                <Truck size={16} className="text-[#EF4444]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[#1A1A2E]">匿名配送対応</p>
                <p className="text-[10px] text-[#6B7280] leading-relaxed mt-0.5">
                  お互いの住所・氏名を伝えずに取引できます。
                </p>
              </div>
            </div>
          )}

          {/* 24h support */}
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#FAFBFC] border border-[#E5E7EB] rounded-lg flex items-center justify-center shrink-0">
              <MessageCircle size={16} className="text-[#EF4444]" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#1A1A2E]">24時間カスタマーサポート</p>
              <p className="text-[10px] text-[#6B7280] leading-relaxed mt-0.5">
                お取引で困ったことがあっても、24時間体制のサポートチームが対応します。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacer for fixed button */}
      <div className="h-24" />

      {/* Fixed bottom purchase bar */}
      {listing.status === 'available' && (
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF] border-t border-[#E5E7EB] px-4 py-3 safe-area-bottom">
          <div className="max-w-lg mx-auto flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center transition-all shrink-0 ${
                isLiked
                  ? 'border-[#EF4444] text-[#EF4444] bg-[#FEF2F2]'
                  : 'border-[#E5E7EB] text-[#6B7280] bg-[#FFFFFF] hover:border-[#6B7280]'
              }`}
            >
              <Heart size={20} fill={isLiked ? '#EF4444' : 'none'} />
            </button>
            <button
              onClick={() => setShowPurchaseModal(true)}
              className="flex-1 bg-[#EF4444] text-white font-bold text-base py-3.5 rounded-lg hover:bg-[#DC2626] active:scale-[0.98] transition-all"
            >
              購入手続きへ
            </button>
          </div>
        </div>
      )}

      {/* Purchase confirmation modal */}
      <Modal isOpen={showPurchaseModal} onClose={() => setShowPurchaseModal(false)} title="購入手続き">
        <div className="space-y-5">
          {/* Item summary */}
          <div className="flex gap-3 p-3 bg-[#FAFBFC] rounded-lg border border-[#E5E7EB]">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-16 h-16 rounded-lg object-cover shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-[#1A1A2E] line-clamp-2 leading-snug">{listing.title}</p>
              <p className="text-base font-bold text-[#1A1A2E] mt-1">{formatPrice(listing.price)}</p>
              <p className="text-[10px] text-[#6B7280]">
                {listing.shippingPayer === 'seller' ? '送料込み' : `+ 送料 ${formatPrice(listing.shippingCost)}`}
              </p>
            </div>
          </div>

          {/* Payment method selector */}
          <div>
            <h4 className="text-xs font-bold text-[#1A1A2E] mb-2">支払い方法</h4>
            <div className="space-y-2">
              {paymentMethods.map(method => (
                <button
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all text-left ${
                    selectedPayment === method.id
                      ? 'border-[#EF4444] bg-[#FEF2F2]'
                      : 'border-[#E5E7EB] bg-[#FFFFFF] hover:border-[#6B7280]'
                  }`}
                >
                  <span className="text-lg">{method.icon}</span>
                  <span className="text-sm text-[#1A1A2E] font-medium">{method.label}</span>
                  {selectedPayment === method.id && (
                    <CheckCircle size={16} className="text-[#EF4444] ml-auto" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Shipping address placeholder */}
          <div>
            <h4 className="text-xs font-bold text-[#1A1A2E] mb-2">配送先</h4>
            <div className="px-4 py-3 bg-[#FAFBFC] border border-[#E5E7EB] rounded-lg">
              <p className="text-xs text-[#6B7280]">〒100-0001</p>
              <p className="text-sm text-[#1A1A2E]">東京都千代田区千代田1-1</p>
              <p className="text-xs text-[#6B7280] mt-0.5">山田 太郎（デモ）</p>
            </div>
          </div>

          {/* Order summary */}
          <div className="space-y-2 border-t border-[#E5E7EB] pt-3">
            <div className="flex justify-between text-xs text-[#6B7280]">
              <span>商品代金</span>
              <span>{formatPrice(listing.price)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#6B7280]">
              <span>配送料</span>
              <span>{listing.shippingPayer === 'seller' ? '¥0' : formatPrice(listing.shippingCost)}</span>
            </div>
            <div className="flex justify-between text-sm font-bold text-[#1A1A2E] border-t border-[#E5E7EB] pt-2">
              <span>支払い金額</span>
              <span className="text-[#EF4444]">
                {formatPrice(listing.price + (listing.shippingPayer === 'buyer' ? listing.shippingCost : 0))}
              </span>
            </div>
          </div>

          {/* Confirm button */}
          <button
            onClick={handlePurchase}
            className="w-full bg-[#EF4444] text-white font-bold text-base py-3.5 rounded-lg hover:bg-[#DC2626] active:scale-[0.98] transition-all"
          >
            購入を確定する
          </button>

          {/* Disclaimer */}
          <p className="text-[10px] text-[#6B7280] text-center leading-relaxed">
            「購入を確定する」を押すと、利用規約に同意したものとみなされます。
            お支払い後、出品者が商品を発送します。
          </p>
        </div>
      </Modal>
    </div>
  );
}
