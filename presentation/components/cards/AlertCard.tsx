import { View, Text } from "react-native";

import { useTranslation } from "react-i18next";
import { AlertCircle } from "lucide-react-native";
import { Pollen } from "@/infrastructure/interfaces/pollen.interface";
import { allergyRangeColors } from "@/constants/Colors";
import { AllergyIndicatorLabel } from "../indicators/AllergyIndicatorLabel";
import Card from "../common/Card";

interface AlertCardProps {
  pollen: Pollen;
}

const AlertCard = ({ pollen }: AlertCardProps) => {
  const { t } = useTranslation();

  return (
    <Card className="bg-neutral-800 mb-4 p-4 flex items-center rounded-lg">
      <View className="flex-row items-center">
        <Text className="text-white text-sm ml-2">
          {t(`pollenName.${pollen?.name}`)}
        </Text>
      </View>
      {pollen && <AllergyIndicatorLabel level={pollen.allergyLevel.level} />}
    </Card>
  );
};

export default AlertCard;
