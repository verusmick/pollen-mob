export interface Pollen {
  name: string;
  data: Datum[];
  value: number;
  allergyLevel: AllergyLevel;
}

export interface Datum {
  from: number;
  to: number;
  value: number;
}

export interface AllergyLevel {
  level: string;
  percentage: number;
}
