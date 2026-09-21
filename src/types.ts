export type TabType = 'feed' | 'transit' | 'explore' | 'advisory';

export type CurrencyUnit = 'USD' | 'EUR' | 'GBP';

export interface PlaceItem {
  id: string;
  name: string;
  category: 'eat_sip' | 'sanctuaries' | 'culture' | 'stays';
  tags: string[];
  price: string;
  priceAmount: number;
  type: string;
  badge: string;
  badgeIcon: string;
  badgeType?: 'primary' | 'secondary' | 'warning' | 'tertiary';
  district: string;
  travelTime: string;
  description: string;
  quietScore: string;
  quietLevel: 1 | 2 | 3 | 4; // 1 = lowest noise / most serene
  highlight: string;
  image: string;
  imageAlt: string;
  openStatus?: string;
  isBookmarked?: boolean;
  coordinates?: { lat: number; lng: number };
}

export interface TransitRoute {
  id: string;
  origin: string;
  originSub: string;
  destination: string;
  destinationSub: string;
  distanceKm: number;
  durationMin: number;
  corridorVolume: 'Calm & Fluid' | 'Moderate' | 'Busy';
  volumeBars: number; // 1 to 4
  busOption: {
    line: string;
    subline: string;
    fareYen: number;
    intervalMin: number;
    tag: string;
  };
  taxiOption: {
    fareYenRange: string;
    fareUsdRange: string;
  };
  goAppOption: {
    fareYen: number;
    fareUsd: string;
  };
}

export interface AdvisoryItem {
  id: string;
  category: 'traps' | 'etiquette' | 'emergency';
  title: string;
  severity: 'high' | 'moderate' | 'info';
  severityLabel: string;
  district?: string;
  description: string;
  solutionTitle: string;
  solutionIcon: string;
  solutionText: string;
  phrase?: {
    japanese: string;
    english: string;
    romajiPronounce: string;
  };
}
