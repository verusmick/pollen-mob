import { useRouter } from "expo-router";
import { MapPin } from "lucide-react-native";
import { View, Text, Pressable } from "react-native";
interface HeaderLocation {
  subTitle: string;
}
const HeaderUbication = ({ subTitle }: HeaderLocation) => {
  const router = useRouter();
  return (
    <View className="flex-row items-center mt-3">
      <MapPin size={16} color="white" />
      <Pressable onPress={() => router.push("/(tabs)/locations")}>
        <Text className="text-white text-sm ml-2">{subTitle}</Text>
      </Pressable>
    </View>
  );
};

export default HeaderUbication;
