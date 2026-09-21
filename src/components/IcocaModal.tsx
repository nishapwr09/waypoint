import { useState } from 'react';

interface IcocaModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialBalance?: number;
}

export default function IcocaModal({ isOpen, onClose, initialBalance = 2480 }: IcocaModalProps) {
  const [balance, setBalance] = useState<number>(initialBalance);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleTopUp = (amount: number) => {
    setBalance((prev) => prev + amount);
    setFeedback(`+¥${amount.toLocaleString()} added via Apple Pay`);
    setTimeout(() => setFeedback(null), 2500);
  };

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
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
            <h3 className="font-semibold text-base text-text-primary">ICOCA Digital Card</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Close ICOCA modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Digital Card Graphic */}
        <div className="w-full bg-gradient-to-tr from-[#134235] via-[#2d5a4c] to-[#3a6758] text-white p-4 rounded-xl shadow-md relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[20px] text-primary-fixed">contactless</span>
              <span className="text-xs font-semibold tracking-wider text-primary-fixed uppercase">
                ICOCA Kansai
              </span>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 font-medium">
              Apple Wallet Active
            </span>
          </div>

          <div className="my-5">
            <span className="text-[11px] text-white/75 block">Live Transit Balance</span>
            <span className="text-2xl font-bold tracking-tight">¥{balance.toLocaleString()}</span>
            <span className="text-xs text-white/80 ml-2">(~${(balance / 154).toFixed(2)} USD)</span>
          </div>

          <div className="flex justify-between items-end text-[11px] text-white/70">
            <span>•••• 8421 (Elena R.)</span>
            <span>Kyoto Municipal Tap</span>
          </div>
        </div>

        {feedback && (
          <div className="p-2 rounded-lg bg-primary-fixed text-on-primary-fixed text-xs font-semibold text-center animate-in fade-in">
            {feedback}
          </div>
        )}

        {/* Quick Top-up simulator */}
        <div className="space-y-2">
          <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider block">
            Simulate 1-Tap Top-Up
          </span>
          <div className="grid grid-cols-3 gap-2">
            {[1000, 2000, 3000].map((amt) => (
              <button
                key={amt}
                onClick={() => handleTopUp(amt)}
                className="py-2 px-1 rounded-xl bg-surface-muted hover:bg-surface-container text-xs font-semibold text-text-primary transition-all active:scale-95 cursor-pointer"
              >
                +¥{amt.toLocaleString()}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Taps */}
        <div className="space-y-2 border-t border-border-hairline pt-3">
          <span className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider block">
            Recent Taps Today
          </span>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between items-center text-text-secondary">
              <span>Kyoto City Bus #206 (Stand D2)</span>
              <span className="font-semibold text-text-primary">-¥230</span>
            </div>
            <div className="flex justify-between items-center text-text-secondary">
              <span>FamilyMart Lawson Station Depot</span>
              <span className="font-semibold text-text-primary">-¥180</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
