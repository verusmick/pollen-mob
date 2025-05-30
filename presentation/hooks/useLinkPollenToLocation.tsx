import { pollensAction } from "@/core/actions/pollens/pollens.action";
import { Location } from "@/infrastructure/interfaces/location.interface";
import { useState } from "react";

export function useLinkPollenToLocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const linkPollen = async (location: Location) => {
    setLoading(true);
    setError(null);
    try {
      const pollenMeasurement = await pollensAction(location.id);
      setLoading(false);
      return { ...location, pollenMeasurement };
    } catch (err) {
      setError(err);
      setLoading(false);
      return { ...location, pollen: null };
    }
  };

  return { linkPollen, loading, error };
}
