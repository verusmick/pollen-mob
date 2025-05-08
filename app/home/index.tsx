import CircularProgress from "@/components/CircularProgress";
import { usePollens } from "@/presentation/hooks/usePollens";
import { View, Text, FlatList } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { pollensQuery } = usePollens();
  const pollenTopOne = pollensQuery.data?.pollens[0];

  const donutProps = {
    size: 260,
    pgColor: "#FFEE32",
    text: "60 pollen/m³",
    strokeWidth: 16,
    textColor: "#ffffff",
  };
  return (
    <SafeAreaView>
      <View className="bg-gray-900 flex justify-center items-center h-screen">
        <Text className="bg-white">Location</Text>
        <CircularProgress {...donutProps} progressPercent={32} />
        <Text className="bg-white">Top Pollen</Text>
        <FlatList
          data={pollensQuery.data?.pollens}
          keyExtractor={(item, key) => key}
          renderItem={({ item }) => (
            <View className="mt-10 border border-gray-800 bg-gray-800">
              <Text className="text-2xl text-slate-200">{item.name}</Text>
              <Text className="text-slate-200">{item.totalValue}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
