import { Compass, Globe2, MessageSquareText, Route, Sparkles, TimerReset } from 'lucide-react';
import { GlassCard } from '@/components/glass-card';
import { SectionHeading } from '@/components/section-heading';

const modules = [
  { icon: Globe2, title: 'Historical Heritage Explorer', description: 'Browse temples, forts, museums, and heritage towns with context.' },
  { icon: MessageSquareText, title: 'Storytelling', description: 'Surface legends, builders, eras, and architecture in readable language.' },
  { icon: TimerReset, title: 'Crowd Prediction', description: 'Understand hourly crowd patterns before you leave.' },
  { icon: Route, title: 'Traffic Intelligence', description: 'Get departure timing and route duration guidance.' },
  { icon: Sparkles, title: 'AI Assistant', description: 'Ask natural-language questions with source-grounded answers.' },
  { icon: Compass, title: 'Personalized Itinerary', description: 'Generate a trip plan aligned with budget, preferences, and tolerance.' },
];

export default function AboutPage() {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="System"
          title="A modular product that can swap the mock backend for FastAPI later."
          description="The current MVP keeps the data seam explicit so the UI can stay stable when the API becomes real."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {modules.map((module) => {
            const Icon = module.icon;
            return (
              <GlassCard key={module.title} className="p-6 transition-transform duration-300 hover:scale-[1.02]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#B5651D]/10 text-[#B5651D]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-ink">{module.title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/65">{module.description}</p>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
