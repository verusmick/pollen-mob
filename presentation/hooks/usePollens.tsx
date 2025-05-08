import { pollensAction } from "@/core/actions/pollens/pollens.action";
import { useQuery } from "@tanstack/react-query";

export const usePollens = () => {
  const pollensQuery = useQuery({
    queryKey: ["pollens"],
    queryFn: pollensAction,
    staleTime: 1000 * 60 * 60 * 24, //24 hours
  });
  return {
    pollensQuery,
  };
};
