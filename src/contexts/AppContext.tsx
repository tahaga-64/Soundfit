import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import type { User, Genre } from '@/types';
import { users as allUsers } from '@/data';
import { useAuth } from './AuthContext';

// グローバルステートの型定義
interface AppContextType {
  currentUser: User;
  updateCurrentUser: (updates: Partial<User>) => void;
  users: User[];
  toggleFollow: (targetUserId: string) => void;
  genreFilter: Genre | null;
  setGenreFilter: (genre: Genre | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

// アプリ全体のStateプロバイダー
export function AppProvider({ children }: { children: ReactNode }) {
  const { authUser } = useAuth();

  // 認証済みユーザーがいればそれをベースにする
  // allUsersにauthUserを含めて、既存モックユーザーと共存させる
  const initialUser: User = authUser || allUsers[0];
  const initialUsers = authUser && !allUsers.find(u => u.id === authUser.id)
    ? [authUser, ...allUsers]
    : allUsers;

  const [currentUser, setCurrentUser] = useState<User>(initialUser);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [genreFilter, setGenreFilter] = useState<Genre | null>(null);

  // ユーザー情報の更新
  const updateCurrentUser = useCallback((updates: Partial<User>) => {
    setCurrentUser(prev => {
      const updated = { ...prev, ...updates };
      setUsers(prevUsers => prevUsers.map(u => u.id === updated.id ? updated : u));
      return updated;
    });
  }, []);

  // フォロー/アンフォロー切り替え
  const toggleFollow = useCallback((targetUserId: string) => {
    setCurrentUser(prev => {
      const isFollowing = prev.following.includes(targetUserId);
      const newFollowing = isFollowing
        ? prev.following.filter(id => id !== targetUserId)
        : [...prev.following, targetUserId];
      return { ...prev, following: newFollowing };
    });
    setUsers(prevUsers => prevUsers.map(u => {
      if (u.id === targetUserId) {
        const isFollowed = u.followers.includes(currentUser.id);
        return {
          ...u,
          followers: isFollowed
            ? u.followers.filter(id => id !== currentUser.id)
            : [...u.followers, currentUser.id],
        };
      }
      if (u.id === currentUser.id) {
        const isFollowing = u.following.includes(targetUserId);
        return {
          ...u,
          following: isFollowing
            ? u.following.filter(id => id !== targetUserId)
            : [...u.following, targetUserId],
        };
      }
      return u;
    }));
  }, [currentUser.id]);

  return (
    <AppContext.Provider value={{ currentUser, updateCurrentUser, users, toggleFollow, genreFilter, setGenreFilter }}>
      {children}
    </AppContext.Provider>
  );
}

// コンテキスト使用フック
export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
}
