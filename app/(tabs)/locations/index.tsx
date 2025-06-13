import React, { useRef } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  Pressable,
  Keyboard,
  Dimensions,
  LayoutAnimation,
  UIManager,
  Platform,
  StyleSheet,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SwipeListView } from "react-native-swipe-list-view";

import Loading from "@/presentation/components/indicators/Loading";


import SafeAreaViewWrapper from "@/presentation/components/layout/SafeAreaViewWrapper";
import { useLinkPollenToLocation } from "@/presentation/hooks/useLinkPollenToLocation";
import { useLocations } from "@/presentation/hooks/useLocations";
import useCurrentLocationSelectedStore from "@/store/useCurrentLocationSelectedStore";
import useLocationsSelectedStore from "@/store/useLocationsSelectedStore";
import useLoaderStore from "@/store/useLoaderStore";

import {
  type Location,
  type LocationWithMeasurement,
} from "@/infrastructure/interfaces/location.interface";
import SearchSelectInput from "@/presentation/components/inputs/SearchSelectInput";
import LocationCard from "@/presentation/components/cards/LocationCard";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
const i18nKey = "components.search_select_input";
const LocationsScreen = () => {
  const { t } = useTranslation();
  const { locationsQuery } = useLocations();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const listRef = useRef<any>(null);
  const alreadySwiped = useRef<{ [key: string]: boolean }>({});

  const { getLocationsSelectedArray, addLocation, removeLocation } =
    useLocationsSelectedStore();
  const { setCurrentLocation } = useCurrentLocationSelectedStore();
  const locationsSelected = getLocationsSelectedArray();
  const { linkPollen } = useLinkPollenToLocation();
  const { isLoading, setIsLoading } = useLoaderStore();

  const { data } = locationsQuery;
  const locationsData = data || [];

  const addNewSelectedLocation = async (location: Location) => {
    const existing = locationsSelected.find((loc) => loc.id === location.id);
    if (existing) {
      setCurrentLocation(existing);
      router.push("/home");
      return;
    }

    setIsLoading(true);
    const locationWithPollen = await linkPollen(location);
    const locationWithTimestamp: LocationWithMeasurement = {
      ...locationWithPollen,
      ts: Date.now(),
    };
    const hasPollenData =
      locationWithPollen.pollenMeasurement?.pollens?.length > 0;

    if (!hasPollenData) {
      setIsLoading(false);
      addLocation(locationWithTimestamp);
      return;
    }

    addLocation(locationWithTimestamp);
    setCurrentLocation(locationWithTimestamp);
    router.push("/home");
    setIsLoading(false);
  };

  const handleRemoveLocation = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    removeLocation(id);
  };

  const getLocationsSelected = (
    dataLocations: LocationWithMeasurement[]
  ): LocationWithMeasurement[] => {
    return dataLocations.sort((a, b) => b.ts - a.ts);
  };
  const handleSwipeValueChange = (key: string, value: number) => {
    const screenWidth = Dimensions.get("window").width;
    const percentageSwipe = 0.83;
    const swipeWidth = screenWidth * percentageSwipe;
    const swipeThreshold = -swipeWidth * percentageSwipe;

    if (value <= swipeThreshold && !alreadySwiped.current[key]) {
      alreadySwiped.current[key] = true;
      handleRemoveLocation(key);
    }

    if (value > swipeThreshold && alreadySwiped.current[key]) {
      alreadySwiped.current[key] = false;
    }
  };

  const handlePress = () => {
    Keyboard.dismiss();
    listRef.current?.closeAllOpenRows();
  };
  const handleLocationPress = (
    item: LocationWithMeasurement,
    hasPollenData: boolean
  ) => {
    if (hasPollenData) {
      listRef.current?.closeAllOpenRows();
      setCurrentLocation(item);
      router.push("/home");
    }
  };
  const renderItem = ({
    item,
    index,
  }: {
    item: LocationWithMeasurement;
    index: number;
  }) => {
    const hasPollenData = item.pollenMeasurement?.pollens?.length > 0;

    return (
      <View style={styles.press}>
        <LocationCard
          location={item}
          index={index}
          onPress={() => handleLocationPress(item, hasPollenData)}
        />
      </View>
    );
  };
  const renderHiddenItem = ({
    item,
    index,
  }: {
    item: LocationWithMeasurement;
    index: number;
  }) => {
    if (item.isMycurrentLocation) return null;

    return (
      <View style={styles.trashswipeContainer}>
        <TouchableOpacity
          onPress={() => handleRemoveLocation(item.id)}
          hitSlop={20}
        >
          <FontAwesome name="trash" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <SafeAreaViewWrapper className="bg-neutral-900">
      {isLoading ? (
        <Loading />
      ) : (
        <Pressable style={{ flex: 1 }} onPress={handlePress}>
          <View className="flex-1 px-4" style={{ zIndex: 1 }}>
            <Text className="text-white text-2xl font-bold mt-2">
              {t("location_screen.title")}
            </Text>
            <SearchSelectInput
              data={locationsData}
              selectedItems={locationsSelected}
              onSelectItem={addNewSelectedLocation}
              labelKey="name"
              placeholder={t(`${i18nKey}.input_label_location`)}
            />
            <SwipeListView
              ref={listRef}
              data={getLocationsSelected(locationsSelected)}
              keyExtractor={(item) => item.id}
              contentContainerStyle={{ paddingBottom: insets.bottom }}
              disableRightSwipe
              rightOpenValue={-60}
              onSwipeValueChange={({ key, value }) =>
                handleSwipeValueChange(key, value)
              }
              renderItem={renderItem}
              renderHiddenItem={renderHiddenItem}
            />
          </View>
        </Pressable>
      )}
    </SafeAreaViewWrapper>
  );
};
const styles = StyleSheet.create({
  press: {
    overflow: "hidden",
    borderRadius: 20,
    marginBottom: 16,
    backgroundColor: "#171717",
  },
  trashswipeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
    paddingRight: 20,
    backgroundColor: "#7f1d1d",
    borderRadius: 20,
    marginBottom: 17,
  },
});
export default LocationsScreen;
