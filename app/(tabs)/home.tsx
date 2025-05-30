import CircularProgress from "@/presentation/components/CircularProgress";
import { usePollens } from "@/presentation/hooks/usePollens";
import { View, Text, FlatList, ScrollView, RefreshControl } from "react-native";
import { I18nManager } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { useEffect, useState, useCallback } from "react";
import { SplashScreen } from "expo-router";
import { Pollen } from "@/infrastructure/interfaces/pollen.interface";
import Header from "@/presentation/components/HeaderScreen";
import AlertCard from "@/presentation/components/AlertCard";
import { allergyRangeColors } from "@/constants/Colors";
import PollenCard from "@/presentation/components/PollenCard";
import useCurrentLocationSelectedStore from "@/store/useCurrentLocationSelectedStore";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { currentLocation } = useCurrentLocationSelectedStore();

  if (!currentLocation) return false;
  const { pollenMeasurement: data, name: locationName } = currentLocation;

  const firstPollenEntry = data?.pollens[0];
  const pollenList = data?.pollens.slice(1) || [];

  const { t, i18n } = useTranslation();
  const donutProps = {
    size: 260,
    text: `${firstPollenEntry?.value.toFixed()} pollen/m³`,
    pollenName: t(`pollenName.${firstPollenEntry?.name}`),
    pollenRangeLevel: firstPollenEntry?.allergyLevel?.level || "",
    strokeWidth: 16,
    textColor: "#ffffff",
  };

  // const onRefresh = useCallback(() => {
  //   setRefreshing(true);
  //   pollensQuery.refetch().finally(() => setRefreshing(false));
  // }, [pollensQuery]);

  // useEffect(() => {
  //   // if (error) throw error;
  //   if (isLoading || !firstPollenEntry) SplashScreen.hideAsync();
  // }, [isLoading]);
  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      <ScrollView
        className="bg-neutral-900 flex-1 p-4"
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     tintColor="#fff"
        //   />
        // }
      >
        {/* Header */}
        <Header title="PollenScience.eu" subTitle={locationName} />

        <View className="flex items-center justify-center my-2">
          <CircularProgress
            {...donutProps}
            pgColor={
              allergyRangeColors[
                firstPollenEntry?.allergyLevel?.level || "NONE"
              ]
            }
            bgColor={"#FFFFFF"}
            // pgColor={allergyRangeColors.MODERATE}
            progressPercent={firstPollenEntry?.allergyLevel?.percentage || 0}
          />
        </View>

        {/* Alert Card */}
        <AlertCard pollen={firstPollenEntry} />
        <Text className="text-white text-lg mb-4">
          Top concentrations of the last day (pollen/m³)
        </Text>
        <FlatList
          data={pollenList}
          keyExtractor={(index) => index.name}
          renderItem={({ item, index }) => (
            <PollenCard pollen={item} key={index} />
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
