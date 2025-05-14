import { getPollenPercentageMiddleware } from "@/app/home/pollenRanges";
import { Pollen } from "../interfaces/pollen.interface";
import { Measurement } from "../interfaces/pollens-response";

export class PollenMapper {
  static fromThePollenDBToPollen = (measurements: Measurement): Pollen => {
    const { polle, data } = measurements;
    const measurementCount = data[data.length - 1].value;
    const pollens = {
      name: polle,
      data,
      measurementCount,
      percentage: getPollenPercentageMiddleware(polle, measurementCount),
    };
    return pollens;
  };
}
