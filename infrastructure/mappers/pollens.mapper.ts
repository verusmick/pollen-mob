import { Pollen } from "../interfaces/pollen.interface";
import { Measurement } from "../interfaces/pollens-response";

export class PollenMapper {
  static fromThePollenDBToPollen = (measurements: Measurement): Pollen => {
    const { polle, data } = measurements;
    const pollens = {
      name: polle,
      data,
      totalValue: data.reduce(
        (accumulator: any, current: any) => accumulator + current.value,
        0
      ),
    };
    return pollens;
  };
}
