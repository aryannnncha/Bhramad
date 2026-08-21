"use client";

import { getPlaceById } from '@/lib/garhwalData';
import type { Itinerary } from '@/lib/types';
import { cn } from '@/lib/utils';
import { getCurrentCrowdLevel } from '@/lib/visitIntel';

type RouteMapProps = {
  itinerary: Itinerary | null;
  hub: string;
};

const bounds = { minLat: 29.55, maxLat: 31.15, minLng: 77.75, maxLng: 79.75 };

function project(lat: number, lng: number) {
  const x = ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * 100;
  return { x: Math.min(92, Math.max(8, x)), y: Math.min(90, Math.max(10, y)) };
}

function trafficColor(level: string) {
  if (level === 'High') return '#ef4444';
  if (level === 'Moderate') return '#f59e0b';
  return '#10b981';
}

export function RouteMap({ itinerary, hub }: RouteMapProps) {
  const stops =
    itinerary?.days.flatMap((day) =>
      day.stops.map((stop, index) => {
        const place = getPlaceById(stop.placeId);
        return place
          ? {
              ...place,
              time: stop.time,
              activity: stop.activity,
              sequence: `${day.day}.${index + 1}`,
            }
          : null;
      }),
    ).filter((stop): stop is NonNullable<typeof stop> => Boolean(stop)) ?? [];

  const uniqueStops = stops.filter((stop, index) => stops.findIndex((item) => item.id === stop.id) === index);

  return (
    <div className="relative h-full min-h-[32rem] overflow-hidden rounded-2xl bg-[#101418]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(181,101,29,0.28),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(16,185,129,0.12),transparent_30%)]" />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M18 78 C 22 60, 28 42, 40 34 S 62 22, 78 28 S 88 52, 82 70 S 54 88, 32 84 Z"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.4"
        />
        {uniqueStops.slice(0, -1).map((stop, index) => {
          const next = uniqueStops[index + 1];
          const a = project(stop.lat, stop.lng);
          const b = project(next.lat, next.lng);
          return (
            <line
              key={`${stop.id}-${next.id}`}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={trafficColor(getCurrentCrowdLevel(stop.id))}
              strokeWidth="0.7"
              strokeDasharray="1.6 1.1"
            />
          );
        })}
      </svg>

      {uniqueStops.map((stop) => {
        const point = project(stop.lat, stop.lng);
        return (
          <div
            key={stop.id}
            className="group absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: `${point.x}%`, top: `${point.y}%` }}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 bg-[#B5651D] text-xs font-bold text-white shadow-lg">
              {stop.sequence}
            </div>
            <div className="pointer-events-none absolute left-10 top-0 hidden w-48 rounded-2xl border border-white/15 bg-black/70 p-3 text-white shadow-glass backdrop-blur-xl group-hover:block">
              <p className="text-sm font-semibold">{stop.name}</p>
              <p className="mt-1 text-xs text-white/70">{stop.time} · {stop.district}</p>
              <p className="mt-1 text-xs text-white/80">{stop.activity}</p>
            </div>
          </div>
        );
      })}

      <div className="absolute left-4 top-4 rounded-2xl border border-white/15 bg-white/10 px-3 py-2 text-xs font-medium text-white/85 backdrop-blur-xl">
        Live route from {hub}
      </div>
      <div className="absolute bottom-4 left-4 flex gap-2 text-[10px] uppercase tracking-[0.18em] text-white/70">
        <span className={cn('rounded-full px-2 py-1', 'bg-emerald-500/20')}>Low</span>
        <span className="rounded-full bg-amber-500/20 px-2 py-1">Moderate</span>
        <span className="rounded-full bg-rose-500/20 px-2 py-1">High</span>
      </div>
    </div>
  );
}
