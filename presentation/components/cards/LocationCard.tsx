import Card from "../common/Card";
import { AllergyIndicatorLabel } from "../indicators/AllergyIndicatorLabel";
import { View, Text, Pressable } from "react-native";
import { LocationWithMeasurement } from "@/infrastructure/interfaces/location.interface";
import { useTranslation } from "react-i18next";


interface LocationCardProps {
  location: LocationWithMeasurement;
  onPress?: (id: string) => void;
  index: number;
}
const i18nKey = "components.locationCard";
const LocationCard = ({ location, onPress, index }: LocationCardProps) => {
  const { t } = useTranslation();
  const firstPollenEntry = location?.pollenMeasurement?.pollens[0];
  const isMyLocation = location.isMycurrentLocation;
  return (
    <Pressable onPress={() => onPress?.(location.id)}>
      {({ pressed }) => (
        <Card
          key={index}
          className={`p-6 flex-row justify-between items-center rounded-lg shadow-md overflow-hidden ${
            pressed ? "bg-neutral-700/70" : "bg-neutral-800"
          }`}
        >
          {/* Left section */}
          <View className="flex-1 mr-4">
            <Text className="text-white text-xl font-bold">
              {location.name}
            </Text>
            {isMyLocation && (
              <Text className="text-gray-300 text-sm">
                {t(`${i18nKey}.is_my_location`)}
              </Text>
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
      )}
    </Pressable>
  );
};

export default LocationCard;
