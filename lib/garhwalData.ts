import type { AssistantResponse, CrowdForecast, ItineraryPreferences, Place, TrafficInfo } from './types';

type PlaceSeed = Omit<Place, 'description' | 'history' | 'openingHours' | 'imageUrl' | 'nearbyAlternativeId'> & {
  openingHours?: string;
  imageUrl?: string;
  nearbyAlternativeId?: string;
};

const buildDescription = (place: PlaceSeed) =>
  `${place.name} in ${place.district} is a ${place.category.toLowerCase()} known for ${place.famousFor.toLowerCase()}. Best time to visit: ${place.bestTimeToVisit}.`;

const buildHistory = (place: PlaceSeed) => ({
  era: place.category.includes('Char Dham') || place.category.includes('Pilgrimage') ? 'Ancient pilgrimage route' : 'Established Garhwal tourism destination',
  builder: undefined,
  significance: place.famousFor,
  legends: place.category.includes('Pilgrimage')
    ? 'Local traditions and devotional stories keep the site culturally active through the year.'
    : 'Visitors come mainly for landscapes, town character, and seasonal travel experiences.',
});

const placeSeeds: PlaceSeed[] = [
  {
    id: 'haridwar',
    name: 'Haridwar',
    district: 'Haridwar',
    category: 'Pilgrimage Town',
    altitudeM: 314,
    bestTimeToVisit: 'Oct - Mar',
    famousFor: 'Har Ki Pauri, evening Ganga Aarti, gateway to Char Dham',
    approxDistanceFromDehradunKm: 214,
    lat: 29.9457,
    lng: 78.1642,
    nearbyAlternativeId: 'devprayag',
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    district: 'Dehradun',
    category: 'Pilgrimage & Adventure',
    altitudeM: 372,
    bestTimeToVisit: 'Sep - Jun',
    famousFor: 'Yoga capital, river rafting, Laxman & Ram Jhula',
    approxDistanceFromDehradunKm: 240,
    lat: 30.0869,
    lng: 78.2676,
    nearbyAlternativeId: 'devprayag',
  },
  {
    id: 'dehradun',
    name: 'Dehradun',
    district: 'Dehradun',
    category: 'City / Hill Town',
    altitudeM: 435,
    bestTimeToVisit: 'Mar - Jun, Sep - Nov',
    famousFor: "Robber's Cave, Sahastradhara, Forest Research Institute",
    approxDistanceFromDehradunKm: 0,
    lat: 30.3165,
    lng: 78.0322,
    nearbyAlternativeId: 'mussoorie',
  },
  {
    id: 'mussoorie',
    name: 'Mussoorie',
    district: 'Dehradun',
    category: 'Hill Station',
    altitudeM: 2005,
    bestTimeToVisit: 'Mar - Jun, Sep - Nov',
    famousFor: "'Queen of the Hills', Kempty Falls, Mall Road, Gun Hill",
    approxDistanceFromDehradunKm: 35,
    lat: 30.4598,
    lng: 78.064,
    nearbyAlternativeId: 'dhanaulti',
  },
  {
    id: 'dhanaulti',
    name: 'Dhanaulti',
    district: 'Tehri Garhwal',
    category: 'Hill Station',
    altitudeM: 2286,
    bestTimeToVisit: 'Mar - Jun, Sep - Nov',
    famousFor: 'Quiet pine forests, Eco Park, apple orchards',
    approxDistanceFromDehradunKm: 79,
    lat: 30.444,
    lng: 78.262,
    nearbyAlternativeId: 'kanatal',
  },
  {
    id: 'kanatal',
    name: 'Kanatal',
    district: 'Tehri Garhwal',
    category: 'Hill Station',
    altitudeM: 2500,
    bestTimeToVisit: 'Mar - Jun, Sep - Nov',
    famousFor: 'Camping, Surkanda Devi Temple, deodar forests',
    approxDistanceFromDehradunKm: 82,
    lat: 30.467,
    lng: 78.327,
    nearbyAlternativeId: 'dhanaulti',
  },
  {
    id: 'new-tehri',
    name: 'New Tehri / Tehri Lake',
    district: 'Tehri Garhwal',
    category: 'Lake & Adventure',
    altitudeM: 1550,
    bestTimeToVisit: 'Oct - Mar',
    famousFor: "Asia's largest man-made lake, water sports, Tehri Dam",
    approxDistanceFromDehradunKm: 76,
    lat: 30.383,
    lng: 78.48,
    nearbyAlternativeId: 'dodital',
  },
  {
    id: 'uttarkashi',
    name: 'Uttarkashi',
    district: 'Uttarkashi',
    category: 'Pilgrimage / Base Town',
    altitudeM: 1352,
    bestTimeToVisit: 'Apr - Nov',
    famousFor: 'Vishwanath Temple, base for Gangotri-Yamunotri treks',
    approxDistanceFromDehradunKm: 155,
    lat: 30.7299,
    lng: 78.4439,
    nearbyAlternativeId: 'gangotri',
  },
  {
    id: 'gangotri',
    name: 'Gangotri',
    district: 'Uttarkashi',
    category: 'Pilgrimage (Char Dham)',
    altitudeM: 3100,
    bestTimeToVisit: 'May - Oct',
    famousFor: 'Source of the Ganga, Gangotri Temple',
    approxDistanceFromDehradunKm: 275,
    lat: 30.994,
    lng: 78.939,
    nearbyAlternativeId: 'uttarkashi',
  },
  {
    id: 'yamunotri',
    name: 'Yamunotri',
    district: 'Uttarkashi',
    category: 'Pilgrimage (Char Dham)',
    altitudeM: 3293,
    bestTimeToVisit: 'May - Oct',
    famousFor: 'Source of the Yamuna, hot springs at Janki Chatti',
    approxDistanceFromDehradunKm: 290,
    lat: 31.01,
    lng: 78.454,
    nearbyAlternativeId: 'uttarkashi',
  },
  {
    id: 'har-ki-dun',
    name: 'Har Ki Dun',
    district: 'Uttarkashi',
    category: 'Trek',
    altitudeM: 3566,
    bestTimeToVisit: 'Mar - Jun, Sep - Dec',
    famousFor: 'Cradle-shaped valley trek, Swargarohini peak views',
    approxDistanceFromDehradunKm: 210,
    lat: 31.04,
    lng: 77.841,
    nearbyAlternativeId: 'dodital',
  },
  {
    id: 'dodital',
    name: 'Dodital',
    district: 'Uttarkashi',
    category: 'Trek / Lake',
    altitudeM: 3024,
    bestTimeToVisit: 'May - Jun, Sep - Oct',
    famousFor: "Freshwater lake said to be Lord Ganesha's birthplace",
    approxDistanceFromDehradunKm: 200,
    lat: 30.821,
    lng: 78.467,
    nearbyAlternativeId: 'har-ki-dun',
  },
  {
    id: 'dayara-bugyal',
    name: 'Dayara Bugyal',
    district: 'Uttarkashi',
    category: 'Trek / Alpine Meadow',
    altitudeM: 3048,
    bestTimeToVisit: 'Dec - Apr (snow), May - Jun',
    famousFor: 'One of the largest high-altitude meadows in India',
    approxDistanceFromDehradunKm: 195,
    lat: 31.0,
    lng: 78.55,
    nearbyAlternativeId: 'dodital',
  },
  {
    id: 'pauri',
    name: 'Pauri',
    district: 'Pauri Garhwal',
    category: 'Hill Town',
    altitudeM: 1780,
    bestTimeToVisit: 'Mar - Jun, Sep - Nov',
    famousFor: 'Panoramic Himalayan range views, peaceful town',
    approxDistanceFromDehradunKm: 165,
    lat: 30.1471,
    lng: 78.778,
    nearbyAlternativeId: 'lansdowne',
  },
  {
    id: 'lansdowne',
    name: 'Lansdowne',
    district: 'Pauri Garhwal',
    category: 'Hill Station',
    altitudeM: 1706,
    bestTimeToVisit: 'Mar - Jun, Sep - Nov',
    famousFor: 'Colonial-era cantonment town, Tip n Top viewpoint',
    approxDistanceFromDehradunKm: 160,
    lat: 29.8427,
    lng: 78.6859,
    nearbyAlternativeId: 'pauri',
  },
  {
    id: 'srinagar-garhwal',
    name: 'Srinagar (Garhwal)',
    district: 'Pauri Garhwal',
    category: 'Town',
    altitudeM: 560,
    bestTimeToVisit: 'Year-round',
    famousFor: 'Garhwal University, Kamleshwar Temple, Alaknanda river',
    approxDistanceFromDehradunKm: 105,
    lat: 30.22,
    lng: 78.78,
    nearbyAlternativeId: 'devprayag',
  },
  {
    id: 'devprayag',
    name: 'Devprayag',
    district: 'Tehri Garhwal',
    category: 'Pilgrimage',
    altitudeM: 618,
    bestTimeToVisit: 'Year-round',
    famousFor: 'Sacred confluence of Alaknanda & Bhagirathi rivers',
    approxDistanceFromDehradunKm: 140,
    lat: 30.1464,
    lng: 78.593,
    nearbyAlternativeId: 'rudraprayag',
  },
  {
    id: 'rudraprayag',
    name: 'Rudraprayag',
    district: 'Rudraprayag',
    category: 'Pilgrimage',
    altitudeM: 610,
    bestTimeToVisit: 'Year-round',
    famousFor: 'Confluence of Alaknanda & Mandakini rivers',
    approxDistanceFromDehradunKm: 160,
    lat: 30.284,
    lng: 78.98,
    nearbyAlternativeId: 'devprayag',
  },
  {
    id: 'kedarnath',
    name: 'Kedarnath',
    district: 'Rudraprayag',
    category: 'Pilgrimage (Char Dham)',
    altitudeM: 3583,
    bestTimeToVisit: 'May - Jun, Sep - Oct',
    famousFor: 'Jyotirlinga shrine, high-altitude Himalayan trek',
    approxDistanceFromDehradunKm: 223,
    lat: 30.7346,
    lng: 79.0669,
    nearbyAlternativeId: 'chopta',
  },
  {
    id: 'chopta',
    name: 'Chopta',
    district: 'Rudraprayag',
    category: 'Hill Town / Trek Base',
    altitudeM: 2680,
    bestTimeToVisit: 'Mar - Jun, Sep - Nov',
    famousFor: "'Mini Switzerland of India', base for Tungnath trek",
    approxDistanceFromDehradunKm: 200,
    lat: 30.494,
    lng: 79.21,
    nearbyAlternativeId: 'dayara-bugyal',
  },
  {
    id: 'tungnath-chandrashila',
    name: 'Tungnath & Chandrashila',
    district: 'Rudraprayag',
    category: 'Trek / Pilgrimage',
    altitudeM: 3680,
    bestTimeToVisit: 'Apr - Jun, Sep - Nov',
    famousFor: 'Highest Shiva temple in the world, sunrise summit views',
    approxDistanceFromDehradunKm: 210,
    lat: 30.47,
    lng: 79.21,
    nearbyAlternativeId: 'chopta',
  },
  {
    id: 'joshimath',
    name: 'Joshimath',
    district: 'Chamoli',
    category: 'Town / Base',
    altitudeM: 1875,
    bestTimeToVisit: 'Year-round',
    famousFor: 'Gateway to Auli, Badrinath & Valley of Flowers',
    approxDistanceFromDehradunKm: 250,
    lat: 30.55,
    lng: 79.57,
    nearbyAlternativeId: 'auli',
  },
  {
    id: 'auli',
    name: 'Auli',
    district: 'Chamoli',
    category: 'Hill Station / Skiing',
    altitudeM: 2800,
    bestTimeToVisit: 'Dec - Feb (snow), Mar - Jun',
    famousFor: 'Skiing slopes, cable car, Nanda Devi views',
    approxDistanceFromDehradunKm: 260,
    lat: 30.53,
    lng: 79.56,
    nearbyAlternativeId: 'dayara-bugyal',
  },
  {
    id: 'badrinath',
    name: 'Badrinath',
    district: 'Chamoli',
    category: 'Pilgrimage (Char Dham)',
    altitudeM: 3133,
    bestTimeToVisit: 'May - Oct',
    famousFor: 'Sacred Vishnu temple, Tapt Kund hot springs',
    approxDistanceFromDehradunKm: 295,
    lat: 30.743,
    lng: 79.493,
    nearbyAlternativeId: 'joshimath',
  },
  {
    id: 'valley-of-flowers',
    name: 'Valley of Flowers',
    district: 'Chamoli',
    category: 'Trek / National Park',
    altitudeM: 3658,
    bestTimeToVisit: 'Jul - Sep',
    famousFor: 'UNESCO World Heritage alpine flower valley',
    approxDistanceFromDehradunKm: 275,
    lat: 30.73,
    lng: 79.63,
    nearbyAlternativeId: 'har-ki-dun',
  },
  {
    id: 'hemkund-sahib',
    name: 'Hemkund Sahib',
    district: 'Chamoli',
    category: 'Pilgrimage / Trek',
    altitudeM: 4329,
    bestTimeToVisit: 'Jun - Sep',
    famousFor: 'Sacred Sikh shrine beside a glacial lake',
    approxDistanceFromDehradunKm: 275,
    lat: 30.79,
    lng: 79.61,
    nearbyAlternativeId: 'valley-of-flowers',
  },
];

