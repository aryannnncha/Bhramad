"use client";

import { DestinationPortal } from './destination-portal';
import { HeritageStories } from './heritage-stories';
import { HeroPortal } from './hero-portal';
import { SmartPlannerView } from './smart-planner-view';

export function HomePage() {
  return (
    <div>
      <HeroPortal />
      <DestinationPortal />
      <SmartPlannerView />
      <HeritageStories />
    </div>
  );
}
