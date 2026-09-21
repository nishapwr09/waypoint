import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs: { id: TabType; label: string; icon: string }[] = [
    { id: 'feed', label: 'Feed', icon: 'dashboard' },
    { id: 'transit', label: 'Transit', icon: 'directions_subway' },
    { id: 'explore', label: 'Explore', icon: 'explore' },
    { id: 'advisory', label: 'Advisory', icon: 'shield' },
  ];

  return (
    <nav
      className="fixed bottom-0 inset-x-0 z-50 pb-[env(safe-area-inset-bottom,0px)] bg-[#FBF9F5]/90 backdrop-blur-xl shadow-[0_-4px_24px_rgba(45,90,76,0.06)] border-t border-border-hairline/60"
      aria-label="Main Navigation"
    >
      <div className="max-w-md mx-auto flex justify-around items-center h-16 px-4">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center gap-1 w-16 h-12 transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'text-primary font-semibold scale-105'
                  : 'text-text-secondary hover:text-primary'
              }`}
              aria-current={isActive ? 'page' : undefined}
            >
              <span
                className={`material-symbols-outlined text-[24px] transition-transform ${
                  isActive ? 'scale-110' : ''
                }`}
                style={{
                  fontVariationSettings: isActive ? "'FILL' 1, 'wght' 600" : "'FILL' 0, 'wght' 400",
                }}
              >
                {tab.icon}
              </span>
              <span className="text-[11px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
