export interface Pollen {
  name: string;
  data: Datum[];
  measurementCount: number;
}

export interface Datum {
  from: number;
  to: number;
  value: number;
}
