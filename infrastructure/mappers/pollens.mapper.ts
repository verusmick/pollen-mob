import { getPollenPercentageMiddleware } from "@/app/home/pollenRanges";
import { Pollen } from "../interfaces/pollen.interface";
import { Measurement } from "../interfaces/pollens-response";

export class PollenMapper {
  static fromThePollenDBToPollen = (measurements: Measurement): Pollen => {
    const { polle, data } = measurements;
    const totalCount = data.reduce(
      (accumulator: any, current: any) => accumulator + current.value,
      0
    );
    const pollens = {
      name: polle,
      data,
      totalCount,
      percentage: getPollenPercentageMiddleware(polle, totalCount),
    };
    return pollens;
  };
}
