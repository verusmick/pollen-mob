import { create } from "zustand";
import { LocationWithMeasurement } from "@/infrastructure/interfaces/location.interface";

interface CurrentLocationSelectedState {
  currentLocation: LocationWithMeasurement | null;
  setCurrentLocation: (location: LocationWithMeasurement) => void;
  clearCurrentLocation: () => void;
}

const useCurrentLocationSelectedStore = create<CurrentLocationSelectedState>((set) => ({
  currentLocation: null,
  setCurrentLocation: (location) => set({ currentLocation: location }),
  clearCurrentLocation: () => set({ currentLocation: null }),
}));

export default useCurrentLocationSelectedStore;