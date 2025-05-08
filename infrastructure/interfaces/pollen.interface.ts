export interface Pollen {
  name: string;
  data: Datum[];
  totalValue: number;
}

export interface Datum {
  from: number;
  to: number;
  value: number;
}
