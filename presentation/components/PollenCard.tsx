import React from "react";
import { View, Text } from "react-native";
import Card from "./Card";
import GradientProgressBar from "./GradientProgressBar";
import { useTranslation } from "react-i18next";
import { Pollen } from "@/infrastructure/interfaces/pollen.interface";
import { allergyRangeColors } from "@/constants/Colors";
interface PollenCardProps {
  pollen: Pollen;
  key: number;
}
const PollenCard = ({ pollen, key }: PollenCardProps) => {
  const { t } = useTranslation();
  return (
    <Card
      key={key}
      className="bg-neutral-800 mb-3 p-4 flex-row items-center pt-3"
    >
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="text-white text-base">
            {t(`pollenName.${pollen.name}`)}
          </Text>
          <Text
            className="text-[10px] ml-2"
            style={{ color: allergyRangeColors[pollen.allergyLevel.level] }}
          >
            {t(`home_screen.allergyRanges.${pollen?.allergyLevel?.level}`)}{" "}
            allergy risk
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <GradientProgressBar
            progress={pollen.allergyLevel.percentage}
            id={key}
          />
          <Text className="text-white ml-4">{pollen.value.toFixed()}</Text>
        </View>
      </View>
    </Card>
  );
};

export default PollenCard;
