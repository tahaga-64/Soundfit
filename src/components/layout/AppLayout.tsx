import { Outlet } from 'react-router-dom';
import TopBar from './TopBar';
import BottomNav from './BottomNav';

// アプリ全体のレイアウトシェル
export default function AppLayout() {
  return (
    <div className="min-h-dvh bg-bg-primary text-text-primary">
      <TopBar />
      <main className="max-w-lg mx-auto pt-14 pb-20 px-4">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
