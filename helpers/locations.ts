import * as Location from 'expo-location';

// types.ts
export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface LocationItem extends Coordinates {
  name: string;
}

export const haversineDistance = (
  coords1: Coordinates,
  coords2: Coordinates
): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(coords2.latitude - coords1.latitude);
  const dLon = toRad(coords2.longitude - coords1.longitude);

  const lat1 = toRad(coords1.latitude);
  const lat2 = toRad(coords2.latitude);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in km
};

export const findNearestLocation = (
  currentLocation: Coordinates,
  locations: LocationItem[]
): LocationItem | null => {
  let nearest: LocationItem | null = null;
  let minDistance = Infinity;

  for (const location of locations) {
    const distance = haversineDistance(currentLocation, location);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = location;
    }
  }

  return nearest;
};

