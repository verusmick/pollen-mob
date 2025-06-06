import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Dimensions, StyleSheet } from "react-native";

const SplashScreenView = () => {
  const ballAnim = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get("window").width;
  const trackWidth = screenWidth * 0.5;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(ballAnim, {
          toValue: trackWidth - 20,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(ballAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, []);

  return (
    <View className="bg-neutral-900 flex-1 justify-center items-center px-6">
      <Text className="text-white text-3xl mb-2">Pollenscience.eu</Text>
      <View
        style={{
          height: 20,
          width: trackWidth,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <Animated.View style={[styles.animation, { left: ballAnim }]} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  animation: {
    position: "absolute",
    height: 16,
    width: 16,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
});
export default SplashScreenView;
