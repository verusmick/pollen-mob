import { LocationWithMeasurement } from "@/infrastructure/interfaces/location.interface";
import { create } from "zustand";

interface LocationsSelectedState {
  selectedLocations: { [id: string]: LocationWithMeasurement };
  addLocation: (location: LocationWithMeasurement) => void;
  addLocations: (locations: LocationWithMeasurement[]) => void;
  removeLocation: (id: string) => void;
  clearLocations: () => void;
  getLocationsSelectedArray: () => LocationWithMeasurement[];
}

const useLocationsSelectedStore = create<LocationsSelectedState>(
  (set, get) => ({
    selectedLocations: {},
    addLocation: (location) =>
      set((state) => ({
        selectedLocations: {
          ...state.selectedLocations,
          [location.id]: location,
        },
      })),
    addLocations: (locations) =>
      set((state) => {
        const newLocations = { ...state.selectedLocations };
        locations.forEach((loc) => {
          newLocations[loc.id] = loc;
        });
        return { selectedLocations: newLocations };
      }),
    removeLocation: (id) =>
      set((state) => {
        const { [id]: _, ...rest } = state.selectedLocations;
        return { selectedLocations: rest };
      }),
    clearLocations: () => set({ selectedLocations: {} }),
    getLocationsSelectedArray: () => Object.values(get().selectedLocations),
  })
);

export default useLocationsSelectedStore;
