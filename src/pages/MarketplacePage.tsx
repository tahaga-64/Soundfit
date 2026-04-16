import { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, Heart, Eye, Plus, X, ChevronDown, Package, Camera } from 'lucide-react';
import { listings, users } from '@/data';
import type { ItemCondition, ShippingMethod } from '@/types';
import TabBar from '@/components/ui/TabBar';
import GenreBadge from '@/components/ui/GenreBadge';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import UserAvatar from '@/components/ui/UserAvatar';
import { formatPrice } from '@/utils/formatters';

const categoryTabs = ['すべて', 'グッズ', '古着', 'レコード', 'チケット', 'その他'];
const categoryMap: Record<string, string> = {
  'グッズ': 'goods', '古着': 'clothing', 'レコード': 'vinyl', 'チケット': 'ticket', 'その他': 'other',
};

const sortOptions = [
  { label: '新着順', value: 'newest' },
  { label: '価格が安い順', value: 'price_asc' },
  { label: 'いいね順', value: 'likes' },
] as const;

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

type SortValue = typeof sortOptions[number]['value'];

export default function MarketplacePage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('すべて');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState<SortValue>('newest');
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [showNewListing, setShowNewListing] = useState(false);

  // New listing form state (demo)
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('goods');
  const [newCondition, setNewCondition] = useState<ItemCondition>('good');
  const [newShippingMethod, setNewShippingMethod] = useState<ShippingMethod>('soundfit_easy');
  const [newShippingPayer, setNewShippingPayer] = useState<'seller' | 'buyer'>('seller');

  const filtered = useMemo(() => {
    let result = filter === 'すべて'
      ? [...listings]
      : listings.filter(l => l.category === categoryMap[filter]);

    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(l =>
        l.title.toLowerCase().includes(q) || l.description.toLowerCase().includes(q)
      );
    }

    switch (sort) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'likes':
        result.sort((a, b) => b.likes - a.likes);
        break;
    }

    return result;
  }, [filter, search, sort]);

  const currentSortLabel = sortOptions.find(o => o.value === sort)!.label;

  const handleSubmitListing = () => {
    alert('出品が完了しました！（デモ）');
    setShowNewListing(false);
    setNewTitle('');
    setNewDescription('');
    setNewPrice('');
    setNewCategory('goods');
    setNewCondition('good');
    setNewShippingMethod('soundfit_easy');
    setNewShippingPayer('seller');
  };

  return (
    <div className="min-h-screen bg-[#FAFBFC]">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-[#FFFFFF] border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3 px-4 py-3">
          <button onClick={() => navigate(-1)} className="text-[#6B7280] hover:text-[#1A1A2E] transition-colors">
            <ArrowLeft size={20} />
          </button>
          <h2 className="text-lg font-bold text-[#1A1A2E]">フリマ</h2>
        </div>

        {/* Search bar */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" />
            <input
              type="text"
              placeholder="商品名・説明で検索"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 bg-[#FAFBFC] border border-[#E5E7EB] rounded-lg text-sm text-[#1A1A2E] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#E5E7EB] focus:border-transparent"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A2E]">
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Category tabs */}
        <TabBar tabs={categoryTabs} activeTab={filter} onTabChange={setFilter} />
      </div>

      {/* Content */}
      <div className="px-4 py-3 space-y-3 animate-fade-in">
        {/* Sort + count row */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#6B7280]">{filtered.length}件の商品</span>
          <div className="relative">
            <button
              onClick={() => setShowSortMenu(!showSortMenu)}
              className="flex items-center gap-1 text-xs text-[#6B7280] hover:text-[#1A1A2E] bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg px-3 py-1.5 transition-colors"
            >
              {currentSortLabel}
              <ChevronDown size={14} className={`transition-transform ${showSortMenu ? 'rotate-180' : ''}`} />
            </button>
            {showSortMenu && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowSortMenu(false)} />
                <div className="absolute right-0 top-full mt-1 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg shadow-lg z-20 min-w-[150px] overflow-hidden">
                  {sortOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => { setSort(opt.value); setShowSortMenu(false); }}
                      className={`block w-full text-left px-4 py-2.5 text-xs transition-colors ${
                        sort === opt.value
                          ? 'text-[#EF4444] font-semibold bg-[#FAFBFC]'
                          : 'text-[#6B7280] hover:bg-[#FAFBFC]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* 2-column product grid */}
        <div className="grid grid-cols-2 gap-2.5">
          {filtered.map(item => {
            const seller = users.find(u => u.id === item.sellerId);
            return (
              <Link
                key={item.id}
                to={`/marketplace/${item.id}`}
                className="bg-[#FFFFFF] rounded-lg overflow-hidden border border-[#E5E7EB] hover:shadow-md transition-all group"
              >
                {/* Image container */}
                <div className="relative">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full aspect-square object-cover"
                  />

                  {/* SOLD overlay */}
                  {item.status === 'sold' && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="bg-[#1A1A2E] text-white text-sm font-bold px-6 py-1.5 rounded -rotate-12">
                        SOLD
                      </span>
                    </div>
                  )}

                  {/* Shipping badge - top left */}
                  <div className="absolute top-1.5 left-1.5">
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded ${
                      item.shippingPayer === 'seller'
                        ? 'bg-[#EF4444] text-white'
                        : 'bg-[#FFFFFF]/90 text-[#6B7280] border border-[#E5E7EB]'
                    }`}>
                      {item.shippingPayer === 'seller' ? '送料込み' : '送料別'}
                    </span>
                  </div>

                  {/* Like count - bottom right of image */}
                  <div className="absolute bottom-1.5 right-1.5 flex items-center gap-0.5 bg-black/50 text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    <Heart size={10} />
                    {item.likes}
                  </div>
                </div>

                {/* Card info */}
                <div className="p-2.5 space-y-1">
                  {/* Title - truncated to 2 lines */}
                  <h3 className="text-[13px] text-[#1A1A2E] leading-tight line-clamp-2 min-h-[2.4em]">
                    {item.title}
                  </h3>

                  {/* Price */}
                  <p className="text-[15px] font-bold text-[#1A1A2E]">{formatPrice(item.price)}</p>

                  {/* Condition badge + Genre badge row */}
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="text-[9px] text-[#6B7280] bg-[#FAFBFC] border border-[#E5E7EB] rounded px-1.5 py-0.5 truncate max-w-full">
                      {conditionLabels[item.condition]}
                    </span>
                  </div>

                  {/* Genre + stats row */}
                  <div className="flex items-center justify-between pt-0.5">
                    <GenreBadge genre={item.genre} />
                    <div className="flex items-center gap-1.5 text-[10px] text-[#6B7280]">
                      <span className="flex items-center gap-0.5">
                        <Eye size={10} />
                        {item.views}
                      </span>
                    </div>
                  </div>

                  {/* Seller row */}
                  {seller && (
                    <div className="flex items-center gap-1.5 pt-1.5 border-t border-[#E5E7EB]">
                      <UserAvatar src={seller.avatar} name={seller.name} size="sm" />
                      <span className="text-[10px] text-[#6B7280] truncate">{seller.name}</span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Package size={48} className="mx-auto text-[#E5E7EB] mb-4" />
            <p className="text-sm text-[#6B7280] mb-1">商品が見つかりませんでした</p>
            <p className="text-xs text-[#6B7280]">検索条件を変更してお試しください</p>
          </div>
        )}

        {/* Bottom spacer for FAB */}
        <div className="h-20" />
      </div>

      {/* Floating action button */}
      <button
        onClick={() => setShowNewListing(true)}
        className="fixed bottom-24 right-5 z-50 w-14 h-14 bg-[#EF4444] text-white rounded-full shadow-lg shadow-[#EF4444]/30 flex items-center justify-center hover:bg-[#DC2626] active:scale-95 transition-all"
        aria-label="出品する"
      >
        <Plus size={28} />
      </button>

      {/* New Listing Modal */}
      <Modal isOpen={showNewListing} onClose={() => setShowNewListing(false)} title="出品する">
        <div className="space-y-5">
          {/* Images placeholder */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-2">商品画像</label>
            <div className="flex gap-2.5">
              {[1, 2, 3, 4].map(i => (
                <div
                  key={i}
                  className="w-[72px] h-[72px] bg-[#FAFBFC] border-2 border-dashed border-[#E5E7EB] rounded-lg flex flex-col items-center justify-center text-[#6B7280] hover:border-[#EF4444] hover:text-[#EF4444] cursor-pointer transition-colors gap-0.5"
                >
                  <Camera size={18} />
                  {i === 1 && <span className="text-[8px]">必須</span>}
                </div>
              ))}
            </div>
            <p className="text-[10px] text-[#6B7280] mt-1.5">最大10枚まで（1枚目がサムネイルになります）</p>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">商品名 <span className="text-[#EF4444]">*</span></label>
            <input
              type="text"
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              placeholder="商品名を入力"
              maxLength={40}
              className="w-full px-3 py-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-[#1A1A2E] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444]"
            />
            <p className="text-[10px] text-[#6B7280] text-right mt-1">{newTitle.length}/40</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">商品の説明</label>
            <textarea
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="商品の状態、購入時期、使用回数など詳しく記載すると売れやすくなります"
              rows={5}
              className="w-full px-3 py-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-[#1A1A2E] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] resize-none"
            />
            <p className="text-[10px] text-[#6B7280] text-right mt-1">{newDescription.length}/1000</p>
          </div>

          {/* Category */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">カテゴリー <span className="text-[#EF4444]">*</span></label>
            <select
              value={newCategory}
              onChange={e => setNewCategory(e.target.value)}
              className="w-full px-3 py-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] appearance-none"
            >
              <option value="goods">グッズ</option>
              <option value="clothing">古着</option>
              <option value="vinyl">レコード</option>
              <option value="ticket">チケット</option>
              <option value="other">その他</option>
            </select>
          </div>

          {/* Condition */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">商品の状態 <span className="text-[#EF4444]">*</span></label>
            <select
              value={newCondition}
              onChange={e => setNewCondition(e.target.value as ItemCondition)}
              className="w-full px-3 py-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] appearance-none"
            >
              {Object.entries(conditionLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">販売価格 <span className="text-[#EF4444]">*</span></label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-bold text-[#1A1A2E]">¥</span>
              <input
                type="number"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                placeholder="300 ~ 9,999,999"
                min={300}
                max={9999999}
                className="w-full pl-8 pr-3 py-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-[#1A1A2E] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444]"
              />
            </div>
            {newPrice && Number(newPrice) >= 300 && (
              <div className="mt-1.5 flex justify-between text-[10px] text-[#6B7280]">
                <span>販売手数料（10%）</span>
                <span>-¥{Math.floor(Number(newPrice) * 0.1).toLocaleString()}</span>
              </div>
            )}
            {newPrice && Number(newPrice) >= 300 && (
              <div className="flex justify-between text-[11px] font-semibold text-[#1A1A2E]">
                <span>販売利益</span>
                <span>¥{Math.floor(Number(newPrice) * 0.9).toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Shipping payer */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">配送料の負担 <span className="text-[#EF4444]">*</span></label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setNewShippingPayer('seller')}
                className={`flex-1 py-2.5 text-xs font-medium rounded-lg border-2 transition-all ${
                  newShippingPayer === 'seller'
                    ? 'bg-[#EF4444]/5 text-[#EF4444] border-[#EF4444]'
                    : 'bg-[#FFFFFF] text-[#6B7280] border-[#E5E7EB] hover:border-[#6B7280]'
                }`}
              >
                送料込み（出品者負担）
              </button>
              <button
                type="button"
                onClick={() => setNewShippingPayer('buyer')}
                className={`flex-1 py-2.5 text-xs font-medium rounded-lg border-2 transition-all ${
                  newShippingPayer === 'buyer'
                    ? 'bg-[#EF4444]/5 text-[#EF4444] border-[#EF4444]'
                    : 'bg-[#FFFFFF] text-[#6B7280] border-[#E5E7EB] hover:border-[#6B7280]'
                }`}
              >
                着払い（購入者負担）
              </button>
            </div>
          </div>

          {/* Shipping method */}
          <div>
            <label className="block text-xs font-semibold text-[#1A1A2E] mb-1.5">配送の方法 <span className="text-[#EF4444]">*</span></label>
            <select
              value={newShippingMethod}
              onChange={e => setNewShippingMethod(e.target.value as ShippingMethod)}
              className="w-full px-3 py-2.5 bg-[#FFFFFF] border border-[#E5E7EB] rounded-lg text-sm text-[#1A1A2E] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 focus:border-[#EF4444] appearance-none"
            >
              {Object.entries(shippingMethodLabels).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>

          {/* Submit button */}
          <Button
            className="w-full !bg-[#EF4444] !text-white hover:!bg-[#DC2626] !py-3 !text-base"
            onClick={handleSubmitListing}
            disabled={!newTitle.trim() || !newPrice || Number(newPrice) < 300}
          >
            出品する
          </Button>
        </div>
      </Modal>
    </div>
  );
}
