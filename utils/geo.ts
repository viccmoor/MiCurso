import { CAMPUS_MAP } from '@/constants/geo';
import { Region } from '@/types/geo';

import placesData from '@/data/geo/places.json';
import campusData from '@/data/geo/campuses.json';

export function getRegionFromFeature(feature: any): Region {
  const { type, coordinates } = feature.geometry;

  if (type === 'Point') {
    const [lng, lat] = coordinates;
    return {
      latitude: lat,
      longitude: lng,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    };
  }

  const points: number[][] = [];
  const extract = (coords: any) => {
    if (typeof coords[0][0] === 'number') {
      points.push(...coords);
    } else {
      coords.forEach(extract);
    }
  };

  extract(coordinates);
  let minLat = Infinity, maxLat = -Infinity;
  let minLng = Infinity, maxLng = -Infinity;

  points.forEach(([lng, lat]) => {
    minLat = Math.min(minLat, lat);
    maxLat = Math.max(maxLat, lat);
    minLng = Math.min(minLng, lng);
    maxLng = Math.max(maxLng, lng);
  });

  return {
    latitude: (minLat + maxLat) / 2,
    longitude: (minLng + maxLng) / 2,
    latitudeDelta: (maxLat - minLat) * 1.3,
    longitudeDelta: (maxLng - minLng) * 1.3,
  };
}

export default function resolveMapTarget(placeName: string, campusName: string) {
  const place = getPlaceByCampus(placeName, campusName)
  if (place) {
    return {
      geojson: {
        type: 'FeatureCollection',
        features: [place],
      },
      zoom: 'place',
    };
  }

  const campus = getCampus(campusName);
  if (campus) {
    return {
      geojson: {
        type: 'FeatureCollection',
        features: [campus],
      },
      zoom: 'campus',
    };
  }

  return null;
};

function getPlaceByCampus(placeName: string, campusName: string) {
  if (!placeName || !campusName) return null;

	return (
    placesData.features.find(feature =>
      feature.properties.name.includes(placeName) &&
      feature.properties.campus === CAMPUS_MAP[campusName]
    ) ?? null
  );
};

function getCampus(campusName: string) {
  if (!campusName) return null;

  return (
    campusData.features.find(feature =>
      feature.properties.campus === CAMPUS_MAP[campusName]
    ) ?? null
  );
};