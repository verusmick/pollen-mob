import { useLocations } from "@/presentation/hooks/useLocations";
import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LocationsScreen() {
  const { locationsQuery } = useLocations();
  return (
    <SafeAreaView>
      <View className="bg-gray-900 mx-2 font-work-light">
        <Text className="text-3xl font-work-regular color-white">
          Locations
        </Text>
        <FlatList
          data={locationsQuery.data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="mt-10 border border-gray-800 bg-gray-800">
              <Text className="text-2xl text-slate-200">{item.name}</Text>
              <Text className="text-slate-200">{item.id}</Text>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
