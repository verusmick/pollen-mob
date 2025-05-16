import { getPollenPercentageMiddleware } from "@/app/home/pollenRanges";
import { Pollen } from "../interfaces/pollen.interface";
import { Measurement } from "../interfaces/pollens-response";

export class PollenMapper {
  static fromThePollenDBToPollen = (measurements: Measurement): Pollen => {
    const { polle, data } = measurements;
    //This its getting the last item with a value different a 0
    const lastValue =
      data
        .slice()
        .reverse()
        .find((item) => item.value)?.value || 0;
    const pollens = {
      name: polle,
      data,
      value: lastValue,
      allergyLevel: getPollenPercentageMiddleware(polle, lastValue),
    };
    return pollens;
  };
}
