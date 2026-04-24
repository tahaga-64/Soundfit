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
    <nav className="fixed bottom-4 left-4 right-4 z-50 glass rounded-2xl shadow-lg shadow-black/10">
      <div className="max-w-lg mx-auto flex items-center justify-around h-16 pb-[env(safe-area-inset-bottom)]">
        {tabs.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 px-3 py-1 transition-all ${
                isActive ? 'text-hiphop scale-110' : 'text-text-secondary hover:text-text-primary scale-100'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} />
                <span className="text-[10px] font-medium">{label}</span>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-gradient-to-r from-hiphop to-edm mt-0.5" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