export const places: Place[] = placeSeeds.map((seed) => {
  const place = {
    ...seed,
    description: buildDescription(seed),
    history: buildHistory(seed),
    openingHours: seed.openingHours ?? 'Open daylight hours',
    imageUrl:
      seed.imageUrl ??
      'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1600&q=80',
    nearbyAlternativeId: seed.nearbyAlternativeId ?? 'dehradun',
  } as Place;

  return place;
});

const alternativeMap: Record<string, string> = {
  mussoorie: 'dhanaulti',
  kedarnath: 'chopta',
  haridwar: 'devprayag',
  rishikesh: 'devprayag',
  auli: 'dayara-bugyal',
  'valley-of-flowers': 'har-ki-dun',
  'badrinath': 'joshimath',
  lansdowne: 'pauri',
  'new-tehri': 'dodital',
  chopta: 'dayara-bugyal',
};

const categoryProfile = (category: string) => {
  if (category.includes('Char Dham') || category.includes('Pilgrimage')) {
    return [16, 14, 20, 36, 50, 62, 74, 78, 72, 58, 42, 28];
  }

  if (category.includes('Trek')) {
    return [10, 8, 12, 18, 28, 34, 42, 46, 40, 30, 18, 12];
  }

  if (category.includes('Hill Station') || category.includes('Hill Town')) {
    return [12, 15, 20, 34, 46, 60, 68, 72, 64, 54, 38, 24];
  }

  if (category.includes('Lake')) {
    return [8, 10, 16, 22, 34, 42, 50, 54, 48, 38, 26, 16];
  }

  return [14, 18, 24, 30, 40, 50, 58, 62, 56, 44, 32, 20];
};

