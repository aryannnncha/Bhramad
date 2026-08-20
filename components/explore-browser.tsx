"use client";

import { useMemo, useState } from 'react';
import type { Place } from '@/lib/types';
import { getCrowdForecastByPlaceId } from '@/lib/garhwalData';
import { FilterBar } from './filter-bar';
import { PlaceCard } from './place-card';
import { SectionHeading } from './section-heading';

type ExploreBrowserProps = {
  places: Place[];
};

export function ExploreBrowser({ places }: ExploreBrowserProps) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [crowd, setCrowd] = useState('All');
  const [district, setDistrict] = useState('All');

  const categoryOptions = ['All', ...Array.from(new Set(places.map((place) => place.category)))];
  const districtOptions = ['All', ...Array.from(new Set(places.map((place) => place.district)))];

  const filteredPlaces = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    return places.filter((place) => {
      const forecast = getCrowdForecastByPlaceId(place.id);
      const crowdLevel = forecast.hourly.reduce((max, slot) => (slot.score > max.score ? slot : max), forecast.hourly[0]).level;
      const matchesSearch =
        place.name.toLowerCase().includes(normalizedSearch) ||
        place.district.toLowerCase().includes(normalizedSearch) ||
        place.famousFor.toLowerCase().includes(normalizedSearch) ||
        place.description.toLowerCase().includes(normalizedSearch);
      const matchesCategory = category === 'All' || place.category === category;
      const matchesCrowd = crowd === 'All' || crowdLevel === crowd;
      const matchesDistrict = district === 'All' || place.district === district;

      return matchesSearch && matchesCategory && matchesCrowd && matchesDistrict;
    });
  }, [places, search, category, crowd, district]);

  return (
    <div className="space-y-8">
      <SectionHeading
        eyebrow="Explore"
        title="Choose a destination with context, not guesswork."
        description="Search by site, district, crowd condition, or category to find the heritage experience that fits the day."
      />
      <FilterBar
        category={category}
        crowd={crowd}
        district={district}
        categoryOptions={categoryOptions}
        districtOptions={districtOptions}
        onCategoryChange={setCategory}
        onCrowdChange={setCrowd}
        onDistrictChange={setDistrict}
        search={search}
        onSearchChange={setSearch}
      />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
      {filteredPlaces.length === 0 ? (
        <div className="glass-panel rounded-[2rem] p-8 text-center text-black/60">No places matched the current filters.</div>
      ) : null}
    </div>
  );
}
