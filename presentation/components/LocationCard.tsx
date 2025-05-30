import { View, Text, Pressable } from "react-native";
import React from "react";
import Card from "./Card";

import { AllergyIndicatorLabel } from "./AllergyIndicatorLabel";
import { LocationWithMeasurement } from "@/infrastructure/interfaces/location.interface";

interface LocationCardProps {
  location: LocationWithMeasurement;
  onPress?: (id: string) => void;
  index: number;
  isMyLocation?: boolean;
}

const LocationCard = ({
  location,
  onPress,
  index,
  isMyLocation = false,
}: LocationCardProps) => {
  const firstPollenEntry = location.pollenMeasurement.pollens[0];
  return (
    <Pressable onPress={() => onPress?.(location.id)}>
      <Card
        key={index}
        className="bg-neutral-800 mb-4 p-6 rounded-2xl flex-row justify-between items-center"
      >
        {/* Left section */}
        <View className="flex-1 mr-4">
          <Text className="text-white text-xl font-bold">{location.name}</Text>
          {isMyLocation && (
            <Text className="text-gray-300 text-sm">My Location</Text>
          )}
          <AllergyIndicatorLabel
            level={firstPollenEntry?.allergyLevel?.level}
          />
        </View>

        {/* Right section */}
        {firstPollenEntry?.value != null && (
          <View className="items-end">
            <Text className="text-white text-5xl font-extrabold">
              {firstPollenEntry.value.toFixed()}
            </Text>
            <Text className="text-gray-300 text-sm mt-1">pollen/m³</Text>
          </View>
        )}
      </Card>
    </Pressable>
  );
};

export default LocationCard;
