import { useState } from 'react';

interface CurrencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  baseRateUsd?: number; // e.g. 154
}

export default function CurrencyModal({ isOpen, onClose, baseRateUsd = 154 }: CurrencyModalProps) {
  const [yenAmount, setYenAmount] = useState<number>(10000);
  const [targetCurrency, setTargetCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');

  if (!isOpen) return null;

  const rates: Record<'USD' | 'EUR' | 'GBP', number> = {
    USD: baseRateUsd,
    EUR: 166.5,
    GBP: 195.2,
  };

  const converted = (yenAmount / rates[targetCurrency]).toFixed(2);

  const presets = [500, 1000, 3000, 5000, 10000, 30000];

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
            <span className="material-symbols-outlined text-primary">currency_yen</span>
            <h3 className="font-semibold text-base text-text-primary">Fair Spot Converter</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-text-secondary hover:text-text-primary cursor-pointer"
            aria-label="Close currency modal"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        <div className="flex gap-1.5 p-1 rounded-full bg-surface-muted">
          {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
            <button
              key={curr}
              onClick={() => setTargetCurrency(curr)}
              className={`flex-1 py-1.5 rounded-full text-xs font-semibold transition-all ${
                targetCurrency === curr
                  ? 'bg-surface-card text-primary shadow-xs'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {curr} ({curr === 'USD' ? '$' : curr === 'EUR' ? '€' : '£'})
            </button>
          ))}
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-[11px] font-semibold text-text-tertiary uppercase tracking-wider block mb-1">
              Japanese Yen (JPY)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary font-semibold">
                ¥
              </span>
              <input
                type="number"
                value={yenAmount || ''}
                onChange={(e) => setYenAmount(Math.max(0, Number(e.target.value)))}
                className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-surface-muted border border-border-hairline text-sm font-semibold text-text-primary focus:outline-none focus:border-primary"
                placeholder="Enter Yen"
              />
            </div>
          </div>

          {/* Quick presets */}
          <div className="flex flex-wrap gap-1.5">
            {presets.map((preset) => (
              <button
                key={preset}
                onClick={() => setYenAmount(preset)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors cursor-pointer ${
                  yenAmount === preset
                    ? 'bg-primary text-white'
                    : 'bg-surface-muted text-text-secondary hover:bg-surface-container'
                }`}
              >
                ¥{preset.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-surface-muted border border-border-hairline flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs text-text-secondary">Estimated Equivalent</span>
              <span className="text-xl font-bold text-primary">
                {targetCurrency === 'USD' ? '$' : targetCurrency === 'EUR' ? '€' : '£'}
                {converted}
              </span>
            </div>
            <div className="text-right text-[11px] text-text-tertiary">
              <span>Fair Market Benchmark</span>
              <span className="block font-medium text-text-secondary">
                1 {targetCurrency} = ¥{rates[targetCurrency]}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
