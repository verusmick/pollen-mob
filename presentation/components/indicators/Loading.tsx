import { View, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View className="flex-1 justify-center items-cente">
      <ActivityIndicator size="large" color="#fff" />
    </View>
  );
};

export default Loading;
