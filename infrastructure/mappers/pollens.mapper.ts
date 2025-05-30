import { getPollenPercentageMiddleware } from "@/helpers/pollenRanges";
import { Pollen } from "../interfaces/pollen.interface";
import { Measurement } from "../interfaces/pollens-response";

export class PollenMapper {
  static fromThePollenDBToPollen = (measurements: Measurement): Pollen => {
    const { polle, data } = measurements;
    const lastValue = data[data.length - 1].value;
    const pollens = {
      name: polle,
      data,
      value: lastValue,
      allergyLevel: getPollenPercentageMiddleware(polle, lastValue),
    };
    return pollens;
  };
}
