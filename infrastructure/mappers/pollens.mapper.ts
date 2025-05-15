import { getPollenPercentageMiddleware } from "@/app/home/pollenRanges";
import { Pollen } from "../interfaces/pollen.interface";
import { Measurement } from "../interfaces/pollens-response";

export class PollenMapper {
  static fromThePollenDBToPollen = (measurements: Measurement): Pollen => {
    const { polle, data } = measurements;
    const value = data[data.length - 1].value;
    const pollens = {
      name: polle,
      data,
      value,
      allergyLevel: getPollenPercentageMiddleware(polle, value),
    };
    return pollens;
  };
}
