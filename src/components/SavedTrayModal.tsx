import { PlaceItem } from '../types';

interface SavedTrayModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedPlaces: PlaceItem[];
  onToggleBookmark: (id: string) => void;
  onNavigateToDirections: (place: PlaceItem) => void;
}

export default function SavedTrayModal({
  isOpen,
  onClose,
  savedPlaces,
  onToggleBookmark,
  onNavigateToDirections,
}: SavedTrayModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-surface-card rounded-2xl p-5 shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto animate-in fade-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-2 border-b border-border-hairline">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              bookmark
            </span>
            <h3 className="font-semibold text-base text-text-primary">
              Saved Mindful Sanctuaries ({savedPlaces.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Close saved places"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {savedPlaces.length === 0 ? (
          <div className="py-8 text-center text-text-secondary">
            <span className="material-symbols-outlined text-4xl text-text-tertiary mb-2 block">
              bookmark_border
            </span>
            <p className="text-sm">No places saved yet.</p>
            <p className="text-xs text-text-tertiary mt-1">
              Tap the bookmark icon on any curated cafe or zen sanctuary to keep it here.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {savedPlaces.map((place) => (
              <div
                key={place.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-surface-muted/70 hover:bg-surface-muted transition-colors border border-border-hairline"
              >
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-16 h-16 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-xs text-text-primary truncate">{place.name}</h4>
                    <span className="text-xs font-bold text-primary shrink-0 ml-1">{place.price}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5">{place.district} · {place.travelTime}</p>
                  <p className="text-[10px] text-primary font-medium mt-1">{place.quietScore}</p>
                </div>
                <div className="flex flex-col gap-1 shrink-0">
                  <button
                    onClick={() => onNavigateToDirections(place)}
                    className="p-1.5 rounded-full bg-surface-card hover:bg-primary hover:text-white text-primary shadow-xs transition-colors cursor-pointer"
                    title="Get Directions"
                  >
                    <span className="material-symbols-outlined text-[16px]">navigation</span>
                  </button>
                  <button
                    onClick={() => onToggleBookmark(place.id)}
                    className="p-1.5 rounded-full bg-surface-card hover:bg-surface-container text-text-tertiary hover:text-error transition-colors cursor-pointer"
                    title="Remove from saved"
                  >
                    <span className="material-symbols-outlined text-[16px]">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="pt-2 border-t border-border-hairline flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-container transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
