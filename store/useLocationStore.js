import { create } from "zustand";
const useLocationStore = create((set) => ({
  locations: [],
  addLocation: (locationId) =>
    set((state) => {
      const exists = state.locations.some((loc) => loc.location === locationId);
      if (exists) return state;
      return {
        locations: [
          ...state.locations,
          {
            location: locationId,
            pollenList: [],
          },
        ],
      };
    }),
}));
export default useLocationStore;
