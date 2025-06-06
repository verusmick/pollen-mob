import CircularProgress from "@/presentation/components/CircularProgress";
import { View, Text, FlatList } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { SplashScreen } from "expo-router";
import Header from "@/presentation/components/HeaderScreen";
import AlertCard from "@/presentation/components/AlertCard";
import { allergyRangeColors } from "@/constants/Colors";
import PollenCard from "@/presentation/components/PollenCard";
import useCurrentLocationSelectedStore from "@/store/useCurrentLocationSelectedStore";
import SafeAreaViewWrapper from "@/presentation/components/SafeAreaViewWrapper";

SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { currentLocation } = useCurrentLocationSelectedStore();

  if (!currentLocation) return false;
  const { pollenMeasurement: data, name: locationName } = currentLocation;

  const firstPollenEntry = data?.pollens[0];
  const pollenList = data?.pollens.slice(1) || [];

  const { t } = useTranslation();
  const donutProps = {
    pollenName: t(`pollenName.${firstPollenEntry?.name}`),
    pollenRangeLevel: firstPollenEntry?.allergyLevel?.level || "",
    size: 260,
    strokeWidth: 16,
    text: `${firstPollenEntry?.value.toFixed()} pollen/m³`,
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
    <SafeAreaViewWrapper className="bg-neutral-900" customPaddingBottom={0}>
      <FlatList
        className="p-4"
        data={pollenList}
        keyExtractor={(item) => item.name}
        ListHeaderComponent={
          <>
            <Header title="PollenScience.eu" subTitle={locationName} />
            <View className="flex items-center justify-center my-2">
              <CircularProgress
                {...donutProps}
                pgColor={
                  allergyRangeColors[
                    firstPollenEntry?.allergyLevel?.level || "NONE"
                  ]
                }
                bgColor="#FFFFFF"
                progressPercent={
                  firstPollenEntry?.allergyLevel?.percentage || 0
                }
              />
            </View>
            <AlertCard pollen={firstPollenEntry} />
            <Text className="text-white text-lg mb-4">
              Top concentrations of the last day (pollen/m³)
            </Text>
          </>
        }
        renderItem={({ item, index }) => (
          <PollenCard pollen={item} pollenKey={index} />
        )}
        // Optional: Uncomment when needed
        // refreshControl={
        //   <RefreshControl
        //     refreshing={refreshing}
        //     onRefresh={onRefresh}
        //     tintColor="#fff"
        //   />
        // }
      />
    </SafeAreaViewWrapper>
  );
}
