import { pollenApi } from "@/core/api/pollen-api";
import { PollensResponse } from "@/infrastructure/interfaces/pollens-response";
import { PollenMapper } from "@/infrastructure/mappers/pollens.mapper";

export const pollensAction = async () => {
  try {
    // const { data } = await pollenApi.get("/measurements", {params:{locations: 'DEBIED', from:'1744040721', to:'1746632721'  }});
    const { data } = await pollenApi.get<PollensResponse>("/measurements", {
      params: { locations: "DEBIED" },
    });
    const pollens = {
      from: data.from,
      to: data.to,
      pollens: data.measurements
        .map(PollenMapper.fromThePollenDBToPollen)
        .filter((pollen: any) => {
          const { data, totalValue } = pollen;
          return !!totalValue;
        })
        .sort((a, b) => b.totalValue - a.totalValue),
    };
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
