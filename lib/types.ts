export type Place = {
  id: string;
  name: string;
  district: string;
  category: string;
  altitudeM: number;
  bestTimeToVisit: string;
  famousFor: string;
  approxDistanceFromDehradunKm: number;
  lat: number;
  lng: number;
  description: string;
  history: {
    era: string;
    builder?: string;
    significance: string;
    legends?: string;
  };
  openingHours: string;
  imageUrl: string;
  nearbyAlternativeId: string;
};

export type CrowdLevel = 'Low' | 'Moderate' | 'High';

export type CrowdForecast = {
  placeId: string;
  hourly: {
    hour: string;
    score: number;
    level: CrowdLevel;
  }[];
};

export type TrafficInfo = {
  placeId: string;
  bestDeparture: string;
  travelDuration: string;
  trafficLevel: string;
};

export type ItineraryPreferences = {
  days: number;
  budget: number;
  interests: string[];
  startingLocation: string;
  crowdTolerance: number;
  transportMode: 'Car' | 'Train' | 'Bus' | 'Two Wheeler' | 'Taxi';
};

export type Itinerary = {
  days: {
    day: number;
    title: string;
    stops: {
      time: string;
      placeId: string;
      activity: string;
      reason: string;
    }[];
  }[];
};

export type AssistantResponse = {
  answer: string;
  sources: { label: string; href?: string }[];
  matchedPlaceId?: string;
};