import { NavLink } from 'react-router-dom';
import { Home, Music, Compass, Gamepad2, User } from 'lucide-react';

// BottomNavigationのタブ定義
const tabs = [
  { to: '/', icon: Home, label: 'ホーム' },
  { to: '/events', icon: Music, label: 'ライブ' },
  { to: '/discover', icon: Compass, label: '発見' },
  { to: '/games', icon: Gamepad2, label: 'ゲーム' },
  { to: '/profile', icon: User, label: 'マイページ' },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-bg-secondary/95 backdrop-blur-sm border-t border-border-primary">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive ? 'text-hiphop' : 'text-text-secondary hover:text-text-primary'
              }`
            }
          >
            <Icon size={22} />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
