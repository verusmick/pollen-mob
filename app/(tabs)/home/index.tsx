import CircularProgress from "@/presentation/components/indicators/CircularProgress";
import { View, Text, FlatList, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Redirect, SplashScreen } from "expo-router";
import { allergyRangeColors } from "@/constants/Colors";
import SafeAreaViewWrapper from "@/presentation/components/layout/SafeAreaViewWrapper";
import AlertCard from "@/presentation/components/cards/AlertCard";
import PollenCard from "@/presentation/components/cards/PollenCard";
import Header from "@/presentation/components/layout/HeaderScreen";
import useCurrentLocationSelectedStore from "@/store/useCurrentLocationSelectedStore";


SplashScreen.preventAutoHideAsync();

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const { currentLocation } = useCurrentLocationSelectedStore();

  if (!currentLocation) return <Redirect href="/" />;
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
        data={pollenList.length > 0 ? pollenList : []}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{
          paddingBottom: Platform.OS === "android" ? 20 : 0,
        }}
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
            {pollenList.length > 0 && (
              <Text className="text-white text-lg mb-4">
                {t("home_screen.description_concentration")}
              </Text>
            )}
          </>
        }
        renderItem={({ item, index }) =>
          pollenList.length > 0 ? (
            <PollenCard pollen={item} pollenKey={index} />
          ) : null
        }
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
