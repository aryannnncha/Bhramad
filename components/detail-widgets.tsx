"use client";

import Image from 'next/image';
import type { Place, TrafficInfo, CrowdForecast } from '@/lib/types';
import { CircularScore } from './circular-score';
import { CrowdChart } from './crowd-chart';
import { GlassCard } from './glass-card';
import { askAssistant } from '@/lib/api';
import { useState } from 'react';
import { Loader2, Send } from 'lucide-react';

type DetailWidgetsProps = {
  place: Place;
  crowd: CrowdForecast;
  traffic: TrafficInfo;
  alternative: Place;
};

export function DetailWidgets({ place, crowd, traffic, alternative }: DetailWidgetsProps) {
  const bestSlot = crowd.hourly.reduce((best, slot) => (slot.score < best.score ? slot : best), crowd.hourly[0]);
  const bestWindowStart = crowd.hourly.slice(0, 3).reduce((best, slot) => (slot.score < best.score ? slot : best), crowd.hourly[0]).hour;
  const bestWindowEnd = crowd.hourly.slice(0, 4).reduce((best, slot) => (slot.score < best.score ? slot : best), crowd.hourly[0]).hour;
  const [question, setQuestion] = useState(`Why is ${place.name} famous?`);
  const [response, setResponse] = useState('');
  const [sources, setSources] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    setLoading(true);
    const answer = await askAssistant(question);
    setResponse(answer.answer);
    setSources(answer.sources.map((source) => source.label));
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <GlassCard className="p-6">
          <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#B5651D]">Smart Visit Score</p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Best time confidence</h3>
              </div>
              <div className="rounded-full bg-[#B5651D]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#B5651D]">
                {bestSlot.level}
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-between">
              <CircularScore score={100 - bestSlot.score} label={`Best window: ${bestWindowStart} - ${bestWindowEnd}`} />
              <div className="grid gap-3 text-sm text-black/65 sm:max-w-xs">
                <div className="rounded-[1.4rem] bg-white/75 p-4">
                  <p className="font-semibold text-ink">Peak crowd slot</p>
                  <p className="mt-1">{bestSlot.hour} with {bestSlot.score}/100 crowd score.</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/75 p-4">
                  <p className="font-semibold text-ink">Opening hours</p>
                  <p className="mt-1">{place.openingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <CrowdChart forecast={crowd} bestWindow={`Recommended visit window: ${bestWindowStart} - ${bestWindowEnd}`} />
        </GlassCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
        <GlassCard className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#B5651D]">Traffic Intelligence</p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Leave for the calmest route</h3>
            </div>
            <div className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-black/50">Live suggestion</div>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <div className="rounded-[1.4rem] bg-white/75 p-4">
              <p className="text-sm font-medium text-black/55">Departure</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-ink">{traffic.bestDeparture}</p>
            </div>
            <div className="rounded-[1.4rem] bg-white/75 p-4">
              <p className="text-sm font-medium text-black/55">Duration</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-ink">{traffic.travelDuration}</p>
            </div>
            <div className="rounded-[1.4rem] bg-white/75 p-4">
              <p className="text-sm font-medium text-black/55">Traffic</p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-ink">{traffic.trafficLevel}</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-black/65">
            Leave at {traffic.bestDeparture} for lowest traffic and the softest crowd curve across the route.
          </p>
        </GlassCard>

        <GlassCard className="overflow-hidden p-0">
          <div className="relative aspect-[16/8] w-full">
            <Image
              src={alternative.imageUrl}
              alt={alternative.name}
              fill
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/75">Alternative destination</p>
              <h3 className="mt-2 text-3xl font-semibold tracking-tight">This place is crowded right now</h3>
              <p className="mt-3 max-w-xl text-sm leading-7 text-white/85">
                Try {alternative.name} in {alternative.district}. It offers a quieter experience with strong heritage value and a different crowd profile.
              </p>
              <div className="mt-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-md">
                {alternative.name} · nearby alternative
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      <GlassCard className="p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#B5651D]">AI Assistant</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink">Ask a place-specific question</h3>
          </div>
          <div className="rounded-full bg-[#B5651D]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[#B5651D]">
            Source: verified heritage database
          </div>
        </div>
        <div className="mt-5 space-y-4">
          <label className="block space-y-2">
            <span className="text-sm font-medium text-black/55">Question</span>
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                className="min-h-14 flex-1 rounded-[1.5rem] border border-black/8 bg-white/75 px-4 text-sm text-ink outline-none focus:border-[#B5651D]/35 focus:ring-4 focus:ring-[#B5651D]/10"
              />
              <button
                type="button"
                onClick={handleAsk}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#B5651D] px-5 py-3 text-sm font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
              >
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                Ask
              </button>
            </div>
          </label>
          {response ? (
            <div className="rounded-[1.6rem] bg-white/75 p-5">
              <p className="text-sm leading-7 text-black/70">{response}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {sources.map((source) => (
                  <span key={source} className="rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-black/55">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </GlassCard>
    </div>
  );
}
