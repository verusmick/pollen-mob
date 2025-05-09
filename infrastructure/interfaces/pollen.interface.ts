export interface Pollen {
  name: string;
  data: Datum[];
  totalCount: number;
}

export interface Datum {
  from: number;
  to: number;
  value: number;
}
