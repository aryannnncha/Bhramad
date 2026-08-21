"use client";

import { useEffect, useRef } from 'react';
import { ChevronDown, CircleAlert, Compass, Gauge, Search } from 'lucide-react';
import { GlassCard } from './glass-card';
import { MotionSection } from './motion-section';
import { SectionHeading } from './section-heading';

const steps = ['Discover', 'Understand', 'Predict', 'Recommend', 'Navigate'];

const problems = [
  {
    icon: Search,
    title: 'Information overload',
    description: 'Heritage visitors need a fast way to separate meaningful context from generic travel content.',
  },
  {
    icon: CircleAlert,
    title: 'Crowding uncertainty',
    description: 'Popular sites can swing from calm to crowded within hours, especially on weekends and festival days.',
  },
  {
    icon: Gauge,
    title: 'Traffic friction',
    description: 'Mountain routes and city roads need departure advice that respects both distance and congestion.',
  },
  {
    icon: Compass,
    title: 'Poor planning',
    description: 'Without a multi-stop itinerary, visitors often miss the best sequence for light, crowds, and travel flow.',
  },
];

export function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);

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

  return (
    <div>
      <section className="relative -mt-[4.5rem] h-screen min-h-[36rem] overflow-hidden">
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
          <div className="inline-flex rounded-full border border-white/25 bg-white/15 px-4 py-2 text-sm font-medium text-white/90 shadow-glass backdrop-blur-md">
            Smart India Hackathon 2026 frontend MVP
          </div>

          <h1 className="hero-title mt-8 w-full max-w-5xl select-none px-2">
            Discover Uttarakhand&apos;s Heritage.
            <span className="mt-2 block">Experience It Intelligently.</span>
          </h1>
        </div>

        <a
          href="#the-challenge"
          className="absolute bottom-8 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/90 shadow-glass backdrop-blur-xl"
        >
          Scroll down
          <ChevronDown className="h-3.5 w-3.5" />
        </a>
      </section>

      <MotionSection className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div id="the-challenge" className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="The Challenge"
            title="Heritage tourism breaks when visitors do not get context, timing, and routing together."
            description="These are the four issues the platform is designed to collapse into one clear, intelligent flow."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {problems.map((problem, index) => {
              const Icon = problem.icon;
              return (
                <GlassCard key={problem.title} className="p-6 transition-transform duration-300 hover:scale-[1.02]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B5651D]/10 text-[#B5651D]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{problem.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/65">{problem.description}</p>
                  <div className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-black/35">0{index + 1}</div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionHeading
            eyebrow="How It Works"
            title="A five-step flow that stays readable from first glance to final route."
            description="The interface mirrors the product logic: first surface heritage, then explain the place, then optimize timing, then recommend, then navigate."
          />
          <div className="mt-10 grid gap-4 lg:grid-cols-5">
            {steps.map((step, index) => (
              <GlassCard key={step} className="p-5">
                <div className="text-xs font-semibold uppercase tracking-[0.26em] text-[#B5651D]">Step {index + 1}</div>
                <div className="mt-3 text-2xl font-semibold tracking-tight text-ink">{step}</div>
                <p className="mt-3 text-sm leading-7 text-black/60">
                  {index === 0 && 'Explore destinations with a heritage-first lens.'}
                  {index === 1 && 'Surface history, architecture, and legends in one place.'}
                  {index === 2 && 'Forecast crowd and traffic windows before departure.'}
                  {index === 3 && 'Build a route that fits budget, interests, and time.'}
                  {index === 4 && 'Leave with clear departure advice and on-site guidance.'}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
