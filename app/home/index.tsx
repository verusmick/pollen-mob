import CircularProgress from "@/components/CircularProgress";
import { usePollens } from "@/presentation/hooks/usePollens";
import { View, Text, FlatList } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
// import { calculatePollenAllergieLevel } from "./pollenRanges";

export default function HomeScreen() {
  const { pollensQuery } = usePollens();
  const pollenTopOne = pollensQuery.data?.pollens[0];
  console.log(pollensQuery);
  // return false

  // console.log('===>', pollensQuery.data)
  const donutProps = {
    size: 260,
    pgColor: "#FFEE32",
    text: `${pollenTopOne?.totalCount.toFixed()} pollen/m³`,
    pollenName: pollenTopOne?.name,
    pollenRangeLevel: pollenTopOne?.percentage?.label || "",
    strokeWidth: 16,
    textColor: "#ffffff",
  };
  return (
    <SafeAreaView>
      <View className="bg-gray-900 flex justify-center items-center h-screen">
        <Text className="bg-white">Munich</Text>
        <CircularProgress
          {...donutProps}
          progressPercent={pollenTopOne?.percentage?.percentage || 0}
        />
        <Text className="bg-white">Top Pollen</Text>
        <FlatList
          className="w-full px-6"
          data={pollensQuery.data?.pollens}
          keyExtractor={(item, key) => key}
          renderItem={({ item }) => (
            <View className="mt-10 border border-gray-800 bg-gray-800 w-full ">
              <Text className="text-2xl text-slate-200">{item.name}</Text>
              <Text className="text-slate-200">
                {item.totalCount.toFixed()} pollen/m³
              </Text>
              <Text className="text-slate-200">
                Level : {item.percentage.label}
              </Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
