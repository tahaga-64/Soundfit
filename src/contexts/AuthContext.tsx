import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { User, Genre } from '@/types';

// 認証ステート
interface AuthContextType {
  isAuthenticated: boolean;
  authUser: User | null;
  signup: (userData: SignupData) => void;
  login: (email: string, password: string) => string | null;
  logout: () => void;
}

// サインアップ用データ
export interface SignupData {
  name: string;
  email: string;
  password: string;
  bio: string;
  genres: Genre[];
  favoriteArtists: string[];
  avatarSeed: string;
}

// localStorageキー
const AUTH_KEY = 'soundfit_auth';
const ACCOUNTS_KEY = 'soundfit_accounts';

interface StoredAccount {
  email: string;
  password: string;
  user: User;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // 起動時にlocalStorageから復元
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        const user = JSON.parse(stored) as User;
        setAuthUser(user);
        setIsAuthenticated(true);
      }
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
    setIsLoading(false);
  }, []);

  // アカウント一覧取得
  const getAccounts = (): StoredAccount[] => {
    try {
      const stored = localStorage.getItem(ACCOUNTS_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  };

  // サインアップ
  const signup = useCallback((data: SignupData) => {
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.avatarSeed}`,
      bio: data.bio,
      genres: data.genres,
      favoriteArtists: data.favoriteArtists,
      followers: [],
      following: [],
      badges: [],
    };

    // アカウント保存
    const accounts = getAccounts();
    accounts.push({ email: data.email, password: data.password, user: newUser });
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

    // 認証状態セット
    localStorage.setItem(AUTH_KEY, JSON.stringify(newUser));
    setAuthUser(newUser);
    setIsAuthenticated(true);
  }, []);

  // ログイン
  const login = useCallback((email: string, password: string): string | null => {
    const accounts = getAccounts();
    const account = accounts.find(a => a.email === email && a.password === password);
    if (!account) {
      return 'メールアドレスまたはパスワードが正しくありません';
    }
    localStorage.setItem(AUTH_KEY, JSON.stringify(account.user));
    setAuthUser(account.user);
    setIsAuthenticated(true);
    return null;
  }, []);

  // ログアウト
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setAuthUser(null);
    setIsAuthenticated(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-dvh bg-bg-primary flex items-center justify-center">
        <div className="text-hiphop text-2xl font-bold animate-pulse">Soundfit</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, authUser, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
