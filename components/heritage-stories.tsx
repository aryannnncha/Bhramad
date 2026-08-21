"use client";

import Image from 'next/image';
import { getPlaceById } from '@/lib/garhwalData';
import { GlassCard } from './glass-card';
import { MotionSection } from './motion-section';
import { SectionHeading } from './section-heading';

const storyIds = ['jageshwar', 'katarmal', 'kedarnath', 'devprayag'] as const;

export function HeritageStories() {
  return (
    <MotionSection className="px-4 py-16 sm:px-6 lg:px-8">
      <div id="stories" className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Heritage Stories"
          title="The legends and builders behind the stone."
          description="A quieter reading layer for temples, confluences, and high-altitude shrines."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {storyIds.map((id) => {
            const place = getPlaceById(id);
            if (!place) return null;
            return (
              <GlassCard key={id} className="overflow-hidden p-0">
                <div className="relative h-48">
                  <Image src={place.imageUrl} alt={place.name} fill className="object-cover" sizes="50vw" />
                </div>
                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#B5651D]">{place.district}</p>
                  <h3 className="mt-2 text-2xl font-semibold text-ink">{place.name}</h3>
                  <p className="mt-3 text-sm leading-7 text-black/65">{place.history.legends ?? place.history.significance}</p>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </MotionSection>
  );
}
