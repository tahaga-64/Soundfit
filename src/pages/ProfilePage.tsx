import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Grid3x3, Bookmark, Heart, MessageCircle, UserPlus, UserCheck, Sliders, Plus, X, ImagePlus } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import type { Genre, User, UserPost } from '@/types';
import { posts as allPosts } from '@/data';
import { getSpotifyArtistId } from '@/data/spotifyIds';
import UserAvatar from '@/components/ui/UserAvatar';
import GenreBadge from '@/components/ui/GenreBadge';
import { SpotifyLink } from '@/components/ui/SpotifyButton';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { allGenres, genreDisplayNames, genreBgColors } from '@/utils/genreHelpers';
import { formatRelativeTime } from '@/utils/formatters';

export default function ProfilePage() {
  const { id } = useParams();
  const { currentUser, users, updateCurrentUser, toggleFollow } = useApp();
  const [showEdit, setShowEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showSameCulture, setShowSameCulture] = useState(false);
  const [showNewPost, setShowNewPost] = useState(false);
  const [selectedPost, setSelectedPost] = useState<UserPost | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts');

  // 表示するユーザーを決定
  const isOwnProfile = !id || id === currentUser.id;
  const profileUser = isOwnProfile ? currentUser : users.find(u => u.id === id) || currentUser;
  const isFollowing = currentUser.following.includes(profileUser.id);

  // ユーザーの投稿
  const userPosts = allPosts.filter(p => p.userId === profileUser.id);

  // 同じカルチャーのユーザー
  const sameCultureUsers = users.filter(u =>
    u.id !== profileUser.id && u.genres.some(g => profileUser.genres.includes(g))
  );

  return (
    <div className="animate-fade-in -mx-4">
      {/* Instagram風ヘッダー */}
      <div className="px-4 pt-4 pb-3">
        {/* ユーザー名 + 設定 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">{profileUser.name}</h2>
          <div className="flex items-center gap-2">
            {isOwnProfile && (
              <>
                <button onClick={() => setShowNewPost(true)} className="p-1.5 hover:bg-bg-card rounded-lg transition-colors">
                  <Plus size={22} />
                </button>
                <Link to="/settings" className="p-1.5 hover:bg-bg-card rounded-lg transition-colors">
                  <Sliders size={20} />
                </Link>
              </>
            )}
          </div>
        </div>

        {/* プロフィール行: アバター + 統計 */}
        <div className="flex items-center gap-5 mb-4">
          <UserAvatar src={profileUser.avatar} name={profileUser.name} size="lg" />
          <div className="flex-1 grid grid-cols-3 text-center">
            <div>
              <span className="font-bold block">{userPosts.length}</span>
              <span className="text-text-secondary text-[10px]">投稿</span>
            </div>
            <button onClick={() => setShowFollowers(true)}>
              <span className="font-bold block">{profileUser.followers.length}</span>
              <span className="text-text-secondary text-[10px]">フォロワー</span>
            </button>
            <button onClick={() => setShowFollowing(true)}>
              <span className="font-bold block">{profileUser.following.length}</span>
              <span className="text-text-secondary text-[10px]">フォロー中</span>
            </button>
          </div>
        </div>

        {/* 自己紹介 */}
        <div className="mb-3">
          <p className="text-sm">{profileUser.bio}</p>
          <div className="flex gap-1.5 mt-2 flex-wrap">
            {profileUser.genres.map(g => <GenreBadge key={g} genre={g} />)}
          </div>
        </div>

        {/* お気に入りアーティスト（横スクロール） */}
        {profileUser.favoriteArtists.length > 0 && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1 mb-3">
            {profileUser.favoriteArtists.map(a => {
              const spotifyId = getSpotifyArtistId(a);
              const spotifyUrl = spotifyId ? `https://open.spotify.com/artist/${spotifyId}` : undefined;
              return (
                <Link key={a} to={`/artist/${encodeURIComponent(a)}`} className="shrink-0 inline-flex items-center gap-1 text-[11px] bg-bg-card px-2.5 py-1 rounded-full hover:bg-border-primary transition-colors">
                  {a}
                  {spotifyUrl && <SpotifyLink url={spotifyUrl} size={10} />}
                </Link>
              );
            })}
          </div>
        )}

        {/* アクションボタン */}
        <div className="flex gap-2">
          {isOwnProfile ? (
            <>
              <Button variant="secondary" size="sm" onClick={() => setShowEdit(true)} className="flex-1">
                プロフィール編集
              </Button>
              <button onClick={() => setShowSameCulture(true)} className="bg-bg-card border border-border-primary rounded-lg px-3 text-xs font-semibold hover:bg-border-primary transition-colors">
                <UserPlus size={14} />
              </button>
            </>
          ) : (
            <>
              <Button variant={isFollowing ? 'secondary' : 'primary'} size="sm" onClick={() => toggleFollow(profileUser.id)} className="flex-1">
                {isFollowing ? <><UserCheck size={14} className="inline mr-1" />フォロー中</> : <><UserPlus size={14} className="inline mr-1" />フォロー</>}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* クイックリンク（ストーリーハイライト風） */}
      {isOwnProfile && (
        <div className="flex gap-4 px-4 py-3 overflow-x-auto scrollbar-hide">
          <QuickLink to="/profile/timeline" icon="🎵" label="音楽年表" />
          <QuickLink to="/profile/notes" icon="📝" label="メモ" />
          <QuickLink to="/marketplace" icon="🛍️" label="フリマ" />
          <QuickLink to="/games/badges" icon="🏆" label="バッジ" />
          <QuickLink to="/discover/ai-playlist" icon="✨" label="AI提案" />
        </div>
      )}

      {/* タブ切り替え */}
      <div className="flex border-t border-border-primary">
        <button
          onClick={() => setActiveTab('posts')}
          className={`flex-1 py-3 flex justify-center ${activeTab === 'posts' ? 'border-t-2 border-text-primary' : 'text-text-secondary'}`}
        >
          <Grid3x3 size={20} />
        </button>
        <button
          onClick={() => setActiveTab('saved')}
          className={`flex-1 py-3 flex justify-center ${activeTab === 'saved' ? 'border-t-2 border-text-primary' : 'text-text-secondary'}`}
        >
          <Bookmark size={20} />
        </button>
      </div>

      {/* 投稿グリッド */}
      {activeTab === 'posts' && (
        <div className="grid grid-cols-3 gap-0.5">
          {userPosts.length > 0 ? (
            userPosts.map(post => (
              <button key={post.id} onClick={() => setSelectedPost(post)} className="aspect-square overflow-hidden">
                <img src={post.imageUrl} alt="" className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
              </button>
            ))
          ) : (
            <div className="col-span-3 py-12 text-center text-text-secondary">
              <ImagePlus size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-sm">まだ投稿がありません</p>
              {isOwnProfile && <p className="text-xs mt-1">上部の＋ボタンから投稿してみよう</p>}
            </div>
          )}
        </div>
      )}

      {activeTab === 'saved' && (
        <div className="px-4 py-8 text-center text-text-secondary">
          <Bookmark size={32} className="mx-auto mb-2 opacity-50" />
          <p className="text-sm">保存した投稿はまだありません</p>
        </div>
      )}

      {/* 投稿詳細モーダル */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          users={users}
          onClose={() => setSelectedPost(null)}
        />
      )}

      {/* 新規投稿モーダル */}
      <NewPostModal isOpen={showNewPost} onClose={() => setShowNewPost(false)} />

      {/* プロフィール編集モーダル */}
      <EditProfileModal user={currentUser} isOpen={showEdit} onClose={() => setShowEdit(false)} onSave={updateCurrentUser} />

      {/* フォロワー一覧モーダル */}
      <UserListModal title="フォロワー" isOpen={showFollowers} onClose={() => setShowFollowers(false)} userIds={profileUser.followers} users={users} currentUser={currentUser} toggleFollow={toggleFollow} />
      <UserListModal title="フォロー中" isOpen={showFollowing} onClose={() => setShowFollowing(false)} userIds={profileUser.following} users={users} currentUser={currentUser} toggleFollow={toggleFollow} />
      <Modal isOpen={showSameCulture} onClose={() => setShowSameCulture(false)} title="同じカルチャーの仲間">
        <div className="space-y-3">
          {sameCultureUsers.map(u => (
            <Link key={u.id} to={`/profile/${u.id}`} onClick={() => setShowSameCulture(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg-card">
              <UserAvatar src={u.avatar} name={u.name} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{u.name}</p>
                <div className="flex gap-1">{u.genres.map(g => <GenreBadge key={g} genre={g} />)}</div>
              </div>
            </Link>
          ))}
        </div>
      </Modal>
    </div>
  );
}

// ストーリーハイライト風クイックリンク
function QuickLink({ to, icon, label }: { to: string; icon: string; label: string }) {
  return (
    <Link to={to} className="shrink-0 flex flex-col items-center gap-1">
      <div className="w-14 h-14 rounded-full bg-bg-card border border-border-primary flex items-center justify-center text-lg hover:border-text-secondary transition-colors">
        {icon}
      </div>
      <span className="text-[10px] text-text-secondary">{label}</span>
    </Link>
  );
}

// 投稿詳細モーダル
function PostDetailModal({ post, users, onClose }: { post: UserPost; users: User[]; onClose: () => void }) {
  const author = users.find(u => u.id === post.userId);
  const [liked, setLiked] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-bg-primary rounded-xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        {/* ヘッダー */}
        <div className="flex items-center gap-3 p-3 border-b border-border-primary">
          {author && <UserAvatar src={author.avatar} name={author.name} size="sm" />}
          <div className="flex-1">
            <p className="text-sm font-semibold">{author?.name}</p>
            <p className="text-[10px] text-text-secondary">{formatRelativeTime(post.timestamp)}</p>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary"><X size={20} /></button>
        </div>

        {/* 画像 */}
        <img src={post.imageUrl} alt="" className="w-full aspect-square object-cover" />

        {/* アクション */}
        <div className="p-3 space-y-2">
          <div className="flex items-center gap-4">
            <button onClick={() => setLiked(!liked)} className={`transition-colors ${liked ? 'text-rock' : 'text-text-secondary hover:text-text-primary'}`}>
              <Heart size={22} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <MessageCircle size={22} className="text-text-secondary" />
          </div>
          <p className="text-xs font-semibold">{post.likes + (liked ? 1 : 0)}件のいいね</p>
          <p className="text-sm"><span className="font-semibold mr-1.5">{author?.name}</span>{post.caption}</p>
          <div className="flex gap-1.5 flex-wrap">
            {post.tags.map(t => (
              <span key={t} className="text-[10px] text-edm">#{t}</span>
            ))}
          </div>
          {post.comments.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-border-primary">
              {post.comments.map((c, i) => {
                const commenter = users.find(u => u.id === c.userId);
                return (
                  <p key={i} className="text-xs">
                    <span className="font-semibold mr-1">{commenter?.name}</span>
                    {c.text}
                  </p>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// 新規投稿モーダル
function NewPostModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  const handlePost = () => {
    // デモ: 実際の投稿処理は未実装（localStorageに保存する形で拡張可能）
    alert('投稿しました！（デモ）');
    setCaption('');
    setTags('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="新規投稿">
      <div className="space-y-4">
        <div className="aspect-square bg-bg-secondary rounded-xl flex items-center justify-center cursor-pointer hover:bg-border-primary transition-colors">
          <div className="text-center text-text-secondary">
            <ImagePlus size={32} className="mx-auto mb-2" />
            <p className="text-xs">写真を選択</p>
          </div>
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">キャプション</label>
          <textarea
            value={caption}
            onChange={e => setCaption(e.target.value)}
            rows={3}
            placeholder="今日のライブの感想、お気に入りの曲について..."
            className="w-full bg-bg-card rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-hiphop resize-none"
          />
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">タグ（カンマ区切り）</label>
          <input
            value={tags}
            onChange={e => setTags(e.target.value)}
            placeholder="King Gnu, ライブ, ロック"
            className="w-full bg-bg-card rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-hiphop"
          />
        </div>
        <Button onClick={handlePost} className="w-full">投稿する</Button>
      </div>
    </Modal>
  );
}

// プロフィール編集モーダル
function EditProfileModal({ user, isOpen, onClose, onSave }: { user: User; isOpen: boolean; onClose: () => void; onSave: (u: Partial<User>) => void }) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [genres, setGenres] = useState<Genre[]>(user.genres);
  const [artists, setArtists] = useState(user.favoriteArtists.join(', '));

  const handleSave = () => {
    onSave({ name, bio, genres, favoriteArtists: artists.split(',').map(a => a.trim()).filter(Boolean) });
    onClose();
  };

  const toggleGenre = (g: Genre) => {
    setGenres(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="プロフィール編集">
      <div className="space-y-4">
        <div>
          <label className="text-xs text-text-secondary block mb-1">名前</label>
          <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-bg-card rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-hiphop" />
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">自己紹介</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full bg-bg-card rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-hiphop resize-none" />
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-2">好きなジャンル</label>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
            {allGenres.map(g => (
              <button key={g} onClick={() => toggleGenre(g)} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${genres.includes(g) ? `${genreBgColors[g]} text-black` : 'bg-bg-card text-text-secondary'}`}>
                {genreDisplayNames[g]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">好きなアーティスト（カンマ区切り）</label>
          <input value={artists} onChange={e => setArtists(e.target.value)} className="w-full bg-bg-card rounded-lg px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-hiphop" />
        </div>
        <Button onClick={handleSave} className="w-full">保存</Button>
      </div>
    </Modal>
  );
}

// ユーザーリストモーダル
function UserListModal({ title, isOpen, onClose, userIds, users, currentUser, toggleFollow }: { title: string; isOpen: boolean; onClose: () => void; userIds: string[]; users: User[]; currentUser: User; toggleFollow: (id: string) => void }) {
  const listUsers = users.filter(u => userIds.includes(u.id));
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-3">
        {listUsers.length === 0 && <p className="text-text-secondary text-sm text-center py-4">まだいません</p>}
        {listUsers.map(u => (
          <div key={u.id} className="flex items-center gap-3">
            <Link to={`/profile/${u.id}`} onClick={onClose} className="flex items-center gap-3 flex-1 min-w-0">
              <UserAvatar src={u.avatar} name={u.name} size="sm" />
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{u.name}</p>
                <div className="flex gap-1">{u.genres.map(g => <GenreBadge key={g} genre={g} />)}</div>
              </div>
            </Link>
            {u.id !== currentUser.id && (
              <Button size="sm" variant={currentUser.following.includes(u.id) ? 'secondary' : 'primary'} onClick={() => toggleFollow(u.id)}>
                {currentUser.following.includes(u.id) ? 'フォロー中' : 'フォロー'}
              </Button>
            )}
          </div>
        ))}
      </div>
    </Modal>
  );
}
