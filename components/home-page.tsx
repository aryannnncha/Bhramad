"use client";

import Link from 'next/link';
import { ArrowRight, CircleAlert, Compass, Gauge, MapPinned, Search } from 'lucide-react';
import { motion } from 'framer-motion';
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
  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-20 pt-8 sm:px-6 lg:px-8 lg:pb-28 lg:pt-12">
        <div className="mx-auto grid min-h-[calc(100vh-7rem)] w-full max-w-7xl items-center lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          <div className="relative z-10 space-y-8 py-10">
            <div className="inline-flex rounded-full border border-black/8 bg-white/70 px-4 py-2 text-sm font-medium text-black/60 shadow-glass backdrop-blur-xl">
              Smart India Hackathon 2026 frontend MVP
            </div>
            <div className="space-y-6">
              <h1 className="max-w-4xl text-5xl font-semibold tracking-tight text-ink sm:text-6xl lg:text-7xl lg:leading-[0.95]">
                Discover Uttarakhand&apos;s Heritage. Experience It Intelligently.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-black/65 sm:text-xl">
                An AI-powered historical tourism platform that blends heritage storytelling, crowd prediction, traffic intelligence, and personalized trip planning.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              {steps.map((step, index) => (
                <motion.span
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.12 * index, duration: 0.45 }}
                  className="rounded-full border border-black/8 bg-white/75 px-4 py-2 text-sm font-medium text-black/65 shadow-glass"
                >
                  {step}
                </motion.span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/explore"
                className="inline-flex items-center gap-2 rounded-full bg-[#B5651D] px-6 py-3 text-sm font-medium text-white shadow-glass transition-transform duration-200 hover:scale-[1.02]"
              >
                Explore Destinations
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/planner" className="text-sm font-medium text-black/65 transition-colors hover:text-ink">
                Build a trip plan
              </Link>
            </div>
          </div>

          <div className="relative mt-6 lg:mt-0">
            <div className="absolute inset-0 -z-10 animate-float rounded-[2.5rem] bg-[radial-gradient(circle_at_top_left,rgba(181,101,29,0.2),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(255,255,255,0.9),transparent_35%)] blur-3xl" />
            <GlassCard className="hero-gradient relative overflow-hidden p-5 sm:p-7 lg:p-8">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-panel-strong rounded-[1.8rem] p-5 sm:col-span-2">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-[#B5651D]">Live experience surface</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink">A calm interface for a complex decision.</h2>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-black/65">
                    Heritage site selection should feel like reading a well-edited guide, not decoding a transport dashboard. This MVP makes the tradeoff visible.
                  </p>
                </div>
                <div className="glass-panel-strong rounded-[1.8rem] p-5">
                  <p className="text-sm font-medium text-black/55">Best visit window</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-ink">7:00 - 10:00 AM</p>
                  <p className="mt-2 text-sm text-black/60">Lowest crowd curve for Jageshwar and similar mountain sites.</p>
                </div>
                <div className="glass-panel-strong rounded-[1.8rem] p-5">
                  <p className="text-sm font-medium text-black/55">AI score</p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-[#B5651D]">90 / 100</p>
                  <p className="mt-2 text-sm text-black/60">Confidence-weighted for calm access and strong interpretation value.</p>
                </div>
                <div className="glass-panel-strong rounded-[1.8rem] p-5 sm:col-span-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium text-black/55">Experience flow</p>
                      <p className="mt-2 text-lg font-semibold tracking-tight text-ink">Discover • Understand • Predict • Recommend • Navigate</p>
                    </div>
                    <MapPinned className="h-9 w-9 text-[#B5651D]" />
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </section>

      <MotionSection className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
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
