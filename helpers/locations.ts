import { Location } from "@/infrastructure/interfaces/location.interface";

export const haversineDistance = (loc1: Location, loc2: Location): number => {
  const toRad = (x: number) => (x * Math.PI) / 180;

  const R = 6371; // Radius of the Earth in km
  const dLat = toRad(loc2.lat - loc1.lat);
  const dLon = toRad(loc2.lon - loc1.lon);

  const lat1 = toRad(loc1.lat);
  const lat2 = toRad(loc2.lat);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in km
};

export const findNearestLocation = (
  currentLocation: Location,
  locations: Location[],
  minDistance: number = 0, // ignore locations closer than this (in km)
  maxDistance: number = Infinity // ignore locations farther than this (in km)
): Location | null => {
  let nearest: Location | null = null;
  let minFoundDistance = Infinity;
  for (const location of locations) {
    const distance = haversineDistance(currentLocation, location);
    if (
      distance >= minDistance &&
      distance <= maxDistance &&
      distance < minFoundDistance
    ) {
      minFoundDistance = distance;
      nearest = location;
    }
  }

  return nearest;
};