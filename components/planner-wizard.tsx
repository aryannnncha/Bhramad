"use client";

import { useState } from 'react';
import { Clock3, Loader2, MapPin, TrainFront, CalendarDays, IndianRupee, Sparkles } from 'lucide-react';
import { getItinerary } from '@/lib/api';
import type { Itinerary, ItineraryPreferences } from '@/lib/types';
import { formatCurrency } from '@/lib/utils';
import { GlassCard } from './glass-card';

const interestOptions = ['Architecture', 'Religious Heritage', 'Culture', 'Photography', 'Adventure'];

const transportOptions: ItineraryPreferences['transportMode'][] = ['Car', 'Train', 'Bus', 'Two Wheeler', 'Taxi'];

export function PlannerWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [itinerary, setItinerary] = useState<Itinerary | null>(null);
  const [form, setForm] = useState<ItineraryPreferences>({
    days: 2,
    budget: 12000,
    interests: ['Architecture', 'Photography'],
    startingLocation: 'Dehradun',
    crowdTolerance: 45,
    transportMode: 'Car',
  });

  const toggleInterest = (interest: string) => {
    setForm((current) => ({
      ...current,
      interests: current.interests.includes(interest)
        ? current.interests.filter((item) => item !== interest)
        : [...current.interests, interest],
    }));
  };

  const generate = async () => {
    setLoading(true);
    setItinerary(null);
    const stages = ['Analyzing preferences…', 'Checking crowd forecasts…', 'Optimizing route…'];

    for (const stage of stages) {
      setStatus(stage);
      await new Promise((resolve) => setTimeout(resolve, 550));
    }

    const result = await getItinerary(form);
    setItinerary(result);
    setStatus('');
    setLoading(false);
    setStep(3);
  };

  return (
    <div className="space-y-8">
      <GlassCard className="p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#B5651D]">AI Trip Planner</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Build a route that feels personalized, not generic.</h2>
          </div>
          <div className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-black/50">
            Wizard {step}/3
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 rounded-[1.6rem] bg-white/75 p-4">
                <span className="flex items-center gap-2 text-sm font-medium text-black/60"><CalendarDays className="h-4 w-4" /> Days available</span>
                <input
                  type="range"
                  min={1}
                  max={5}
                  value={form.days}
                  onChange={(event) => setForm((current) => ({ ...current, days: Number(event.target.value) }))}
                  className="w-full"
                />
                <p className="text-sm font-semibold text-ink">{form.days} day(s)</p>
              </label>

              <label className="space-y-2 rounded-[1.6rem] bg-white/75 p-4">
                <span className="flex items-center gap-2 text-sm font-medium text-black/60"><IndianRupee className="h-4 w-4" /> Budget</span>
                <input
                  type="range"
                  min={4000}
                  max={40000}
                  step={500}
                  value={form.budget}
                  onChange={(event) => setForm((current) => ({ ...current, budget: Number(event.target.value) }))}
                  className="w-full"
                />
                <p className="text-sm font-semibold text-ink">{formatCurrency(form.budget)}</p>
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 rounded-[1.6rem] bg-white/75 p-4">
                <span className="flex items-center gap-2 text-sm font-medium text-black/60"><MapPin className="h-4 w-4" /> Starting location</span>
                <input
                  value={form.startingLocation}
                  onChange={(event) => setForm((current) => ({ ...current, startingLocation: event.target.value }))}
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm outline-none focus:border-[#B5651D]/35 focus:ring-4 focus:ring-[#B5651D]/10"
                />
              </label>

              <label className="space-y-2 rounded-[1.6rem] bg-white/75 p-4">
                <span className="flex items-center gap-2 text-sm font-medium text-black/60"><TrainFront className="h-4 w-4" /> Transport mode</span>
                <select
                  value={form.transportMode}
                  onChange={(event) => setForm((current) => ({ ...current, transportMode: event.target.value as ItineraryPreferences['transportMode'] }))}
                  className="w-full rounded-2xl border border-black/8 bg-white px-4 py-3 text-sm outline-none focus:border-[#B5651D]/35 focus:ring-4 focus:ring-[#B5651D]/10"
                >
                  {transportOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="space-y-2 rounded-[1.6rem] bg-white/75 p-4">
              <span className="flex items-center gap-2 text-sm font-medium text-black/60"><Clock3 className="h-4 w-4" /> Crowd tolerance</span>
              <input
                type="range"
                min={0}
                max={100}
                value={form.crowdTolerance}
                onChange={(event) => setForm((current) => ({ ...current, crowdTolerance: Number(event.target.value) }))}
                className="w-full"
              />
              <p className="text-sm font-semibold text-ink">{form.crowdTolerance}/100</p>
            </label>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-black/45">Interests</p>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((interest) => {
                  const active = form.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`rounded-full px-4 py-2 text-sm transition-all duration-200 ${active ? 'bg-[#B5651D] text-white shadow-glass' : 'bg-white/70 text-black/65 hover:bg-white'}`}
                    >
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={generate}
              className="inline-flex items-center gap-2 rounded-full bg-[#B5651D] px-6 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              Generate itinerary
            </button>
          </div>

          <div className="space-y-4">
            <GlassCard className="min-h-[20rem] p-5">
              {loading ? (
                <div className="flex h-full min-h-[18rem] flex-col items-start justify-center gap-4">
                  <div className="inline-flex rounded-full bg-[#B5651D]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#B5651D]">
                    AI thinking
                  </div>
                  <p className="text-2xl font-semibold tracking-tight text-ink">{status}</p>
                  <p className="max-w-md text-sm leading-7 text-black/60">
                    The planner is comparing crowd windows, route duration, and your preference mix to form the best sequence.
                  </p>
                </div>
              ) : itinerary ? (
                <div className="space-y-5">
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#B5651D]">Generated itinerary</p>
                  <div className="flex flex-wrap gap-2">
                    {itinerary.days.map((day) => (
                      <span key={day.day} className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/55">
                        Day {day.day}
                      </span>
                    ))}
                  </div>
                  {itinerary.days.map((day) => (
                    <div key={day.day} className="space-y-3 rounded-[1.5rem] bg-white/75 p-4">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="text-lg font-semibold tracking-tight text-ink">Day {day.day}</h3>
                        <span className="text-xs font-medium uppercase tracking-[0.2em] text-black/45">{day.title}</span>
                      </div>
                      <div className="space-y-3">
                        {day.stops.map((stop) => (
                          <div key={`${stop.time}-${stop.placeId}`} className="rounded-[1.2rem] bg-white p-4">
                            <div className="flex items-center justify-between gap-3">
                              <p className="text-sm font-semibold text-[#B5651D]">{stop.time}</p>
                              <p className="text-sm font-medium text-black/55">{stop.placeId}</p>
                            </div>
                            <p className="mt-2 text-sm font-medium text-ink">{stop.activity}</p>
                            <p className="mt-1 text-sm leading-7 text-black/60">{stop.reason}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full min-h-[18rem] items-center justify-center rounded-[1.5rem] border border-dashed border-black/10 bg-white/40 px-8 text-center text-black/55">
                  Your itinerary will appear here after the planner finishes optimizing your route.
                </div>
              )}
            </GlassCard>

            <GlassCard className="p-5 text-sm leading-7 text-black/60">
              The planner combines budget, crowd tolerance, interests, and transit mode. It is intentionally structured so a FastAPI backend can replace the mock generator without changing the UI.
            </GlassCard>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
