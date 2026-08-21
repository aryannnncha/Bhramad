"use client";

import { useEffect, useRef, useState } from 'react';
import { IndianRupee, MapPin, Sparkles, Timer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePortal } from './portal-context';

const interestOptions = ['Architecture', 'Temples', 'Culture', 'Adventure', 'Photography'];

const tickerItems = [
  '🔥 Jageshwar: High Crowd Peak',
  '🌿 Katarmal: Ideal Visit Score 90/100',
  '🚗 Kedarnath corridor: depart before 5:30 AM',
  '📷 Chopta light window opens at 6:40 AM',
  '🌊 Haridwar aarti crowding after 6:00 PM',
];

export function HeroPortal() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { plannerPrefs, applyHeroSearch } = usePortal();
  const [startingLocation, setStartingLocation] = useState(plannerPrefs.startingLocation);
  const [days, setDays] = useState(plannerPrefs.days);
  const [budget, setBudget] = useState(plannerPrefs.budget);
  const [interests, setInterests] = useState<string[]>(plannerPrefs.interests);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');

    const tryPlay = () => {
      void video.play().catch(() => undefined);
    };

    tryPlay();
    video.addEventListener('canplay', tryPlay);
    return () => video.removeEventListener('canplay', tryPlay);
  }, []);

  const toggleInterest = (interest: string) => {
    setInterests((current) =>
      current.includes(interest) ? current.filter((item) => item !== interest) : [...current, interest],
    );
  };

  return (
    <section className="relative -mt-[4.5rem] min-h-screen overflow-hidden pb-10 pt-[5.5rem]">
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        src="/mountain.mp4"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/70" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-7xl flex-col justify-end px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl pb-8 pt-16">
          <div className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white/85 backdrop-blur-xl">
            Smart India Hackathon 2026 · Live heritage intelligence
          </div>
          <h1 className="hero-title mt-6">
            Discover Uttarakhand&apos;s Heritage.
            <span className="mt-2 block">Experience It Intelligently.</span>
          </h1>
        </div>

        <div className="glass-panel mb-4 rounded-2xl border-white/20 bg-white/12 p-4 text-white backdrop-blur-2xl sm:p-5">
          <div className="grid gap-3 lg:grid-cols-[1.1fr_0.7fr_0.8fr_auto]">
            <label className="rounded-2xl bg-black/20 p-3">
              <span className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                <MapPin className="h-3.5 w-3.5" /> Starting location
              </span>
              <input
                value={startingLocation}
                onChange={(event) => setStartingLocation(event.target.value)}
                className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/40"
                placeholder="Almora, Dehradun, Rishikesh"
              />
            </label>
            <label className="rounded-2xl bg-black/20 p-3">
              <span className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                <Timer className="h-3.5 w-3.5" /> Duration (days)
              </span>
              <input
                type="number"
                min={1}
                max={7}
                value={days}
                onChange={(event) => setDays(Number(event.target.value))}
                className="w-full bg-transparent text-sm text-white outline-none"
              />
            </label>
            <label className="rounded-2xl bg-black/20 p-3">
              <span className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">
                <IndianRupee className="h-3.5 w-3.5" /> Budget (₹)
              </span>
              <input
                type="number"
                min={4000}
                step={500}
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                className="w-full bg-transparent text-sm text-white outline-none"
              />
            </label>
            <button
              type="button"
              onClick={() =>
                applyHeroSearch({
                  startingLocation,
                  days,
                  budget,
                  interests,
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#B5651D] px-5 py-3 text-sm font-semibold text-white shadow-glass transition-transform hover:scale-[1.02]"
            >
              <Sparkles className="h-4 w-4" />
              Generate AI Route
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {interestOptions.map((interest) => {
              const active = interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={cn(
                    'rounded-full px-3 py-1.5 text-xs font-medium transition-all',
                    active ? 'bg-white text-ink' : 'bg-white/10 text-white/80 hover:bg-white/20',
                  )}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6 overflow-hidden rounded-2xl border border-white/15 bg-black/30 backdrop-blur-xl">
          <div className="flex animate-[ticker_28s_linear_infinite] gap-10 whitespace-nowrap px-4 py-3 text-sm text-white/90">
            {[...tickerItems, ...tickerItems].map((item, index) => (
              <span key={`${item}-${index}`} className="font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
