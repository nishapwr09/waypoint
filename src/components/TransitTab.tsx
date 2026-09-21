import { useState } from 'react';
import { TRANSIT_ROUTES, TRANSIT_TIP_IMAGE } from '../data/mockData';
import { CurrencyUnit } from '../types';

interface TransitTabProps {
  currencyUnit: CurrencyUnit;
  onCurrencyToggle: () => void;
  onOpenIcoca: () => void;
}

export default function TransitTab({ currencyUnit, onCurrencyToggle, onOpenIcoca }: TransitTabProps) {
  const [selectedRouteId, setSelectedRouteId] = useState('route-1');
  const activeRoute = TRANSIT_ROUTES.find((r) => r.id === selectedRouteId) || TRANSIT_ROUTES[0];

  const rate = currencyUnit === 'USD' ? 152 : currencyUnit === 'EUR' ? 166 : 195;
  const currSymbol = currencyUnit === 'USD' ? '$' : currencyUnit === 'EUR' ? '€' : '£';

  return (
    <div className="flex flex-col w-full px-4 pb-12 space-y-5 animate-in fade-in duration-200">
      {/* Reassurance Micro-banner */}
      <div className="flex items-center justify-between px-3.5 py-2.5 rounded-full bg-surface-muted shadow-xs border border-border-hairline">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="material-symbols-outlined text-[18px] text-primary shrink-0"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            verified_user
          </span>
          <span className="text-xs text-text-secondary truncate font-medium">
            Fixed flat fares active · Zero surge pricing today
          </span>
        </div>
        <span className="flex h-2 w-2 relative shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
      </div>

      {/* Route Card */}
      <div className="rounded-2xl bg-surface-card p-4 shadow-sm border border-border-hairline relative overflow-hidden">
        <div className="flex items-center justify-between mb-3.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-muted text-text-secondary text-xs font-semibold">
            <span className="material-symbols-outlined text-[14px]">route</span>
            <span>Route Estimator</span>
          </div>

          {/* Switchable route selector */}
          <select
            value={selectedRouteId}
            onChange={(e) => setSelectedRouteId(e.target.value)}
            className="text-xs bg-surface-muted rounded-lg px-2 py-1 font-semibold text-text-primary border border-border-hairline cursor-pointer focus:outline-none"
            aria-label="Select destination"
          >
            {TRANSIT_ROUTES.map((route) => (
              <option key={route.id} value={route.id}>
                {route.destination.split(' ')[0]} ({route.distanceKm} km)
              </option>
            ))}
          </select>
        </div>

        {/* Stations Layout */}
        <div className="relative pl-6 space-y-3.5">
          {/* Dotted Line Tracker */}
          <div className="absolute left-2.5 top-2 bottom-2 w-0.5 bg-surface-container"></div>

          {/* Departure */}
          <div className="relative flex items-center justify-between">
            <div className="absolute -left-6 w-3 h-3 rounded-full bg-primary shadow-[0_0_0_3px_#F4F1EA]"></div>
            <div className="min-w-0 pr-2">
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
                Origin
              </p>
              <h3 className="text-sm font-bold text-text-primary truncate">
                {activeRoute.origin}
              </h3>
            </div>
            <span className="text-[11px] text-text-secondary shrink-0 px-2 py-0.5 rounded bg-surface-muted font-medium">
              {activeRoute.originSub}
            </span>
          </div>

          {/* Destination */}
          <div className="relative flex items-center justify-between pt-1">
            <div className="absolute -left-6 w-3 h-3 rounded-full bg-warning-amber-deep shadow-[0_0_0_3px_#F4F1EA]"></div>
            <div className="min-w-0 pr-2">
              <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider">
                Destination
              </p>
              <h3 className="text-sm font-bold text-text-primary truncate">
                {activeRoute.destination}
              </h3>
            </div>
            <span className="text-[11px] text-text-secondary shrink-0 px-2 py-0.5 rounded bg-surface-muted font-medium">
              {activeRoute.destinationSub}
            </span>
          </div>
        </div>

        {/* Live Crowd Density Meter */}
        <div className="mt-4 pt-3.5 border-t border-border-hairline flex items-center justify-between">
          <span className="text-xs text-text-secondary">Corridor volume</span>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1">
              <span className="w-4 h-1.5 rounded-full bg-primary"></span>
              <span
                className={`w-4 h-1.5 rounded-full ${
                  activeRoute.volumeBars >= 2 ? 'bg-primary' : 'bg-surface-container'
                }`}
              ></span>
              <span
                className={`w-4 h-1.5 rounded-full ${
                  activeRoute.volumeBars >= 3 ? 'bg-warning-amber-deep' : 'bg-surface-container'
                }`}
              ></span>
              <span
                className={`w-4 h-1.5 rounded-full ${
                  activeRoute.volumeBars >= 4 ? 'bg-error' : 'bg-surface-container'
                }`}
              ></span>
            </div>
            <span className="text-xs text-primary font-bold ml-1">{activeRoute.corridorVolume}</span>
          </div>
        </div>
      </div>

      {/* Benchmark Fare Comparison */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between px-1">
          <h2 className="text-sm font-bold text-text-primary">Fare Benchmarks</h2>
          <span className="text-xs text-text-tertiary">Real-time official rates</span>
        </div>

        {/* Card A: Kyoto City Bus #206 (Recommended) */}
        <div className="rounded-2xl bg-surface-card p-4 shadow-sm border border-border-hairline relative overflow-hidden transition-all duration-200">
          <div className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              eco
            </span>
            <span>{activeRoute.busOption.tag}</span>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-[22px]">directions_bus</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-text-primary">{activeRoute.busOption.line}</h3>
              <p className="text-xs text-text-secondary mt-0.5">{activeRoute.busOption.subline}</p>
            </div>
          </div>

          <div className="mt-3.5 p-3 rounded-xl bg-surface-muted flex items-baseline justify-between">
            <div>
              <span className="text-xl font-bold text-primary">¥{activeRoute.busOption.fareYen}</span>
              <span className="text-xs text-text-secondary ml-1">flat rate</span>
            </div>
            <span className="text-xs text-text-secondary font-medium">
              ~{currSymbol}{(activeRoute.busOption.fareYen / rate).toFixed(2)} {currencyUnit}
            </span>
          </div>

          {/* Detail Points */}
          <div className="mt-3 space-y-1.5">
            <div className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0 mt-0.5">
                contactless
              </span>
              <p className="text-xs text-text-secondary leading-snug">
                Tap IC Card on exit (Suica, Pasmo, ICOCA) or pay exact coin amount.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                schedule
              </span>
              <p className="text-xs text-text-secondary">
                Departs every {activeRoute.busOption.intervalMin} minutes
              </p>
            </div>
          </div>
        </div>

        {/* Card B: Standard City Taxi (Metered) */}
        <div className="rounded-2xl bg-surface-card p-4 shadow-sm border border-border-hairline transition-all duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-text-secondary text-[22px]">local_taxi</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-text-primary">City Taxi (Metered)</h3>
                <p className="text-xs text-text-secondary mt-0.5">Flag down or main taxi stand</p>
              </div>
            </div>
          </div>

          <div className="mt-3.5 p-3 rounded-xl bg-surface-muted flex items-baseline justify-between">
            <span className="text-base font-bold text-text-primary">
              {activeRoute.taxiOption.fareYenRange}
            </span>
            <span className="text-xs text-text-secondary font-medium">
              {activeRoute.taxiOption.fareUsdRange}
            </span>
          </div>

          {/* Rule Callout */}
          <div className="mt-3 p-2.5 rounded-xl bg-surface-container flex items-start gap-2">
            <span className="material-symbols-outlined text-[17px] text-primary shrink-0 mt-0.5">
              info
            </span>
            <p className="text-xs text-text-primary leading-relaxed">
              <span className="font-bold">Local Etiquette:</span> Rear passenger doors open automatically.
              Do not pull door. Absolutely no tipping accepted.
            </p>
          </div>
        </div>

        {/* Card C: Ride-hail / GO App */}
        <div className="rounded-2xl bg-surface-card p-4 shadow-sm border border-border-hairline transition-all duration-200">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-surface-muted flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-text-secondary text-[22px]">smartphone</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-text-primary">GO App Dispatch</h3>
                <p className="text-xs text-text-secondary mt-0.5">Japan's leading e-hail service</p>
              </div>
            </div>
          </div>

          <div className="mt-3.5 p-3 rounded-xl bg-surface-muted flex items-baseline justify-between">
            <div>
              <span className="text-base font-bold text-text-primary">
                ¥{activeRoute.goAppOption.fareYen.toLocaleString()}
              </span>
              <span className="text-xs text-text-secondary ml-1">estimate</span>
            </div>
            <span className="text-xs text-text-secondary font-medium">
              ~{currSymbol}{(activeRoute.goAppOption.fareYen / rate).toFixed(2)} {currencyUnit}
            </span>
          </div>

          <div className="mt-3 flex items-start gap-2">
            <span className="material-symbols-outlined text-[16px] text-text-tertiary shrink-0 mt-0.5">
              receipt_long
            </span>
            <p className="text-xs text-text-secondary leading-snug">
              Includes standard ¥400 app reservation/pickup surcharge. Card billed automatically.
            </p>
          </div>
        </div>
      </div>

      {/* Visual Break / Scenic Spot Context */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm h-36 flex flex-col justify-end p-4 border border-border-hairline">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${TRANSIT_TIP_IMAGE}')` }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent"></div>
        <div className="relative z-10 text-white">
          <span className="text-[10px] font-bold bg-primary/90 px-2 py-0.5 rounded-full inline-block mb-1 shadow-xs">
            Local Transit Tip
          </span>
          <p className="text-sm font-bold text-white">Buses accept Apple Wallet Suica seamlessly</p>
          <p className="text-xs text-white/90">No network connection required at the exit validator gate.</p>
        </div>
      </div>

      {/* Day Pass Decision Guide */}
      <div className="rounded-2xl bg-surface-card p-4 shadow-sm border border-border-hairline space-y-3.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-secondary-container flex items-center justify-center">
            <span className="material-symbols-outlined text-[16px] text-secondary">help_outline</span>
          </div>
          <h3 className="text-sm font-bold text-text-primary">Do I need a day pass?</h3>
        </div>

        {/* Advisory Bento */}
        <div className="p-3.5 rounded-xl bg-surface-muted space-y-2 border border-border-hairline">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-bold text-text-primary">Subway & Bus 1-Day Pass</span>
            <span className="text-sm font-bold text-primary">¥1,100</span>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed">
            Economical only if taking <span className="font-semibold text-text-primary">5 or more trips</span> today. For 1–3 short hops, individual IC card taps are simpler and cheaper.
          </p>
          <div className="pt-1 flex items-center gap-1.5 text-primary text-xs font-semibold">
            <span className="material-symbols-outlined text-[16px]">phone_iphone</span>
            <span>Digital pass available instantly via smartphone</span>
          </div>
        </div>

        {/* Accepted Payment Badges */}
        <div>
          <p className="text-[10px] font-bold text-text-tertiary uppercase tracking-wider mb-2">
            Universal Payment Modes
          </p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onOpenIcoca}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-muted hover:bg-surface-container transition-colors text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-text-primary">phone_iphone</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-text-primary leading-tight">Apple / Google</p>
                <p className="text-[10px] text-text-secondary truncate">Mobile IC (Suica/Pasmo)</p>
              </div>
            </button>

            <button
              onClick={onOpenIcoca}
              className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-muted hover:bg-surface-container transition-colors text-left cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px] text-text-primary">credit_card</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-text-primary leading-tight">Physical IC Cards</p>
                <p className="text-[10px] text-text-secondary truncate">ICOCA, Suica, Pasmo</p>
              </div>
            </button>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-muted">
              <span className="material-symbols-outlined text-[20px] text-text-primary">payments</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-text-primary leading-tight">Yen Cash</p>
                <p className="text-[10px] text-text-secondary truncate">Coins & ¥1,000 notes</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-surface-muted">
              <span className="material-symbols-outlined text-[20px] text-text-primary">contactless</span>
              <div className="min-w-0">
                <p className="text-xs font-bold text-text-primary leading-tight">Visa Tap-to-Pay</p>
                <p className="text-[10px] text-text-secondary truncate">Subway gates & Taxis</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Airport Transfer Benchmark Section */}
      <div className="rounded-2xl bg-surface-card p-4 shadow-sm border border-border-hairline space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">flight</span>
            <h3 className="text-sm font-bold text-text-primary">Airport Transfer Benchmark</h3>
          </div>
          <span className="text-xs text-text-secondary font-medium">KIX ⇄ Kyoto</span>
        </div>
        <p className="text-xs text-text-secondary">
          Fixed transparent travel options from Kansai International Airport.
        </p>

        {/* 2 Column Benchmark Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
          {/* Option 1: JR Haruka */}
          <div className="p-3.5 rounded-xl bg-surface-muted flex flex-col justify-between space-y-2 border border-border-hairline">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-primary">JR Haruka Express</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed">
                  Fastest
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">Direct high-speed train</p>
            </div>
            <div className="flex items-baseline justify-between pt-2 border-t border-border-hairline/60">
              <div>
                <span className="text-sm font-bold text-text-primary">¥3,640</span>
                <span className="text-[10px] text-text-secondary block">Reserved seat</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-primary">75 min</span>
                <span className="text-[10px] text-text-secondary block">Direct track</span>
              </div>
            </div>
          </div>

          {/* Option 2: Limousine Bus */}
          <div className="p-3.5 rounded-xl bg-surface-muted flex flex-col justify-between space-y-2 border border-border-hairline">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-text-primary">Limousine Bus</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-surface-container text-text-secondary">
                  Direct Luggage
                </span>
              </div>
              <p className="text-xs text-text-secondary mt-1">Direct to Kyoto Station Hachijo</p>
            </div>
            <div className="flex items-baseline justify-between pt-2 border-t border-border-hairline/60">
              <div>
                <span className="text-sm font-bold text-text-primary">¥2,800</span>
                <span className="text-[10px] text-text-secondary block">Includes 2 bags</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold text-text-primary">85 min</span>
                <span className="text-[10px] text-text-secondary block">Curbside</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Currency Helper Pill */}
      <div className="p-3.5 rounded-2xl bg-surface-muted flex items-center justify-between border border-border-hairline">
        <div className="flex items-center gap-2.5">
          <span className="material-symbols-outlined text-[20px] text-text-secondary">
            currency_exchange
          </span>
          <div className="min-w-0">
            <p className="text-xs font-bold text-text-primary">Auto Exchange Calculation</p>
            <p className="text-[11px] text-text-secondary">Rates pegged at ¥{rate} = 1.00 {currencyUnit}</p>
          </div>
        </div>
        <button
          onClick={onCurrencyToggle}
          className="px-3 py-1.5 rounded-full bg-surface-card text-primary font-bold text-xs shadow-xs hover:bg-surface-container active:scale-95 transition-all cursor-pointer border border-border-hairline"
        >
          Change ({currencyUnit})
        </button>
      </div>
    </div>
  );
}