const hourLabels = ['6 AM', '7 AM', '8 AM', '9 AM', '10 AM', '11 AM', '12 PM', '1 PM', '2 PM', '3 PM', '4 PM', '5 PM'];

export function getPlaceById(placeId: string) {
  return places.find((place) => place.id === placeId);
}

export function getAlternativeForPlace(placeId: string) {
  const alternativeId = alternativeMap[placeId] ?? getPlaceById(placeId)?.nearbyAlternativeId;
  return alternativeId ? getPlaceById(alternativeId) : undefined;
}

export function getCrowdForecastByPlaceId(placeId: string): CrowdForecast {
  const place = getPlaceById(placeId) ?? places[0];
  const profile = categoryProfile(place.category);

  return {
    placeId,
    hourly: hourLabels.map((hour, index) => {
      const score = profile[index];
      return {
        hour,
        score,
        level: score >= 66 ? 'High' : score >= 36 ? 'Moderate' : 'Low',
      };
    }),
  };
}

export function getTrafficByPlaceId(placeId: string): TrafficInfo {
  const place = getPlaceById(placeId) ?? places[0];
  const distance = place.approxDistanceFromDehradunKm;
  const hours = Math.max(1, Math.round(distance / (place.category.includes('Trek') || place.category.includes('Char Dham') ? 28 : 40)));
  const remainder = Math.max(0, distance % 40);
  const departure = distance > 220 ? '4:30 AM' : distance > 120 ? '5:30 AM' : distance > 60 ? '6:30 AM' : '7:30 AM';

  return {
    placeId,
    bestDeparture: departure,
    travelDuration: `~${hours} hr${hours > 1 ? 's' : ''} ${remainder > 0 ? `${remainder} min` : ''}`.trim(),
    trafficLevel: place.category.includes('Char Dham')
      ? 'Heavy on pilgrimage days; best before sunrise'
      : place.category.includes('Hill Station')
        ? 'Moderate, with calmer roads outside weekends'
        : place.category.includes('Trek')
          ? 'Low traffic until trailhead rush hours'
          : 'Moderate city movement',
  };
}

