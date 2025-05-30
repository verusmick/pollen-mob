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
import { useCallback, useEffect, useRef, useState } from "react";

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
  const prevLocationsDataRef = useRef<Location[]>([]);
  const [enrichedLocations, setEnrichedLocations] = useState<
    LocationWithMeasurement[]
  >([]);
  const addNewSelectedLocation = async (location: Location) => {
    const locationWithPollen = await linkPollen(location);
    // addLocation(locationWithPollen as LocationWithMeasurement);
  };

  const functionTETE = useCallback(
    async (locations: Location[]) => {
      const enriched = await Promise.all(
        locations.map(async (location) => {
          const locationWithPollen = await linkPollen(location);
          return locationWithPollen as LocationWithMeasurement;
        })
      );
      setEnrichedLocations(enriched);
      console.log("tete", enriched);
    },
    [linkPollen]
  );

  useEffect(() => {
    // Only call if locationsData is not empty and has changed
    if (
      locationsData.length > 0 &&
      JSON.stringify(prevLocationsDataRef.current) !==
        JSON.stringify(locationsData)
    ) {
      prevLocationsDataRef.current = locationsData;
      functionTETE(locationsData);
    }
  }, [locationsData, functionTETE]);

  return (
    <ScrollView className="bg-neutral-900 flex-1 p-6">
      <Text className="text-white text-xl font-bold">
        {t("location_screen.title")}
      </Text>
      {/* <LocationSearchInput
        locations={locationsData}
        onSelectLocation={addNewSelectedLocation}
      /> */}
      <FlatList
        data={enrichedLocations}
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
