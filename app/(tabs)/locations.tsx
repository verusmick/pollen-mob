import { Text, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import LocationCard from "@/presentation/components/LocationCard";
import { useLocations } from "@/presentation/hooks/useLocations";
import useLocationsSelectedStore from "@/store/useLocationsSelectedStore";
import { useLinkPollenToLocation } from "@/presentation/hooks/useLinkPollenToLocation";

import useCurrentLocationSelectedStore from "@/store/useCurrentLocationSelectedStore";

import {
  Location,
  LocationWithMeasurement,
} from "@/infrastructure/interfaces/location.interface";
import LocationSearchInput from "@/presentation/components/LocationSearchInput";
import { useTranslation } from "react-i18next";

const LocationsScreen = () => {
  const { t } = useTranslation();
  const { locationsQuery } = useLocations();
  const { data, isLoading } = locationsQuery;
  const locationsData = data || [];
  const router = useRouter();
  const { linkPollen, loading, error } = useLinkPollenToLocation();
  const { getLocationsSelectedArray, addLocation } =
    useLocationsSelectedStore();
  const { setCurrentLocation } = useCurrentLocationSelectedStore();
  const locationsSelected = getLocationsSelectedArray();

  const addNewSelectedLocation = async (location: Location) => {
    const locationWithPollen = await linkPollen(location);
    addLocation(locationWithPollen as LocationWithMeasurement);
  };

  return (
    <ScrollView className="bg-neutral-900 flex-1 p-6">
      <Text className="text-white text-xl font-bold">
        {t("location_screen.title")}
      </Text>
      <LocationSearchInput
        locations={locationsData}
        onSelectLocation={addNewSelectedLocation}
      />
      <FlatList
        data={locationsSelected}
        keyExtractor={(index) => index.id}
        renderItem={({ item, index }) => {
          const hasPollenData = item.pollenMeasurement?.pollens?.length > 0;
          return (
            <LocationCard
              isMyLocation={false}
              location={item}
              index={index}
              onPress={(id) => {
                if (hasPollenData) {
                  setCurrentLocation(item);
                  router.push("/home");
                }
              }}
            />
          );
        }}
      />
    </ScrollView>
  );
};

export default LocationsScreen;
