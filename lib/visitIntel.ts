import type { CrowdLevel, Place } from './types';
import { getCrowdForecastByPlaceId, getTrafficByPlaceId, places } from './garhwalData';

export type VisitIntel = {
  place: Place;
  score: number;
  bestWindow: string;
  crowdLevel: CrowdLevel;
  travelTime: string;
};

const featuredIds = [
  'jageshwar',
  'katarmal',
  'kedarnath',
  'haridwar',
  'rishikesh',
  'badrinath',
  'chopta',
  'mussoorie',
  'lansdowne',
];

export function getBestWindow(placeId: string) {
  const hourly = getCrowdForecastByPlaceId(placeId).hourly;
  const calm = [...hourly].sort((a, b) => a.score - b.score).slice(0, 3);
  const ordered = hourly.filter((slot) => calm.some((item) => item.hour === slot.hour));
  return `${ordered[0]?.hour ?? '7 AM'} – ${ordered[ordered.length - 1]?.hour ?? '10 AM'}`;
}

export function getSmartVisitScore(placeId: string) {
  const hourly = getCrowdForecastByPlaceId(placeId).hourly;
  const morning = hourly.slice(0, 5);
  const average = morning.reduce((sum, slot) => sum + slot.score, 0) / morning.length;
  return Math.max(12, Math.min(98, Math.round(100 - average)));
}

export function getCurrentCrowdLevel(placeId: string): CrowdLevel {
  const hourly = getCrowdForecastByPlaceId(placeId).hourly;
  const peak = hourly.reduce((best, slot) => (slot.score > best.score ? slot : best), hourly[0]);
  return peak.level;
}

export function getVisitIntel(place: Place): VisitIntel {
  return {
    place,
    score: getSmartVisitScore(place.id),
    bestWindow: getBestWindow(place.id),
    crowdLevel: getCurrentCrowdLevel(place.id),
    travelTime: getTrafficByPlaceId(place.id).travelDuration,
  };
}

export function getFeaturedPlaces() {
  const featured = featuredIds
    .map((id) => places.find((place) => place.id === id))
    .filter((place): place is Place => Boolean(place));

  return featured.length ? featured : places.slice(0, 9);
}

export function scoreTone(score: number) {
  if (score >= 80) return { label: 'Green', className: 'bg-emerald-500/15 text-emerald-700' };
  if (score >= 55) return { label: 'Amber', className: 'bg-amber-500/15 text-amber-700' };
  return { label: 'Alert', className: 'bg-rose-500/15 text-rose-700' };
}

export function crowdTone(level: CrowdLevel) {
  if (level === 'Low') return 'bg-emerald-500/12 text-emerald-700';
  if (level === 'Moderate') return 'bg-amber-500/12 text-amber-800';
  return 'bg-rose-500/12 text-rose-700';
}
