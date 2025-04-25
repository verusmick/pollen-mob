import { locationsAction } from "@/core/actions/locations/locations.action";
import { useQuery } from "@tanstack/react-query";

export const useLocations = () => {
  const locationsQuery = useQuery({
    queryKey: ["locations"],
    queryFn: locationsAction,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
  });
  return {
    locationsQuery,
  };
};
