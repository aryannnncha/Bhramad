"use client";

import Image from 'next/image';
import { useState } from 'react';
import { Clock3, MapPinned, Route, X } from 'lucide-react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { getAlternativeForPlace, getCrowdForecastByPlaceId, getPlaceById } from '@/lib/garhwalData';
import { crowdTone, getFeaturedPlaces, getVisitIntel, scoreTone } from '@/lib/visitIntel';
import type { Place } from '@/lib/types';
import { GlassCard } from './glass-card';
import { MotionSection } from './motion-section';
import { SectionHeading } from './section-heading';
import { cn } from '@/lib/utils';

export function DestinationPortal() {
  const [selected, setSelected] = useState<Place | null>(null);
  const places = getFeaturedPlaces();
  const jageshwar = getPlaceById('jageshwar');
  const katarmal = getPlaceById('katarmal');
  const forecast = selected ? getCrowdForecastByPlaceId(selected.id) : null;
  const alternative = selected ? getAlternativeForPlace(selected.id) : undefined;

  return (
    <>
      <MotionSection className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <GlassCard className="overflow-hidden p-0">
            <div className="grid gap-0 lg:grid-cols-[1.15fr_0.85fr]">
              <div className="p-6 sm:p-8">
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#B5651D]">AI Hidden Heritage Discovery</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                  Peak crowd at Jageshwar → auto-suggest Katarmal
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-black/65 sm:text-base">
                  When a popular temple hits capacity, the system reroutes you to a quieter, high-value alternative instead of leaving you in a queue.
                </p>
                <div className="mt-6 flex flex-wrap gap-3 text-sm">
                  <span className="rounded-full bg-rose-500/10 px-4 py-2 font-medium text-rose-700">Jageshwar · High crowd</span>
                  <span className="rounded-full bg-emerald-500/10 px-4 py-2 font-medium text-emerald-700">Katarmal · 18 km · Low crowd</span>
                </div>
              </div>
              <div className="relative min-h-[16rem] overflow-hidden bg-[#1b140f]">
                {katarmal ? (
                  <Image src={katarmal.imageUrl} alt={katarmal.name} fill className="object-cover opacity-80" sizes="40vw" />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <p className="text-xs uppercase tracking-[0.22em] text-white/70">Suggested now</p>
                  <p className="mt-1 text-2xl font-semibold">{katarmal?.name ?? 'Katarmal'}</p>
                  <p className="mt-1 text-sm text-white/80">Ideal visit score 90/100 · {jageshwar ? '18 km from Jageshwar' : 'Quiet sun-temple circuit'}</p>
                </div>
              </div>
            </div>
          </GlassCard>

          <SectionHeading
            eyebrow="Explore"
            title="Destinations scored for calm access, not just popularity."
            description="Open any card for verified history, architecture, legends, and an hourly crowd forecast."
          />

          <div id="explore" className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {places.map((place) => {
              const intel = getVisitIntel(place);
              const tone = scoreTone(intel.score);
              return (
                <button
                  key={place.id}
                  type="button"
                  onClick={() => setSelected(place)}
                  className="text-left transition-transform duration-300 hover:scale-[1.015]"
                >
                  <GlassCard className="overflow-hidden p-3">
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image src={place.imageUrl} alt={place.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                      <span className={cn('absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur-md', tone.className)}>
                        {intel.score}/100 {tone.label}
                      </span>
                    </div>
                    <div className="space-y-3 px-2 py-4">
                      <div>
                        <h3 className="text-xl font-semibold tracking-tight text-ink">{place.name}</h3>
                        <p className="mt-1 text-sm text-[#B5651D]">{place.district}</p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-medium">
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-black/65">
                          <Clock3 className="h-3.5 w-3.5" /> {intel.bestWindow}
                        </span>
                        <span className={cn('rounded-full px-3 py-1', crowdTone(intel.crowdLevel))}>{intel.crowdLevel} crowd</span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-3 py-1 text-black/65">
                          <Route className="h-3.5 w-3.5" /> {intel.travelTime}
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </button>
              );
            })}
          </div>
        </div>
      </MotionSection>

      {selected && forecast ? (
        <div className="fixed inset-0 z-[70] flex justify-end bg-black/40 backdrop-blur-sm">
          <button type="button" className="h-full flex-1" onClick={() => setSelected(null)} aria-label="Close detail" />
          <aside className="h-full w-full max-w-xl overflow-y-auto border-l border-white/20 bg-white/88 p-5 shadow-2xl backdrop-blur-2xl sm:p-7">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#B5651D]">{selected.district}</p>
                <h3 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{selected.name}</h3>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="rounded-2xl bg-black/5 p-2">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="relative mt-5 h-48 overflow-hidden rounded-2xl">
              <Image src={selected.imageUrl} alt={selected.name} fill className="object-cover" sizes="32rem" />
            </div>
            <div className="mt-6 space-y-4 text-sm leading-7 text-black/70">
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="font-semibold text-ink">Verified historical background</p>
                <p className="mt-1">{selected.history.significance}</p>
                <p className="mt-2 text-black/55">Era: {selected.history.era}</p>
              </div>
              <div className="rounded-2xl bg-white/70 p-4">
                <p className="font-semibold text-ink">Architecture highlights</p>
                <p className="mt-1">{selected.famousFor}. {selected.description}</p>
              </div>
              {selected.history.legends ? (
                <div className="rounded-2xl bg-white/70 p-4">
                  <p className="font-semibold text-ink">Legends</p>
                  <p className="mt-1">{selected.history.legends}</p>
                </div>
              ) : null}
              {alternative ? (
                <div className="flex items-center gap-2 rounded-2xl bg-[#B5651D]/10 p-4 text-[#B5651D]">
                  <MapPinned className="h-4 w-4" />
                  Auto-alternative if crowded: {alternative.name}
                </div>
              ) : null}
            </div>
            <div className="mt-6 h-64">
              <p className="mb-3 text-sm font-semibold text-ink">Hourly crowd forecast</p>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={forecast.hourly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(17,17,17,0.08)" />
                  <XAxis dataKey="hour" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="score" fill="#B5651D" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
