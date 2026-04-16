import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, MessageCircle, UserPlus, UserCheck, Sliders, Plus, X, ImagePlus, Music, Award, ShoppingBag, Sparkles, BookOpen, Eye } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import type { Genre, User, UserPost } from '@/types';
import { posts as allPosts } from '@/data';
import { getSpotifyArtistUrl } from '@/data/spotifyIds';
import UserAvatar from '@/components/ui/UserAvatar';
import GenreBadge from '@/components/ui/GenreBadge';
import { SpotifyLink } from '@/components/ui/SpotifyButton';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import { allGenres, genreDisplayNames, genreBgColors, genreHexColors } from '@/utils/genreHelpers';
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

  const isOwnProfile = !id || id === currentUser.id;
  const profileUser = isOwnProfile ? currentUser : users.find(u => u.id === id) || currentUser;
  const isFollowing = currentUser.following.includes(profileUser.id);
  const userPosts = allPosts.filter(p => p.userId === profileUser.id);
  const sameCultureUsers = users.filter(u =>
    u.id !== profileUser.id && u.genres.some(g => profileUser.genres.includes(g))
  );
  const primaryGenre = profileUser.genres[0] || 'hiphop';
  const primaryColor = genreHexColors[primaryGenre];

  return (
    <div className="animate-fade-in -mx-4 -mt-4">
      {/* ジャンルグラデーションバナー */}
      <div
        className="relative h-36 rounded-b-3xl"
        style={{ background: `linear-gradient(135deg, ${primaryColor}44 0%, ${primaryColor}22 50%, ${genreHexColors[profileUser.genres[1] || primaryGenre]}33 100%)` }}
      >
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {isOwnProfile && (
            <>
              <button onClick={() => setShowNewPost(true)} className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                <Plus size={18} className="text-text-primary" />
              </button>
              <Link to="/settings" className="p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm hover:bg-white transition-colors">
                <Sliders size={16} className="text-text-primary" />
              </Link>
            </>
          )}
        </div>
        {/* アバター */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-20 h-20 rounded-full ring-4 ring-white shadow-lg overflow-hidden">
            <img src={profileUser.avatar} alt={profileUser.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </div>

      <div className="px-4 pt-14 space-y-5">
        {/* 名前 + 自己紹介 */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold">{profileUser.name}</h2>
          <p className="text-sm text-text-secondary">{profileUser.bio}</p>
        </div>

        {/* ステータスピル */}
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setShowFollowers(true)} className="bg-bg-card border border-border-primary rounded-full px-3 py-1 text-xs shadow-sm hover:shadow transition-shadow">
            <span className="font-bold">{profileUser.followers.length}</span> <span className="text-text-secondary">フォロワー</span>
          </button>
          <button onClick={() => setShowFollowing(true)} className="bg-bg-card border border-border-primary rounded-full px-3 py-1 text-xs shadow-sm hover:shadow transition-shadow">
            <span className="font-bold">{profileUser.following.length}</span> <span className="text-text-secondary">フォロー中</span>
          </button>
          <span className="bg-bg-card border border-border-primary rounded-full px-3 py-1 text-xs shadow-sm">
            <span className="font-bold">{userPosts.length}</span> <span className="text-text-secondary">投稿</span>
          </span>
        </div>

        {/* アクションボタン */}
        <div className="flex gap-2 justify-center">
          {isOwnProfile ? (
            <>
              <Button variant="secondary" size="sm" onClick={() => setShowEdit(true)}>プロフィール編集</Button>
              <button onClick={() => setShowSameCulture(true)} className="bg-bg-card border border-border-primary rounded-lg px-3 py-1.5 text-xs font-semibold hover:shadow transition-shadow flex items-center gap-1">
                <UserPlus size={14} /> 仲間を探す
              </button>
            </>
          ) : (
            <Button variant={isFollowing ? 'secondary' : 'primary'} size="sm" onClick={() => toggleFollow(profileUser.id)}>
              {isFollowing ? <><UserCheck size={14} className="inline mr-1" />フォロー中</> : <><UserPlus size={14} className="inline mr-1" />フォロー</>}
            </Button>
          )}
        </div>

        {/* Music DNA バー */}
        {profileUser.genres.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Music DNA</h3>
            <div className="flex rounded-full overflow-hidden h-3 shadow-inner">
              {profileUser.genres.map(g => (
                <div
                  key={g}
                  className="flex-1 transition-all"
                  style={{ backgroundColor: genreHexColors[g] }}
                  title={genreDisplayNames[g]}
                />
              ))}
            </div>
            <div className="flex gap-1.5 flex-wrap">
              {profileUser.genres.map(g => <GenreBadge key={g} genre={g} />)}
            </div>
          </div>
        )}

        {/* お気に入りアーティスト */}
        {profileUser.favoriteArtists.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Favorite Artists</h3>
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
              {profileUser.favoriteArtists.map(a => {
                const spotifyUrl = getSpotifyArtistUrl(a);
                return (
                  <Link key={a} to={`/artist/${encodeURIComponent(a)}`} className="shrink-0 flex items-center gap-1.5 bg-bg-card border border-border-primary px-3 py-1.5 rounded-full text-xs font-medium shadow-sm hover:shadow transition-shadow">
                    {a}
                    <SpotifyLink url={spotifyUrl} size={12} />
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* クイックリンク */}
        {isOwnProfile && (
          <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1 -mx-1 px-1">
            <QuickPill to="/profile/timeline" icon={<Music size={14} />} label="音楽年表" color={genreHexColors.edm} />
            <QuickPill to="/profile/notes" icon={<BookOpen size={14} />} label="メモ" color={genreHexColors.jazz} />
            <QuickPill to="/marketplace" icon={<ShoppingBag size={14} />} label="フリマ" color={genreHexColors.punk} />
            <QuickPill to="/games/badges" icon={<Award size={14} />} label="バッジ" color={genreHexColors.hiphop} />
            <QuickPill to="/discover/ai-playlist" icon={<Sparkles size={14} />} label="AI提案" color={genreHexColors.visualkei} />
          </div>
        )}

        {/* 投稿セクション */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-text-secondary uppercase tracking-wider">Posts</h3>
          {userPosts.length > 0 ? (
            <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-1 px-1">
              {userPosts.map(post => (
                <button key={post.id} onClick={() => setSelectedPost(post)} className="shrink-0 w-40 bg-bg-card border border-border-primary rounded-xl overflow-hidden shadow-sm hover:shadow transition-shadow text-left">
                  <img src={post.imageUrl} alt="" className="w-40 h-32 object-cover" />
                  <div className="p-2 space-y-1">
                    <p className="text-xs line-clamp-2">{post.caption}</p>
                    <div className="flex items-center gap-2 text-[10px] text-text-secondary">
                      <span className="flex items-center gap-0.5"><Heart size={10} />{post.likes}</span>
                      <span className="flex items-center gap-0.5"><MessageCircle size={10} />{post.comments.length}</span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="bg-bg-card border border-border-primary rounded-xl p-8 text-center shadow-sm">
              <ImagePlus size={28} className="mx-auto mb-2 text-text-secondary opacity-50" />
              <p className="text-sm text-text-secondary">まだ投稿がありません</p>
              {isOwnProfile && <p className="text-xs text-text-secondary mt-1">上部の＋ボタンから投稿してみよう</p>}
            </div>
          )}
        </div>
      </div>

      {/* 投稿詳細モーダル */}
      {selectedPost && <PostDetailModal post={selectedPost} users={users} onClose={() => setSelectedPost(null)} />}

      {/* 新規投稿モーダル */}
      <NewPostModal isOpen={showNewPost} onClose={() => setShowNewPost(false)} />

      {/* プロフィール編集モーダル */}
      <EditProfileModal user={currentUser} isOpen={showEdit} onClose={() => setShowEdit(false)} onSave={updateCurrentUser} />

      {/* フォロワー一覧 */}
      <UserListModal title="フォロワー" isOpen={showFollowers} onClose={() => setShowFollowers(false)} userIds={profileUser.followers} users={users} currentUser={currentUser} toggleFollow={toggleFollow} />
      <UserListModal title="フォロー中" isOpen={showFollowing} onClose={() => setShowFollowing(false)} userIds={profileUser.following} users={users} currentUser={currentUser} toggleFollow={toggleFollow} />
      <Modal isOpen={showSameCulture} onClose={() => setShowSameCulture(false)} title="同じカルチャーの仲間">
        <div className="space-y-3">
          {sameCultureUsers.map(u => (
            <Link key={u.id} to={`/profile/${u.id}`} onClick={() => setShowSameCulture(false)} className="flex items-center gap-3 p-2 rounded-lg hover:bg-bg-secondary">
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

function QuickPill({ to, icon, label, color }: { to: string; icon: React.ReactNode; label: string; color: string }) {
  return (
    <Link to={to} className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold shadow-sm hover:shadow transition-shadow border" style={{ backgroundColor: color + '15', borderColor: color + '40', color }}>
      {icon}{label}
    </Link>
  );
}

function PostDetailModal({ post, users, onClose }: { post: UserPost; users: User[]; onClose: () => void }) {
  const author = users.find(u => u.id === post.userId);
  const [liked, setLiked] = useState(false);

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-bg-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-xl border border-border-primary" onClick={e => e.stopPropagation()}>
        <div className="flex items-center gap-3 p-3 border-b border-border-primary">
          {author && <UserAvatar src={author.avatar} name={author.name} size="sm" />}
          <div className="flex-1">
            <p className="text-sm font-semibold">{author?.name}</p>
            <p className="text-[10px] text-text-secondary">{formatRelativeTime(post.timestamp)}</p>
          </div>
          <button onClick={onClose} className="text-text-secondary hover:text-text-primary"><X size={20} /></button>
        </div>
        <img src={post.imageUrl} alt="" className="w-full aspect-square object-cover" />
        <div className="p-4 space-y-3">
          <div className="flex items-center gap-4">
            <button onClick={() => setLiked(!liked)} className={`transition-colors ${liked ? 'text-rock' : 'text-text-secondary hover:text-text-primary'}`}>
              <Heart size={22} fill={liked ? 'currentColor' : 'none'} />
            </button>
            <MessageCircle size={22} className="text-text-secondary" />
          </div>
          <p className="text-xs font-semibold">{post.likes + (liked ? 1 : 0)}件のいいね</p>
          <p className="text-sm"><span className="font-semibold mr-1.5">{author?.name}</span>{post.caption}</p>
          <div className="flex gap-1.5 flex-wrap">
            {post.tags.map(t => <span key={t} className="text-[10px] text-edm">#{t}</span>)}
          </div>
          {post.comments.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-border-primary">
              {post.comments.map((c, i) => {
                const commenter = users.find(u => u.id === c.userId);
                return (
                  <p key={i} className="text-xs">
                    <span className="font-semibold mr-1">{commenter?.name}</span>{c.text}
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

function NewPostModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [caption, setCaption] = useState('');
  const [tags, setTags] = useState('');

  if (!isOpen) return null;

  const handlePost = () => {
    alert('投稿しました！（デモ）');
    setCaption('');
    setTags('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="新規投稿">
      <div className="space-y-4">
        <div className="aspect-square bg-bg-secondary rounded-xl flex items-center justify-center cursor-pointer hover:bg-border-primary transition-colors border-2 border-dashed border-border-primary">
          <div className="text-center text-text-secondary">
            <ImagePlus size={32} className="mx-auto mb-2" />
            <p className="text-xs">写真を選択</p>
          </div>
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">キャプション</label>
          <textarea value={caption} onChange={e => setCaption(e.target.value)} rows={3} placeholder="今日のライブの感想、お気に入りの曲について..." className="w-full bg-bg-secondary border border-border-primary rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-hiphop/30 resize-none" />
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">タグ（カンマ区切り）</label>
          <input value={tags} onChange={e => setTags(e.target.value)} placeholder="King Gnu, ライブ, ロック" className="w-full bg-bg-secondary border border-border-primary rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-hiphop/30" />
        </div>
        <Button onClick={handlePost} className="w-full">投稿する</Button>
      </div>
    </Modal>
  );
}

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
          <input value={name} onChange={e => setName(e.target.value)} className="w-full bg-bg-secondary border border-border-primary rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-hiphop/30" />
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">自己紹介</label>
          <textarea value={bio} onChange={e => setBio(e.target.value)} rows={3} className="w-full bg-bg-secondary border border-border-primary rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-hiphop/30 resize-none" />
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-2">好きなジャンル</label>
          <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto">
            {allGenres.map(g => (
              <button key={g} onClick={() => toggleGenre(g)} className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${genres.includes(g) ? `${genreBgColors[g]} text-white border-transparent shadow-sm` : 'bg-bg-secondary text-text-secondary border-border-primary'}`}>
                {genreDisplayNames[g]}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-xs text-text-secondary block mb-1">好きなアーティスト（カンマ区切り）</label>
          <input value={artists} onChange={e => setArtists(e.target.value)} className="w-full bg-bg-secondary border border-border-primary rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-hiphop/30" />
        </div>
        <Button onClick={handleSave} className="w-full">保存</Button>
      </div>
    </Modal>
  );
}

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
