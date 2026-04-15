import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Settings, Clock, StickyNote, ShoppingBag, UserPlus, UserCheck, Sliders } from 'lucide-react';
import { useApp } from '@/contexts/AppContext';
import type { Genre, User } from '@/types';
import { getSpotifyArtistId } from '@/data/spotifyIds';
import UserAvatar from '@/components/ui/UserAvatar';
import GenreBadge from '@/components/ui/GenreBadge';
import { SpotifyLink } from '@/components/ui/SpotifyButton';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import Card from '@/components/ui/Card';
import { allGenres, genreDisplayNames, genreBgColors } from '@/utils/genreHelpers';

export default function ProfilePage() {
  const { id } = useParams();
  const { currentUser, users, updateCurrentUser, toggleFollow } = useApp();
  const [showEdit, setShowEdit] = useState(false);
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const [showSameCulture, setShowSameCulture] = useState(false);

  // 表示するユーザーを決定（パスパラメータがあれば他ユーザー）
  const isOwnProfile = !id || id === currentUser.id;
  const profileUser = isOwnProfile ? currentUser : users.find(u => u.id === id) || currentUser;
  const isFollowing = currentUser.following.includes(profileUser.id);

  // 同じカルチャーのユーザー
  const sameCultureUsers = users.filter(u =>
    u.id !== profileUser.id && u.genres.some(g => profileUser.genres.includes(g))
  );

  return (
    <div className="space-y-4 py-4 animate-fade-in">
      {/* プロフィールヘッダー */}
      <div className="text-center space-y-3">
        <UserAvatar src={profileUser.avatar} name={profileUser.name} size="lg" />
        <h2 className="text-xl font-bold">{profileUser.name}</h2>
        <p className="text-sm text-text-secondary">{profileUser.bio}</p>
        <div className="flex justify-center gap-2 flex-wrap">
          {profileUser.genres.map(g => <GenreBadge key={g} genre={g} size="md" />)}
        </div>
        <div className="flex justify-center gap-6 text-sm">
          <button onClick={() => setShowFollowers(true)} className="text-center">
            <span className="font-bold block">{profileUser.followers.length}</span>
            <span className="text-text-secondary text-xs">フォロワー</span>
          </button>
          <button onClick={() => setShowFollowing(true)} className="text-center">
            <span className="font-bold block">{profileUser.following.length}</span>
            <span className="text-text-secondary text-xs">フォロー中</span>
          </button>
        </div>
        {isOwnProfile ? (
          <Button variant="secondary" size="sm" onClick={() => setShowEdit(true)}>
            <Settings size={14} className="inline mr-1" />プロフィール編集
          </Button>
        ) : (
          <Button variant={isFollowing ? 'secondary' : 'primary'} size="sm" onClick={() => toggleFollow(profileUser.id)}>
            {isFollowing ? <><UserCheck size={14} className="inline mr-1" />フォロー中</> : <><UserPlus size={14} className="inline mr-1" />フォロー</>}
          </Button>
        )}
      </div>

      {/* お気に入りアーティスト */}
      <Card>
        <h3 className="font-bold text-sm mb-2">お気に入りアーティスト</h3>
        <div className="flex flex-wrap gap-2">
          {profileUser.favoriteArtists.map(a => {
            const spotifyId = getSpotifyArtistId(a);
            const spotifyUrl = spotifyId ? `https://open.spotify.com/artist/${spotifyId}` : undefined;
            return (
              <Link key={a} to={`/artist/${encodeURIComponent(a)}`} className="inline-flex items-center gap-1.5 text-xs bg-bg-secondary px-3 py-1 rounded-full hover:bg-border-primary transition-colors">
                {a}
                {spotifyUrl && <SpotifyLink url={spotifyUrl} size={12} />}
              </Link>
            );
          })}
        </div>
      </Card>

      {/* クイックリンク（自分のプロフィールのみ） */}
      {isOwnProfile && (
        <div className="grid grid-cols-2 gap-3">
          <Link to="/profile/timeline" className="bg-bg-card rounded-xl p-4 flex items-center gap-3 hover:bg-border-primary transition-colors">
            <Clock size={20} className="text-citypop" /><span className="text-sm font-medium">音楽年表</span>
          </Link>
          <Link to="/profile/notes" className="bg-bg-card rounded-xl p-4 flex items-center gap-3 hover:bg-border-primary transition-colors">
            <StickyNote size={20} className="text-jazz" /><span className="text-sm font-medium">メモ</span>
          </Link>
          <Link to="/marketplace" className="bg-bg-card rounded-xl p-4 flex items-center gap-3 hover:bg-border-primary transition-colors">
            <ShoppingBag size={20} className="text-punk" /><span className="text-sm font-medium">フリマ</span>
          </Link>
          <button onClick={() => setShowSameCulture(true)} className="bg-bg-card rounded-xl p-4 flex items-center gap-3 hover:bg-border-primary transition-colors text-left">
            <UserPlus size={20} className="text-edm" /><span className="text-sm font-medium">仲間を探す</span>
          </button>
          <Link to="/settings" className="bg-bg-card rounded-xl p-4 flex items-center gap-3 hover:bg-border-primary transition-colors col-span-2">
            <Sliders size={20} className="text-text-secondary" /><span className="text-sm font-medium">設定・API連携</span>
          </Link>
        </div>
      )}

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
          <div className="flex flex-wrap gap-2">
            {allGenres.map(g => (
              <button key={g} onClick={() => toggleGenre(g)} className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${genres.includes(g) ? `${genreBgColors[g]} text-black` : 'bg-bg-card text-text-secondary'}`}>
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
