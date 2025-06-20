import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { router, Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as expoLocation from "expo-location";

import SplashScreenView from "@/presentation/components/layout/SplashScreenView";
import { useLocations } from "@/presentation/hooks/useLocations";
import { findNearestLocation } from "@/helpers/locations";
import { useLinkPollenToLocation } from "@/presentation/hooks/useLinkPollenToLocation";
import useLocationsSelectedStore from "@/store/useLocationsSelectedStore";
import useCurrentLocationSelectedStore from "@/store/useCurrentLocationSelectedStore";

import {
  type Location,
  type LocationWithMeasurement,
} from "@/infrastructure/interfaces/location.interface";

const MAX_READER_USER_DISTANCE_KM = 370;

export default function Layout() {
  const { t } = useTranslation();
  const { locationsQuery } = useLocations();
  const [currentUserLocation, setCurrentUserLocation] =
    useState<expoLocation.LocationObject | null>(null);
  const [isAppReady, setIsAppReady] = useState(false);

  const { linkPollen } = useLinkPollenToLocation();
  const { addLocation } = useLocationsSelectedStore();
  const { setCurrentLocation } = useCurrentLocationSelectedStore();

  const { data } = locationsQuery;
  const locationsData = data || [];

  const getCurrentUserLocation = async () => {
    let { status } = await expoLocation.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setIsAppReady(true);
      defaultRedirect();
      return;
    }
    let { coords } = await expoLocation.getCurrentPositionAsync({});
    setCurrentUserLocation({
      lat: coords.latitude,
      lon: coords.longitude,
    });
  };
  const addNewSelectedLocation = async (location: Location) => {
    const locationWithPollen = await linkPollen(location);
    const currentStoredLocation =
      useLocationsSelectedStore.getState().selectedLocations[location.id];

    const enrichedLocation = {
      ...locationWithPollen,
      ...currentStoredLocation,
      isMycurrentLocation: true,
      ts: new Date("2100-01-01").getTime(),
    };
    addLocation(enrichedLocation as LocationWithMeasurement);
    setCurrentLocation(enrichedLocation as LocationWithMeasurement);
    router.push("/home");
  };

  const defaultRedirect = () => router.navigate("/(tabs)/locations");

  useEffect(() => {
    if (locationsData.length > 0 && currentUserLocation) {
      // todo: Testing coords
      const testLocation = currentUserLocation;
      // const testLocation = {
      //   lat: 54.58337,
      //   lon: 9.28983,
      // };
      const nearestLocation = findNearestLocation(
        testLocation,
        locationsData,
        0,
        MAX_READER_USER_DISTANCE_KM
      );
      if (!nearestLocation) defaultRedirect();
      if (nearestLocation) addNewSelectedLocation(nearestLocation);
      setIsAppReady(true);
    }
  }, [locationsData, currentUserLocation]);

  //init
  useEffect(() => {
    getCurrentUserLocation();
  }, []);
  if (!isAppReady) {
    return <SplashScreenView />;
  }
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "gray",
        tabBarLabelPosition: "below-icon",
        tabBarStyle: { backgroundColor: "#0f0f0f", borderTopWidth: 0 },
      }}
    >
      <Tabs.Screen name="home/index" options={{ href: null }} />
      <Tabs.Screen
        name="locations/index"
        options={{
          title: t("location_screen.title"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "map" : "map-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="configuration/index"
        options={{
          title: t("config_screen.title"),
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "cog" : "cog-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="allergies/index"
        options={{
          href: null,
          title: "My allergies",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "reorder-three" : "reorder-three-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
