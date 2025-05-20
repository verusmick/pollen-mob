import CircularProgress from "@/components/CircularProgress";
import { usePollens } from "@/presentation/hooks/usePollens";
import { View, Text, FlatList, ScrollView } from "react-native";
import { I18nManager } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import Card from "@/components/Card";
import { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { allergyRangeColors } from "./pollenRanges";
import { Pollen } from "@/infrastructure/interfaces/pollen.interface";
import { MapPin, AlertCircle } from "lucide-react-native";
import BarProgress from "@/components/GradientProgressBar";
import GradientProgressBar from "@/components/GradientProgressBar";
// import { calculatePollenAllergieLevel } from "./pollenRanges";

SplashScreen.preventAutoHideAsync();
export default function HomeScreen() {
  const { pollensQuery } = usePollens();

  const { data, isLoading } = pollensQuery;
  // const pollenTopOne = data?.pollens[0];
  const pollenTopOne: Pollen = data?.pollens[0];
  const pollenList = data?.pollens.slice(1) || [];

  const { t, i18n } = useTranslation();
  const donutProps = {
    size: 260,
    // pgColor: "red",
    text: `${pollenTopOne?.value.toFixed()} pollen/m³`,
    pollenName: t(`pollenName.${pollenTopOne?.name}`),
    pollenRangeLevel: pollenTopOne?.allergyLevel?.level || "",
    strokeWidth: 16,
    textColor: "#ffffff",
  };

  useEffect(() => {
    // if (error) throw error;
    if (isLoading || !pollenTopOne) SplashScreen.hideAsync();
  }, [isLoading]);

  return (
    <SafeAreaView className="bg-neutral-900 flex-1">
      <ScrollView className="bg-neutral-900 flex-1 p-4">
        {/* Header */}
        <View className="">
          <View className="flex items-center">
            <Text className="text-white text-2xl font-bold">
              PollenScience.eu
            </Text>
          </View>

          <View className="flex-row items-center mt-3">
            <MapPin size={16} color="white" />
            <Text className="text-white text-sm ml-2">
              München (Biedersteiner Straße)
            </Text>
          </View>
        </View>
        <View className="flex items-center justify-center my-2">
          <CircularProgress
            {...donutProps}
            pgColor={
              allergyRangeColors[pollenTopOne?.allergyLevel?.level || "NONE"]
            }
            bgColor={"#FFFFFF"}
            // pgColor={allergyRangeColors.MODERATE}
            progressPercent={pollenTopOne?.allergyLevel?.percentage || 0}
          />
        </View>

        {/* Alert Card */}
        <Card className="bg-neutral-800 mb-4 p-4 flex items-center">
          <View className="flex-row items-center">
            <Text className="text-white text-sm ml-2">
              {t(`pollenName.${pollenTopOne?.name}`)}
            </Text>
          </View>
          {pollenTopOne && (
            <View className="flex-row items-center mt-2">
              <AlertCircle
                size={18}
                color={
                  allergyRangeColors[
                    pollenTopOne?.allergyLevel?.level || "NONE"
                  ]
                }
              />
              <Text
                className="text-base ml-2"
                style={{
                  color:
                    allergyRangeColors[
                      pollenTopOne?.allergyLevel?.level || "NONE"
                    ],
                }}
              >
                {t(
                  `home_screen.allergyRanges.${pollenTopOne.allergyLevel.level}`
                )}{" "}
                allergy risk
              </Text>
            </View>
          )}
        </Card>

        {/* Concentration List */}
        <Text className="text-white text-lg mb-4">
          Top concentrations of the last day (pollen/m³)
        </Text>
        {/* <Text className="text-neutral-400 text-xs mb-4">
          Measured: Since 4 July 2023 to Today (remove)
        </Text> */}

        {/* Concentration Cards */}
        {pollenList.map((item: Pollen, index: number) => (
          <Card
            key={index}
            className="bg-neutral-800 mb-3 p-4 flex-row items-center pt-3"
          >
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-white text-base">
                  {t(`pollenName.${item.name}`)}
                </Text>
                <Text
                  className="text-[10px] ml-2"
                  style={{ color: allergyRangeColors[item.allergyLevel.level] }}
                >
                  {t(`home_screen.allergyRanges.${item.allergyLevel.level}`)}{" "}
                  allergy risk
                </Text>
              </View>
              <View className="flex-row items-center justify-between">
                <GradientProgressBar
                  progress={item.allergyLevel.percentage}
                  id={index}
                />
                <Text className="text-white  ml-4">
                  {`${item.value.toFixed()}`}
                </Text>
              </View>
            </View>
            {/* <Text className="text-white text-lg ml-4">
              {`${item.value.toFixed()}`}
            </Text> */}
          </Card>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
