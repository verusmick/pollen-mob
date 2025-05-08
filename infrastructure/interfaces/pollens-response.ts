export interface PollensResponse {
  from: number;
  to: number;
  measurements: Measurement[];
}

export interface Measurement {
  polle: string;
  location: Location;
  data: Datum[];
}

export interface Datum {
  from: number;
  to: number;
  value: number;
}

export enum Location {
  Debied = "DEBIED",
}
