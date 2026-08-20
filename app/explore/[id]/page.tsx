import { notFound } from 'next/navigation';
import { getCrowdPrediction, getPlaces, getTrafficInfo } from '@/lib/api';
import { DestinationDetail } from '@/components/destination-detail';

type DetailPageProps = {
  params: { id: string };
};

export async function generateStaticParams() {
  const places = await getPlaces();
  return places.map((place) => ({ id: place.id }));
}

export default async function DetailPage({ params }: DetailPageProps) {
  const { id } = params;
  const places = await getPlaces();
  const place = places.find((item) => item.id === id);

  if (!place) {
    notFound();
  }

  const crowd = await getCrowdPrediction(place.id);
  const traffic = await getTrafficInfo(place.id);
  const alternative = places.find((item) => item.id === place.nearbyAlternativeId) ?? places[0];

  return <DestinationDetail place={place} crowd={crowd} traffic={traffic} alternative={alternative} />;
}
