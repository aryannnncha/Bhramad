"use client";

import { useEffect, useState } from 'react';
import { CalendarDays, IndianRupee, Loader2, MapPin, Sparkles, TrainFront, Users } from 'lucide-react';
import { getItinerary } from '@/lib/api';
import { getPlaceById } from '@/lib/garhwalData';
import type { Itinerary, ItineraryPreferences } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { GlassCard } from './glass-card';
import { RouteMap } from './route-map';
import { SectionHeading } from './section-heading';
import { usePortal } from './portal-context';

const transportOptions: ItineraryPreferences['transportMode'][] = ['Car', 'Train', 'Bus', 'Two Wheeler', 'Taxi'];
const crowdLabels = [
  { value: 20, label: 'Low' },
  { value: 50, label: 'Moderate' },
  { value: 85, label: 'High' },
];

export function SmartPlannerView() {
  const { plannerPrefs, setPlannerPrefs, generateSignal } = usePortal();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);

  const generate = async (prefs = plannerPrefs) => {
    setLoading(true);
    setItinerary(null);
    const stages = ['Reading your constraints…', 'Scoring crowd windows…', 'Weaving a calm route…'];
    for (const stage of stages) {
      setStatus(stage);
      await new Promise((resolve) => setTimeout(resolve, 520));
    }
    const result = await getItinerary(prefs);
    setItinerary(result);
    setLoading(false);
    setStatus('');
  };

  useEffect(() => {
    if (generateSignal > 0) {
      void generate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generateSignal]);

  const crowdLabel = plannerPrefs.crowdTolerance <= 33 ? 'Low' : plannerPrefs.crowdTolerance <= 66 ? 'Moderate' : 'High';

  return (
    <section id="planner" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Smart Planner"
          title="A split view for controls, timeline, and live routing."
          description="Generate a timestamped itinerary while the map shows stop sequence, traffic color, and hover popups."
        />
        <div className="mt-10 grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
          <GlassCard className="p-5 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="rounded-2xl bg-white/70 p-4">
                <span className="mb-2 flex items-center gap-2 text-sm text-black/55"><CalendarDays className="h-4 w-4" /> Days</span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={plannerPrefs.days}
                  onChange={(event) => setPlannerPrefs({ ...plannerPrefs, days: Number(event.target.value) })}
                  className="w-full"
                />
                <p className="mt-1 text-sm font-semibold">{plannerPrefs.days} days</p>
              </label>
              <label className="rounded-2xl bg-white/70 p-4">
                <span className="mb-2 flex items-center gap-2 text-sm text-black/55"><IndianRupee className="h-4 w-4" /> Budget</span>
                <input
                  type="range"
                  min={4000}
                  max={40000}
                  step={500}
                  value={plannerPrefs.budget}
                  onChange={(event) => setPlannerPrefs({ ...plannerPrefs, budget: Number(event.target.value) })}
                  className="w-full"
                />
                <p className="mt-1 text-sm font-semibold">{formatCurrency(plannerPrefs.budget)}</p>
              </label>
              <label className="rounded-2xl bg-white/70 p-4">
                <span className="mb-2 flex items-center gap-2 text-sm text-black/55"><MapPin className="h-4 w-4" /> Starting hub</span>
                <input
                  value={plannerPrefs.startingLocation}
                  onChange={(event) => setPlannerPrefs({ ...plannerPrefs, startingLocation: event.target.value })}
                  className="w-full rounded-2xl border border-black/8 bg-white px-3 py-2 text-sm outline-none"
                />
              </label>
              <label className="rounded-2xl bg-white/70 p-4">
                <span className="mb-2 flex items-center gap-2 text-sm text-black/55"><TrainFront className="h-4 w-4" /> Transport mode</span>
                <select
                  value={plannerPrefs.transportMode}
                  onChange={(event) =>
                    setPlannerPrefs({ ...plannerPrefs, transportMode: event.target.value as ItineraryPreferences['transportMode'] })
                  }
                  className="w-full rounded-2xl border border-black/8 bg-white px-3 py-2 text-sm outline-none"
                >
                  {transportOptions.map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <div className="mt-4 rounded-2xl bg-white/70 p-4">
              <span className="mb-3 flex items-center gap-2 text-sm text-black/55"><Users className="h-4 w-4" /> Crowd tolerance · {crowdLabel}</span>
              <div className="flex gap-2">
                {crowdLabels.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => setPlannerPrefs({ ...plannerPrefs, crowdTolerance: item.value })}
                    className={`flex-1 rounded-full px-3 py-2 text-sm ${
                      crowdLabel === item.label ? 'bg-[#B5651D] text-white' : 'bg-black/5 text-black/60'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => void generate()}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#B5651D] px-5 py-3 text-sm font-medium text-white"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate Itinerary
            </button>

            {loading ? (
              <div className="mt-5 overflow-hidden rounded-2xl bg-[#B5651D]/10 p-5">
                <div className="h-1 w-full overflow-hidden rounded-full bg-[#B5651D]/15">
                  <div className="h-full w-1/2 animate-[ticker_1.2s_linear_infinite] bg-[#B5651D]" />
                </div>
                <p className="mt-4 text-lg font-semibold text-ink">{status}</p>
                <p className="mt-1 text-sm text-black/55">AI is comparing crowd, traffic, and your tolerance band.</p>
              </div>
            ) : null}

            <div className="mt-5 space-y-4">
              {itinerary?.days.map((day) => (
                <div key={day.day} className="rounded-2xl bg-white/70 p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-ink">Day {day.day}</h3>
                    <span className="text-xs uppercase tracking-[0.18em] text-black/45">{day.title}</span>
                  </div>
                  <div className="mt-3 space-y-3">
                    {day.stops.map((stop) => (
                      <div key={`${day.day}-${stop.time}-${stop.placeId}`} className="rounded-2xl bg-white p-3">
                        <p className="text-sm font-semibold text-[#B5651D]">{stop.time}</p>
                        <p className="mt-1 text-sm font-medium text-ink">{getPlaceById(stop.placeId)?.name ?? stop.placeId}</p>
                        <p className="mt-1 text-sm text-black/60">{stop.activity}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          <div className="xl:sticky xl:top-24 xl:h-[calc(100vh-7rem)]">
            <RouteMap itinerary={itinerary} hub={plannerPrefs.startingLocation} />
          </div>
        </div>
      </div>
    </section>
  );
}
