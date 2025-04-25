import { pollenApi } from "@/core/api/pollen-api";
import { LocationsResponse } from "@/infrastructure/interfaces/locations-response";
import { LocationMapper } from "@/infrastructure/mappers/location.mapper";

export const locationsAction = async () => {
    try {
        const {data} = await pollenApi.get<LocationsResponse[]>('/locations');
        const locations = data.map(LocationMapper.fromThePollenDBToLocation);  
        // console.log('===>', data.map(index =>{console.log (index)}))
        console.log('===>', locations)
        return locations
        
    } catch (error) {
        console.log(error);
        throw 'Cannot load locations'
        
    }
}