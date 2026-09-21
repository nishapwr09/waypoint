/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { TabType, CurrencyUnit, PlaceItem } from './types';
import { CURATED_PLACES } from './data/mockData';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import FeedTab from './components/FeedTab';
import TransitTab from './components/TransitTab';
import ExploreTab from './components/ExploreTab';
import AdvisoryTab from './components/AdvisoryTab';
import EmergencyModal from './components/EmergencyModal';
import CurrencyModal from './components/CurrencyModal';
import IcocaModal from './components/IcocaModal';
import SavedTrayModal from './components/SavedTrayModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('feed');
  const [currentCity, setCurrentCity] = useState('Kyoto, Japan');
  const [currencyUnit, setCurrencyUnit] = useState<CurrencyUnit>('USD');
  const [places, setPlaces] = useState<PlaceItem[]>(CURATED_PLACES);

  // Modals state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isIcocaOpen, setIsIcocaOpen] = useState(false);
  const [isSavedTrayOpen, setIsSavedTrayOpen] = useState(false);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((prev) => (prev === message ? null : prev));
    }, 2800);
  };

  const handleToggleBookmark = (id: string) => {
    setPlaces((prev) =>
      prev.map((place) => {
        if (place.id === id) {
          const nextState = !place.isBookmarked;
          showToast(
            nextState
              ? `Saved "${place.name}" to mindful sanctuaries`
              : `Removed "${place.name}" from saved`
          );
          return { ...place, isBookmarked: nextState };
        }
        return place;
      })
    );
  };

  const handleCurrencyToggle = () => {
    const next: Record<CurrencyUnit, CurrencyUnit> = {
      USD: 'EUR',
      EUR: 'GBP',
      GBP: 'USD',
    };
    const nextUnit = next[currencyUnit];
    setCurrencyUnit(nextUnit);
    showToast(`Currency pegged to ${nextUnit}`);
  };

  const savedPlaces = places.filter((p) => p.isBookmarked);

  // Scroll to top on tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-text-primary selection:bg-primary/20 selection:text-primary">
      {/* Universal Top Header */}
      <Header
        currentCity={currentCity}
        onCityChange={(city) => {
          setCurrentCity(city);
          showToast(`Location set to ${city}`);
        }}
        savedCount={savedPlaces.length}
      />

      {/* Main Content Area with padding for fixed header and bottom navigation */}
      <main className="flex-1 flex flex-col relative w-full max-w-md mx-auto pt-16 pb-20 bg-[#FBF9F5]">
        {activeTab === 'feed' && (
          <FeedTab
            places={places}
            onToggleBookmark={handleToggleBookmark}
            onOpenEmergency={() => setIsEmergencyOpen(true)}
            onOpenCurrency={() => setIsCurrencyOpen(true)}
            onOpenIcoca={() => setIsIcocaOpen(true)}
            onNavigateToExplore={() => setActiveTab('explore')}
            onNavigateToTransit={() => setActiveTab('transit')}
          />
        )}

        {activeTab === 'transit' && (
          <TransitTab
            currencyUnit={currencyUnit}
            onCurrencyToggle={handleCurrencyToggle}
            onOpenIcoca={() => setIsIcocaOpen(true)}
          />
        )}

        {activeTab === 'explore' && (
          <ExploreTab
            places={places}
            savedCount={savedPlaces.length}
            onToggleBookmark={handleToggleBookmark}
            onOpenSavedTray={() => setIsSavedTrayOpen(true)}
            onSelectPlaceForDirections={(place) => {
              const query = encodeURIComponent(`${place.name} Kyoto`);
              window.open(`https://maps.google.com/?q=${query}`, '_blank');
            }}
          />
        )}

        {activeTab === 'advisory' && (
          <AdvisoryTab
            onOpenEmergencyModal={() => setIsEmergencyOpen(true)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Fixed Bottom Navigation Dock */}
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Interactive Helper Modals */}
      <EmergencyModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />

      <CurrencyModal
        isOpen={isCurrencyOpen}
        onClose={() => setIsCurrencyOpen(false)}
        baseRateUsd={154}
      />

      <IcocaModal
        isOpen={isIcocaOpen}
        onClose={() => setIsIcocaOpen(false)}
        initialBalance={2480}
      />

      <SavedTrayModal
        isOpen={isSavedTrayOpen}
        onClose={() => setIsSavedTrayOpen(false)}
        savedPlaces={savedPlaces}
        onToggleBookmark={handleToggleBookmark}
        onNavigateToDirections={(place) => {
          setIsSavedTrayOpen(false);
          const query = encodeURIComponent(`${place.name} Kyoto`);
          window.open(`https://maps.google.com/?q=${query}`, '_blank');
        }}
      />

      {/* Toast Notification Banner */}
      <div
        className={`fixed bottom-24 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-text-primary text-white text-xs font-semibold shadow-xl transition-all duration-300 z-50 flex items-center gap-2 pointer-events-none max-w-[90vw] text-center ${
          toastMessage ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
        }`}
      >
        <span className="material-symbols-outlined text-[16px] text-primary-fixed">check_circle</span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
}
