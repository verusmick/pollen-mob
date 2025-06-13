import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import SafeAreaViewWrapper from "@/presentation/components/layout/SafeAreaViewWrapper";

const AllergiesScreen = () => {
  const router = useRouter();
  return (
    <SafeAreaViewWrapper className="bg-neutral-900 flex-1 p-4">
      <TouchableOpacity
        onPress={() => router.back()}
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
        <Text style={{ color: "#fff", fontSize: 18, marginLeft: 8 }}>
          My Allergies
        </Text>
      </TouchableOpacity>
      <Text className="text-white">My Allergies</Text>
    </SafeAreaViewWrapper>
  );
};

export default AllergiesScreen;
