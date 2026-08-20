# Uttarakhand Heritage Explorer

Frontend MVP for a Smart India Hackathon project. This is a production-oriented Next.js 14 App Router app built for Vercel deployment.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React
- Recharts

## Mock-data seam

The app does not depend on a backend yet. All data flows through typed async functions in [`lib/api.ts`](lib/api.ts):

- `getPlaces()`
- `getCrowdPrediction(placeId)`
- `getTrafficInfo(placeId)`
- `getItinerary(prefs)`
- `askAssistant(query)`

Each function currently returns data from [`lib/mockData.ts`](lib/mockData.ts) after a small artificial delay so the UI behaves like it is calling a real service.

## Swapping in FastAPI later

When the backend is ready, keep the UI unchanged and replace the mock implementations in [`lib/api.ts`](lib/api.ts) with `fetch()` calls to your FastAPI endpoints.

Example shape:

```ts
export async function getPlaces() {
  const response = await fetch('https://api.example.com/places');
  return response.json();
}
```

Because the UI already consumes typed data models, the API swap should not require structural changes to the pages or components.

## Run locally

```bash
npm install
npm run dev
```

## Build for Vercel

```bash
npm run build
```

## Notes

- No localStorage is used.
- Images use Next.js `Image` with remote Unsplash-style URLs.
- The design system uses white glass panels, soft shadows, and a single terracotta accent.
