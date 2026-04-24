// 横スクロールタブバー
export default function TabBar({ tabs, activeTab, onTabChange }: { tabs: string[]; activeTab: string; onTabChange: (tab: string) => void }) {
  return (
    <div className="flex gap-1 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
      {tabs.map(tab => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
            activeTab === tab
              ? 'bg-gradient-to-r from-hiphop to-edm text-black shadow-md shadow-hiphop/25'
              : 'glass text-text-secondary hover:text-text-primary border border-white/30'
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
