import React from "react";
import { View, Text } from "react-native";
import Card from "../common/Card";
import GradientProgressBar from "../indicators/GradientProgressBar";
import { useTranslation } from "react-i18next";
import { Pollen } from "@/infrastructure/interfaces/pollen.interface";
import { allergyRangeColors } from "@/constants/Colors";

interface PollenCardProps {
  pollen: Pollen;
  pollenKey: number;
}
const PollenCard = ({ pollen, pollenKey }: PollenCardProps) => {
  const { t } = useTranslation();
  return (
    <Card
      key={pollenKey}
      className="bg-neutral-800 mb-3 p-4 flex-row items-center pt-3 rounded-lg"
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
            {t(
              `components.alergyLabelIndicator.${pollen?.allergyLevel?.level}`
            )}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <GradientProgressBar
            progress={pollen.allergyLevel.percentage}
            id={pollenKey}
          />
          <View className="ml-4 items-center -mt-5">
            <Text className="text-white">{pollen.value.toFixed()}</Text>
            <Text className="text-gray-300 text-sm">
              {t("components.description_pollenCard.label_pollen")}
            </Text>
          </View>
        </View>
      </View>
    </Card>
  );
};

export default PollenCard;
