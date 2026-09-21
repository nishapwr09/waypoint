interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyModal({ isOpen, onClose }: EmergencyModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 transition-all"
      onClick={onClose}
    >
      <div
        className="w-full max-w-sm bg-surface-card rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-bottom duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-warning-amber-deep">call</span>
            <h3 className="font-semibold text-base text-text-primary">Instant Assistance</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Close modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex flex-col gap-2.5">
          <a
            className="flex items-center justify-between p-3.5 rounded-xl bg-surface-muted hover:bg-surface-container transition-colors group cursor-pointer"
            href="tel:110"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-text-primary group-hover:text-primary">
                Police (110)
              </span>
              <span className="text-xs text-text-secondary">English interpretation available on call</span>
            </div>
            <span className="material-symbols-outlined text-primary bg-surface-card p-2 rounded-full shadow-xs">
              call
            </span>
          </a>

          <a
            className="flex items-center justify-between p-3.5 rounded-xl bg-surface-muted hover:bg-surface-container transition-colors group cursor-pointer"
            href="tel:119"
          >
            <div className="flex flex-col">
              <span className="font-semibold text-sm text-text-primary group-hover:text-primary">
                Ambulance & Fire (119)
              </span>
              <span className="text-xs text-text-secondary">Medical emergencies</span>
            </div>
            <span className="material-symbols-outlined text-primary bg-surface-card p-2 rounded-full shadow-xs">
              call
            </span>
          </a>

          <div className="p-3.5 rounded-xl bg-[#FEF3C7]/40 border border-warning-amber-soft/20 flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-warning-amber-deep">
                JNTO 24-hr Tourist Hotline
              </span>
              <span className="text-[11px] px-1.5 py-0.5 rounded bg-white font-medium text-warning-amber-deep">
                Toll-Free
              </span>
            </div>
            <a
              href="tel:05038162720"
              className="text-base font-bold text-text-primary hover:text-primary transition-colors inline-flex items-center gap-1.5"
            >
              <span>050-3816-2720</span>
              <span className="material-symbols-outlined text-[16px] text-primary">open_in_new</span>
            </a>
            <span className="text-xs text-text-secondary">
              English, Chinese, and Korean language support anytime.
            </span>
          </div>

          <div className="p-3 rounded-lg bg-surface-muted text-xs text-text-secondary leading-relaxed">
            <span className="font-semibold text-text-primary block mb-0.5">Your Location in Kyoto:</span>
            Higashiyama District, Kyoto (Near Hanami-koji). In emergencies, dispatch operators can locate your GPS coordinates when dialed.
          </div>
        </div>
      </div>
    </div>
  );
}
