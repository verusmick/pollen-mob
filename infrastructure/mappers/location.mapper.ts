import { Location } from "../interfaces/location.interface";
import { LocationsResponse } from "../interfaces/locations-response";

export class LocationMapper {
  static fromThePollenDBToLocation = (
    location: LocationsResponse
  ): Location => {
    
    return {
      id: location.id,
      name: location.name,
      lat: location.lat,
      lon: location.lon,
    };
  };
}
