import { useState } from 'react';
import { LOGO_URL, PROFILE_AVATAR } from '../data/mockData';

interface HeaderProps {
  currentCity: string;
  onCityChange: (city: string) => void;
  savedCount: number;
}

export default function Header({ currentCity, onCityChange, savedCount }: HeaderProps) {
  const [showCityMenu, setShowCityMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const cities = [
    { name: 'Kyoto, Japan', active: true, tag: 'Current' },
    { name: 'Tokyo, Japan', active: false, tag: 'Coming Soon' },
    { name: 'Osaka, Japan', active: false, tag: 'Coming Soon' },
    { name: 'Kanazawa, Japan', active: false, tag: 'Coming Soon' },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#FBF9F5]/90 backdrop-blur-xl shadow-[0_1px_12px_rgba(0,0,0,0.03)] pt-[env(safe-area-inset-top,0px)]">
      <div className="max-w-2xl mx-auto h-16 px-4 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2">
          <img
            alt="Waypoint Logo"
            className="h-8 w-auto object-contain rounded-full shadow-xs"
            src={LOGO_URL}
          />
          <span className="font-semibold text-lg text-primary tracking-tight">Waypoint</span>
        </div>

        {/* Location Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowCityMenu(!showCityMenu)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-muted/90 text-[#1a1b22] hover:bg-[#eae6dc] transition-colors min-h-[36px] cursor-pointer"
            aria-label="Select location"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-semibold text-[#1a1b22]">{currentCity}</span>
            <span className="material-symbols-outlined text-[16px] text-text-secondary leading-none">
              keyboard_arrow_down
            </span>
          </button>

          {showCityMenu && (
            <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 w-48 bg-surface-card rounded-xl shadow-lg border border-border-hairline p-1.5 z-50">
              <p className="text-[10px] font-semibold text-text-tertiary uppercase tracking-wider px-2.5 py-1">
                Travel Corridor
              </p>
              {cities.map((city) => (
                <button
                  key={city.name}
                  onClick={() => {
                    if (city.name.includes('Kyoto')) {
                      onCityChange(city.name);
                    }
                    setShowCityMenu(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                    city.name === currentCity
                      ? 'bg-surface-muted text-primary font-semibold'
                      : 'text-text-secondary hover:bg-surface-muted'
                  }`}
                >
                  <span>{city.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-surface-container text-text-tertiary">
                    {city.tag}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile Avatar & Drawer */}
        <div className="relative flex items-center">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:ring-2 hover:ring-primary/20 transition-all cursor-pointer"
            aria-label="User Profile Elena"
          >
            <img
              alt="Profile Elena"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-border-subtle"
              src={PROFILE_AVATAR}
            />
          </button>

          {showProfileMenu && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-surface-card rounded-2xl shadow-xl border border-border-hairline p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center gap-3 pb-3 border-b border-border-hairline">
                <img
                  alt="Profile"
                  className="w-11 h-11 rounded-full object-cover"
                  src={PROFILE_AVATAR}
                />
                <div className="min-w-0">
                  <h3 className="font-semibold text-sm text-text-primary">Elena Rostova</h3>
                  <p className="text-xs text-text-secondary">Higashiyama · Day 1 of 5</p>
                </div>
              </div>

              <div className="py-2.5 space-y-2">
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-text-secondary">ICOCA Transit Card</span>
                  <span className="font-semibold text-primary">Active (¥2,480)</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-text-secondary">Saved Quiet Places</span>
                  <span className="font-semibold text-primary">{savedCount} locations</span>
                </div>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-text-secondary">Travel Style</span>
                  <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium text-[11px]">
                    Low-stimulus
                  </span>
                </div>
              </div>

              <button
                onClick={() => setShowProfileMenu(false)}
                className="w-full mt-2 py-2 rounded-xl bg-surface-muted hover:bg-surface-container text-xs font-semibold text-text-primary transition-colors text-center"
              >
                Close Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
