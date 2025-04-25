import { useLocations } from "@/presentation/hooks/useLocations";
import { View, Text, FlatList } from "react-native";

export default function LocationsScreen() {
  const { locationsQuery } = useLocations();
  return (
    <View className="bg-gray-900">
      <Text className="text-3xl font-bold text-slate-200 bg-gray-900 mt-20">
        Locations
      </Text>
      <FlatList
        data={locationsQuery.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="mt-10 border border-gray-800 bg-gray-800">
            <Text className="text-2xl font-work-light text-slate-200">
              {item.name}
            </Text>
            <Text className="text-slate-200">{item.id}</Text>
          </View>
        )}
      />
    </View>
  );
}
