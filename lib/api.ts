import type { AssistantResponse, CrowdForecast, Itinerary, ItineraryPreferences, Place } from './types';
import {
  getAssistantResponse,
  getCrowdForecastByPlaceId,
  getItineraryDays,
  getTrafficByPlaceId,
  places,
} from './garhwalData';

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPlaces(): Promise<Place[]> {
  await delay(180);
  return places;
}

export async function getCrowdPrediction(placeId: string): Promise<CrowdForecast> {
  await delay(160);
  return getCrowdForecastByPlaceId(placeId);
}

export async function getTrafficInfo(placeId: string) {
  await delay(140);
  return getTrafficByPlaceId(placeId);
}

export async function getItinerary(prefs: ItineraryPreferences): Promise<Itinerary> {
  await delay(800);
  return getItineraryDays(prefs);
}

export async function askAssistant(query: string): Promise<AssistantResponse> {
  await delay(520);
  return getAssistantResponse(query);
}
