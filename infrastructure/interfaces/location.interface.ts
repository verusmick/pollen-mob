import { Pollen } from "./pollen.interface";

export interface Location {
  id: string;
  name: string;
  lat: number;
  lon: number;
}

export interface LocationWithMeasurement extends Location {
  pollenMeasurement: PollenMeasurement;
}

interface PollenMeasurement {
  from: number;
  to: number;
  pollens: Pollen[];
}
