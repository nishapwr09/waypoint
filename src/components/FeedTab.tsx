import { useState } from 'react';
import { PlaceItem } from '../types';
import { NEIGHBORHOOD_PROTOCOLS } from '../data/mockData';

interface FeedTabProps {
  places: PlaceItem[];
  onToggleBookmark: (id: string) => void;
  onOpenEmergency: () => void;
  onOpenCurrency: () => void;
  onOpenIcoca: () => void;
  onNavigateToExplore: () => void;
  onNavigateToTransit: () => void;
}

export default function FeedTab({
  places,
  onToggleBookmark,
  onOpenEmergency,
  onOpenCurrency,
  onOpenIcoca,
  onNavigateToExplore,
  onNavigateToTransit,
}: FeedTabProps) {
  const [isAdvisoryExpanded, setIsAdvisoryExpanded] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filterPills = ['All', 'Affordable', 'Hidden Cafes', 'Zen Gardens', 'Temples'];

  const filteredPlaces = places.filter((p) => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Affordable') return p.tags.includes('Affordable') || p.priceAmount < 1000;
    if (selectedFilter === 'Hidden Cafes') return p.tags.includes('Hidden Cafes') || p.category === 'eat_sip';
    if (selectedFilter === 'Zen Gardens') return p.tags.includes('Zen Gardens') || p.category === 'sanctuaries';
    if (selectedFilter === 'Temples') return p.name.includes('Temple') || p.tags.includes('Zen Gardens');
    return true;
  });

  return (
    <div className="flex flex-col w-full pb-8 animate-in fade-in duration-200">
      {/* Ambient Living Gradient Band */}
      <div className="w-full px-4 pt-3 pb-2 flex flex-col gap-4">
        {/* Greeting & Geo context */}
        <div className="flex flex-col gap-1.5">
          <div className="inline-flex items-center gap-2 self-start px-2.5 py-1 rounded-full bg-surface-muted">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="text-xs font-medium text-text-secondary">
              Higashiyama District · Arrived 2h ago
            </span>
          </div>

          <div className="flex items-baseline justify-between mt-1">
            <h1 className="text-xl font-bold text-text-primary tracking-tight">Good morning, Elena</h1>
            <span className="text-xs font-semibold text-text-tertiary">Day 1 of 5</span>
          </div>
        </div>

        {/* Ambient Weather & Time Bento Island */}
        <div className="w-full bg-surface-card rounded-2xl p-4 shadow-sm border border-border-hairline flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-surface-muted flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[26px]">sunny</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-text-primary">19°C</span>
                <span className="text-xs text-text-secondary">/ 66°F</span>
              </div>
              <span className="text-xs text-text-secondary">Crisp, gentle breeze</span>
            </div>
          </div>

          <div className="flex flex-col items-end pl-3">
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[16px]">schedule</span>
              <span className="text-base font-bold text-text-primary">09:42</span>
              <span className="text-xs text-text-secondary font-medium">JST</span>
            </div>
            <span className="text-xs text-primary font-medium mt-0.5">Optimal stroll window</span>
          </div>
        </div>

        {/* Quick Action Pill Dock */}
        <div className="grid grid-cols-3 gap-2">
          {/* Emergency */}
          <button
            onClick={onOpenEmergency}
            className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-surface-card shadow-sm border border-border-hairline active:scale-95 transition-transform text-center cursor-pointer hover:bg-surface-muted/50"
          >
            <span className="material-symbols-outlined text-primary text-[20px] mb-1">sos</span>
            <span className="text-xs font-bold text-text-primary">110 / 119</span>
            <span className="text-[10px] text-text-tertiary mt-0.5">Emergency</span>
          </button>

          {/* Currency FX */}
          <button
            onClick={onOpenCurrency}
            className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-surface-card shadow-sm border border-border-hairline active:scale-95 transition-transform text-center cursor-pointer hover:bg-surface-muted/50"
          >
            <span className="material-symbols-outlined text-primary text-[20px] mb-1">currency_yen</span>
            <span className="text-xs font-bold text-text-primary">¥154 = $1</span>
            <span className="text-[10px] text-text-tertiary mt-0.5">Fair Spot Rate</span>
          </button>

          {/* IC Transit Card Active */}
          <button
            onClick={onOpenIcoca}
            className="flex flex-col items-center justify-center py-2.5 px-2 rounded-xl bg-surface-card shadow-sm border border-border-hairline active:scale-95 transition-transform text-center cursor-pointer hover:bg-surface-muted/50"
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              <span className="material-symbols-outlined text-primary text-[20px]">contactless</span>
            </div>
            <span className="text-xs font-bold text-text-primary">ICOCA Active</span>
            <span className="text-[10px] text-text-tertiary mt-0.5">¥2,480 balance</span>
          </button>
        </div>
      </div>

      {/* Stay Alert Radar Card (High-Signal Calibrated Ochre Tone) */}
      <div className="px-4 mt-4">
        <div className="w-full bg-[#FFFBEB] rounded-2xl p-4 shadow-sm border border-warning-amber-soft/25">
          <div className="flex items-center justify-between mb-2.5">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#FEF3C7] text-warning-amber-deep">
              <span className="w-1.5 h-1.5 rounded-full bg-warning-amber-deep"></span>
              <span className="text-[10px] font-bold tracking-wider uppercase">Local Advisory</span>
            </div>
            <span className="text-xs text-text-secondary">Updated 1h ago</span>
          </div>

          <h2 className="text-sm font-bold text-text-primary mb-1.5">
            Gion Photography & Private Alley Rules
          </h2>
          <p className="text-xs text-text-secondary leading-relaxed mb-3">
            Private alleys along Hanami-koji enforce an immediate{' '}
            <span className="font-semibold text-text-primary">¥10,000 fine</span> for candid photos
            of Geiko/Maiko. Avoid unsolicited street guides proposing tea house visits.
          </p>

          <button
            onClick={() => setIsAdvisoryExpanded(!isAdvisoryExpanded)}
            className="w-full py-2 px-3 rounded-full bg-surface-card text-text-primary shadow-xs border border-border-hairline flex items-center justify-between active:bg-surface-muted transition-colors cursor-pointer"
          >
            <span className="text-xs font-medium text-text-secondary">
              {isAdvisoryExpanded
                ? 'Collapse protocols'
                : 'View 4 Active Neighborhood Protocols'}
            </span>
            <span
              className={`material-symbols-outlined text-primary text-[18px] transition-transform duration-200 ${
                isAdvisoryExpanded ? 'rotate-180' : ''
              }`}
            >
              expand_more
            </span>
          </button>

          {/* Expandable Guidance Drawer */}
          {isAdvisoryExpanded && (
            <div className="flex flex-col gap-2.5 mt-3 pt-3 border-t border-warning-amber-soft/20 animate-in fade-in duration-200">
              {NEIGHBORHOOD_PROTOCOLS.map((proto) => (
                <div key={proto.title} className="flex items-start gap-2.5 bg-white/80 p-2.5 rounded-xl border border-warning-amber-soft/15">
                  <span className="material-symbols-outlined text-warning-amber-deep text-[18px] mt-0.5 shrink-0">
                    {proto.icon}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-text-primary">{proto.title}</span>
                    <span className="text-[11px] text-text-secondary leading-normal">
                      {proto.description}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Transit Fare Snapshot: Calm Assurance */}
      <div className="px-4 mt-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-text-primary">Transparent Transit Fares</h2>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-muted text-[10px] text-primary font-semibold">
              Verified Today
            </span>
          </div>
          <button
            onClick={onNavigateToTransit}
            className="text-text-tertiary hover:text-primary transition-colors flex items-center gap-1 text-xs cursor-pointer"
            title="Open transit estimator"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
          </button>
        </div>

        {/* Fare Stack */}
        <div className="flex flex-col gap-2.5">
          {/* Item 1: Subway & Bus */}
          <div
            onClick={onNavigateToTransit}
            className="w-full bg-surface-card rounded-2xl p-3.5 shadow-sm border border-border-hairline flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">directions_bus</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-text-primary">Kyoto City Bus & Metro</span>
                <span className="text-[11px] text-text-secondary">Flat fare · Tap IC or exact coins</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-primary">¥230</span>
              <span className="text-[10px] text-text-tertiary">~$1.50 USD</span>
            </div>
          </div>

          {/* Item 2: Taxi */}
          <div
            onClick={onNavigateToTransit}
            className="w-full bg-surface-card rounded-2xl p-3.5 shadow-sm border border-border-hairline flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">local_taxi</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-text-primary">Official Licensed Taxis</span>
                <span className="text-[11px] text-text-secondary">Starting base fare · Strict meter only</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-primary">¥500</span>
              <span className="text-[10px] text-text-tertiary">~$3.25 first 1.2km</span>
            </div>
          </div>

          {/* Item 3: Haruka Express */}
          <div
            onClick={onNavigateToTransit}
            className="w-full bg-surface-card rounded-2xl p-3.5 shadow-sm border border-border-hairline flex items-center justify-between hover:border-primary/30 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-surface-muted flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">train</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-text-primary">JR Haruka Kansai Express</span>
                <span className="text-[11px] text-text-secondary">Kyoto Stn ⇄ KIX Airport (75 min)</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-sm font-bold text-primary">¥3,400</span>
              <span className="text-[10px] text-text-tertiary">~$22.00 reserve</span>
            </div>
          </div>
        </div>
      </div>

      {/* Discovery Carousel: Today in Kyoto */}
      <div className="mt-6 flex flex-col">
        <div className="px-4 flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-bold text-text-primary">Curated Today in Kyoto</h2>
            <p className="text-xs text-text-secondary">Timed for calm hours and low congestion</p>
          </div>
          <button
            onClick={onNavigateToExplore}
            className="text-xs text-primary font-semibold hover:underline cursor-pointer"
          >
            See all
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto px-4 pb-2 no-scrollbar">
          {filterPills.map((filter) => {
            const isActive = selectedFilter === filter;
            return (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold shadow-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-surface-card text-text-secondary hover:bg-surface-muted'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* Discovery Bento Cards */}
        <div className="px-4 flex flex-col gap-4 mt-2">
          {filteredPlaces.slice(0, 2).map((place) => (
            <div
              key={place.id}
              className="w-full bg-surface-card rounded-2xl overflow-hidden shadow-sm border border-border-hairline flex flex-col group"
            >
              <div className="relative w-full h-44 bg-surface-muted overflow-hidden">
                <img
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={place.imageAlt}
                  src={place.image}
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-surface-card/90 backdrop-blur-md flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span className="text-[11px] font-semibold text-text-primary">
                    {place.badge}
                  </span>
                </div>
                <button
                  onClick={() => onToggleBookmark(place.id)}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-card/85 backdrop-blur-md flex items-center justify-center text-text-secondary hover:text-primary transition-colors cursor-pointer shadow-xs"
                  aria-label="Bookmark"
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
              </div>

              <div className="p-4 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
                      {place.district} · {place.travelTime}
                    </span>
                    <h3 className="text-sm font-bold text-text-primary mt-0.5">{place.name}</h3>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-primary">{place.price}</span>
                    <span className="text-[10px] text-text-tertiary">{place.type}</span>
                  </div>
                </div>

                <p className="text-xs text-text-secondary mt-2 line-clamp-2 leading-relaxed">
                  {place.description}
                </p>

                {/* Crowd volume calm meter */}
                <div className="mt-3.5 pt-3 border-t border-border-hairline flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <span className="w-2.5 h-2 rounded-full bg-primary"></span>
                      <span className="w-2.5 h-2 rounded-full bg-surface-muted"></span>
                      <span className="w-2.5 h-2 rounded-full bg-surface-muted"></span>
                      <span className="w-2.5 h-2 rounded-full bg-surface-muted"></span>
                    </div>
                    <span className="text-xs font-semibold text-primary">{place.quietScore}</span>
                  </div>
                  <button
                    onClick={() => {
                      const query = encodeURIComponent(`${place.name} Kyoto`);
                      window.open(`https://maps.google.com/?q=${query}`, '_blank');
                    }}
                    className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <span>Directions</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mindful Travel Etiquette Micro-Footer Card */}
      <div className="px-4 mt-6 mb-2">
        <div className="w-full bg-surface-muted rounded-2xl p-4 flex items-center gap-3.5 border border-border-hairline">
          <div className="w-9 h-9 rounded-full bg-surface-card flex items-center justify-center text-primary shrink-0 shadow-xs">
            <span className="material-symbols-outlined text-[20px]">spa</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-text-primary">Today's Cultural Note</span>
            <span className="text-xs text-text-secondary leading-normal">
              Bowing slightly at a 15-degree tilt is universally appreciated during small transactions.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
