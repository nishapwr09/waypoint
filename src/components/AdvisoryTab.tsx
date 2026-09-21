import { useState } from 'react';
import { ETIQUETTE_GRID, MINDFUL_TRAVEL_IMAGE } from '../data/mockData';

interface AdvisoryTabProps {
  onOpenEmergencyModal: () => void;
  onShowToast: (message: string) => void;
}

export default function AdvisoryTab({ onOpenEmergencyModal, onShowToast }: AdvisoryTabProps) {
  const [activeSegment, setActiveSegment] = useState<'traps' | 'etiquette' | 'emergency'>('traps');

  const copyToClipboard = (text: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => onShowToast(`Copied: "${text}"`),
        () => onShowToast(`Phrase: "${text}"`)
      );
    } else {
      onShowToast(`Phrase: "${text}"`);
    }
  };

  const playPronunciation = (phrase: string, romaji: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(phrase);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
    onShowToast(`Pronunciation: "${romaji}"`);
  };

  return (
    <div className="flex flex-col w-full pb-12 animate-in fade-in duration-200">
      {/* Reassuring Awareness Header */}
      <div className="px-4 pt-2 pb-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            Kyoto Advisory Node · Live
          </span>
          <span className="text-xs text-text-tertiary">Updated today 08:30 JST</span>
        </div>
        <h2 className="text-xl font-bold text-text-primary tracking-tight">Mindful Orientation</h2>
        <p className="text-xs text-text-secondary mt-0.5">
          Quiet awareness to navigate Kyoto respectfully and avoid common travel frictions.
        </p>
      </div>

      {/* Segmented Control */}
      <div className="px-4 mb-5">
        <div className="grid grid-cols-3 p-1 rounded-full bg-surface-muted gap-1 text-center border border-border-hairline" role="tablist">
          <button
            onClick={() => setActiveSegment('traps')}
            aria-selected={activeSegment === 'traps'}
            className={`py-2 px-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSegment === 'traps'
                ? 'bg-surface-card text-primary shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            role="tab"
          >
            Common Traps
          </button>
          <button
            onClick={() => setActiveSegment('etiquette')}
            aria-selected={activeSegment === 'etiquette'}
            className={`py-2 px-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSegment === 'etiquette'
                ? 'bg-surface-card text-primary shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            role="tab"
          >
            Etiquette
          </button>
          <button
            onClick={() => setActiveSegment('emergency')}
            aria-selected={activeSegment === 'emergency'}
            className={`py-2 px-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              activeSegment === 'emergency'
                ? 'bg-surface-card text-primary shadow-xs'
                : 'text-text-secondary hover:text-text-primary'
            }`}
            role="tab"
          >
            Emergency
          </button>
        </div>
      </div>

      {/* TAB 1: Tourist Scams & Traps */}
      {(activeSegment === 'traps' || activeSegment === 'emergency') && (
        <div className="flex flex-col gap-4 px-4">
          {/* Advisory Card 1: Pontocho Izakaya */}
          <article className="bg-surface-card rounded-2xl p-4 shadow-sm border border-border-hairline relative overflow-hidden transition-all duration-200">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-warning-amber-soft"></div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-warning-amber-soft/15 text-warning-amber-deep text-[11px] font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-warning-amber-soft"></span>
                Moderate Caution · Verified
              </span>
              <button
                onClick={() =>
                  playPronunciation('Otoshi wa arimasu ka?', 'Oh-toh-shee wah ah-ree-mas kah?')
                }
                className="text-text-secondary hover:text-primary transition-colors p-1 cursor-pointer"
                title="Pronunciation audio hint"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">volume_up</span>
              </button>
            </div>

            <h3 className="text-sm font-bold text-text-primary tracking-tight mb-1.5">
              Unofficial Bar / Izakaya “Otoshi” Cover Charges
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-3">
              Some nightlife street touts in Pontocho and Kiyamachi promise cheap draft beers, then
              slip a ¥3,000 hidden seat charge (“Otoshi”) plus an automatic 20% late surcharge into
              the bill.
            </p>

            <div className="p-3 rounded-xl bg-surface-muted/70 border border-border-hairline flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[16px]">check_circle</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  How to avoid with grace
                </span>
              </div>
              <p className="text-xs text-text-primary">
                Look for the written “No Table Charge” badge, or politely ask before being seated:
              </p>
              <div className="flex items-center justify-between mt-1 pt-2 border-t border-border-hairline">
                <div>
                  <span className="text-xs font-bold text-primary">«Otoshi wa arimasu ka?»</span>
                  <span className="block text-[10px] text-text-tertiary">
                    Is there a compulsory seating snack charge?
                  </span>
                </div>
                <button
                  onClick={() => copyToClipboard('Otoshi wa arimasu ka?')}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-surface-card border border-border-hairline text-text-secondary text-xs font-medium shadow-xs hover:text-primary transition-colors cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">content_copy</span>
                  <span>Copy</span>
                </button>
              </div>
            </div>
          </article>

          {/* Advisory Card 2: Gion Private Photography */}
          <article className="bg-surface-card rounded-2xl p-4 shadow-sm border border-border-hairline relative overflow-hidden transition-all duration-200">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-error"></div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-error-container text-error text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[12px]">gavel</span>
                Strict Local By-Law · Fine Risk
              </span>
              <span className="text-[11px] text-text-tertiary font-medium">Gion South District</span>
            </div>

            <h3 className="text-sm font-bold text-text-primary tracking-tight mb-1.5">
              Gion Private Alleyway Photography Ban
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-3">
              Taking photos or recording video inside designated private streets (marked by subtle
              brown wooden signs with camera icons) carries an immediate on-the-spot fine of ¥10,000
              enforced by neighborhood patrols.
            </p>

            <div className="p-3 rounded-xl bg-surface-muted/70 border border-border-hairline flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-primary">
                <span className="material-symbols-outlined text-[16px]">verified_user</span>
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  Respectful Alternative
                </span>
              </div>
              <p className="text-xs text-text-primary leading-relaxed">
                Stick to public arterial streets such as Hanamikoji-dori. Maintain at least 3 meters of
                distance and never block or trail Maiko or Geiko proceeding to appointments.
              </p>
            </div>
          </article>

          {/* Advisory Card 3: Fake Monks */}
          <article className="bg-surface-card rounded-2xl p-4 shadow-sm border border-border-hairline relative overflow-hidden transition-all duration-200">
            <div className="absolute top-0 left-0 bottom-0 w-1 bg-warning-amber-deep"></div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-warning-amber-soft/15 text-warning-amber-deep text-[11px] font-semibold">
                <span className="material-symbols-outlined text-[13px]">report</span>
                Solicitation · Fushimi & Kiyomizu
              </span>
              <span className="text-[11px] text-text-tertiary font-medium">Temple Approaches</span>
            </div>

            <h3 className="text-sm font-bold text-text-primary tracking-tight mb-1.5">
              Blessing Bracelet Cash Solicitations
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed mb-3">
              Individuals posing in Buddhist robes hand out shiny gold talismans or wooden bead
              bracelets, then press for an aggressive ¥1,000 to ¥5,000 donation sign-up sheet. Authentic
              Japanese temples never send monks to solicit cash in streets.
            </p>

            <div className="p-3 rounded-xl bg-surface-muted/70 border border-border-hairline flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[18px] shrink-0">
                  front_hand
                </span>
                <span className="text-xs text-text-primary">
                  Firmly nod “No, thank you” (Iie, kekkou desu) and do not take the object into your
                  hands.
                </span>
              </div>
            </div>
          </article>
        </div>
      )}

      {/* TAB 2: Local Etiquette Essentials Grid */}
      {(activeSegment === 'etiquette' || activeSegment === 'emergency') && (
        <section className="mt-8 px-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-text-primary">Local Etiquette Essentials</h3>
              <p className="text-xs text-text-secondary">Unwritten cultural standards for a smooth journey</p>
            </div>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-muted text-primary">
              <span className="material-symbols-outlined text-[18px]">self_improvement</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {ETIQUETTE_GRID.map((item) => (
              <div
                key={item.title}
                className="bg-surface-card p-3.5 rounded-2xl shadow-sm border border-border-hairline flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-surface-muted flex items-center justify-center text-primary mb-2">
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <h4 className="text-xs font-bold text-text-primary mb-1">{item.title}</h4>
                  <p className="text-[11px] text-text-secondary leading-snug">{item.description}</p>
                </div>
                <span className="text-[10px] text-primary font-semibold mt-2.5">
                  {item.tag}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Calming Reassurance Card with Kyoto Visual Asset */}
      <section className="mt-6 px-4">
        <div className="bg-surface-card rounded-2xl p-4 shadow-sm border border-border-hairline flex items-center gap-3.5">
          <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
            <img
              className="w-full h-full object-cover"
              alt="Serene moss garden path at a traditional Zen temple in Kyoto"
              src={MINDFUL_TRAVEL_IMAGE}
            />
          </div>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
              Mindful Travel
            </span>
            <h4 className="text-sm font-bold text-text-primary truncate mt-0.5">Kyoto is very safe</h4>
            <p className="text-[11px] text-text-secondary leading-relaxed mt-1">
              Violent crime is extraordinarily rare. Awareness of subtle customs ensures your
              memories remain pure and harmonious.
            </p>
          </div>
        </div>
      </section>

      {/* TAB 3 / Persistent One-Tap Emergency Assistance Dock */}
      <aside className="mt-8 px-4">
        <div className="bg-primary text-white rounded-2xl p-4 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-fixed text-[20px]">shield</span>
              <span className="text-sm font-bold tracking-tight">One-Tap Emergency Dial</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[10px] font-semibold">
              Toll-Free in Japan
            </span>
          </div>
          <p className="text-xs text-white/80 mb-3.5 leading-relaxed">
            Direct dispatch channels connect directly to English interpretation dispatchers.
          </p>

          <div className="grid grid-cols-3 gap-2">
            {/* Police 110 */}
            <a
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary-container/70 hover:bg-primary-container active:scale-95 transition-all text-center cursor-pointer"
              href="tel:110"
            >
              <span className="material-symbols-outlined text-[24px] text-primary-fixed mb-1">
                local_police
              </span>
              <span className="text-sm font-bold text-white leading-tight">110</span>
              <span className="text-[10px] text-white/75 mt-0.5">Police SOS</span>
            </a>

            {/* Fire/Ambulance 119 */}
            <a
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary-container/70 hover:bg-primary-container active:scale-95 transition-all text-center cursor-pointer"
              href="tel:119"
            >
              <span className="material-symbols-outlined text-[24px] text-primary-fixed mb-1">
                ambulance
              </span>
              <span className="text-sm font-bold text-white leading-tight">119</span>
              <span className="text-[10px] text-white/75 mt-0.5">Medical / Fire</span>
            </a>

            {/* Tourist Helpline */}
            <a
              className="flex flex-col items-center justify-center p-3 rounded-xl bg-primary-container/70 hover:bg-primary-container active:scale-95 transition-all text-center cursor-pointer"
              href="tel:05038162720"
            >
              <span className="material-symbols-outlined text-[24px] text-primary-fixed mb-1">
                support_agent
              </span>
              <span className="text-sm font-bold text-white leading-tight">JNTO</span>
              <span className="text-[10px] text-white/75 mt-0.5">English 24/7</span>
            </a>
          </div>

          <div className="mt-3.5 pt-3 border-t border-primary-container flex items-center justify-between text-white/70">
            <span className="text-[11px]">Japan Visitor Hotline: 050-3816-2720</span>
            <button
              onClick={onOpenEmergencyModal}
              className="text-[11px] text-primary-fixed hover:underline flex items-center gap-0.5 cursor-pointer"
              type="button"
            >
              <span>More info</span>
              <span className="material-symbols-outlined text-[14px]">chevron_right</span>
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
