import { useState } from 'react';
import { PlaceItem } from '../types';
import MapView from './MapView';

interface ExploreTabProps {
  places: PlaceItem[];
  savedCount: number;
  onToggleBookmark: (id: string) => void;
  onOpenSavedTray: () => void;
  onSelectPlaceForDirections: (place: PlaceItem) => void;
}

export default function ExploreTab({
  places,
  savedCount,
  onToggleBookmark,
  onOpenSavedTray,
  onSelectPlaceForDirections,
}: ExploreTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeFilterTag, setActiveFilterTag] = useState<string>('Affordable Gems');
  const [isMapView, setIsMapView] = useState(false);

  const categories = [
    { id: 'all', label: 'All Places', icon: 'auto_awesome' },
    { id: 'eat_sip', label: 'Eat & Sip', icon: 'coffee' },
    { id: 'sanctuaries', label: 'Hidden Sanctuaries', icon: 'nature_people' },
    { id: 'culture', label: 'Culture', icon: 'temple_buddhist' },
    { id: 'stays', label: 'Quiet Stays', icon: 'bed' },
  ];

  const filterTags = ['Affordable Gems', 'Zero Crowds', 'Solo Friendly', 'Iconic & Famous'];

  // Filter logic
  const filteredPlaces = places.filter((place) => {
    const matchesCategory =
      selectedCategory === 'all' ? true : place.category === selectedCategory;

    let matchesTag = true;
    if (activeFilterTag === 'Affordable Gems') {
      matchesTag = place.priceAmount <= 1100 || place.tags.includes('Affordable');
    } else if (activeFilterTag === 'Zero Crowds') {
      matchesTag = place.tags.includes('Zero Crowds') || place.quietLevel === 1;
    } else if (activeFilterTag === 'Solo Friendly') {
      matchesTag = place.tags.includes('Solo Friendly') || place.quietScore.includes('Intimate') || place.priceAmount < 2000;
    } else if (activeFilterTag === 'Iconic & Famous') {
      matchesTag = place.tags.includes('Iconic & Famous') || place.badgeType === 'secondary' || place.priceAmount > 5000;
    }

    return matchesCategory && matchesTag;
  });

  if (isMapView) {
    return (
      <MapView
        places={filteredPlaces.length > 0 ? filteredPlaces : places}
        onSelectPlace={onSelectPlaceForDirections}
        onCloseMap={() => setIsMapView(false)}
        onToggleBookmark={onToggleBookmark}
      />
    );
  }

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-200">
      {/* Header Banner */}
      <div className="px-4 pt-3 pb-2 flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold tracking-wider uppercase text-text-tertiary">
            Curated Kyoto
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] text-primary font-semibold bg-surface-muted px-2.5 py-0.5 rounded-full border border-border-hairline">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            {filteredPlaces.length} Selected Places
          </span>
        </div>
        <h1 className="text-xl font-bold text-text-primary tracking-tight">Mindful Discovery</h1>
        <p className="text-xs text-text-secondary">
          Low-stimulus, high-signal spaces chosen for intentional travelers.
        </p>
      </div>

      {/* Primary Category Pills */}
      <div className="pt-2 pb-1 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 px-4 w-max">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold shadow-xs transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-surface-muted text-text-secondary hover:text-text-primary hover:bg-surface-container'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondary Filter Tags */}
      <div className="py-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 px-4 w-max">
          {filterTags.map((tag) => {
            const isActive = activeFilterTag === tag;
            return (
              <button
                key={tag}
                onClick={() => setActiveFilterTag(isActive ? '' : tag)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold flex items-center gap-1 shadow-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-white'
                    : 'bg-surface-card text-text-secondary hover:text-text-primary border border-border-hairline'
                }`}
              >
                {isActive && (
                  <span className="material-symbols-outlined text-[14px]">check</span>
                )}
                <span>{tag}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Curated Place Cards */}
      <div className="flex flex-col gap-4 px-4 pt-2 pb-28">
        {filteredPlaces.length === 0 ? (
          <div className="p-8 text-center bg-surface-card rounded-2xl border border-border-hairline text-text-secondary">
            <p className="text-sm font-semibold">No places match this specific filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setActiveFilterTag('');
              }}
              className="mt-2 text-xs text-primary font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredPlaces.map((place) => (
            <div
              key={place.id}
              className="bg-surface-card rounded-2xl p-4 shadow-sm border border-border-hairline flex flex-col gap-3 transition-transform duration-200 active:scale-[0.99]"
            >
              <div className="relative w-full h-44 rounded-xl overflow-hidden bg-surface-muted">
                <img
                  className="w-full h-full object-cover"
                  alt={place.imageAlt}
                  src={place.image}
                />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 bg-surface-card/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] text-primary font-semibold shadow-xs">
                    <span className="material-symbols-outlined text-[13px]">
                      {place.badgeIcon}
                    </span>
                    <span>{place.badge}</span>
                  </span>
                </div>

                <button
                  onClick={() => onToggleBookmark(place.id)}
                  aria-label={`Save ${place.name}`}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-card/90 backdrop-blur-md flex items-center justify-center text-text-secondary hover:text-primary shadow-xs transition-colors cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{
                      fontVariationSettings: place.isBookmarked
                        ? "'FILL' 1"
                        : "'FILL' 0",
                    }}
                  >
                    bookmark
                  </span>
                </button>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white">
                    {place.district}
                  </span>
                  {place.openStatus && (
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/90 backdrop-blur-xs text-white flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed"></span>
                      <span>{place.openStatus}</span>
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-bold text-text-primary">{place.name}</h2>
                  <span className="text-xs font-bold text-primary shrink-0">{place.price}</span>
                </div>
                <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
                  {place.description}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-text-tertiary flex-wrap">
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-text-secondary">
                    directions_walk
                  </span>
                  <span>{place.travelTime}</span>
                </span>
                <span>·</span>
                <span className="inline-flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px] text-text-secondary">
                    schedule
                  </span>
                  <span>{place.highlight}</span>
                </span>
                <span>·</span>
                <span>{place.type}</span>
              </div>

              <div className="bg-surface-muted rounded-xl p-2.5 flex items-center justify-between gap-2 border border-border-hairline">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  <span className="text-xs font-semibold text-text-primary">
                    {place.quietScore}
                  </span>
                </div>
                <button
                  onClick={() => {
                    const query = encodeURIComponent(`${place.name} Kyoto`);
                    window.open(`https://maps.google.com/?q=${query}`, '_blank');
                  }}
                  className="text-xs text-primary font-bold hover:underline flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Directions</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Floating Bottom Action Dock */}
      <div className="fixed bottom-20 inset-x-0 z-40 flex items-center justify-center px-4 pointer-events-none">
        <div className="flex items-center gap-2 pointer-events-auto bg-surface-card/95 backdrop-blur-xl px-2 py-1.5 rounded-full shadow-[0_12px_32px_-8px_rgba(45,90,76,0.22),0_4px_12px_-2px_rgba(0,0,0,0.08)] border border-border-hairline">
          <button
            onClick={() => setIsMapView(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold shadow-xs hover:bg-primary-container transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">explore</span>
            <span>Map View</span>
          </button>

          <button
            onClick={onOpenSavedTray}
            aria-label="Open saved places tray"
            className="flex items-center gap-1 px-3 py-2 rounded-full text-text-secondary hover:text-primary hover:bg-surface-muted text-xs font-semibold transition-colors cursor-pointer"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              bookmark
            </span>
            <span className="w-5 h-5 rounded-full bg-surface-muted flex items-center justify-center text-[10px] font-bold text-text-primary">
              {savedCount}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
