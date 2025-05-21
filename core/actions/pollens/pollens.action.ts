import { pollenApi } from "@/core/api/pollen-api";
import { PollensResponse } from "@/infrastructure/interfaces/pollens-response";
import { PollenMapper } from "@/infrastructure/mappers/pollens.mapper";

const timestampNow = Math.floor(Date.now() / 1000);
const timestamp24hAgo = timestampNow - 24 * 60 * 60;
export const pollensAction = async () => {
  try {
    const { data } = await pollenApi.get<PollensResponse>("/measurements", {
      params: {
        locations: "DEBIED",
        from: timestamp24hAgo,
        to: timestampNow,
      },
    });
    const pollens = {
      from: data.from,
      to: data.to,
      pollens: data.measurements
        .map(PollenMapper.fromThePollenDBToPollen)
        .filter((pollen: any) => {
          const { data, value } = pollen;
          return !!value;
        })
        .sort((a, b) => b.allergyLevel.percentage - a.allergyLevel.percentage),
    };
    console.log('NEW DATA')
    return pollens;
  } catch (error) {
    console.log(error);
    throw "Cannot load locations";
  }
};
// Todo: delete these lines
// from: 1744040721
// to: 1746632721
// locations: DEBIED
// pollen: Pinaceae,Fungus,Quercus,Poaceae,Alternaria,Platanus,Taxus,Alnus,Fraxinus,Betula,Castanea,Plantago
