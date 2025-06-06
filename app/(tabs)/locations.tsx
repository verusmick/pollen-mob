import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import LocationCard from "@/presentation/components/LocationCard";
import LocationSearchInput from "@/presentation/components/LocationSearchInput";
import SafeAreaViewWrapper from "@/presentation/components/SafeAreaViewWrapper";

import { useLinkPollenToLocation } from "@/presentation/hooks/useLinkPollenToLocation";
import { useLocations } from "@/presentation/hooks/useLocations";
import useCurrentLocationSelectedStore from "@/store/useCurrentLocationSelectedStore";
import useLocationsSelectedStore from "@/store/useLocationsSelectedStore";

import {
  type Location,
  type LocationWithMeasurement,
} from "@/infrastructure/interfaces/location.interface";
import useLoaderStore from "@/store/useLoaderStore";
import Loading from "@/presentation/components/Loading";

const LocationsScreen = () => {
  const { t } = useTranslation();
  const { locationsQuery } = useLocations();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { getLocationsSelectedArray, addLocation } =
    useLocationsSelectedStore();
  const { setCurrentLocation } = useCurrentLocationSelectedStore();
  const locationsSelected = getLocationsSelectedArray();
  const { linkPollen } = useLinkPollenToLocation();
  const { isLoading, setIsLoading } = useLoaderStore();

  const { data } = locationsQuery;
  const locationsData = data || [];

  const addNewSelectedLocation = async (location: Location) => {
    setIsLoading(true);
    const locationWithPollen = await linkPollen(location);
    const locationWithTimestamp: LocationWithMeasurement = {
      ...locationWithPollen,
      ts: Date.now(),
    };
    addLocation(locationWithTimestamp);
    setIsLoading(false);
  };

  const getLocationsSelected = (
    dataLocations: LocationWithMeasurement[]
  ): LocationWithMeasurement[] => {
    return dataLocations.sort((a, b) => b.ts - a.ts);
  };

  return (
    <SafeAreaViewWrapper className="bg-neutral-900">
      {isLoading ? (
        <Loading />
      ) : (
        <View className="flex-1 px-4" style={{ zIndex: 1 }}>
          <Text className="text-white text-2xl font-bold mt-2">
            {t("location_screen.title")}
          </Text>
          <LocationSearchInput
            locations={locationsData}
            onSelectLocation={addNewSelectedLocation}
          />

          <FlatList
            data={getLocationsSelected(locationsSelected)}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
              paddingBottom: insets.bottom,
            }}
            renderItem={({ item, index }) => {
              const hasPollenData = item.pollenMeasurement?.pollens?.length > 0;
              return (
                <LocationCard
                  location={item}
                  index={index}
                  onPress={() => {
                    if (hasPollenData) {
                      setCurrentLocation(item);
                      router.push("/home");
                    }
                  }}
                />
              );
            }}
          />
        </View>
      )}
    </SafeAreaViewWrapper>
  );
};

export default LocationsScreen;
