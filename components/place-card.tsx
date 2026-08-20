"use client";

import Image from 'next/image';
import Link from 'next/link';
import type { Place } from '@/lib/types';
import { GlassCard } from './glass-card';

type PlaceCardProps = {
  place: Place;
};

export function PlaceCard({ place }: PlaceCardProps) {
  return (
    <Link href={`/explore/${place.id}`} className="group block transition-transform duration-300 hover:scale-[1.02]">
      <GlassCard className="overflow-hidden p-3">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem]">
          <Image
            src={place.imageUrl}
            alt={place.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
        <div className="space-y-3 px-2 py-4">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-xl font-semibold tracking-tight text-ink">{place.name}</h3>
            <span className="rounded-full border border-black/8 bg-white/70 px-3 py-1 text-xs font-medium text-black/60">
              {place.category}
            </span>
          </div>
          <p className="text-sm font-medium text-[#B5651D]">
            {place.district} · {place.altitudeM} m
          </p>
          <p className="text-sm leading-6 text-black/65">{place.famousFor}</p>
          <div className="flex flex-wrap gap-2 pt-1 text-xs font-medium text-black/55">
            <span className="rounded-full bg-black/5 px-3 py-1">Best: {place.bestTimeToVisit}</span>
            <span className="rounded-full bg-black/5 px-3 py-1">{place.approxDistanceFromDehradunKm} km from Dehradun</span>
          </div>
        </div>
      </GlassCard>
    </Link>
  );
}