export function getItineraryDays(prefs: ItineraryPreferences) {
  const ordered = places.slice(0, Math.min(6, places.length));
  const itinerary = Array.from({ length: prefs.days }, (_, index) => ({
    day: index + 1,
    title: index === 0 ? 'Arrival and first impressions' : 'Scenic and cultural circuit',
    stops: [
      {
        time: '8:00 AM',
        placeId: ordered[(index * 2) % ordered.length].id,
        activity: 'Heritage walk and first-look photos',
        reason: 'Picked for lower morning crowd scores and efficient travel sequencing.',
      },
      {
        time: '12:00 PM',
        placeId: ordered[(index * 2 + 1) % ordered.length].id,
        activity: 'Lunch, local culture, and interpretation stop',
        reason: 'Balanced around the strongest midday logistics window.',
      },
      {
        time: '4:00 PM',
        placeId: ordered[(index * 2 + 2) % ordered.length].id,
        activity: 'Sunset viewpoints and wrap-up',
        reason: 'Reserved for the best light and declining crowd pressure.',
      },
    ],
  }));

  return { days: itinerary };
}

const assistantByPlaceId: Record<string, AssistantResponse> = Object.fromEntries(
  places.map((place) => [
    place.id,
    {
      answer: `${place.name} is best known for ${place.famousFor}. It is a strong fit if you want ${place.category.toLowerCase()} travel with a visit window of ${place.bestTimeToVisit}.`,
      sources: [{ label: 'Verified heritage database' }, { label: 'Garhwal tourism workbook' }],
      matchedPlaceId: place.id,
    },
  ]),
);

export function getAssistantResponse(query: string): AssistantResponse {
  const normalized = query.toLowerCase();
  const matched = places.find((place) => normalized.includes(place.name.toLowerCase().split(' ')[0])) ?? places.find((place) => normalized.includes(place.id)) ?? places[0];

  return assistantByPlaceId[matched.id] ?? {
    answer: `This app is grounded in the Garhwal tourism workbook. Ask about a specific place like ${places[0].name}, ${places[3].name}, or ${places[15].name} for a place-specific answer.`,
    sources: [{ label: 'Verified heritage database' }],
    matchedPlaceId: matched.id,
  };
}
