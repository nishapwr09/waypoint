import { useState } from 'react';
import { PlaceItem } from '../types';

interface MapViewProps {
  places: PlaceItem[];
  onSelectPlace: (place: PlaceItem) => void;
  onCloseMap: () => void;
  onToggleBookmark: (id: string) => void;
}

export default function MapView({ places, onSelectPlace, onCloseMap, onToggleBookmark }: MapViewProps) {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string>(places[0]?.id || '');
  const activePlace = places.find((p) => p.id === selectedPlaceId) || places[0];

  // Visual layout coordinates for Kyoto districts on our mindful cartographic canvas
  const mapCoordinates: Record<string, { x: number; y: number }> = {
    'daitoku-ji': { x: 34, y: 16 }, // Kita Ward (North)
    'honke-owariya': { x: 42, y: 44 }, // Karasuma (Central)
    'weekenders-coffee': { x: 48, y: 50 }, // Nakagyo Ward (Central)
    'murin-an': { x: 74, y: 42 }, // Okazaki District (East)
    'kissa-soiree': { x: 62, y: 56 }, // Higashiyama Kawaramachi (East-Central)
    'gion-nishikawa': { x: 68, y: 64 }, // Gion Minamigawa (South-East)
  };

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-140px)] animate-in fade-in duration-200">
      {/* Map Control Bar */}
      <div className="px-4 py-2 flex items-center justify-between bg-surface-card border-b border-border-hairline shadow-xs">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[20px]">explore</span>
          <div>
            <h3 className="text-xs font-semibold text-text-primary">Kyoto Cartographic Radar</h3>
            <span className="text-[10px] text-text-secondary">Low-stimulus geographic orientation</span>
          </div>
        </div>
        <button
          onClick={onCloseMap}
          className="px-3 py-1.5 rounded-full bg-surface-muted hover:bg-surface-container text-xs font-semibold text-text-primary transition-colors flex items-center gap-1 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[16px]">view_list</span>
          <span>List View</span>
        </button>
      </div>

      {/* Styled Kyoto Map Canvas */}
      <div className="relative w-full h-[380px] bg-[#f4f1ea] overflow-hidden border-b border-border-hairline">
        {/* Stylized Kamo River Flow Vector */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <path
            d="M 52,0 Q 53,30 55,50 T 58,100"
            fill="none"
            stroke="#93c5fd"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <text x="56" y="28" fill="#64748b" fontSize="3" fontFamily="sans-serif">
            Kamo River (鴨川)
          </text>

          {/* Biwa Canal branch to Okazaki */}
          <path
            d="M 55,42 Q 68,40 85,38"
            fill="none"
            stroke="#bae6fd"
            strokeWidth="1.8"
            strokeDasharray="2,2"
          />
        </svg>

        {/* District Ambient Labels */}
        <div className="absolute top-4 left-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider pointer-events-none">
          Kita Ward (North Temples)
        </div>
        <div className="absolute top-1/2 left-4 -translate-y-1/2 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider pointer-events-none">
          Nakagyo / Karasuma
        </div>
        <div className="absolute top-10 right-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider pointer-events-none">
          Okazaki Cultural Area
        </div>
        <div className="absolute bottom-16 right-6 text-[11px] font-semibold text-text-tertiary uppercase tracking-wider pointer-events-none">
          Higashiyama & Gion
        </div>
        <div className="absolute bottom-3 left-6 text-[10px] text-text-tertiary pointer-events-none flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-primary"></span>
          <span>Elena's Hotel Base (Higashiyama)</span>
        </div>

        {/* Interactive Place Markers */}
        {places.map((place) => {
          const coords = mapCoordinates[place.id] || { x: 50, y: 50 };
          const isSelected = place.id === activePlace.id;

          return (
            <div
              key={place.id}
              style={{ left: `${coords.x}%`, top: `${coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
              onClick={() => {
                setSelectedPlaceId(place.id);
                onSelectPlace(place);
              }}
            >
              <div
                className={`relative flex items-center justify-center transition-all duration-300 ${
                  isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-full shadow-md flex items-center justify-center transition-colors ${
                    isSelected
                      ? 'bg-primary text-white ring-4 ring-primary-fixed'
                      : 'bg-surface-card text-primary hover:bg-surface-muted border border-border-hairline'
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {place.badgeIcon || 'place'}
                  </span>
                </div>

                {/* Floating Micro-pill label on map */}
                <span
                  className={`absolute top-full mt-1 px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap shadow-xs pointer-events-none transition-all ${
                    isSelected
                      ? 'bg-primary text-white ring-1 ring-white'
                      : 'bg-surface-card/90 backdrop-blur-xs text-text-primary border border-border-hairline group-hover:block'
                  }`}
                >
                  {place.name.split(' ')[0]}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Location Card Inspector */}
      {activePlace && (
        <div className="p-4 bg-canvas-porcelain">
          <div className="bg-surface-card rounded-2xl p-4 shadow-sm border border-border-hairline flex flex-col gap-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-semibold">
                    {activePlace.badge}
                  </span>
                  <span className="text-xs text-text-tertiary">{activePlace.travelTime}</span>
                </div>
                <h3 className="font-semibold text-base text-text-primary">{activePlace.name}</h3>
                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                  {activePlace.description}
                </p>
              </div>

              <img
                src={activePlace.image}
                alt={activePlace.name}
                className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-xs"
              />
            </div>

            <div className="pt-2 border-t border-border-hairline flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
                <span className="material-symbols-outlined text-[16px]">nature_people</span>
                <span>{activePlace.quietScore}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onToggleBookmark(activePlace.id)}
                  className={`p-2 rounded-full border transition-colors cursor-pointer ${
                    activePlace.isBookmarked
                      ? 'bg-primary text-white border-primary'
                      : 'bg-surface-card text-text-secondary border-border-hairline hover:text-primary'
                  }`}
                  aria-label="Bookmark place"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{
                      fontVariationSettings: activePlace.isBookmarked
                        ? "'FILL' 1"
                        : "'FILL' 0",
                    }}
                  >
                    bookmark
                  </span>
                </button>

                <button
                  onClick={() => {
                    const address = encodeURIComponent(`${activePlace.name} Kyoto`);
                    window.open(`https://maps.google.com/?q=${address}`, '_blank');
                  }}
                  className="px-3.5 py-1.5 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <span>Directions</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
