import Image from 'next/image';
import Link from 'next/link';
import type { CrowdForecast, Place, TrafficInfo } from '@/lib/types';
import { MotionSection } from './motion-section';
import { DetailWidgets } from './detail-widgets';
import { GlassCard } from './glass-card';

type DestinationDetailProps = {
  place: Place;
  crowd: CrowdForecast;
  traffic: TrafficInfo;
  alternative: Place;
};

export function DestinationDetail({ place, crowd, traffic, alternative }: DestinationDetailProps) {
  return (
    <div className="px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <GlassCard className="overflow-hidden p-0">
          <div className="relative min-h-[28rem] w-full">
            <Image src={place.imageUrl} alt={place.name} fill className="object-cover" sizes="100vw" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8 lg:p-10">
              <div className="max-w-4xl text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/75">{place.category}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{place.name}</h1>
                <p className="mt-4 max-w-2xl text-base leading-8 text-white/88 sm:text-lg">{place.description}</p>
                <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-white/88">
                  <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">{place.district}</span>
                  <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">{place.altitudeM} m</span>
                  <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">Best: {place.bestTimeToVisit}</span>
                  <span className="rounded-full bg-white/15 px-3 py-1 backdrop-blur-md">{place.approxDistanceFromDehradunKm} km from Dehradun</span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <MotionSection>
          <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
            <GlassCard className="p-6">
              <p className="text-sm font-medium uppercase tracking-[0.24em] text-[#B5651D]">Historical Info</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink">Timelines, builders, and stories</h2>
              <div className="mt-6 space-y-5 text-sm leading-7 text-black/65">
                <div className="rounded-[1.4rem] bg-white/70 p-4">
                  <p className="font-semibold text-ink">Why visit</p>
                  <p className="mt-1">{place.famousFor}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/70 p-4">
                  <p className="font-semibold text-ink">Era</p>
                  <p className="mt-1">{place.history.era}</p>
                </div>
                {place.history.builder ? (
                  <div className="rounded-[1.4rem] bg-white/70 p-4">
                    <p className="font-semibold text-ink">Builder</p>
                    <p className="mt-1">{place.history.builder}</p>
                  </div>
                ) : null}
                <div className="rounded-[1.4rem] bg-white/70 p-4">
                  <p className="font-semibold text-ink">Significance</p>
                  <p className="mt-1">{place.history.significance}</p>
                </div>
                {place.history.legends ? (
                  <div className="rounded-[1.4rem] bg-white/70 p-4">
                    <p className="font-semibold text-ink">Legends</p>
                    <p className="mt-1">{place.history.legends}</p>
                  </div>
                ) : null}
                <div className="rounded-[1.4rem] bg-white/70 p-4">
                  <p className="font-semibold text-ink">Opening hours</p>
                  <p className="mt-1">{place.openingHours}</p>
                </div>
              </div>
            </GlassCard>

            <div className="space-y-6">
              <DetailWidgets place={place} crowd={crowd} traffic={traffic} alternative={alternative} />
            </div>
          </div>
        </MotionSection>

        <div className="flex items-center justify-between gap-3 px-2 text-sm text-black/55">
          <Link href="/explore" className="font-medium text-[#B5651D] hover:underline">
            Back to explore
          </Link>
          <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${place.name}, ${place.district}, Uttarakhand`)}`} target="_blank" rel="noreferrer" className="font-medium text-[#B5651D] hover:underline">
            Open in Maps
          </a>
        </div>
      </div>
    </div>
  );
}
