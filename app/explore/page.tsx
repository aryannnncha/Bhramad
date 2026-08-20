import { getPlaces } from '@/lib/api';
import { ExplorePageShell } from '@/components/explore-page-shell';

export default async function ExplorePage() {
  const places = await getPlaces();

  return <ExplorePageShell places={places} />;
}
